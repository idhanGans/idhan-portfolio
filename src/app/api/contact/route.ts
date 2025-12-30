import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // 3 requests per minute
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

// Clean up old entries periodically
function cleanupRateLimitMap() {
  const now = Date.now();
  const keys = Array.from(rateLimitMap.keys());
  for (const key of keys) {
    const value = rateLimitMap.get(key);
    if (value && now - value.timestamp > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(key);
    }
  }
}

// Check rate limit
function isRateLimited(ip: string): boolean {
  cleanupRateLimitMap();
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count++;
  return false;
}

// Comprehensive email validation
function isValidEmail(email: string): { valid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }
  if (email.length > 254) {
    return { valid: false, error: "Email address is too long" };
  }
  const [localPart, domain] = email.split("@");
  if (localPart.length > 64) {
    return { valid: false, error: "Email local part is too long" };
  }
  const disposableDomains = [
    "tempmail.com",
    "throwaway.email",
    "guerrillamail.com",
    "10minutemail.com",
    "mailinator.com",
    "trashmail.com",
  ];
  if (disposableDomains.some((d) => domain.toLowerCase().includes(d))) {
    return {
      valid: false,
      error: "Disposable email addresses are not allowed",
    };
  }
  return { valid: true };
}

// Validate message content
function validateMessage(message: string): { valid: boolean; error?: string } {
  if (message.length < 10) {
    return {
      valid: false,
      error: "Message must be at least 10 characters long",
    };
  }
  if (message.length > 5000) {
    return { valid: false, error: "Message is too long (max 5000 characters)" };
  }
  return { valid: true };
}

// Validate name
function validateName(name: string): { valid: boolean; error?: string } {
  if (name.length < 2) {
    return { valid: false, error: "Name must be at least 2 characters long" };
  }
  if (name.length > 100) {
    return { valid: false, error: "Name is too long (max 100 characters)" };
  }
  if (/^[\d\s]+$/.test(name) || /^[^a-zA-Z]+$/.test(name)) {
    return { valid: false, error: "Please enter a valid name" };
  }
  return { valid: true };
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Get subject label
function getSubjectLabel(subject: string): string {
  const labels: Record<string, string> = {
    project: "Project Inquiry",
    job: "Job Opportunity",
    collaboration: "Collaboration Request",
    other: "General Message",
  };
  return labels[subject] || subject;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : request.headers.get("x-real-ip") || "unknown";

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: "Too many requests. Please wait a minute before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate name
    const nameValidation = validateName(name.trim());
    if (!nameValidation.valid) {
      return NextResponse.json(
        { error: nameValidation.error },
        { status: 400 }
      );
    }

    // Validate email
    const emailValidation = isValidEmail(email.trim().toLowerCase());
    if (!emailValidation.valid) {
      return NextResponse.json(
        { error: emailValidation.error },
        { status: 400 }
      );
    }

    // Validate message
    const messageValidation = validateMessage(message.trim());
    if (!messageValidation.valid) {
      return NextResponse.json(
        { error: messageValidation.error },
        { status: 400 }
      );
    }

    // Validate subject
    const validSubjects = ["project", "job", "collaboration", "other"];
    if (!validSubjects.includes(subject)) {
      return NextResponse.json(
        { error: "Please select a valid subject" },
        { status: 400 }
      );
    }

    // Check if Gmail is configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Gmail credentials not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Create email content
    const emailContent = `
      <html>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📬 New Contact Form Message</h1>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 30px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #495057; margin-top: 0; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                ${getSubjectLabel(subject)}
              </h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #6c757d; width: 100px;"><strong>From:</strong></td>
                  <td style="padding: 10px 0; color: #212529;">${escapeHtml(
                    name
                  )}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6c757d;"><strong>Email:</strong></td>
                  <td style="padding: 10px 0;">
                    <a href="mailto:${escapeHtml(
                      email
                    )}" style="color: #667eea; text-decoration: none;">${escapeHtml(
      email
    )}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6c757d;"><strong>Date:</strong></td>
                  <td style="padding: 10px 0; color: #212529;">${new Date().toLocaleString(
                    "en-US",
                    { dateStyle: "full", timeStyle: "short" }
                  )}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #495057; margin-top: 0; font-size: 16px;">Message:</h3>
              <p style="white-space: pre-wrap; line-height: 1.8; color: #212529; margin: 0;">${escapeHtml(
                message
              )}</p>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
              <a href="mailto:${escapeHtml(
                email
              )}?subject=Re: ${encodeURIComponent(getSubjectLabel(subject))}" 
                 style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold;">
                Reply to ${escapeHtml(name)}
              </a>
            </div>
          </div>
          
          <div style="background-color: #343a40; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: #adb5bd; font-size: 12px; margin: 0;">
              This message was sent from your portfolio contact form at<br>
              <a href="https://idhan-portofolio.vercel.app" style="color: #667eea;">idhan-portofolio.vercel.app</a>
            </p>
          </div>
        </body>
      </html>
    `;

    // Create Nodemailer transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send email
    try {
      console.log("=== SENDING EMAIL VIA GMAIL ===");
      console.log("From:", process.env.GMAIL_USER);
      console.log("To:", process.env.GMAIL_USER);

      const info = await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: `[Portfolio] ${getSubjectLabel(subject)} from ${name}`,
        html: emailContent,
      });

      console.log("=== EMAIL SENT SUCCESSFULLY ===");
      console.log("Message ID:", info.messageId);

      return NextResponse.json(
        {
          success: true,
          message: "Your message has been sent. I will get back to you soon!",
        },
        { status: 200 }
      );
    } catch (emailError: unknown) {
      console.error("=== EMAIL ERROR ===");
      console.error("Error:", emailError);

      const errorMessage =
        emailError instanceof Error ? emailError.message : "Unknown error";

      return NextResponse.json(
        {
          error: "Failed to send email. Please try again later.",
          details:
            process.env.NODE_ENV === "development" ? errorMessage : undefined,
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Contact form error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to process contact form", details: errorMessage },
      { status: 500 }
    );
  }
}

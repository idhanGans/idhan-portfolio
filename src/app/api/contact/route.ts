import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  // Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  // Check length
  if (email.length > 254) {
    return { valid: false, error: "Email address is too long" };
  }

  // Check local part length (before @)
  const [localPart, domain] = email.split("@");
  if (localPart.length > 64) {
    return { valid: false, error: "Email local part is too long" };
  }

  // Check for common disposable email domains
  const disposableDomains = [
    "tempmail.com",
    "throwaway.email",
    "guerrillamail.com",
    "10minutemail.com",
    "mailinator.com",
    "trashmail.com",
    "fakeinbox.com",
    "tempinbox.com",
  ];
  if (disposableDomains.some((d) => domain.toLowerCase().includes(d))) {
    return { valid: false, error: "Disposable email addresses are not allowed" };
  }

  // Check for valid domain structure
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.[a-zA-Z]{2,}$/;
  if (!domainRegex.test(domain) && !domain.includes(".")) {
    return { valid: false, error: "Invalid email domain" };
  }

  return { valid: true };
}

// Validate message content
function validateMessage(message: string): { valid: boolean; error?: string } {
  if (message.length < 10) {
    return { valid: false, error: "Message must be at least 10 characters long" };
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
  // Check for suspicious patterns (all numbers, special chars only)
  if (/^[\d\s]+$/.test(name) || /^[^a-zA-Z]+$/.test(name)) {
    return { valid: false, error: "Please enter a valid name" };
  }
  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
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

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Create email content
    const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0a0a0a;">New Contact Form Submission</h2>
          
          <div style="margin-top: 20px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            
            <div style="margin-top: 20px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(
                message
              )}</p>
            </div>
          </div>
          
          <hr style="margin-top: 30px; color: #ddd;">
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            This message was sent from your portfolio contact form.
          </p>
        </body>
      </html>
    `;

    // Store locally (for development, won't work on Vercel)
    try {
      const storedMessages = await readStoredMessages();
      storedMessages.push({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        name,
        email,
        subject,
        message,
        read: false,
      });
      await saveStoredMessages(storedMessages);
    } catch (storageError) {
      console.log("Local storage not available (expected on Vercel)");
    }

    // Send email via Resend
    const contactEmail =
      process.env.CONTACT_EMAIL || "idhan.arbeitsplatz@gmail.com";

    try {
      console.log("=== RESEND EMAIL ATTEMPT ===");
      console.log("To:", contactEmail);
      console.log("From: Idhan Portfolio <onboarding@resend.dev>");
      console.log("API Key prefix:", process.env.RESEND_API_KEY?.substring(0, 10) + "...");
      
      const { data, error } = await resend.emails.send({
        from: "Idhan Portfolio <onboarding@resend.dev>",
        to: contactEmail,
        subject: `[Portfolio] New ${subject === 'project' ? 'Project Inquiry' : subject === 'job' ? 'Job Opportunity' : subject === 'collaboration' ? 'Collaboration Request' : 'Message'} from ${name}`,
        html: emailContent,
        replyTo: email,
      });

      if (error) {
        console.error("Resend API returned error:", JSON.stringify(error, null, 2));
        return NextResponse.json(
          {
            error: "Failed to send email",
            details: error.message,
          },
          { status: 500 }
        );
      }

      console.log("=== EMAIL SENT SUCCESSFULLY ===");
      console.log("Email ID:", data?.id);

      return NextResponse.json(
        {
          success: true,
          message:
            "Your message has been received. I will get back to you soon!",
          emailId: data?.id,
        },
        { status: 200 }
      );
    } catch (emailError: unknown) {
      console.error("=== RESEND EXCEPTION ===");
      console.error("Error:", JSON.stringify(emailError, null, 2));
      const errorMessage =
        emailError instanceof Error ? emailError.message : "Unknown error";
      
      // Check for common Resend errors
      let userFriendlyError = "Failed to send email. Please try again later.";
      if (errorMessage.includes("API key")) {
        userFriendlyError = "Email service configuration error.";
      } else if (errorMessage.includes("rate limit")) {
        userFriendlyError = "Too many emails sent. Please try again later.";
      } else if (errorMessage.includes("validation")) {
        userFriendlyError = "Email validation failed.";
      }
      
      return NextResponse.json(
        {
          error: userFriendlyError,
          details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
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

// Helper functions for local storage
async function readStoredMessages(): Promise<unknown[]> {
  try {
    const fs = await import("fs").then((m) => m.promises);
    const filePath = process.cwd() + "/messages.json";
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  } catch {
    return [];
  }
}

async function saveStoredMessages(messages: unknown[]): Promise<void> {
  try {
    const fs = await import("fs").then((m) => m.promises);
    const filePath = process.cwd() + "/messages.json";
    await fs.writeFile(filePath, JSON.stringify(messages, null, 2));
  } catch (error) {
    console.log("Storage error:", error);
  }
}

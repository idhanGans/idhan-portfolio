import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate form data
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
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

    // Store the message in a JSON file (since we're not using a database)
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

    // Try to send email if Resend API key is available
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail =
      process.env.CONTACT_EMAIL || "idhan.arbeitsplatz@gmail.com";
    if (apiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            from: "Contact Form <onboarding@resend.dev>",
            to: contactEmail,
            subject: `New Contact Form: ${escapeHtml(subject)}`,
            html: emailContent,
            replyTo: email,
          }),
        });

        if (!response.ok) {
          console.warn("Resend API error, but message was stored locally");
        }
      } catch (emailError) {
        console.warn("Email service unavailable, message stored locally");
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. I'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
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

// Helper functions to store messages locally
async function readStoredMessages(): Promise<any[]> {
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

async function saveStoredMessages(messages: any[]): Promise<void> {
  try {
    const fs = await import("fs").then((m) => m.promises);
    const filePath = process.cwd() + "/messages.json";
    await fs.writeFile(filePath, JSON.stringify(messages, null, 2));
  } catch (error) {
    console.error("Failed to save messages:", error);
  }
}

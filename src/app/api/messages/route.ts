import { NextRequest, NextResponse } from "next/server";

const MESSAGES_FILE = process.cwd() + "/messages.json";

async function readMessages(): Promise<Message[]> {
  const fs = await import("fs").then((m) => m.promises);
  try {
    const data = await fs.readFile(MESSAGES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeMessages(messages: Message[]): Promise<void> {
  const fs = await import("fs").then((m) => m.promises);
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

interface Message {
  id: number;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
}

// GET - Fetch all messages
export async function GET() {
  try {
    const messages = await readMessages();
    // Sort by timestamp, newest first
    messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error reading messages:", error);
    return NextResponse.json(
      { error: "Failed to read messages" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a message by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    const messages = await readMessages();
    const filteredMessages = messages.filter((msg) => msg.id !== parseInt(id));

    if (filteredMessages.length === messages.length) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    await writeMessages(filteredMessages);
    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}

// PATCH - Update message (mark as read/unread)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    const messages = await readMessages();
    const messageIndex = messages.findIndex((msg) => msg.id === id);

    if (messageIndex === -1) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    messages[messageIndex] = {
      ...messages[messageIndex],
      read: read ?? true,
    };

    await writeMessages(messages);
    return NextResponse.json({ success: true, message: messages[messageIndex] });
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { error: "Failed to update message" },
      { status: 500 }
    );
  }
}

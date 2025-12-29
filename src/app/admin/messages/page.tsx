"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiCalendar, FiUser, FiTrash2 } from "react-icons/fi";

interface Message {
  id: number;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        const data = await response.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    // Refresh messages every 10 seconds
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id: number) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
    // Optionally save to backend
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-primary-dark pt-24 pb-12">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Messages
          </h1>
          <p className="text-accent-dim">
            View and manage all incoming contact messages
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-accent-dim">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <FiMail size={32} className="text-accent-dim" />
            </div>
            <h2 className="text-xl font-display font-bold text-white mb-2">
              No messages yet
            </h2>
            <p className="text-accent-dim">
              Your contact form messages will appear here
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Messages List */}
            <div className="lg:col-span-1">
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {messages.map((msg, index) => (
                  <motion.button
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedMessage?.id === msg.id
                        ? "bg-white/10 border-white/20"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-medium text-white text-sm truncate">
                        {msg.name}
                      </p>
                      {!msg.read && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-accent-dim truncate">
                      {msg.subject}
                    </p>
                    <p className="text-xs text-accent-dim mt-1">
                      {formatDate(msg.timestamp)}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <motion.div
                  key={selectedMessage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 bg-white/[0.03] border border-white/10 rounded-2xl"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-display font-bold text-white mb-2">
                        {selectedMessage.subject}
                      </h2>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-accent-dim">
                          <FiUser size={16} />
                          <span className="text-sm">
                            {selectedMessage.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-accent-dim">
                          <FiMail size={16} />
                          <a
                            href={`mailto:${selectedMessage.email}`}
                            className="text-sm hover:text-white transition-colors"
                          >
                            {selectedMessage.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-accent-dim">
                          <FiCalendar size={16} />
                          <span className="text-sm">
                            {formatDate(selectedMessage.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>

                  <div className="border-t border-white/10 pt-6 mt-6">
                    <p className="text-white whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-xs text-accent-dim mb-2">
                      Quick reply email:
                    </p>
                    <a
                      href={`mailto:${
                        selectedMessage.email
                      }?subject=Re: ${encodeURIComponent(
                        selectedMessage.subject
                      )}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary-dark font-medium rounded-lg hover:bg-accent-silver transition-colors"
                    >
                      <FiMail size={16} />
                      Reply to {selectedMessage.name}
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full py-16">
                  <p className="text-accent-dim">
                    Select a message to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

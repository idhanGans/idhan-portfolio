"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiCalendar,
  FiUser,
  FiTrash2,
  FiRefreshCw,
  FiCheck,
  FiCircle,
  FiSearch,
  FiFilter,
  FiInbox,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

interface Message {
  id: number;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
}

type FilterType = "all" | "unread" | "read";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchMessages = useCallback(async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    try {
      const response = await fetch("/api/messages");
      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      showNotification("error", "Failed to fetch messages");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => fetchMessages(), 30000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`/api/messages?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
        showNotification("success", "Message deleted successfully");
      } else {
        showNotification("error", "Failed to delete message");
      }
    } catch {
      showNotification("error", "Failed to delete message");
    }
  };

  const handleMarkAsRead = async (message: Message, read: boolean) => {
    try {
      const response = await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: message.id, read }),
      });

      if (response.ok) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === message.id ? { ...msg, read } : msg))
        );
        if (selectedMessage?.id === message.id) {
          setSelectedMessage({ ...message, read });
        }
      }
    } catch {
      console.error("Failed to update message");
    }
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      handleMarkAsRead(message, true);
    }
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

  const getSubjectLabel = (subject: string) => {
    const labels: Record<string, { text: string; color: string }> = {
      project: {
        text: "Project Inquiry",
        color: "bg-blue-500/20 text-blue-400",
      },
      job: { text: "Job Opportunity", color: "bg-green-500/20 text-green-400" },
      collaboration: {
        text: "Collaboration",
        color: "bg-purple-500/20 text-purple-400",
      },
      other: { text: "Other", color: "bg-gray-500/20 text-gray-400" },
    };
    return (
      labels[subject] || {
        text: subject,
        color: "bg-gray-500/20 text-gray-400",
      }
    );
  };

  // Filter and search messages
  const filteredMessages = messages.filter((msg) => {
    const matchesFilter =
      filter === "all" || (filter === "read" ? msg.read : !msg.read);
    const matchesSearch =
      searchQuery === "" ||
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-primary-dark pt-24 pb-12">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-24 right-8 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border ${
              notification.type === "success"
                ? "bg-green-500/20 border-green-500/50 text-green-400"
                : "bg-red-500/20 border-red-500/50 text-red-400"
            }`}
          >
            {notification.type === "success" ? (
              <FiCheckCircle size={18} />
            ) : (
              <FiAlertCircle size={18} />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-display font-bold text-white mb-2">
                Messages
              </h1>
              <p className="text-accent-dim">
                {messages.length} total • {unreadCount} unread
              </p>
            </div>
            <button
              onClick={() => fetchMessages(true)}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-accent hover:text-white hover:border-white/20 transition-colors disabled:opacity-50"
            >
              <FiRefreshCw
                size={16}
                className={isRefreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-col sm:flex-row gap-4"
        >
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-dim"
            />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-accent-dim focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <FiFilter size={16} className="text-accent-dim" />
            {(["all", "unread", "read"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-white text-primary-dark"
                    : "bg-white/5 text-accent hover:text-white"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === "unread" && unreadCount > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-accent-dim">
              <FiRefreshCw size={20} className="animate-spin" />
              Loading messages...
            </div>
          </div>
        ) : filteredMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <FiInbox size={32} className="text-accent-dim" />
            </div>
            <h2 className="text-xl font-display font-bold text-white mb-2">
              {messages.length === 0
                ? "No messages yet"
                : "No messages match your filter"}
            </h2>
            <p className="text-accent-dim">
              {messages.length === 0
                ? "Your contact form messages will appear here"
                : "Try adjusting your search or filter"}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Messages List */}
            <div className="lg:col-span-1">
              <div className="space-y-2 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredMessages.map((msg, index) => {
                  const subjectInfo = getSubjectLabel(msg.subject);
                  return (
                    <motion.button
                      key={msg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleSelectMessage(msg)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedMessage?.id === msg.id
                          ? "bg-white/10 border-white/20"
                          : msg.read
                          ? "bg-white/[0.02] border-white/5 hover:border-white/15"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p
                          className={`font-medium text-sm truncate ${
                            msg.read ? "text-accent" : "text-white"
                          }`}
                        >
                          {msg.name}
                        </p>
                        {!msg.read && (
                          <FiCircle
                            size={8}
                            className="text-blue-400 fill-current flex-shrink-0 mt-1"
                          />
                        )}
                      </div>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs mb-2 ${subjectInfo.color}`}
                      >
                        {subjectInfo.text}
                      </span>
                      <p className="text-xs text-accent-dim line-clamp-2 mb-2">
                        {msg.message}
                      </p>
                      <p className="text-xs text-accent-dim/70">
                        {formatDate(msg.timestamp)}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {selectedMessage ? (
                  <motion.div
                    key={selectedMessage.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-8 bg-white/[0.03] border border-white/10 rounded-2xl"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              getSubjectLabel(selectedMessage.subject).color
                            }`}
                          >
                            {getSubjectLabel(selectedMessage.subject).text}
                          </span>
                          {selectedMessage.read ? (
                            <span className="flex items-center gap-1 text-xs text-accent-dim">
                              <FiCheck size={12} /> Read
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-blue-400">
                              <FiCircle size={8} className="fill-current" /> New
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-accent-dim">
                            <FiUser size={16} />
                            <span className="text-sm text-white font-medium">
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

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleMarkAsRead(
                              selectedMessage,
                              !selectedMessage.read
                            )
                          }
                          className="p-2 rounded-lg bg-white/5 border border-white/10 text-accent hover:text-white hover:border-white/20 transition-colors"
                          title={
                            selectedMessage.read
                              ? "Mark as unread"
                              : "Mark as read"
                          }
                        >
                          {selectedMessage.read ? (
                            <FiCircle size={18} />
                          ) : (
                            <FiCheck size={18} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(selectedMessage.id)}
                          className="p-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-colors"
                          title="Delete message"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="border-t border-white/10 pt-6 mt-6">
                      <p className="text-white whitespace-pre-wrap leading-relaxed text-base">
                        {selectedMessage.message}
                      </p>
                    </div>

                    {/* Reply Section */}
                    <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg">
                      <p className="text-xs text-accent-dim mb-3">
                        Quick reply:
                      </p>
                      <a
                        href={`mailto:${
                          selectedMessage.email
                        }?subject=Re: ${encodeURIComponent(
                          getSubjectLabel(selectedMessage.subject).text
                        )}&body=${encodeURIComponent(
                          `\n\n---\nOriginal message from ${selectedMessage.name}:\n${selectedMessage.message}`
                        )}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-dark font-medium rounded-lg hover:bg-accent-silver transition-colors"
                      >
                        <FiMail size={16} />
                        Reply to {selectedMessage.name}
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full py-16 bg-white/[0.02] border border-white/5 rounded-2xl"
                  >
                    <FiMail size={48} className="text-accent-dim/50 mb-4" />
                    <p className="text-accent-dim">
                      Select a message to view details
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

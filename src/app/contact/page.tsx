"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";
import { SectionHeading, Button, CTASection } from "@/components/ui";

const contactInfo = [
  {
    icon: FiMail,
    label: "Email",
    value: "idhan.arbeitsplatz@gmail.com",
    href: "mailto:idhan.arbeitsplatz@gmail.com",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Malang, Indonesia",
    href: null,
  },
];

const socialLinks = [
  {
    icon: FiGithub,
    label: "GitHub",
    href: "https://github.com/idhanGans",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/idhan-zarkasyah-225b42261/",
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Client-side validation
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case "name":
        if (value.length < 2) return "Name must be at least 2 characters";
        if (value.length > 100) return "Name is too long";
        if (/^[\d\s]+$/.test(value)) return "Please enter a valid name";
        return null;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email";
        if (value.length > 254) return "Email is too long";
        return null;
      case "subject":
        if (!value) return "Please select a subject";
        return null;
      case "message":
        if (value.length < 10) return "Message must be at least 10 characters";
        if (value.length > 5000)
          return "Message is too long (max 5000 characters)";
        return null;
      default:
        return null;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setFieldErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    Object.entries(formState).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        errors[key] = error;
        isValid = false;
      }
    });

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate all fields before submitting
    if (!validateForm()) {
      setError("Please fix the errors above");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setFieldErrors({});
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              subtitle="Contact"
              title="Let's Work Together"
              description="Have a project in mind or just want to say hello? I'd love to hear from you."
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24 lg:pb-32">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="mb-10">
                <h3 className="text-2xl font-display font-bold text-mono-black mb-4">
                  Get In Touch
                </h3>
                <p className="text-accent-dim leading-relaxed">
                  I&apos;m always interested in hearing about new projects,
                  creative ideas, or opportunities to be part of your vision.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6 mb-10">
                {contactInfo.map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-mono-grey-100 border border-mono-grey-200 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-accent-dim text-sm mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-mono-black font-medium hover:text-accent-dim transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-mono-black font-medium">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <p className="text-accent text-sm mb-4">Find me on</p>
                <div className="flex gap-3">
                  {socialLinks.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-lg bg-mono-grey-100 border border-mono-grey-200 flex items-center justify-center text-accent hover:text-mono-black hover:border-accent transition-colors"
                    >
                      <item.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10 p-6 bg-mono-grey-50 border border-mono-grey-200 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-mono-black font-medium">
                    Currently Available
                  </span>
                </div>
                <p className="text-accent-dim text-sm">
                  I&apos;m open for freelance projects and full-time
                  opportunities. Response time: within 24 hours.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-7"
            >
              <div className="p-8 bg-mono-white border border-mono-grey-200 rounded-lg shadow-lg">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-mono-black mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-accent-dim">
                      Thank you for reaching out. I&apos;ll get back to you
                      soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
                      >
                        <p className="text-red-300 text-sm font-medium">
                          {error}
                        </p>
                      </motion.div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-accent mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={`input-field ${
                            fieldErrors.name
                              ? "border-red-500/50 focus:border-red-500"
                              : ""
                          }`}
                          placeholder="John Doe"
                        />
                        {fieldErrors.name && (
                          <p className="mt-1 text-xs text-red-400">
                            {fieldErrors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-accent mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={`input-field ${
                            fieldErrors.email
                              ? "border-red-500/50 focus:border-red-500"
                              : ""
                          }`}
                          placeholder="john@example.com"
                        />
                        {fieldErrors.email && (
                          <p className="mt-1 text-xs text-red-400">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-accent mb-2"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`input-field ${
                          fieldErrors.subject
                            ? "border-red-500/50 focus:border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Select a subject</option>
                        <option value="project">Project Inquiry</option>
                        <option value="job">Job Opportunity</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="other">Other</option>
                      </select>
                      {fieldErrors.subject && (
                        <p className="mt-1 text-xs text-red-400">
                          {fieldErrors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-accent mb-2"
                      >
                        Message
                        <span className="text-accent-dim font-normal ml-2">
                          ({formState.message.length}/5000)
                        </span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        rows={6}
                        maxLength={5000}
                        className={`input-field resize-none ${
                          fieldErrors.message
                            ? "border-red-500/50 focus:border-red-500"
                            : ""
                        }`}
                        placeholder="Tell me about your project..."
                      />
                      {fieldErrors.message && (
                        <p className="mt-1 text-xs text-red-400">
                          {fieldErrors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      loading={isSubmitting}
                      icon={<FiSend size={18} />}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white text-center mb-12">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {[
                  {
                    question: "What types of projects do you work on?",
                    answer:
                      "I specialize in building modern web applications, interactive websites, and complex frontend systems. This includes e-commerce platforms, SaaS dashboards, creative portfolios, and custom web experiences.",
                  },
                  {
                    question: "What is your typical project timeline?",
                    answer:
                      "Timeline varies based on project scope. A simple website might take 2-4 weeks, while complex applications can take 2-3 months. I always provide detailed timelines after our initial discussion.",
                  },
                  {
                    question: "Do you work with international clients?",
                    answer:
                      "Absolutely! I work with clients worldwide and am comfortable with remote collaboration across different time zones. Clear communication is key to successful remote partnerships.",
                  },
                  {
                    question: "What is your hourly rate?",
                    answer:
                      "My rates depend on project complexity and duration. I offer both hourly and project-based pricing. Contact me for a personalized quote based on your specific needs.",
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-mono-white border border-mono-grey-200 rounded-lg hover:border-accent hover:shadow-lg transition-all"
                  >
                    <h3 className="text-mono-black font-display font-medium text-lg mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-accent-dim text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Let's Start a Conversation"
        description="Ready to discuss your project? Fill out the form above or reach out directly. I typically respond within 24 hours."
        buttonText="View My Work"
        buttonHref="/projects"
        variant="dark"
      />
    </>
  );
}

"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiRefreshCw, FiAlertTriangle } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8"
          >
            <FiAlertTriangle size={36} className="text-red-400" />
          </motion.div>

          {/* Message */}
          <h1 className="text-3xl font-display font-bold text-white mb-4">
            Something Went Wrong
          </h1>
          <p className="text-accent-dim text-lg mb-8">
            An unexpected error occurred. Don&apos;t worry, these things happen.
            Let&apos;s try again.
          </p>

          {/* Reset Button */}
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-dark font-medium rounded-lg hover:bg-accent-silver transition-colors"
          >
            <FiRefreshCw size={18} />
            Try Again
          </motion.button>

          {/* Error Info (Development) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left">
              <p className="text-red-400 text-sm font-mono break-all">
                {error.message}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

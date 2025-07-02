"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="section-margin">
      <div className="container-spacing">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-blue-600 to-purple-600 p-12 md:p-20 text-center text-white mx-4"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Sparkles className="h-16 w-16 mx-auto mb-6 text-white/80" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-8 leading-tight"
            >
              Ready to Ace Your Next Interview?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed px-4"
            >
              Join thousands of professionals who have already improved their
              interview skills and landed their dream jobs with AIView.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center px-4"
            >
              <Link href="/auth">
                <Button
                  size="lg"
                  // Dark mode: bg-white text-gray-900, Light mode: bg-neutral-900 text-white
                  className="bg-neutral-900 text-white dark:bg-white dark:text-gray-900 hover:bg-neutral-800 dark:hover:bg-gray-100 text-lg px-8 py-6 h-auto group"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                // Dark mode: border-gray-700 text-gray-300, Light mode: border-white/30 text-white
                className="border-white/30 text-black dark:border-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-800 text-lg px-8 py-6 h-auto"
              >
                Learn More
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-sm text-white/70 mt-8"
            >
              No credit card required • Free 7-day trial • Cancel anytime
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

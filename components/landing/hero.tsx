"use client"

import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Users, Award, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative section-margin overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-30" />

      <div className="container-spacing relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium bg-background/50 backdrop-blur-sm">
              <Zap className="mr-2 h-4 w-4 text-primary" />
              AI-Powered Interview Practice
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight"
          >
            Master Your{' '}
            <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Interview Skills
            </span>{' '}
            with AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed px-4"
          >
            Practice job interviews with our intelligent AI interviewer. Get real-time feedback,
            improve your confidence, and land your dream job with personalized coaching.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20 px-4"
          >
            <Link href="/dashboard">
              <Button size="lg" className="group text-lg px-8 py-6 h-auto">
                Start Practicing Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto px-4"
          >
            <div className="text-center p-6 rounded-xl bg-card border">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary mr-3" />
                <span className="text-4xl font-bold">10K+</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Users Trained</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border">
              <div className="flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-primary mr-3" />
                <span className="text-4xl font-bold">95%</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Success Rate</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border">
              <div className="flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-primary mr-3" />
                <span className="text-4xl font-bold">50K+</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Practice Sessions</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
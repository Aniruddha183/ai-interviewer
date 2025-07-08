"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ArrowRight, Play, Users, Award, Zap, X } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

export function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

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
            Master Your{" "}
            <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Interview Skills
            </span>{" "}
            with AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed px-4"
          >
            Practice job interviews with our intelligent AI interviewer. Get real-time feedback, improve your
            confidence, and land your dream job with personalized coaching.
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

            <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto group bg-transparent">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl w-[90vw] max-h-[90vh] p-0 bg-transparent border-0 shadow-none overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.4,
                  }}
                  className="relative bg-background rounded-2xl overflow-hidden shadow-2xl border max-h-[90vh] flex flex-col"
                >
                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => setIsVideoOpen(false)}
                    className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>

                  {/* Video Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex-shrink-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Play className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold">AIView Demo</h3>
                        <p className="text-blue-100 text-sm">See how our AI interview coach works</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Video Container */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative aspect-video bg-black flex-1 min-h-0"
                  >
                    {/* Actual Video */}
                    <video className="w-full h-full object-cover" controls autoPlay muted loop playsInline>
                      <source
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        type="video/mp4"
                      />
                      <source
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>

                    {/* Loading overlay (shows while video loads) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 video-loading">
                      <div className="text-center text-white">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.5,
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }}
                          className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                        >
                          <Play className="w-6 h-6 ml-1" />
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="text-slate-300 text-sm"
                        >
                          Loading demo video...
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Video Footer */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 sm:p-6 bg-muted/50 flex-shrink-0"
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center space-x-4 text-center sm:text-left">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>10K+ users</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Award className="w-4 h-4" />
                          <span>95% success rate</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => setIsVideoOpen(false)}
                        className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                      >
                        Start Free Trial
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </DialogContent>
            </Dialog>
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

      <style jsx>{`
        .video-loading {
          opacity: 1;
          transition: opacity 0.3s ease-in-out;
        }
        
        video:not([data-loading]) + .video-loading {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </section>
  )
}

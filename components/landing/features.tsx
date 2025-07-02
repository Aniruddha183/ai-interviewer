"use client"

import { motion } from 'framer-motion';
import { 
  Brain, 
  Mic, 
  Video, 
  BarChart3, 
  MessageSquare, 
  Shield,
  Sparkles,
  Target
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Interviewer',
    description: 'Smart AI generates relevant questions based on your role and industry, adapting to your responses in real-time.',
    color: 'text-blue-500'
  },
  {
    icon: Mic,
    title: 'Speech Recognition',
    description: 'Advanced speech-to-text technology captures and analyzes your verbal communication with high accuracy.',
    color: 'text-green-500'
  },
  {
    icon: Video,
    title: 'Video Analysis',
    description: 'Get insights on your body language, eye contact, and presentation skills through webcam analysis.',
    color: 'text-purple-500'
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Detailed feedback with scores, improvement suggestions, and progress tracking over time.',
    color: 'text-orange-500'
  },
  {
    icon: MessageSquare,
    title: 'Real-time Feedback',
    description: 'Instant analysis of your answers with constructive feedback to help you improve immediately.',
    color: 'text-pink-500'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is secure and private. Videos and recordings are encrypted and never shared.',
    color: 'text-red-500'
  },
  {
    icon: Sparkles,
    title: 'Multiple Industries',
    description: 'Practice for tech, finance, healthcare, marketing, and many other industry-specific roles.',
    color: 'text-indigo-500'
  },
  {
    icon: Target,
    title: 'Personalized Training',
    description: 'Customized interview scenarios based on your experience level and target job positions.',
    color: 'text-teal-500'
  }
];

export function Features() {
  return (
    <section id="features" className="section-margin bg-muted/30">
      <div className="container-spacing">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Interview Success
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4"
          >
            Everything you need to practice, improve, and ace your next job interview with confidence
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-4 rounded-lg bg-muted ${feature.color} bg-opacity-10 mb-6`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
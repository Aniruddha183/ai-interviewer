"use client"

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'AIView helped me practice for my Google interview. The AI feedback was incredibly detailed and helped me identify areas I never knew I needed to improve.',
    rating: 5
  },
  {
    name: 'Michael Rodriguez',
    role: 'Product Manager at Microsoft',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'The real-time feedback feature is game-changing. I could see exactly where I was losing confidence and work on improving my delivery immediately.',
    rating: 5
  },
  {
    name: 'Emily Johnson',
    role: 'Data Scientist at Amazon',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'I was nervous about technical interviews, but AIView\'s industry-specific questions and analysis gave me the confidence I needed to succeed.',
    rating: 5
  },
  {
    name: 'David Park',
    role: 'Marketing Director at Tesla',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'The platform is incredibly intuitive and the AI interviewer feels remarkably natural. It\'s like having a personal interview coach available 24/7.',
    rating: 5
  },
  {
    name: 'Lisa Wang',
    role: 'UX Designer at Airbnb',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'The detailed analytics and progress tracking helped me see my improvement over time. I felt completely prepared for my final interview rounds.',
    rating: 5
  },
  {
    name: 'James Thompson',
    role: 'Finance Analyst at Goldman Sachs',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'AIView\'s finance-specific interview scenarios were spot on. The practice sessions gave me the edge I needed for my Wall Street interviews.',
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section-margin">
      <div className="container-spacing">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Success Stories from{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Top Companies
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4"
          >
            Join thousands of professionals who landed their dream jobs with AIView
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <Quote className="h-8 w-8 text-primary/20 mb-6" />
              
              <p className="text-muted-foreground mb-8 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <Avatar className="h-14 w-14 mr-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
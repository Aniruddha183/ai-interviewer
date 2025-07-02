"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  X,
  Star,
  Zap,
  Video,
  Brain,
  Target,
  BarChart3,
  Headphones,
  Crown,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

const pricingData = {
  monthly: [
    {
      name: "Free",
      price: 0,
      originalPrice: undefined,
      description: "Perfect for getting started with interview practice",
      badge: null,
      icon: Target,
      color: "text-slate-600",
      bgColor: "bg-slate-50 dark:bg-slate-950/20",
      borderColor: "border-slate-200 dark:border-slate-800",
      hoverBorderColor: "hover:border-slate-300 dark:hover:border-slate-700",
      features: [
        { name: "3 practice interviews per month", included: true },
        { name: "Basic AI feedback", included: true },
        { name: "Question bank access", included: true },
        { name: "Performance tracking", included: false },
        { name: "Custom interview scenarios", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Priority support", included: false },
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: 29,
      originalPrice: undefined,
      description: "Ideal for serious job seekers and career advancement",
      badge: "Most Popular",
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      hoverBorderColor: "hover:border-blue-300 dark:hover:border-blue-700",
      features: [
        { name: "Unlimited practice interviews", included: true },
        { name: "Advanced AI feedback & scoring", included: true },
        { name: "Custom interview scenarios", included: true },
        { name: "Performance analytics", included: true },
        { name: "Industry-specific questions", included: true },
        { name: "Video analysis", included: true },
        { name: "Email support", included: true },
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: 99,
      originalPrice: undefined,
      description: "Comprehensive solution for teams and organizations",
      badge: "Best Value",
      icon: Crown,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      hoverBorderColor: "hover:border-purple-300 dark:hover:border-purple-700",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "Team management dashboard", included: true },
        { name: "Custom branding", included: true },
        { name: "Advanced reporting", included: true },
        { name: "API access", included: true },
        { name: "Priority support", included: true },
        { name: "Dedicated account manager", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ],
  annual: [
    {
      name: "Free",
      price: 0,
      originalPrice: undefined,
      description: "Perfect for getting started with interview practice",
      badge: null,
      icon: Target,
      color: "text-slate-600",
      bgColor: "bg-slate-50 dark:bg-slate-950/20",
      borderColor: "border-slate-200 dark:border-slate-800",
      hoverBorderColor: "hover:border-slate-300 dark:hover:border-slate-700",
      features: [
        { name: "3 practice interviews per month", included: true },
        { name: "Basic AI feedback", included: true },
        { name: "Question bank access", included: true },
        { name: "Performance tracking", included: false },
        { name: "Custom interview scenarios", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Priority support", included: false },
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: 23,
      originalPrice: 29,
      description: "Ideal for serious job seekers and career advancement",
      badge: "Most Popular",
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      hoverBorderColor: "hover:border-blue-300 dark:hover:border-blue-700",
      features: [
        { name: "Unlimited practice interviews", included: true },
        { name: "Advanced AI feedback & scoring", included: true },
        { name: "Custom interview scenarios", included: true },
        { name: "Performance analytics", included: true },
        { name: "Industry-specific questions", included: true },
        { name: "Video analysis", included: true },
        { name: "Email support", included: true },
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: 79,
      originalPrice: 99,
      description: "Comprehensive solution for teams and organizations",
      badge: "Best Value",
      icon: Crown,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      hoverBorderColor: "hover:border-purple-300 dark:hover:border-purple-700",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "Team management dashboard", included: true },
        { name: "Custom branding", included: true },
        { name: "Advanced reporting", included: true },
        { name: "API access", included: true },
        { name: "Priority support", included: true },
        { name: "Dedicated account manager", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ],
};

const features = [
  {
    name: "AI-Powered Feedback",
    description: "Get detailed analysis of your interview performance",
    icon: Brain,
    color: "text-emerald-600",
  },
  {
    name: "Video Analysis",
    description: "Analyze body language and presentation skills",
    icon: Video,
    color: "text-blue-600",
  },
  {
    name: "Performance Tracking",
    description: "Track your progress over time with detailed analytics",
    icon: BarChart3,
    color: "text-purple-600",
  },
  {
    name: "Custom Scenarios",
    description: "Practice with industry-specific interview scenarios",
    icon: Target,
    color: "text-amber-600",
  },
];

const faqs = [
  {
    question: "How does the free trial work?",
    answer:
      "You get full access to Pro features for 14 days. No credit card required to start.",
  },
  {
    question: "Can I change my plan anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No setup fees for any plan. You only pay the monthly or annual subscription fee.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee for all paid plans.",
  },
];

export  function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "monthly"
  );
  const currentPlans = pricingData[billingPeriod];

  return (
    <div id="pricing" className="min-h-screen bg-background">
      {/* <Header /> */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the perfect plan to accelerate your interview preparation and
            land your dream job
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <Tabs
              value={billingPeriod}
              onValueChange={(value) =>
                setBillingPeriod(value as "monthly" | "annual")
              }
              className="w-auto"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">
                  Annual
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Save 20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {currentPlans.map((plan, index) => (
            <motion.div
              key={`${plan.name}-${billingPeriod}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <Card
                className={`h-full transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-xl ${
                  plan.popular
                    ? "ring-2 ring-blue-200 dark:ring-blue-800 shadow-lg"
                    : "group-hover:shadow-lg"
                } ${plan.borderColor} ${plan.hoverBorderColor} cursor-pointer`}
              >
                <CardHeader className="text-center pb-8">
                  <div
                    className={`w-12 h-12 ${plan.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110`}
                  >
                    <plan.icon className={`w-6 h-6 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      {plan.originalPrice && billingPeriod === "annual" && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${plan.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-muted-foreground">
                      /
                      {billingPeriod === "monthly"
                        ? "month"
                        : "month, billed annually"}
                    </span>
                    {billingPeriod === "annual" && plan.originalPrice && (
                      <div className="mt-2">
                        <Badge variant="secondary" className="text-xs">
                          Save ${(plan.originalPrice - plan.price) * 12}/year
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button
                    className={`w-full transition-all duration-300 group-hover:scale-105 ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : plan.name === "Enterprise"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : ""
                    }`}
                    variant={
                      plan.popular || plan.name === "Enterprise"
                        ? "default"
                        : "outline"
                    }
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + featureIndex * 0.05 }}
                      >
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/40 flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground/60"
                          }`}
                        >
                          {feature.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides comprehensive tools to help you prepare for
              any interview scenario
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="group"
              >
                <Card className="h-full text-center transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110">
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about our pricing and plans
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w- mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="group"
              >
                <Card className="transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center">
                  <Headphones className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Ready to ace your next interview?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of successful candidates who have improved their
                interview skills with our AI-powered platform
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="px-8 bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 bg-transparent transition-all duration-300 hover:scale-105"
                >
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

"use client"

import { Brain, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-spacing py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">AIView</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              The ultimate AI-powered interview practice platform. Master your interview skills
              and land your dream job with personalized feedback and real-time analysis.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors p-2">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors p-2">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors p-2">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors p-2">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-6">Product</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-primary transition-colors py-1 block">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors py-1 block">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-primary transition-colors py-1 block">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="/api" className="hover:text-primary transition-colors py-1 block">
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors py-1 block">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors py-1 block">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors py-1 block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors py-1 block">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 AIView. All rights reserved.
          </p>
          <div className="flex space-x-8 text-sm text-muted-foreground mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary transition-colors py-1">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors py-1">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-primary transition-colors py-1">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
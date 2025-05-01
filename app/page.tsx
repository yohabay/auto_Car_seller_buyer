"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Car, Shield, Brain, Globe, Zap, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import HeroCarousel from "@/components/hero-carousel"
import TestimonialCard from "@/components/testimonial-card"
import { Badge } from "@/components/ui/badge"
import EnhancedFooter from "@/components/footer/enhanced-footer"

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AutoX Neo</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex" onClick={() => setIsLoginOpen(true)}>
              Log In
            </Button>
            <Button size="sm" onClick={() => setIsSignupOpen(true)}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted pt-16 pb-24">
          <div className="container relative z-10 flex flex-col items-center text-center">
            <Badge className="mb-4" variant="outline">
              The Future of Car Commerce
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              AI-Powered Car Buying & Selling
              <span className="text-primary"> Reimagined</span>
            </h1>
            <p className="max-w-2xl text-muted-foreground text-lg mb-8">
              AutoX Neo combines AI, AR/VR, and blockchain to create the most personalized, immersive, and secure car
              commerce experience ever built.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/cars">
                <Button size="lg" className="gap-2">
                  Find Your Dream Car <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/sell">
                <Button size="lg" variant="outline">
                  Sell Your Vehicle
                </Button>
              </Link>
            </div>
            <div className="w-full max-w-5xl">
              <HeroCarousel />
            </div>
          </div>
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
        </section>

        {/* Core Pillars */}
        <section id="features" className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="outline">
                Core Pillars
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Revolutionizing How You Buy & Sell Cars
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our platform combines cutting-edge technology with user-centered design to create a seamless car
                commerce experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Brain className="h-10 w-10 text-primary" />}
                title="AI-Powered Search & Matchmaking"
                description="Our AI understands your preferences and matches you with the perfect vehicle, predicting prices and suggesting optimal deals."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-primary" />}
                title="Secure Blockchain Transactions"
                description="Every transaction is secured with blockchain technology, ensuring transparency, security, and trust between buyers and sellers."
              />
              <FeatureCard
                icon={<Globe className="h-10 w-10 text-primary" />}
                title="AR/VR Car Experience"
                description="Experience cars in immersive 3D and AR before you buy. Take virtual test drives from the comfort of your home."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="Predictive Analytics & Insights"
                description="Get real-time market insights, price predictions, and personalized recommendations based on your preferences."
              />
              <FeatureCard
                icon={<Headphones className="h-10 w-10 text-primary" />}
                title="AI Negotiator & Assistant"
                description="Let our AI assistant negotiate the best deal for you and guide you through the entire buying or selling process."
              />
              <FeatureCard
                icon={<Car className="h-10 w-10 text-primary" />}
                title="Full Concierge Mode"
                description="From paperwork to delivery, our concierge service handles everything, making car transactions effortless."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-muted">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="outline">
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple, Transparent, Efficient</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                AutoX Neo streamlines the car buying and selling process with a user-friendly platform powered by
                advanced technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-background rounded-lg p-8 text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
                <p className="text-muted-foreground">
                  Sign up and tell us your preferences. Our AI will learn what you're looking for.
                </p>
              </div>
              <div className="bg-background rounded-lg p-8 text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Explore & Experience</h3>
                <p className="text-muted-foreground">
                  Browse AI-matched vehicles, explore them in 3D/AR, and take virtual test drives.
                </p>
              </div>
              <div className="bg-background rounded-lg p-8 text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Transaction</h3>
                <p className="text-muted-foreground">
                  Complete the purchase with our secure blockchain system and let our concierge handle the rest.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/cars">
                <Button size="lg" className="gap-2">
                  Start Your Journey <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="outline">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Hear from people who have transformed their car buying and selling experience with AutoX Neo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="The AI negotiator saved me $3,200 on my new SUV. I couldn't believe how easy the whole process was!"
                author="Sarah J."
                role="Buyer"
                rating={5}
              />
              <TestimonialCard
                quote="Sold my car in 48 hours for more than I expected. The 3D showcase really made my listing stand out."
                author="Michael T."
                role="Seller"
                rating={5}
              />
              <TestimonialCard
                quote="As a dealer, the analytics dashboard has transformed how we price our inventory. Our turnover rate has improved by 40%."
                author="Robert K."
                role="Car Dealer"
                rating={4}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary-foreground">
              Ready to Transform Your Car Experience?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Join thousands of satisfied users who have discovered the future of car commerce with AutoX Neo.
            </p>
            <Link href="/cars">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Today <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Enhanced Footer with Map */}
      <EnhancedFooter />
    </div>
  )
}

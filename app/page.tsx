'use client'

import localFont from "next/font/local"
import { Inter } from 'next/font/google'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Shield,
  Users,
  Heart,
  Eye,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  MessageCircle,
  Lock,
  Search,
  Activity
} from 'lucide-react'
import Header from '@/components/Header'
import { seedCircles } from '@/data/seedData'
import Image from 'next/image'



export default function LandingPage() {
  const featuredCircles = seedCircles.slice(0, 3)

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Anonymous by Design",
      description: "Guest posting, pseudonyms, and no camera by default. Your privacy is our priority."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Peer Support",
      description: "Connect with others who understand. Share experiences, not advice."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compassion First",
      description: "Zero judgment tone. We're here to listen and support."
    }
  ]

  const howItWorks = [
    {
      step: 1,
      title: "Explore Cove Circles",
      description: "Browse topic-based spaces for addiction and recovery support.",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Join Anonymously",
      description: "Choose how you want to show up—anonymous or with a pseudonym.",
      icon: <Eye className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Connect & Share",
      description: "Participate in guided sessions or open discussions.",
      icon: <MessageCircle className="w-6 h-6" />
    }
  ]

  const whatYouControl = [
    {
      title: "Anonymity",
      description: "Toggle between anonymous and named participation",
      icon: <Eye className="w-5 h-5" />
    },
    {
      title: "Trigger Filters",
      description: "Blur content with certain keywords",
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: "Data Retention",
      description: "Choose how long your data stays (7/30/90 days)",
      icon: <Clock className="w-5 h-5" />
    }
  ]

  return (
    <div className="min-h-screen bg-[#000C18]">
      <Header />

      {/* Hero Section - Full Height */}

      <section className="section-full relative overflow-hidden">
        {/* Background Image (bottom layer) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dk2e0vvpd/image/upload/v1755995721/bg1_j7xcet.jpg"
            alt="Background"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 bg-black/60 bg-blend-overlay"
          />
          {/* Dark overlay to improve text contrast */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Bubbles layer (above bg, below content) */}
        <div className="floating-shapes pointer-events-none absolute inset-0 z-10 opacity-40">
          <div className="shape-3d"></div>
          <div className="shape-3d"></div>
          <div className="shape-3d"></div>
        </div>

        <div className="container-responsive max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content (top layer) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 mt-20 relative z-20"
            >
              <div className="space-y-6">
                <h1 className="text-5xl vanish-text lg:text-6xl xl:text-7xl font-black leading-tight">
                  Say what's hard to say
                  <br />
                  <span className="text-gradient relative">
                    safely, and <span className="font-heroFont"> anonymously</span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#b93900] rounded-full"></div>
                  </span>
                </h1>

                <p className="text-xl lg:text-2xl text-off-white/80 max-w-2xl leading-relaxed">
                  Join topic-based Cove Circles for honest talk about addiction and recovery.
                  You're in control of what you share and what you see.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/coves" className="btn-primary btn-lg">
                  <span>Explore Cove Circles</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#how-it-works" className="btn-secondary btn-lg">
                  <span>How it works</span>
                </Link>
              </div>

              {/* Trust Elements */}
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-6 text-sm text-off-white/60">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-[#b93900]" />
                  <span>Anonymity badge</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#b93900]" />
                  <span>Community guidelines</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-[#b93900]" />
                  <span>Safety note</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content (top layer) - Using Next.js Image with Custom Loader */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-20 flex justify-center lg:justify-end"
            >
              {/* Optional extra local bubbles behind the image */}
              <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
                <div className="w-80 h-80 lg:w-[32rem] lg:h-[32rem] bg-gradient-radial from-[#b93900]/20 via-dark-grey to-transparent rounded-full blur-3xl"></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-radial from-[#b93900]/10 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>
                <div
                  className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-radial from-[#b93900]/5 to-transparent rounded-full blur-2xl animate-pulse-slow"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              {/* Main Hero Image with Custom Loader */}
              <div className="relative z-20 w-full max-w-2xl">
                <Image
                  src="https://res.cloudinary.com/dk2e0vvpd/image/upload/v1755995725/monk_kipvm0.png"
                  alt="Hero Illustration"
                  width={2000}
                  height={2000}
                  priority
                  className="relative z-20 w-[2000px] lg:w-[2000px] h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Info Icon (top layer) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-8 left-8 z-20"
        >
          <div className="w-12 h-12 bg-dark-grey/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-light-grey/20">
            <span className="text-white font-bold text-lg">i</span>
          </div>
        </motion.div>
      </section>



      {/* How It Works Section - Full Height */}
      <section id="how-it-works" className="section-full relative">
        <div className="floating-shapes">
          <div className="shape-3d"></div>
          <div className="shape-3d"></div>
        </div>

        <div className="container-responsive max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="text-off-white/60 text-sm">• How Unburden Works</div>

              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                3 simple steps to connect with{' '}
                <span className="text-emphasis">supportive peers</span>
              </h2>
            </motion.div>

            {/* Right Content - Steps */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {howItWorks.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative p-6 rounded-xl border ${index === 0
                    ? 'bg-[#b93900] border-[#b93900]'
                    : 'bg-dark-grey border-light-grey/20'
                    }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${index === 0 ? 'bg-white/20' : 'bg-[#b93900]/20'
                      }`}>
                      <div className={index === 0 ? 'text-white' : 'text-[#b93900]'}>
                        {item.icon}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`text-sm font-bold ${index === 0 ? 'text-white' : 'text-[#b93900]'
                          }`}>
                          {item.step}
                        </span>
                        <h3 className={`text-xl font-bold ${index === 0 ? 'text-white' : 'text-white'
                          }`}>
                          {item.title}
                        </h3>
                      </div>

                      <p className={`${index === 0 ? 'text-white/90' : 'text-off-white/80'
                        }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Circles Section - Full Height */}
      <section className="section-full relative">
        <div className="container-responsive max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Side - Featured Circles */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="text-off-white/60 text-sm">• Featured Cove Circles</div>

              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-black text-white">
                  Join supportive communities around specific topics
                </h2>

                <p className="text-xl text-off-white/80 leading-relaxed">
                  Find your people in topic-based spaces designed for honest, judgment-free conversation.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {featuredCircles.map((circle, index) => (
                  <motion.div
                    key={circle.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card card-hover cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#b93900] transition-colors">
                        {circle.name}
                      </h3>
                      {circle.isLive && (
                        <div className="flex items-center space-x-1 bg-[#b93900]/20 text-[#b93900] px-2 py-1 rounded-full text-xs font-medium">
                          <div className="w-2 h-2 bg-[#b93900] rounded-full animate-pulse"></div>
                          <span>LIVE</span>
                        </div>
                      )}
                    </div>
                    <p className="text-off-white/80 text-sm mb-4">{circle.description}</p>
                    <div className="flex items-center justify-between text-sm text-off-white/60">
                      <span>{circle.activeCount} active members</span>
                      <span className="text-[#b93900]">{circle.mood}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href="/coves" className="btn-primary inline-flex">
                <span>View All Circles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Right Side - What You Control */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                What You Control
              </h2>

              <p className="text-xl text-off-white/80 leading-relaxed">
                Your privacy and experience are in your hands
              </p>

              <div className="space-y-6">
                {whatYouControl.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-[#b93900]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-[#b93900]">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-off-white/80">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety & Resources Section - Full Height */}
      <section className="section-full relative">
        <div className="floating-shapes">
          <div className="shape-3d"></div>
          <div className="shape-3d"></div>
        </div>

        <div className="container-responsive max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Side - Clear Boundaries */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="text-off-white/60 text-sm">• Safety & Resources</div>

              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                Clear boundaries and immediate support when you need it
              </h2>

              <div className="card">
                <h3 className="text-xl font-semibold text-white mb-4">Clear Boundaries</h3>
                <ul className="space-y-3 text-off-white/80">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#b93900] mt-0.5 flex-shrink-0" />
                    <span>Peer support only—no clinical advice</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#b93900] mt-0.5 flex-shrink-0" />
                    <span>No illegal procurement or sales</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#b93900] mt-0.5 flex-shrink-0" />
                    <span>Compassionate moderation</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right Side - Crisis Support */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-[#b93900]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-12 h-12 text-[#b93900]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Crisis Support</h3>
                <p className="text-off-white/80 mb-6">
                  If you're in crisis, use the Help button in the header for immediate support options.
                </p>
                <Link href="/resources" className="btn-primary inline-flex">
                  <span>View Resources</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 container-responsive border-t border-light-grey/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#b93900] to-[#b93900] rounded-xl flex items-center justify-center shadow-glow">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Unburden</span>
              </div>
              <p className="text-off-white/80 max-w-md mb-6">
                A privacy-first, judgment-free space for peer support around addiction and recovery.
              </p>
              <div className="bg-[#b93900] rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Get Support</h3>
                <p className="text-white/90 mb-4">
                  Join our community and find the support you need on your recovery journey.
                </p>
                <Link href="/coves" className="btn-primary">
                  <span>Join a Circle</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-white mb-6">RESOURCES</h4>
              <ul className="space-y-3 text-off-white/80">
                <li><Link href="/guidelines" className="hover:text-white transition-colors">Guidelines</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-white mb-6">SUPPORT</h4>
              <ul className="space-y-3 text-off-white/80">
                <li><Link href="/crisis" className="hover:text-white transition-colors">Crisis Help</Link></li>
                <li><Link href="/moderators" className="hover:text-white transition-colors">Moderators</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-light-grey/20 text-center">
            <p className="text-off-white/60">© 2025 Unburden. This is peer support, not therapy or medical care.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

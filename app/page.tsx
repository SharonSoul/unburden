'use client'

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
  Lock
} from 'lucide-react'
import Header from '@/components/Header'
import { seedCircles } from '@/data/seedData'

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
    <div className="min-h-screen bg-deep-navy">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 container-responsive">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-mist mb-4 sm:mb-6 leading-tight">
              Say what's hard to say—
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-seafoam to-coral">
                safely, anonymously
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-mist/80 max-w-3xl mx-auto leading-relaxed px-4">
              Join topic-based Cove Circles for honest talk about addiction and recovery. 
              You're in control of what you share and what you see.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-2xl mx-auto"
          >
            <Link href="/coves" className="btn-primary btn-lg w-full sm:w-auto">
              <span>Explore Cove Circles</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#how-it-works" className="btn-secondary btn-lg w-full sm:w-auto">
              <span>How it works</span>
            </Link>
          </motion.div>

          {/* Trust Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-mist/60"
          >
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-seafoam" />
              <span>Anonymity badge</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-seafoam" />
              <span>Community guidelines</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-seafoam" />
              <span>Safety note</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 container-responsive bg-soft-slate/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-mist mb-4">
              How Unburden Works
            </h2>
            <p className="text-lg sm:text-xl text-mist/70 max-w-2xl mx-auto px-4">
              3 simple steps to connect with supportive peers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-seafoam/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-seafoam">
                    {item.icon}
                  </div>
                </div>
                <div className="bg-mist/5 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold text-seafoam">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-mist mb-3">{item.title}</h3>
                <p className="text-mist/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Circles */}
      <section className="py-12 sm:py-16 container-responsive">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-mist mb-4">
              Featured Cove Circles
            </h2>
            <p className="text-lg sm:text-xl text-mist/70 max-w-2xl mx-auto px-4">
              Join supportive communities around specific topics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredCircles.map((circle, index) => (
              <motion.div
                key={circle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-mist group-hover:text-seafoam transition-colors">
                    {circle.name}
                  </h3>
                  {circle.isLive && (
                    <div className="flex items-center space-x-1 bg-seafoam/20 text-seafoam px-2 py-1 rounded-full text-xs font-medium">
                      <div className="w-2 h-2 bg-seafoam rounded-full animate-pulse"></div>
                      <span>LIVE</span>
                    </div>
                  )}
                </div>
                <p className="text-mist/70 text-sm mb-4">{circle.description}</p>
                <div className="flex items-center justify-between text-sm text-mist/60">
                  <span>{circle.activeCount} active members</span>
                  <span className="text-seafoam">{circle.mood}</span>
                </div>
              </motion.div>
            ))}
          </div>

                      <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-8"
            >
              <Link href="/coves" className="btn-primary inline-flex">
                <span>View All Circles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
        </div>
      </section>

      {/* What You Control */}
      <section className="py-12 sm:py-16 container-responsive bg-soft-slate/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-mist mb-4">
              What You Control
            </h2>
            <p className="text-lg sm:text-xl text-mist/70 max-w-2xl mx-auto px-4">
              Your privacy and experience are in your hands
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whatYouControl.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-coral">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-mist mb-3">{item.title}</h3>
                <p className="text-mist/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Resources */}
      <section className="py-12 sm:py-16 container-responsive">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-mist mb-4">
              Safety & Resources
            </h2>
            <p className="text-lg sm:text-xl text-mist/70 max-w-2xl mx-auto px-4">
              Clear boundaries and immediate support when you need it
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-mist/5 border border-mist/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-mist mb-4">Clear Boundaries</h3>
                <ul className="space-y-3 text-mist/70">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-seafoam mt-0.5 flex-shrink-0" />
                    <span>Peer support only—no clinical advice</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-seafoam mt-0.5 flex-shrink-0" />
                    <span>No illegal procurement or sales</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-seafoam mt-0.5 flex-shrink-0" />
                    <span>Compassionate moderation</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-coral/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-12 h-12 text-coral" />
              </div>
              <h3 className="text-xl font-semibold text-mist mb-4">Crisis Support</h3>
              <p className="text-mist/70 mb-6">
                If you're in crisis, use the Help button in the header for immediate support options.
              </p>
              <Link href="/resources" className="btn-primary inline-flex">
                <span>View Resources</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 container-responsive border-t border-mist/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-seafoam to-coral rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-mist">Unburden</span>
              </div>
              <p className="text-mist/70 max-w-md">
                A privacy-first, judgment-free space for peer support around addiction and recovery.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-mist mb-4">Resources</h4>
              <ul className="space-y-2 text-mist/70">
                <li><Link href="/guidelines" className="hover:text-mist transition-colors">Guidelines</Link></li>
                <li><Link href="/privacy" className="hover:text-mist transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-mist transition-colors">Terms</Link></li>
                <li><Link href="/resources" className="hover:text-mist transition-colors">Resources</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-mist mb-4">Support</h4>
              <ul className="space-y-2 text-mist/70">
                <li><Link href="/crisis" className="hover:text-mist transition-colors">Crisis Help</Link></li>
                <li><Link href="/moderators" className="hover:text-mist transition-colors">Moderators</Link></li>
                <li><Link href="/contact" className="hover:text-mist transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-mist/10 text-center text-mist/50 text-sm">
            <p>© 2024 Unburden. This is peer support, not therapy or medical care.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

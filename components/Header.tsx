'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Eye, 
  EyeOff, 
  HelpCircle, 
  Menu, 
  X,
  Heart,
  Users,
  BookOpen,
  Globe,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isQuickHideActive, setIsQuickHideActive] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showCrisisModal, setShowCrisisModal] = useState(false)

  const handleQuickHide = () => {
    setIsQuickHideActive(true)
    // In a real app, this would redirect to a neutral page
    setTimeout(() => setIsQuickHideActive(false), 1000)
  }

  const handleCrisisHelp = () => {
    setShowCrisisModal(true)
  }

  if (isQuickHideActive) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-charcoal z-50 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            🌤️
          </motion.div>
          <h1 className="text-2xl font-semibold text-white mb-2">Weather Report</h1>
          <p className="text-off-white/70">Partly cloudy with a chance of peace</p>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-4 right-4 z-50 transition-all duration-300"
      >
        <div className="section-container">
          <div className="glass-card-dark px-6 sm:px-8 py-3 flex items-center justify-between border border-white/5 shadow-2xl">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gradient-to-br from-aura-gold to-amber-500 rounded-xl flex items-center justify-center shadow-glow-gold relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Heart className="w-6 h-6 text-midnight" fill="currentColor" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-gradient-gold transition-all duration-300">
                  unburden
                </span>
                <div className="w-0 group-hover:w-full h-0.5 bg-aura-gold rounded-full transition-all duration-500"></div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-10">
              {[
                { name: 'Cove Circles', href: '/coves', icon: Users },
                { name: 'Journal', href: '/journal', icon: BookOpen },
                { name: 'Resources', href: '/resources', icon: Shield },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/70 hover:text-white transition-all duration-300 flex items-center space-x-2.5 font-medium group text-[15px]"
                >
                  <link.icon className="w-4 h-4 text-white/40 group-hover:text-aura-gold transition-colors duration-300" />
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-aura-gold transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Crisis Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCrisisHelp}
                className="btn-primary py-2.5 px-6 !text-sm whitespace-nowrap"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Crisis Help</span>
              </motion.button>

              {/* Quick Hide */}
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.9 }}
                onClick={handleQuickHide}
                className="btn-glass p-2.5"
                title="Quick Hide (Esc)"
              >
                <EyeOff className="w-4 h-4 text-white/70" />
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white hover:text-aura-cyan transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-light-grey/20 bg-dark-grey/80 backdrop-blur-md"
            >
              <div className="px-6 py-6 space-y-4">
                <Link 
                  href="/coves" 
                  className="block text-off-white/80 hover:text-white transition-colors py-3 border-b border-light-grey/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cove Circles
                </Link>
                <Link 
                  href="/journal" 
                  className="block text-off-white/80 hover:text-white transition-colors py-3 border-b border-light-grey/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Journal
                </Link>
                <Link 
                  href="/resources" 
                  className="block text-off-white/80 hover:text-white transition-colors py-3 border-b border-light-grey/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resources
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Crisis Modal */}
      <AnimatePresence>
        {showCrisisModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCrisisModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass-card-dark p-8 sm:p-10 max-w-md w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-20 h-20 bg-aura-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 relative"
                >
                  <div className="absolute inset-0 bg-aura-gold rounded-full animate-ping opacity-20" />
                  <HelpCircle className="w-10 h-10 text-aura-gold" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-3">You're not alone.</h2>
                <p className="text-white/60">Immediate support is available for you 24/7.</p>
              </div>

              <div className="space-y-4 mb-8">
                <button className="btn-primary w-full py-4 text-lg">
                  Get Immediate Help
                </button>
                <button className="btn-secondary w-full py-4">
                  Talk to a Peer Moderator
                </button>
                <button className="btn-glass w-full py-4 text-white/50 hover:text-white">
                  Continue Writing Separately
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowCrisisModal(false)}
                  className="text-white/40 hover:text-white transition-colors text-sm font-medium underline-offset-4 hover:underline"
                >
                  Keep Browsing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

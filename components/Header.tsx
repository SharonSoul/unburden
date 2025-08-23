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
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-light-grey/20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gradient-to-br from-orange to-orange-light rounded-xl flex items-center justify-center shadow-glow"
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-sm font-logoFont font-bold text-white">Unburden</span>
                <div className="w-8 h-1 bg-orange rounded-full"></div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/coves" 
                className="text-off-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
              >
                <Users className="w-4 h-4 group-hover:text-orange transition-colors" />
                <span>Cove Circles</span>
              </Link>
              <Link 
                href="/journal" 
                className="text-off-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
              >
                <BookOpen className="w-4 h-4 group-hover:text-orange transition-colors" />
                <span>Journal</span>
              </Link>
              <Link 
                href="/resources" 
                className="text-off-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
              >
                <Shield className="w-4 h-4 group-hover:text-orange transition-colors" />
                <span>Resources</span>
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Crisis Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCrisisHelp}
                className="bg-orange hover:bg-orange-light text-white px-4 sm:px-6 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-2 shadow-glow hover:shadow-glow"
              >
                <HelpCircle className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">Crisis Help</span>
              </motion.button>

              {/* Quick Hide */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickHide}
                className="bg-dark-grey hover:bg-medium-grey text-white px-3 py-3 rounded-lg text-sm font-medium transition-colors border border-light-grey/30 hover:border-light-grey/50 flex items-center justify-center"
                title="Press H anytime"
              >
                <Eye className="w-4 h-4" />
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white hover:text-orange transition-colors"
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-grey rounded-xl p-8 max-w-md w-full border border-light-grey/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HelpCircle className="w-10 h-10 text-orange" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">I'm sorry you're going through this</h2>
                <p className="text-off-white/70">You deserve immediate support.</p>
              </div>

              <div className="space-y-4 mb-8">
                <button className="w-full bg-orange hover:bg-orange-light text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center shadow-glow">
                  Show help options
                </button>
                <button className="w-full bg-dark-grey hover:bg-medium-grey text-white py-4 rounded-lg font-medium transition-colors border border-light-grey/30 flex items-center justify-center">
                  Keep writing privately
                </button>
                <button className="w-full bg-dark-grey hover:bg-medium-grey text-white py-4 rounded-lg font-medium transition-colors border border-light-grey/30 flex items-center justify-center">
                  Talk to a moderator
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowCrisisModal(false)}
                  className="text-off-white/60 hover:text-white transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

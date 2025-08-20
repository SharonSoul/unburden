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
  BookOpen
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
        className="fixed inset-0 bg-deep-navy z-50 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            🌤️
          </motion.div>
          <h1 className="text-2xl font-semibold text-mist mb-2">Weather Report</h1>
          <p className="text-mist/70">Partly cloudy with a chance of peace</p>
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
        className="fixed top-0 left-0 right-0 z-40 bg-deep-navy/95 backdrop-blur-md border-b border-mist/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 bg-gradient-to-br from-seafoam to-coral rounded-lg flex items-center justify-center"
              >
                <Heart className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-mist">Unburden</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/coves" 
                className="text-mist/80 hover:text-mist transition-colors flex items-center space-x-1"
              >
                <Users className="w-4 h-4" />
                <span>Cove Circles</span>
              </Link>
              <Link 
                href="/journal" 
                className="text-mist/80 hover:text-mist transition-colors flex items-center space-x-1"
              >
                <BookOpen className="w-4 h-4" />
                <span>Journal</span>
              </Link>
              <Link 
                href="/resources" 
                className="text-mist/80 hover:text-mist transition-colors flex items-center space-x-1"
              >
                <Shield className="w-4 h-4" />
                <span>Resources</span>
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Crisis Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCrisisHelp}
                className="bg-coral hover:bg-coral/90 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 min-w-0"
              >
                <HelpCircle className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">Crisis Help</span>
              </motion.button>

              {/* Quick Hide */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickHide}
                className="bg-soft-slate hover:bg-soft-slate/80 text-mist px-3 py-2 rounded-md text-sm font-medium transition-colors border border-mist/20 hover:border-mist/40 flex items-center justify-center"
                title="Press H anytime"
              >
                <Eye className="w-4 h-4" />
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-mist hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              className="md:hidden border-t border-mist/10 bg-soft-slate/50"
            >
              <div className="px-4 py-4 space-y-3">
                <Link 
                  href="/coves" 
                  className="block text-mist/80 hover:text-mist transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cove Circles
                </Link>
                <Link 
                  href="/journal" 
                  className="block text-mist/80 hover:text-mist transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Journal
                </Link>
                <Link 
                  href="/resources" 
                  className="block text-mist/80 hover:text-mist transition-colors py-2"
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
              className="bg-soft-slate rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-coral" />
                </div>
                <h2 className="text-xl font-semibold text-mist mb-2">I'm sorry you're going through this</h2>
                <p className="text-mist/70">You deserve immediate support.</p>
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full bg-coral hover:bg-coral/90 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center">
                  Show help options
                </button>
                <button className="w-full bg-soft-slate hover:bg-soft-slate/80 text-mist py-3 rounded-md font-medium transition-colors border border-mist/20 flex items-center justify-center">
                  Keep writing privately
                </button>
                <button className="w-full bg-soft-slate hover:bg-soft-slate/80 text-mist py-3 rounded-md font-medium transition-colors border border-mist/20 flex items-center justify-center">
                  Talk to a moderator
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowCrisisModal(false)}
                  className="text-mist/60 hover:text-mist transition-colors text-sm"
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

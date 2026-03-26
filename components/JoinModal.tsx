'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { generatePseudonym } from '@/lib/utils'

interface JoinModalProps {
  isOpen: boolean
  onClose: () => void
  circleName: string
}

export default function JoinModal({ isOpen, onClose, circleName }: JoinModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [pseudonym, setPseudonym] = useState(generatePseudonym())
  const [sessionType, setSessionType] = useState<'open' | 'guided' | 'share'>('open')
  const [triggerFilters, setTriggerFilters] = useState<string[]>([])
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false)

  const sessionTypes = [
    { type: 'open', name: 'Open Lounge', description: 'Drop-in text chat' },
    { type: 'guided', name: 'Guided Check-In', description: 'Structured prompts' },
    { type: 'share', name: 'Share & Support', description: 'Threaded sharing + peer responses' }
  ]

  const availableTriggerFilters = [
    'self-harm', 'substance use', 'graphic content', 'violence', 'medical advice'
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleJoin = () => {
    // In a real app, this would handle the join logic
    console.log('Joining circle with:', {
      isAnonymous,
      pseudonym,
      sessionType,
      triggerFilters,
      guidelinesAccepted
    })
    onClose()
  }

  const toggleTriggerFilter = (filter: string) => {
    setTriggerFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const resetModal = () => {
    setCurrentStep(1)
    setIsAnonymous(true)
    setPseudonym(generatePseudonym())
    setSessionType('open')
    setTriggerFilters([])
    setGuidelinesAccepted(false)
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-midnight/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="glass-card-dark max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mesh Background for Modal */}
            <div className="mesh-bg opacity-10" />

            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/5">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Join the {circleName}</h2>
                <p className="text-white/40 text-sm mt-1">Step {currentStep} of 4 • {
                  currentStep === 1 ? 'Identity' :
                  currentStep === 2 ? 'Safety' :
                  currentStep === 3 ? 'Session' : 'Review'
                }</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-8 pt-8">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 -z-10" />
                <div 
                  className="absolute top-1/2 left-0 h-0.5 bg-aura-gold transition-all duration-500 -translate-y-1/2 -z-10" 
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                />
                
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <motion.div 
                      animate={{ 
                        scale: step === currentStep ? 1.2 : 1,
                        backgroundColor: step <= currentStep ? '#fbbf24' : 'rgba(255,255,255,0.05)',
                        boxShadow: step === currentStep ? '0 0 15px rgba(251, 191, 36, 0.5)' : 'none'
                      }}
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                        ${step <= currentStep ? 'text-midnight' : 'text-white/20'}
                      `}
                    >
                      {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white">Choose your presence</h3>
                      <p className="text-white/50">Decide how you want to be seen in this circle.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                          onClick={() => setIsAnonymous(true)}
                          className={`group p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                            isAnonymous 
                              ? 'border-aura-gold bg-aura-gold/5 shadow-glow-gold' 
                              : 'border-white/5 bg-white/5 hover:border-white/10'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                             isAnonymous ? 'bg-aura-gold text-midnight' : 'bg-white/5 text-white/40'
                          }`}>
                            <Eye className="w-6 h-6" />
                          </div>
                          <span className={`block font-bold text-lg mb-1 ${isAnonymous ? 'text-white' : 'text-white/60'}`}>Fully Anonymous</span>
                          <p className="text-sm text-white/40">Visible as "Anonymous User"</p>
                        </button>
                        
                        <button
                          onClick={() => setIsAnonymous(false)}
                          className={`group p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                            !isAnonymous 
                              ? 'border-aura-gold bg-aura-gold/5 shadow-glow-gold' 
                              : 'border-white/5 bg-white/5 hover:border-white/10'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                             !isAnonymous ? 'bg-aura-gold text-midnight' : 'bg-white/5 text-white/40'
                          }`}>
                            <EyeOff className="w-6 h-6" />
                          </div>
                          <span className={`block font-bold text-lg mb-1 ${!isAnonymous ? 'text-white' : 'text-white/60'}`}>Pseudonym</span>
                          <p className="text-sm text-white/40">Visible as your chosen name</p>
                        </button>
                      </div>

                      {!isAnonymous && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 space-y-3"
                        >
                          <label className="text-sm font-medium text-white/40 ml-1">Your Pseudonym</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={pseudonym}
                              onChange={(e) => setPseudonym(e.target.value)}
                              placeholder="Enter chosen name..."
                              className="input-aura w-full pr-24"
                            />
                            <button 
                              onClick={() => setPseudonym(generatePseudonym())}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-aura-gold hover:text-white transition-colors"
                            >
                              GENERATE
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                   >
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white">Community Guidelines</h3>
                      <p className="text-white/50">We maintain a safe, peer-only space. Personal medical advice is not permitted.</p>
                      
                      <div className="glass-card bg-white/5 border-white/5 p-6 space-y-5">
                        {[
                          "Compassion first: No shaming or judgment.",
                          "Privacy: What's said here stays here.",
                          "Peer support: Share experience, not medical advice.",
                          "Safety: No illegal activity or procurement."
                        ].map((guideline, i) => (
                          <div key={i} className="flex items-start space-x-4">
                            <div className="w-6 h-6 rounded-full bg-aura-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="w-4 h-4 text-aura-gold" />
                            </div>
                            <p className="text-white/80 font-medium">{guideline}</p>
                          </div>
                        ))}
                      </div>
                      
                      <label className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-aura-gold/30 transition-all cursor-pointer group">
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                          guidelinesAccepted ? 'bg-aura-gold border-aura-gold' : 'border-white/20 group-hover:border-white/40'
                        }`}>
                          {guidelinesAccepted && <CheckCircle className="w-4 h-4 text-midnight" />}
                        </div>
                        <input
                          type="checkbox"
                          checked={guidelinesAccepted}
                          onChange={(e) => setGuidelinesAccepted(e.target.checked)}
                          className="hidden"
                        />
                        <span className="text-white/70 group-hover:text-white transition-colors font-medium">I understand and agree to these standards</span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white">Select session format</h3>
                      <p className="text-white/50">How would you like to participate today?</p>
                      
                      <div className="grid gap-4">
                        {sessionTypes.map((type) => (
                          <button
                            key={type.type}
                            onClick={() => setSessionType(type.type as any)}
                            className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 relative group overflow-hidden ${
                              sessionType === type.type 
                                ? 'border-aura-gold bg-aura-gold/5 shadow-glow-gold' 
                                : 'border-white/5 bg-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="relative z-10">
                              <h4 className={`text-lg font-bold mb-1 ${sessionType === type.type ? 'text-aura-gold' : 'text-white/80'}`}>
                                {type.name}
                              </h4>
                              <p className="text-sm text-white/40">{type.description}</p>
                            </div>
                            {sessionType === type.type && (
                              <motion.div layoutId="aura-ring" className="absolute inset-0 border border-aura-gold/20 rounded-2xl" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white text-center">Ready to enter</h3>
                      
                      <div className="glass-card-dark bg-white/5 border-white/5 p-8 rounded-3xl relative overflow-hidden group">
                        <div className="aura-glow bg-aura-gold top-0 right-0 w-32 h-32 opacity-10 blur-3xl group-hover:opacity-20 transition-opacity" />
                        
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                          <div>
                            <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Target Circle</p>
                            <p className="text-white font-bold">{circleName}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Identity</p>
                            <p className="text-white font-bold">{isAnonymous ? 'Anonymous' : pseudonym}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Format</p>
                            <p className="text-white font-bold">
                              {sessionTypes.find(t => t.type === sessionType)?.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Safety</p>
                            <p className="text-aura-gold font-bold flex items-center gap-2">
                              Verified <CheckCircle className="w-3 h-3" />
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">Content Filters (Optional)</p>
                        <div className="flex flex-wrap gap-2">
                          {availableTriggerFilters.map((filter) => (
                             <button
                               key={filter}
                               onClick={() => toggleTriggerFilter(filter)}
                               className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                                 triggerFilters.includes(filter)
                                   ? 'bg-aura-gold text-midnight border-aura-gold'
                                   : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'
                               }`}
                             >
                               {filter.toUpperCase()}
                             </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all ${
                    currentStep === 1
                      ? 'text-white/10 cursor-not-allowed'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>PREVIOUS</span>
                </button>

                {currentStep === 4 ? (
                  <button
                    onClick={handleJoin}
                    disabled={!guidelinesAccepted}
                    className="btn-primary px-10"
                  >
                    <span>ENTER CIRCLE</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && !isAnonymous && !pseudonym.trim()) ||
                      (currentStep === 2 && !guidelinesAccepted)
                    }
                    className="btn-primary px-10 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed transition-all"
                  >
                    <span>CONTINUE</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

  )
}

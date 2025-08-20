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
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-soft-slate rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-mist/10">
              <h2 className="text-xl font-semibold text-mist">Choose how you want to show up</h2>
              <button
                onClick={handleClose}
                className="text-mist/60 hover:text-mist transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4">
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${step <= currentStep 
                        ? 'bg-seafoam text-white' 
                        : 'bg-mist/20 text-mist/50'
                      }
                    `}>
                      {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`
                        w-12 h-0.5 mx-2
                        ${step < currentStep ? 'bg-seafoam' : 'bg-mist/20'}
                      `} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-mist mb-3">Anonymous Toggle</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setIsAnonymous(true)}
                            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                              isAnonymous 
                                ? 'border-seafoam bg-seafoam/10' 
                                : 'border-mist/20 hover:border-mist/40'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <Eye className="w-5 h-5" />
                              <span className="font-medium">Anonymous</span>
                            </div>
                            <p className="text-sm text-mist/70 mt-1">Others will see: Anonymous</p>
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setIsAnonymous(false)}
                            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                              !isAnonymous 
                                ? 'border-seafoam bg-seafoam/10' 
                                : 'border-mist/20 hover:border-mist/40'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <EyeOff className="w-5 h-5" />
                              <span className="font-medium">Named (Pseudonym)</span>
                            </div>
                            <div className="mt-2">
                              <input
                                type="text"
                                value={pseudonym}
                                onChange={(e) => setPseudonym(e.target.value)}
                                placeholder="Enter pseudonym"
                                className="input-field w-full text-sm"
                              />
                              <p className="text-sm text-mist/70 mt-1">Others will see: {pseudonym}</p>
                            </div>
                          </button>
                        </div>
                      </div>
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
                    <div>
                      <h3 className="text-lg font-medium text-mist mb-3">Guidelines</h3>
                      <div className="bg-mist/5 border border-mist/20 rounded-lg p-4 space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-seafoam mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-mist/80">Be kind. No shaming. No medical advice.</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-seafoam mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-mist/80">No illegal procurement or sales.</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-seafoam mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-mist/80">Use trigger warnings when needed.</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-seafoam mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-mist/80">This is peer support, not therapy.</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={guidelinesAccepted}
                            onChange={(e) => setGuidelinesAccepted(e.target.checked)}
                            className="w-4 h-4 text-seafoam border-mist/30 rounded focus:ring-seafoam/50"
                          />
                          <span className="text-sm text-mist">I understand and agree to these guidelines</span>
                        </label>
                      </div>
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
                    <div>
                      <h3 className="text-lg font-medium text-mist mb-3">Choose Session Type</h3>
                      <div className="grid gap-3">
                        {sessionTypes.map((type) => (
                          <button
                            key={type.type}
                            onClick={() => setSessionType(type.type as any)}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              sessionType === type.type 
                                ? 'border-seafoam bg-seafoam/10' 
                                : 'border-mist/20 hover:border-mist/40'
                            }`}
                          >
                            <h4 className="font-medium text-mist">{type.name}</h4>
                            <p className="text-sm text-mist/70">{type.description}</p>
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
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-mist mb-3">Trigger Filters (Optional)</h3>
                      <p className="text-sm text-mist/70 mb-4">
                        Choose content that will be automatically blurred for you
                      </p>
                      <div className="grid gap-2">
                        {availableTriggerFilters.map((filter) => (
                          <label key={filter} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={triggerFilters.includes(filter)}
                              onChange={() => toggleTriggerFilter(filter)}
                              className="w-4 h-4 text-seafoam border-mist/30 rounded focus:ring-seafoam/50"
                            />
                            <span className="text-sm text-mist capitalize">{filter}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-mist/5 border border-mist/20 rounded-lg p-4">
                      <h4 className="font-medium text-mist mb-2">Preview</h4>
                      <div className="text-sm text-mist/70 space-y-1">
                        <p>Circle: {circleName}</p>
                        <p>Display as: {isAnonymous ? 'Anonymous' : pseudonym}</p>
                        <p>Session: {sessionTypes.find(t => t.type === sessionType)?.name}</p>
                        {triggerFilters.length > 0 && (
                          <p>Filters: {triggerFilters.join(', ')}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    currentStep === 1
                      ? 'text-mist/30 cursor-not-allowed'
                      : 'text-mist/70 hover:text-mist'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                {currentStep === 4 ? (
                  <button
                    onClick={handleJoin}
                    disabled={!guidelinesAccepted}
                    className={`btn-primary ${
                      !guidelinesAccepted ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span>Enter Circle</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && !isAnonymous && !pseudonym.trim()) ||
                      (currentStep === 2 && !guidelinesAccepted)
                    }
                    className={`btn-primary ${
                      (currentStep === 1 && !isAnonymous && !pseudonym.trim()) ||
                      (currentStep === 2 && !guidelinesAccepted)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
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

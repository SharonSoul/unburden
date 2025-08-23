'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Phone, 
  BookOpen, 
  Globe, 
  AlertTriangle,
  Heart,
  Users,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import Header from '@/components/Header'
import { crisisResources } from '@/data/seedData'

export default function ResourcesPage() {
  const [selectedRegion, setSelectedRegion] = useState('US')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['crisis']))

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const currentResources = crisisResources.find(r => r.region === selectedRegion) || crisisResources[0]

  const articles = [
    {
      title: "Managing Cravings: A Practical Guide",
      description: "Learn effective strategies for dealing with urges and cravings in the moment.",
      category: "Recovery",
      readTime: "5 min read"
    },
    {
      title: "Making Amends: Steps Toward Healing",
      description: "A compassionate approach to repairing relationships and finding peace.",
      category: "Relationships",
      readTime: "7 min read"
    },
    {
      title: "How to Support a Loved One in Recovery",
      description: "Practical ways to be there for someone you care about without enabling.",
      category: "Support",
      readTime: "6 min read"
    },
    {
      title: "Building Healthy Boundaries",
      description: "Setting and maintaining limits that protect your recovery and well-being.",
      category: "Self-Care",
      readTime: "8 min read"
    },
    {
      title: "Mindfulness in Recovery",
      description: "Simple practices to stay present and reduce stress during difficult times.",
      category: "Wellness",
      readTime: "4 min read"
    },
    {
      title: "Relapse Prevention Planning",
      description: "Create a personalized plan to navigate high-risk situations.",
      category: "Recovery",
      readTime: "10 min read"
    }
  ]

  const categories = ['All', 'Recovery', 'Relationships', 'Support', 'Self-Care', 'Wellness']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  return (
    <div className="min-h-screen bg-[#000C18]">
      <Header />
      
      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 container-responsive">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-20 mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Resources & Support
            </h1>
            <p className="text-xl lg:text-2xl text-off-white/80 max-w-3xl mx-auto leading-relaxed">
              Crisis support, educational articles, and helpful resources for your recovery journey
            </p>
          </motion.div>

          {/* Crisis Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="card border-[#b93900]/20 bg-gradient-to-r from-[#b93900]/5 to-[#b93900]/10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#b93900]/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-[#b93900]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Get Urgent Help</h2>
                    <p className="text-off-white/80">Immediate support when you need it most</p>
                  </div>
                </div>
                
                <button className="btn-primary">
                  <Phone className="w-4 h-4" />
                  <span>Crisis Help</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Region Selector */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Select Your Region</h3>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="input-field w-full"
                  >
                    {crisisResources.map(resource => (
                      <option key={resource.region} value={resource.region}>
                        {resource.region}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Disclaimer */}
                <div className="bg-dark-grey/50 rounded-lg p-4 border border-light-grey/20">
                  <p className="text-sm text-off-white/80 leading-relaxed">
                    {currentResources.disclaimer}
                  </p>
                </div>
              </div>

              {/* Hotlines */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white mb-3">24/7 Crisis Hotlines</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {currentResources.hotlines.map((hotline: string, index: number) => (
                    <motion.div
                      key={hotline}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-dark-grey/50 border border-light-grey/20 rounded-lg p-4 hover:bg-dark-grey/70 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-[#b93900]" />
                        <span className="font-medium text-white">{hotline}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Educational Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-8 h-8 text-[#b93900]" />
                  <h2 className="text-2xl font-bold text-white">Educational Articles</h2>
                </div>
                <button
                  onClick={() => toggleSection('articles')}
                  className="text-off-white/60 hover:text-white transition-colors"
                >
                  {expandedSections.has('articles') ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>
              </div>

              {expandedSections.has('articles') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          selectedCategory === category
                            ? 'bg-[#b93900] text-white'
                            : 'bg-dark-grey text-off-white/80 hover:bg-medium-grey hover:text-white border border-light-grey/30'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Articles Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article, index) => (
                      <motion.div
                        key={article.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="bg-dark-grey/50 border border-light-grey/20 rounded-lg p-4 hover:bg-dark-grey/70 hover:border-light-grey/30 transition-all cursor-pointer group"
                      >
                        <div className="mb-3">
                          <span className="text-xs text-[#b93900] bg-[#b93900]/20 px-2 py-1 rounded-full">
                            {article.category}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#b93900] transition-colors">
                          {article.title}
                        </h3>
                        
                        <p className="text-off-white/80 text-sm mb-4 leading-relaxed">
                          {article.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-off-white/50">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{article.readTime}</span>
                          </span>
                          <ExternalLink className="w-4 h-4 group-hover:text-[#b93900] transition-colors" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Community Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-[#b93900]" />
                  <h2 className="text-2xl font-bold text-white">Community Guidelines</h2>
                </div>
                <button
                  onClick={() => toggleSection('guidelines')}
                  className="text-off-white/60 hover:text-white transition-colors"
                >
                  {expandedSections.has('guidelines') ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>
              </div>

              {expandedSections.has('guidelines') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">What We Do</h3>
                    <ul className="space-y-2 text-off-white/80">
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#b93900] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Provide peer support and understanding</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#b93900] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Share personal experiences and stories</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#b93900] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Offer encouragement and hope</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#b93900] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Create a safe, judgment-free space</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">What We Don't Do</h3>
                    <ul className="space-y-2 text-off-white/80">
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#b93900] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Give medical or clinical advice</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#b93900] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Diagnose or treat conditions</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#b93900] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Enable harmful behaviors</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#b93900] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Judge or shame others</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Additional Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Heart className="w-8 h-8 text-[#b93900]" />
                  <h2 className="text-2xl font-bold text-white">Additional Support</h2>
                </div>
                <button
                  onClick={() => toggleSection('support')}
                  className="text-off-white/60 hover:text-white transition-colors"
                >
                  {expandedSections.has('support') ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>
              </div>

              {expandedSections.has('support') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div className="bg-dark-grey/50 border border-light-grey/20 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Professional Help</h3>
                    <p className="text-off-white/80 text-sm mb-4">
                      While we provide peer support, professional help is often essential for recovery.
                    </p>
                    <ul className="space-y-2 text-sm text-off-white/80">
                      <li>• Licensed therapists and counselors</li>
                      <li>• Addiction specialists</li>
                      <li>• Support groups (AA, NA, SMART Recovery)</li>
                      <li>• Medical professionals</li>
                    </ul>
                  </div>
                  
                  <div className="bg-dark-grey/50 border border-light-grey/20 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Self-Care Resources</h3>
                    <p className="text-off-white/80 text-sm mb-4">
                      Tools and practices to support your mental and emotional well-being.
                    </p>
                    <ul className="space-y-2 text-sm text-off-white/80">
                      <li>• Meditation and mindfulness apps</li>
                      <li>• Exercise and movement resources</li>
                      <li>• Creative expression outlets</li>
                      <li>• Sleep and nutrition guidance</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

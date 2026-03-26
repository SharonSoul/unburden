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
  ChevronUp,
  X
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
    <div className="min-h-screen bg-midnight selection:bg-aura-gold selection:text-midnight">
      <Header />
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="mesh-bg opacity-30" />
        <div className="aura-glow bg-aura-gold -top-[10%] -left-[10%] w-[50vw] h-[50vw] opacity-10" />
        <div className="aura-glow bg-aura-cyan bottom-[10%] -right-[10%] w-[40vw] h-[40vw] opacity-5" />
      </div>

      <div className="relative z-10 pt-32 pb-20 container-responsive">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <div className="space-y-4 mb-8">
              <div className="inline-flex items-center space-x-2 text-aura-gold font-black tracking-widest text-[10px] uppercase">
                <div className="w-8 h-[1px] bg-aura-gold/30" />
                <span>SAFE HARBOR</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tight">
                Support & <br />
                <span className="text-gradient-gold">Resources.</span>
              </h1>
            </div>
            <p className="text-xl text-white/40 max-w-2xl font-medium leading-relaxed">
               Immediate crisis help, educational guidance, and community standards to keep our space safe for everyone.
            </p>
          </motion.div>

          {/* Crisis Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="glass-card-dark p-12 border-aura-gold/20 relative overflow-hidden group">
               <div className="aura-glow bg-aura-gold/10 -top-20 -right-20 w-80 h-80 opacity-20" />
               
               <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8">
                     <div className="w-16 h-16 bg-aura-gold/10 rounded-2xl flex items-center justify-center text-aura-gold">
                        <AlertTriangle className="w-8 h-8" />
                     </div>
                     <div>
                        <h2 className="text-5xl font-black text-white leading-tight mb-4">Urgent Help.</h2>
                        <p className="text-xl text-white/40 font-medium max-w-md">Peer support is powerful, but not a substitute for crisis care. Access 24/7 professional help immediately.</p>
                     </div>
                     
                     <div className="flex flex-wrap gap-4">
                        <button className="btn-primary px-10">
                           <Phone className="w-5 h-5" />
                           <span>Call Crisis Line</span>
                        </button>
                     </div>
                  </div>

                  <div className="space-y-8 p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black tracking-widest uppercase text-white/20 ml-1">Location Details</label>
                        <select
                          value={selectedRegion}
                          onChange={(e) => setSelectedRegion(e.target.value)}
                          className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-aura-gold/50 transition-all font-bold"
                        >
                          {crisisResources.map(resource => (
                            <option key={resource.region} value={resource.region} className="bg-midnight">
                              {resource.region}
                            </option>
                          ))}
                        </select>
                     </div>

                     <div className="p-6 bg-aura-gold/5 border border-aura-gold/10 rounded-2xl">
                        <p className="text-sm text-aura-gold/80 font-medium leading-relaxed">
                           {currentResources.disclaimer}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Hotlines */}
               <div className="relative z-10 mt-12 pt-12 border-t border-white/5">
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-white/20 mb-6">Verified 24/7 Hotlines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentResources.hotlines.map((hotline: string, index: number) => (
                      <motion.div
                        key={hotline}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-aura-gold/30 transition-all duration-500 group"
                      >
                        <div className="flex items-center justify-between">
                           <span className="font-bold text-white text-lg">{hotline}</span>
                           <Phone className="w-4 h-4 text-white/20 group-hover:text-aura-gold transition-colors" />
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
            className="mb-16"
          >
            <div className="glass-card p-10">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-aura-gold/10 rounded-2xl flex items-center justify-center text-aura-gold">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-white tracking-tight">Guidance.</h2>
                    <p className="text-white/40 font-medium">Expert insights and community stories.</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSection('articles')}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-colors"
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
                  className="space-y-10"
                >
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase border transition-all duration-500 ${
                          selectedCategory === category
                            ? 'bg-aura-gold border-aura-gold text-midnight'
                            : 'bg-white/5 border-white/5 text-white/30 hover:border-white/20'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Articles Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article, index) => (
                      <motion.div
                        key={article.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/[0.08] hover:border-aura-gold/30 transition-all duration-500 cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                           <div className="mb-6">
                             <span className="text-[10px] font-black text-aura-gold tracking-widest uppercase bg-aura-gold/10 px-3 py-1.5 rounded-lg">
                               {article.category}
                             </span>
                           </div>
                           
                           <h3 className="text-2xl font-black text-white mb-4 group-hover:text-aura-gold transition-colors leading-tight">
                             {article.title}
                           </h3>
                           
                           <p className="text-white/40 font-medium mb-8 leading-relaxed">
                             {article.description}
                           </p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                          <span className="flex items-center space-x-2 text-[10px] font-black tracking-widest uppercase text-white/20">
                            <Clock className="w-3 h-3" />
                            <span>{article.readTime}</span>
                          </span>
                          <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-aura-gold transition-colors" />
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
            className="mb-16"
          >
            <div className="glass-card p-10">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-aura-gold/10 rounded-2xl flex items-center justify-center text-aura-gold">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-white tracking-tight">Safeguards.</h2>
                    <p className="text-white/40 font-medium">Protecting our mutual peace.</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSection('guidelines')}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-colors"
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div className="p-8 bg-white/5 border border-white/5 rounded-3xl">
                    <h3 className="text-[10px] font-black tracking-widest uppercase text-aura-gold mb-6">What We Do</h3>
                    <ul className="space-y-4">
                      {[
                        "Provide peer support and understanding",
                        "Share personal experiences and stories",
                        "Offer encouragement and hope",
                        "Create a safe, judgment-free space"
                      ].map((item, i) => (
                         <li key={i} className="flex items-start space-x-4">
                            <div className="w-5 h-5 bg-aura-gold/10 rounded-full flex items-center justify-center text-aura-gold shrink-0 mt-0.5">
                               <Heart className="w-2.5 h-2.5 fill-aura-gold" />
                            </div>
                            <span className="text-lg text-white/60 font-medium leading-relaxed">{item}</span>
                         </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-8 bg-white/5 border border-white/5 rounded-3xl">
                    <h3 className="text-[10px] font-black tracking-widest uppercase text-red-400 mb-6">What We Don't Do</h3>
                    <ul className="space-y-4">
                      {[
                        "Give medical or clinical advice",
                        "Diagnose or treat conditions",
                        "Enable harmful behaviors",
                        "Judge or shame others"
                      ].map((item, i) => (
                         <li key={i} className="flex items-start space-x-4">
                            <div className="w-5 h-5 bg-red-400/10 rounded-full flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                               <X className="w-2.5 h-2.5" />
                            </div>
                            <span className="text-lg text-white/60 font-medium leading-relaxed">{item}</span>
                         </li>
                      ))}
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
            <div className="glass-card p-10">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-aura-gold/10 rounded-2xl flex items-center justify-center text-aura-gold">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-white tracking-tight">Expansion.</h2>
                    <p className="text-white/40 font-medium">Beyond the screen.</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSection('support')}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-colors"
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
                    <h3 className="text-[10px] font-black tracking-widest uppercase text-white/20 mb-6">Professional Help</h3>
                    <p className="text-lg text-white/40 font-medium mb-8 leading-relaxed">
                      While we provide peer support, professional help is often essential for recovery.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Licensed therapists and counselors",
                        "Addiction specialists",
                        "Support groups (AA, NA, SMART Recovery)",
                        "Medical professionals"
                      ].map((item, i) => (
                         <li key={i} className="flex items-center space-x-4 text-white/60 font-bold">
                            <div className="w-1.5 h-1.5 bg-aura-gold rounded-full" />
                            <span>{item}</span>
                         </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
                    <h3 className="text-[10px] font-black tracking-widest uppercase text-white/20 mb-6">Self-Care Resources</h3>
                    <p className="text-lg text-white/40 font-medium mb-8 leading-relaxed">
                      Tools and practices to support your mental and emotional well-being.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Meditation and mindfulness apps",
                        "Exercise and movement resources",
                        "Creative expression outlets",
                        "Sleep and nutrition guidance"
                      ].map((item, i) => (
                         <li key={i} className="flex items-center space-x-4 text-white/60 font-bold">
                            <div className="w-1.5 h-1.5 bg-aura-cyan rounded-full" />
                            <span>{item}</span>
                         </li>
                      ))}
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

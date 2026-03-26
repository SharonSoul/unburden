'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Users, Clock, Activity } from 'lucide-react'
import Header from '@/components/Header'
import CircleCard from '@/components/CircleCard'
import { seedCircles } from '@/data/seedData'

export default function CoveCirclesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showActiveOnly, setShowActiveOnly] = useState(false)
  const [sortBy, setSortBy] = useState<'name' | 'active' | 'mood'>('name')

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    seedCircles.forEach(circle => {
      circle.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // Filter and sort circles
  const filteredCircles = useMemo(() => {
    let filtered = seedCircles.filter(circle => {
      // Search query filter
      if (searchQuery && !circle.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !circle.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      // Tag filter
      if (selectedTags.length > 0 && !selectedTags.some(tag => circle.tags.includes(tag))) {
        return false
      }
      
      // Active only filter
      if (showActiveOnly && !circle.isLive) {
        return false
      }
      
      return true
    })

    // Sort circles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'active':
          return (b.activeCount || 0) - (a.activeCount || 0)
        case 'mood':
          return (a.mood || '').localeCompare(b.mood || '')
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchQuery, selectedTags, showActiveOnly, sortBy])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
    setShowActiveOnly(false)
    setSortBy('name')
  }

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
                <span>COMMUNITY SPACES</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tight">
                Explore <br />
                <span className="text-gradient-gold">Support Coves.</span>
              </h1>
            </div>
            <p className="text-xl text-white/40 max-w-2xl font-medium leading-relaxed">
              Find your supportive community. These are safe, topic-based spaces designed for honest, judgment-free conversation through addiction and recovery.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 space-y-8"
          >
            {/* Search Bar */}
            <div className="glass-card flex items-center p-2 focus-within:border-aura-gold/50 transition-all duration-500">
              <div className="pl-4 pr-2">
                <Search className="text-white/20 w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search by topic, keyword, or mood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-white/20 py-4 text-lg font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-4 text-[10px] font-black tracking-widest text-white/20 uppercase hover:text-white transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                 <button
                    onClick={() => setShowActiveOnly(!showActiveOnly)}
                    className={`px-6 py-3 rounded-xl border font-black tracking-widest text-[10px] uppercase transition-all duration-500 flex items-center gap-2 ${
                      showActiveOnly
                        ? 'bg-aura-gold border-aura-gold text-midnight'
                        : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'
                    }`}
                  >
                    <Activity className="w-3 h-3" />
                    <span>Live Only</span>
                  </button>
              </div>

              <div className="h-6 w-[1px] bg-white/10 hidden md:block" />

              <div className="flex-1 flex flex-wrap gap-2">
                {allTags.map(tag => (
                   <button
                     key={tag}
                     onClick={() => toggleTag(tag)}
                     className={`px-4 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase border transition-all duration-500 ${
                       selectedTags.includes(tag)
                         ? 'bg-aura-cyan border-aura-cyan text-midnight'
                         : 'bg-white/5 border-white/5 text-white/30 hover:border-white/20'
                     }`}
                   >
                     {tag}
                   </button>
                ))}
              </div>

              <div className="h-6 w-[1px] bg-white/10 hidden lg:block" />

              <div className="relative group">
                 <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'active' | 'mood')}
                    className="appearance-none bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-[10px] font-black tracking-widest uppercase text-white/40 focus:outline-none focus:border-aura-gold/50 cursor-pointer transition-all pr-12"
                 >
                    <option value="name">Alpha</option>
                    <option value="active">Activity</option>
                    <option value="mood">Vibe</option>
                 </select>
                 <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-white/20" />
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                    <Clock className="w-3 h-3" />
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
             <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/20">
               FOUND {filteredCircles.length} COVES
             </p>
             {(searchQuery || selectedTags.length > 0 || showActiveOnly) && (
                <button
                  onClick={clearFilters}
                  className="text-[10px] font-black tracking-[0.3em] uppercase text-aura-gold hover:text-white transition-colors"
                >
                  Reset Filters
                </button>
              )}
          </div>

          {/* Circles Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCircles.map((circle, index) => (
              <motion.div
                key={circle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CircleCard circle={circle} />
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredCircles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 glass-card-dark"
            >
              <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/5">
                <Search className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-4xl font-black text-white mb-4">No Coves Found</h3>
              <p className="text-xl text-white/40 mb-10 max-w-sm mx-auto font-medium leading-relaxed">
                We couldn't find any circles matching your current filters.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

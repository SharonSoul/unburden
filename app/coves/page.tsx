'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Users, Clock, Activity } from 'lucide-react'
import Header from '@/components/Header'
import CircleCard from '@/components/CircleCard'
import { seedCircles } from '@/data/seedData'
import { Circle } from '@/types'

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
    <div className="min-h-screen bg-charcoal">
      <Header />
      
      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 container-responsive">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-20 mb-8 sm:mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Cove Circles
            </h1>
            <p className="text-xl lg:text-2xl text-off-white/80 max-w-3xl mx-auto leading-relaxed">
              Find your supportive community. Browse topic-based spaces for addiction and recovery support.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-off-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search circles by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-grey border border-light-grey/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-off-white/50 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Active Only Toggle */}
              <button
                onClick={() => setShowActiveOnly(!showActiveOnly)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                  showActiveOnly
                    ? 'bg-orange border-orange text-white'
                    : 'bg-dark-grey border-light-grey/30 text-off-white/80 hover:border-light-grey/50'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Active now only</span>
              </button>

              {/* Tag Filters */}
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedTags.includes(tag)
                        ? 'bg-orange text-white'
                        : 'bg-dark-grey text-off-white/80 hover:bg-medium-grey hover:text-white border border-light-grey/30'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'active' | 'mood')}
                  className="appearance-none bg-dark-grey border border-light-grey/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all duration-300 pr-10"
                >
                  <option value="name">Sort by Name</option>
                  <option value="active">Sort by Activity</option>
                  <option value="mood">Sort by Mood</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-off-white/50 w-4 h-4 pointer-events-none" />
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedTags.length > 0 || showActiveOnly) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-off-white/60 hover:text-white transition-colors text-sm"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <p className="text-off-white/60">
              Showing {filteredCircles.length} of {seedCircles.length} circles
            </p>
          </motion.div>

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
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-dark-grey rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-off-white/50" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No circles found</h3>
              <p className="text-off-white/70 mb-6">
                Try adjusting your search or filters to find what you're looking for.
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

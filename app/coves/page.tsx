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
    <div className="min-h-screen bg-deep-navy">
      <Header />
      
      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 container-responsive">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-mist mb-4">
              Cove Circles
            </h1>
            <p className="text-lg sm:text-xl text-mist/70 max-w-2xl mx-auto px-4">
              Find your supportive community. Browse topic-based spaces for addiction and recovery support.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-soft-slate rounded-lg p-6 border border-mist/10">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mist/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search circles by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field w-full pl-10"
                />
              </div>

              {/* Filters Row */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-mist/60" />
                  <span className="text-sm font-medium text-mist">Filters:</span>
                </div>
                
                {/* Active Only Toggle */}
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showActiveOnly}
                    onChange={(e) => setShowActiveOnly(e.target.checked)}
                    className="w-4 h-4 text-seafoam border-mist/30 rounded focus:ring-seafoam/50"
                  />
                  <span className="text-sm text-mist">Active now only</span>
                </label>

                {/* Sort Dropdown */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-mist/60">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="input-field text-sm py-2 px-3"
                  >
                    <option value="name">Name</option>
                    <option value="active">Most Active</option>
                    <option value="mood">Mood</option>
                  </select>
                </div>

                {/* Clear Filters */}
                {(searchQuery || selectedTags.length > 0 || showActiveOnly) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-mist/60 hover:text-mist transition-colors underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              {/* Tag Filters */}
              <div>
                <p className="text-sm font-medium text-mist mb-3">Filter by topics:</p>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-seafoam text-white'
                          : 'bg-mist/10 text-mist/70 hover:bg-mist/20 hover:text-mist'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <p className="text-mist/70">
                Showing {filteredCircles.length} of {seedCircles.length} circles
              </p>
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-6 text-sm text-mist/60">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{seedCircles.reduce((sum, circle) => sum + (circle.activeCount || 0), 0)} total active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>{seedCircles.filter(c => c.isLive).length} live now</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Circles Grid */}
          {filteredCircles.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {filteredCircles.map((circle, index) => (
                <CircleCard key={circle.id} circle={circle} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-mist/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-mist/40" />
              </div>
              <h3 className="text-xl font-semibold text-mist mb-2">No circles found</h3>
              <p className="text-mist/70 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="btn-secondary"
              >
                Clear all filters
              </button>
            </motion.div>
          )}

          {/* Empty State (when no circles exist) */}
          {seedCircles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-mist/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-mist/40" />
              </div>
              <h3 className="text-xl font-semibold text-mist mb-2">It's quiet here</h3>
              <p className="text-mist/70 mb-6">
                Leave a note—someone will see it. Cove Circles are being set up.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

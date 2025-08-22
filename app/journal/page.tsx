'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  BookOpen, 
  Calendar,
  Search,
  Filter,
  Save,
  X,
  Lightbulb,
  FileText,
  Clock
} from 'lucide-react'
import Header from '@/components/Header'
import { JournalEntry } from '@/types'

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [showNewEntry, setShowNewEntry] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'recent' | 'linked'>('all')
  const [newEntryTitle, setNewEntryTitle] = useState('')
  const [newEntryBody, setNewEntryBody] = useState('')
  const [showCloudSync, setShowCloudSync] = useState(false)

  // Quick prompts for journaling
  const quickPrompts = [
    "What felt true for you today?",
    "What's one small win you're celebrating?",
    "What's challenging you right now?",
    "What are you grateful for today?",
    "What's your next best step?",
    "How are you feeling about your progress?",
    "What support do you need right now?",
    "What did you learn about yourself today?"
  ]

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('journal-entries')
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries))
      } catch (error) {
        console.error('Error loading journal entries:', error)
      }
    }
  }, [])

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('journal-entries', JSON.stringify(entries))
  }, [entries])

  const addEntry = () => {
    if (!newEntryBody.trim()) return

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntryTitle.trim() || undefined,
      body: newEntryBody.trim(),
      createdAt: new Date().toISOString(),
      linksToSession: []
    }

    setEntries(prev => [newEntry, ...prev])
    setNewEntryTitle('')
    setNewEntryBody('')
    setShowNewEntry(false)
  }

  const updateEntry = () => {
    if (!editingEntry || !editingEntry.body.trim()) return

    setEntries(prev => 
      prev.map(entry => 
        entry.id === editingEntry.id ? editingEntry : entry
      )
    )
    setEditingEntry(null)
  }

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }

  const usePrompt = (prompt: string) => {
    setNewEntryBody(prompt)
    setShowNewEntry(true)
  }

  const exportJournal = () => {
    const content = entries.map(entry => {
      const date = new Date(entry.createdAt).toLocaleDateString()
      const title = entry.title ? `# ${entry.title}\n\n` : ''
      return `${title}${entry.body}\n\n--- ${date} ---\n\n`
    }).join('')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `journal-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredEntries = entries.filter(entry => {
    // Search filter
    if (searchQuery && !entry.body.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !(entry.title && entry.title.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false
    }
    
    // Type filter
    switch (selectedFilter) {
      case 'recent':
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return new Date(entry.createdAt) > weekAgo
      case 'linked':
        return entry.linksToSession && entry.linksToSession.length > 0
      default:
        return true
    }
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
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
            className="text-center mt-20 mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Your Journal
            </h1>
            <p className="text-xl lg:text-2xl text-off-white/80 max-w-3xl mx-auto leading-relaxed">
              Private reflections, local-first notes, and your recovery journey
            </p>
          </motion.div>

          {/* Cloud Sync Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="card border-orange/20 bg-gradient-to-r from-orange/5 to-orange/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-orange" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Want to keep your journal across devices?</p>
                    <p className="text-sm text-off-white/70">Create an account to sync your entries</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCloudSync(true)}
                  className="btn-primary btn-sm"
                >
                  <span>Sign Up</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-off-white/50 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search your journal..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>

                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value as any)}
                  className="input-field"
                >
                  <option value="all">All entries</option>
                  <option value="recent">Recent (7 days)</option>
                  <option value="linked">Linked to sessions</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={exportJournal}
                  className="btn-secondary"
                  disabled={entries.length === 0}
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowNewEntry(true)}
                  className="btn-primary"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Entry</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Quick Prompts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-orange" />
              <span>Quick Prompts</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {quickPrompts.map((prompt, index) => (
                <motion.button
                  key={prompt}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  onClick={() => usePrompt(prompt)}
                  className="text-left p-3 bg-dark-grey border border-light-grey/20 rounded-lg hover:bg-medium-grey hover:border-light-grey/30 transition-all text-sm text-off-white/80 hover:text-white"
                >
                  {prompt}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Journal Entries */}
          <div className="space-y-6">
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="card group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {entry.title && (
                        <h3 className="text-lg font-semibold text-white mb-2">{entry.title}</h3>
                      )}
                      <p className="text-off-white/80 whitespace-pre-wrap leading-relaxed">
                        {entry.body}
                      </p>
                    </div>
                    
                    {/* Entry Actions */}
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditingEntry(entry)}
                        className="p-2 text-off-white/60 hover:text-white hover:bg-dark-grey/50 rounded transition-colors"
                        title="Edit entry"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="p-2 text-off-white/60 hover:text-orange hover:bg-orange/10 rounded transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-off-white/50">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(entry.createdAt)}</span>
                    </div>
                    
                    {entry.linksToSession && entry.linksToSession.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>Linked to session</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center py-16"
              >
                <BookOpen className="w-24 h-24 text-off-white/30 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-white mb-2">It's quiet here</h3>
                <p className="text-off-white/70 mb-6">
                  {entries.length === 0 
                    ? "Start your journaling journey with your first entry."
                    : "No entries match your current search or filters."
                  }
                </p>
                <button
                  onClick={() => setShowNewEntry(true)}
                  className="btn-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Write Your First Entry
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* New Entry Modal */}
      <AnimatePresence>
        {showNewEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewEntry(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-dark-grey rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-light-grey/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">New Journal Entry</h2>
                  <button
                    onClick={() => setShowNewEntry(false)}
                    className="text-off-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Title (optional)
                    </label>
                    <input
                      type="text"
                      value={newEntryTitle}
                      onChange={(e) => setNewEntryTitle(e.target.value)}
                      placeholder="Give your entry a title..."
                      className="input-field w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Entry
                    </label>
                    <textarea
                      value={newEntryBody}
                      onChange={(e) => setNewEntryBody(e.target.value)}
                      placeholder="What's on your mind today?"
                      rows={8}
                      className="input-field w-full resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 mt-8">
                  <button
                    onClick={() => setShowNewEntry(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addEntry}
                    disabled={!newEntryBody.trim()}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Entry</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Entry Modal */}
      <AnimatePresence>
        {editingEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setEditingEntry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-dark-grey rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-light-grey/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Edit Entry</h2>
                  <button
                    onClick={() => setEditingEntry(null)}
                    className="text-off-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Title (optional)
                    </label>
                    <input
                      type="text"
                      value={editingEntry.title || ''}
                      onChange={(e) => setEditingEntry({ ...editingEntry, title: e.target.value })}
                      placeholder="Give your entry a title..."
                      className="input-field w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Entry
                    </label>
                    <textarea
                      value={editingEntry.body}
                      onChange={(e) => setEditingEntry({ ...editingEntry, body: e.target.value })}
                      placeholder="What's on your mind today?"
                      rows={8}
                      className="input-field w-full resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 mt-8">
                  <button
                    onClick={() => setEditingEntry(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateEntry}
                    disabled={!editingEntry.body.trim()}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Update Entry</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cloud Sync Modal */}
      <AnimatePresence>
        {showCloudSync && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCloudSync(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-dark-grey rounded-xl max-w-md w-full border border-light-grey/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 text-center">
                <BookOpen className="w-16 h-16 text-orange mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">Sync Your Journal</h2>
                <p className="text-off-white/80 mb-6">
                  Create an account to sync your journal entries across devices and never lose your progress.
                </p>
                <div className="space-y-3">
                  <button className="btn-primary w-full">
                    Create Account
                  </button>
                  <button
                    onClick={() => setShowCloudSync(false)}
                    className="btn-secondary w-full"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

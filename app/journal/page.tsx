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
  Clock,
  ArrowRight
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
                <span>SAFE SPACE</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tight">
                Your <br />
                <span className="text-gradient-gold">Private Reflections.</span>
              </h1>
            </div>
            <p className="text-xl text-white/40 max-w-2xl font-medium leading-relaxed">
              Private, local-first notes where you can be completely honest. Your words stay on your device unless you choose to sync them.
            </p>
          </motion.div>

          {/* Cloud Sync Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="glass-card p-8 border-aura-gold/20 relative overflow-hidden group">
               <div className="aura-glow bg-aura-gold/10 -top-20 -right-20 w-80 h-80 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-aura-gold/10 rounded-2xl flex items-center justify-center text-aura-gold">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-1">Keep your journal across devices?</h3>
                    <p className="text-white/40 font-medium">Create an account to securely sync your entries using end-to-end encryption.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCloudSync(true)}
                  className="btn-primary"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 w-full">
                <div className="glass-card flex-1 flex items-center p-1 w-full group focus-within:border-aura-gold/30 transition-all">
                  <div className="pl-4 pr-2">
                    <Search className="text-white/20 w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search your journal..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-white/20 py-3 font-medium"
                  />
                </div>

                <div className="relative w-full sm:w-auto">
                   <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value as any)}
                      className="appearance-none bg-white/5 border border-white/10 rounded-xl px-10 py-4 text-[10px] font-black tracking-widest uppercase text-white/40 focus:outline-none focus:border-aura-gold/50 cursor-pointer transition-all w-full sm:w-60 pr-12"
                   >
                     <option value="all">All entries</option>
                     <option value="recent">Recent (7 days)</option>
                     <option value="linked">Linked to sessions</option>
                   </select>
                   <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-white/20" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={exportJournal}
                  className="btn-secondary flex-1 md:flex-none py-4 px-8"
                  disabled={entries.length === 0}
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowNewEntry(true)}
                  className="btn-primary flex-1 md:flex-none py-4 px-8"
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
            className="mb-16"
          >
            <div className="flex items-center space-x-3 mb-8">
               <div className="w-8 h-8 rounded-lg bg-aura-gold/10 flex items-center justify-center text-aura-gold">
                  <Lightbulb className="w-4 h-4" />
               </div>
               <h3 className="text-sm font-black text-white tracking-[0.2em] uppercase">Daily Inspiration</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickPrompts.map((prompt, index) => (
                <motion.button
                  key={prompt}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  onClick={() => usePrompt(prompt)}
                  className="text-left p-6 glass-card-dark bg-white/[0.02] hover:bg-white/5 hover:border-aura-gold/30 transition-all duration-500 group"
                >
                  <p className="text-sm font-medium text-white/40 group-hover:text-white leading-relaxed">{prompt}</p>
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
                  className="glass-card hover:border-aura-gold/30 transition-all duration-500 group p-8"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex-1">
                      {entry.title && (
                        <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{entry.title}</h3>
                      )}
                      <p className="text-lg text-white/40 font-medium whitespace-pre-wrap leading-relaxed">
                        {entry.body}
                      </p>
                    </div>
                    
                    {/* Entry Actions */}
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditingEntry(entry)}
                        className="p-3 bg-white/5 hover:bg-aura-gold hover:text-midnight text-white/40 rounded-xl transition-all duration-500"
                        title="Edit entry"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/40 rounded-xl transition-all duration-500"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] font-black tracking-widest uppercase py-4 border-t border-white/5">
                    <div className="flex items-center space-x-2 text-white/20">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(entry.createdAt)}</span>
                    </div>
                    
                    {entry.linksToSession && entry.linksToSession.length > 0 && (
                      <div className="flex items-center space-x-2 text-aura-cyan">
                        <FileText className="w-3 h-3" />
                        <span>SESSION LINKED</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-center py-32 glass-card-dark bg-white/[0.02]"
              >
                <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/5">
                   <BookOpen className="w-10 h-10 text-white/20" />
                </div>
                <h3 className="text-4xl font-black text-white mb-4">Silence is okay.</h3>
                <p className="text-xl text-white/40 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                  {entries.length === 0 
                    ? "Your journey of honest reflection starts here."
                    : "No reflections match your current search criteria."
                  }
                </p>
                <button
                  onClick={() => setShowNewEntry(true)}
                  className="btn-primary"
                >
                  <Plus className="w-5 h-5" />
                  <span>Start Reflecting</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* New Entry Modal */}
      <AnimatePresence>
        {showNewEntry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-midnight/80 backdrop-blur-xl"
              onClick={() => setShowNewEntry(false)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto border-aura-gold/20 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-aura-gold tracking-widest uppercase">WRITE</span>
                    <h2 className="text-4xl font-black text-white">New Entry</h2>
                  </div>
                  <button
                    onClick={() => setShowNewEntry(false)}
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/20 tracking-widest uppercase ml-1">
                      Title (optional)
                    </label>
                    <input
                      type="text"
                      value={newEntryTitle}
                      onChange={(e) => setNewEntryTitle(e.target.value)}
                      placeholder="Title your reflection..."
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-aura-gold/50 transition-all font-bold text-lg"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/20 tracking-widest uppercase ml-1">
                      Reflection
                    </label>
                    <textarea
                      value={newEntryBody}
                      onChange={(e) => setNewEntryBody(e.target.value)}
                      placeholder="What's on your mind? Be completely honest..."
                      rows={10}
                      className="w-full bg-white/5 border border-white/5 rounded-3xl px-6 py-6 text-white placeholder-white/20 focus:outline-none focus:border-aura-gold/50 transition-all font-medium text-lg leading-relaxed resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 mt-12">
                  <button
                    onClick={() => setShowNewEntry(false)}
                    className="px-8 py-4 text-[10px] font-black text-white/20 tracking-widest uppercase hover:text-white transition-colors"
                  >
                    Discard
                  </button>
                  <button
                    onClick={addEntry}
                    disabled={!newEntryBody.trim()}
                    className="btn-primary"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Reflection</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Entry Modal */}
      <AnimatePresence>
        {editingEntry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-midnight/80 backdrop-blur-xl"
              onClick={() => setEditingEntry(null)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto border-aura-gold/20 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-aura-gold tracking-widest uppercase">EDIT</span>
                    <h2 className="text-4xl font-black text-white">Update Entry</h2>
                  </div>
                  <button
                    onClick={() => setEditingEntry(null)}
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/20 tracking-widest uppercase ml-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingEntry.title || ''}
                      onChange={(e) => setEditingEntry({ ...editingEntry, title: e.target.value })}
                      placeholder="Title your reflection..."
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-aura-gold/50 transition-all font-bold text-lg"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/20 tracking-widest uppercase ml-1">
                      Reflection
                    </label>
                    <textarea
                      value={editingEntry.body}
                      onChange={(e) => setEditingEntry({ ...editingEntry, body: e.target.value })}
                      placeholder="Be completely honest..."
                      rows={10}
                      className="w-full bg-white/5 border border-white/5 rounded-3xl px-6 py-6 text-white placeholder-white/20 focus:outline-none focus:border-aura-gold/50 transition-all font-medium text-lg leading-relaxed resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 mt-12">
                  <button
                    onClick={() => setEditingEntry(null)}
                    className="px-8 py-4 text-[10px] font-black text-white/20 tracking-widest uppercase hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateEntry}
                    disabled={!editingEntry.body.trim()}
                    className="btn-primary"
                  >
                    <Save className="w-5 h-5" />
                    <span>Update Reflection</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cloud Sync Modal */}
      <AnimatePresence>
        {showCloudSync && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-midnight/80 backdrop-blur-xl"
              onClick={() => setShowCloudSync(false)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card max-w-md w-full border-aura-gold/20 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-aura-gold/10 rounded-3xl flex items-center justify-center text-aura-gold mx-auto mb-8">
                  <BookOpen className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4">Sync Your Journal</h2>
                <p className="text-lg text-white/40 font-medium mb-10 leading-relaxed">
                  Join Unburden Cloud to securely sync your private reflections across all your devices.
                </p>
                <div className="space-y-4">
                  <button className="btn-primary w-full">
                    <span>Create Safe Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowCloudSync(false)}
                    className="w-full py-4 text-[10px] font-black text-white/20 tracking-widest uppercase hover:text-white transition-colors"
                  >
                    Decide Later
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Clock, 
  Tag, 
  Calendar, 
  MessageCircle, 
  Shield,
  Activity,
  ArrowLeft,
  Plus,
  Star
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import JoinModal from '@/components/JoinModal'
import { seedCircles } from '@/data/seedData'
import { formatTime, getDayOfWeek, getMoodColor, getMoodIcon } from '@/lib/utils'

interface CircleDetailPageProps {
  params: {
    slug: string
  }
}

export default function CircleDetailPage({ params }: CircleDetailPageProps) {
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showCreateRequest, setShowCreateRequest] = useState(false)

  const circle = seedCircles.find(c => c.slug === params.slug)

  if (!circle) {
    notFound()
  }

  const nextSessions = circle.schedule.filter(s => 
    s.dow.includes(new Date().getDay())
  )

  const upcomingSessions = circle.schedule
    .filter(s => s.dow.some(day => day >= new Date().getDay()))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-deep-navy">
      <Header />
      
      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 container-responsive">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link 
              href="/coves" 
              className="inline-flex items-center space-x-2 text-mist/70 hover:text-mist transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Cove Circles</span>
            </Link>
          </motion.div>

          {/* Circle Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 sm:mb-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 sm:gap-8">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist">
                    {circle.name}
                  </h1>
                  {circle.isLive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center space-x-1 bg-seafoam/20 text-seafoam px-3 py-1 rounded-full text-sm font-medium self-start sm:self-center"
                    >
                      <div className="w-2 h-2 bg-seafoam rounded-full animate-pulse"></div>
                      <span>LIVE NOW</span>
                    </motion.div>
                  )}
                </div>
                
                <p className="text-lg sm:text-xl text-mist/80 mb-6 leading-relaxed">
                  {circle.description}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-mist/60">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{circle.activeCount} active members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span className={getMoodColor(circle.mood || 'calm')}>
                      {getMoodIcon(circle.mood || 'calm')} {circle.mood}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Peak: {circle.peakHours.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 lg:flex-col">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowJoinModal(true)}
                  className="btn-primary btn-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Join Circle</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreateRequest(true)}
                  className="btn-secondary btn-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Request</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column - About & Schedule */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card"
              >
                <h2 className="text-2xl font-semibold text-mist mb-4">About This Circle</h2>
                <p className="text-mist/80 mb-6 leading-relaxed">
                  This is a supportive space for people dealing with {circle.name.toLowerCase()}. 
                  Share your experiences, challenges, and victories in a judgment-free environment. 
                  Remember, this is peer support—we're here to listen and encourage each other.
                </p>
                
                {/* Tags */}
                <div>
                  <h3 className="text-lg font-medium text-mist mb-3">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {circle.tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="bg-mist/10 text-mist/70 px-3 py-1 rounded-full text-sm font-medium border border-mist/20"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Schedule Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card"
              >
                <h2 className="text-2xl font-semibold text-mist mb-4">Schedule</h2>
                
                {/* Next Sessions */}
                {nextSessions.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-mist mb-3">Today's Sessions</h3>
                    <div className="space-y-3">
                      {nextSessions.map((session, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="bg-mist/5 border border-mist/20 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-seafoam/20 rounded-full flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-seafoam" />
                              </div>
                              <div>
                                <p className="font-medium text-mist">{session.type.charAt(0).toUpperCase() + session.type.slice(1)} Session</p>
                                <p className="text-sm text-mist/60">{formatTime(session.time)}</p>
                              </div>
                            </div>
                            <div className="text-xs text-mist/50 bg-soft-slate px-2 py-1 rounded">
                              {session.type}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upcoming Sessions */}
                <div>
                  <h3 className="text-lg font-medium text-mist mb-3">Upcoming This Week</h3>
                  <div className="space-y-3">
                    {upcomingSessions.map((session, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-mist/5 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-mist/60" />
                          <span className="text-mist">
                            {getDayOfWeek(session.dow[0])} at {formatTime(session.time)}
                          </span>
                        </div>
                        <span className="text-xs text-mist/50 bg-soft-slate px-2 py-1 rounded">
                          {session.type}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Live Threads / Active Sessions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="card"
              >
                <h2 className="text-2xl font-semibold text-mist mb-4">Live Threads</h2>
                
                {circle.isLive ? (
                  <div className="space-y-4">
                    <div className="bg-seafoam/10 border border-seafoam/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-seafoam rounded-full animate-pulse"></div>
                        <span className="text-seafoam font-medium">Currently Active</span>
                      </div>
                      <p className="text-mist/80">
                        There's an active session happening right now. Join in to connect with others.
                      </p>
                    </div>
                    
                    <button className="btn-primary w-full">
                      <MessageCircle className="w-4 h-4" />
                      <span>Join Active Session</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="w-16 h-16 text-mist/30 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-mist mb-2">No active sessions</h3>
                    <p className="text-mist/70 mb-4">
                      Check the schedule above for upcoming sessions, or start a new thread.
                    </p>
                    <button className="btn-secondary">
                      <Plus className="w-4 h-4" />
                      <span>Start New Thread</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Column - Moderators & Guidelines */}
            <div className="space-y-6">
              {/* Moderators */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-mist mb-4">Moderators</h3>
                <div className="space-y-3">
                  {circle.moderators.map((mod, index) => (
                    <motion.div
                      key={mod}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-mist/5 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-seafoam/20 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-seafoam" />
                      </div>
                      <div>
                        <p className="font-medium text-mist">{mod}</p>
                        <p className="text-xs text-mist/60">Trained moderator</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Circle Guidelines */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-mist mb-4">Circle Guidelines</h3>
                <div className="space-y-3 text-sm text-mist/70">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-seafoam rounded-full mt-2 flex-shrink-0"></div>
                    <span>Be kind and supportive to others</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-seafoam rounded-full mt-2 flex-shrink-0"></div>
                    <span>Share your own experiences, not advice</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-seafoam rounded-full mt-2 flex-shrink-0"></div>
                    <span>Use trigger warnings when needed</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-seafoam rounded-full mt-2 flex-shrink-0"></div>
                    <span>Respect everyone's privacy and anonymity</span>
                  </div>
                </div>
              </motion.div>

              {/* Room Mood */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-mist mb-4">Room Mood</h3>
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl ${getMoodColor(circle.mood || 'calm')}`}>
                    {getMoodIcon(circle.mood || 'calm')}
                  </div>
                  <p className="text-lg font-medium text-mist capitalize">{circle.mood}</p>
                  <p className="text-sm text-mist/60 mt-1">
                    Based on community activity and tone
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Modal */}
      <JoinModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        circleName={circle.name}
      />

      {/* Create Request Modal (placeholder) */}
      {showCreateRequest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowCreateRequest(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-soft-slate rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-mist mb-4">Create Request</h3>
            <p className="text-mist/70 mb-6">
              This feature allows you to suggest new topics or sessions for this circle.
            </p>
            <button
              onClick={() => setShowCreateRequest(false)}
              className="btn-primary w-full"
            >
              <span>Coming Soon</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

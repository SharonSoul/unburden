'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Clock, Tag, Activity, ArrowRight } from 'lucide-react'
import { Circle } from '@/types'
import { formatTime, getDayOfWeek, getMoodColor, getMoodIcon } from '@/lib/utils'

interface CircleCardProps {
  circle: Circle
}

export default function CircleCard({ circle }: CircleCardProps) {
  const nextSession = circle.schedule.find(s => 
    s.dow.includes(new Date().getDay())
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <Link href={`/coves/${circle.slug}`}>
        <div className="card card-hover h-full cursor-pointer">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#b93900] transition-colors">
                {circle.name}
              </h3>
              <p className="text-off-white/80 text-sm leading-relaxed">
                {circle.description}
              </p>
            </div>
            
            {/* Live Indicator */}
            {circle.isLive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-1 bg-[#b93900]/20 text-[#b93900] px-3 py-1 rounded-full text-xs font-semibold border border-[#b93900]/30"
              >
                <div className="w-2 h-2 bg-[#b93900] rounded-full animate-pulse mr-1"></div>
                <span>LIVE</span>
              </motion.div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {circle.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + tagIndex * 0.1 }}
                className="bg-dark-grey text-off-white/70 px-2 py-1 rounded-lg text-xs font-medium border border-light-grey/30"
              >
                {tag}
              </motion.span>
            ))}
            {circle.tags.length > 3 && (
              <span className="text-off-white/50 text-xs px-2 py-1">
                +{circle.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-off-white/60" />
              <span className="text-off-white/80">{circle.activeCount} active</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-[#b93900] font-medium">{circle.mood}</span>
            </div>
          </div>

          {/* Next Session */}
          {nextSession && (
            <div className="bg-dark-grey/50 border border-light-grey/20 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-off-white/60" />
                  <div>
                    <p className="text-xs text-off-white/50 uppercase tracking-wide">
                      Next {nextSession.type} session
                    </p>
                    <p className="text-sm text-white font-medium">
                      {getDayOfWeek(nextSession.dow[0])} at {formatTime(nextSession.time)}
                    </p>
                  </div>
                </div>
                
                <div className="text-xs text-off-white/50 bg-dark-grey px-2 py-1 rounded">
                  {nextSession.type}
                </div>
              </div>
            </div>
          )}

          {/* Peak Hours */}
          <div className="pt-4 border-t border-light-grey/20">
            <div className="flex items-center space-x-2 text-xs text-off-white/50">
              <Clock className="w-3 h-3" />
              <span>Peak: {circle.peakHours.join(', ')}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

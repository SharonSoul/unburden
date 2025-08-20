'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Clock, Tag, Activity } from 'lucide-react'
import { Circle } from '@/types'
import { formatTime, getDayOfWeek, getMoodColor, getMoodIcon } from '@/lib/utils'

interface CircleCardProps {
  circle: Circle
  index: number
}

export default function CircleCard({ circle, index }: CircleCardProps) {
  const nextSession = circle.schedule.find(s => 
    s.dow.includes(new Date().getDay())
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <Link href={`/coves/${circle.slug}`}>
        <div className="card h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-mist/30">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-mist mb-2 group-hover:text-seafoam transition-colors">
                {circle.name}
              </h3>
              <p className="text-mist/70 text-sm leading-relaxed">
                {circle.description}
              </p>
            </div>
            
            {/* Live Indicator */}
            {circle.isLive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-1 bg-seafoam/20 text-seafoam px-2 py-1 rounded-full text-xs font-medium"
              >
                <div className="w-2 h-2 bg-seafoam rounded-full animate-pulse"></div>
                <span>LIVE</span>
              </motion.div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
            {circle.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + tagIndex * 0.1 }}
                className="bg-mist/10 text-mist/70 px-2 py-1 rounded-md text-xs font-medium border border-mist/20"
              >
                {tag}
              </motion.span>
            ))}
            {circle.tags.length > 3 && (
              <span className="text-mist/50 text-xs px-2 py-1">
                +{circle.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between text-sm text-mist/60 mb-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{circle.activeCount} active</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Activity className="w-4 h-4" />
              <span className={getMoodColor(circle.mood || 'calm')}>
                {getMoodIcon(circle.mood || 'calm')} {circle.mood}
              </span>
            </div>
          </div>

          {/* Next Session */}
          {nextSession && (
            <div className="bg-mist/5 border border-mist/10 rounded-md p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-mist/60" />
                  <div>
                    <p className="text-xs text-mist/50 uppercase tracking-wide">
                      Next {nextSession.type} session
                    </p>
                    <p className="text-sm text-mist font-medium">
                      {getDayOfWeek(nextSession.dow[0])} at {formatTime(nextSession.time)}
                    </p>
                  </div>
                </div>
                
                <div className="text-xs text-mist/50 bg-soft-slate px-2 py-1 rounded">
                  {nextSession.type}
                </div>
              </div>
            </div>
          )}

          {/* Peak Hours */}
          <div className="mt-4 pt-3 border-t border-mist/10">
            <div className="flex items-center space-x-2 text-xs text-mist/50">
              <Clock className="w-3 h-3" />
              <span>Peak: {circle.peakHours.join(', ')}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

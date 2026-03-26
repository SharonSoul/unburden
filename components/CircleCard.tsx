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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="group relative h-full"
    >
      <Link href={`/coves/${circle.slug}`}>
        <div className="glass-card h-full p-8 flex flex-col transition-all duration-500 hover:border-aura-gold/30 hover:shadow-glow-gold/20 relative overflow-hidden">
          {/* Subtle Aura Glow behind card */}
          <div className="aura-glow bg-aura-gold/5 -top-10 -right-10 w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h3 className="text-xl font-black text-white group-hover:text-aura-gold transition-colors duration-300 leading-tight">
                {circle.name}
              </h3>
            </div>
            
            {/* Live Indicator */}
            {circle.isLive && (
              <motion.div
                animate={{ boxShadow: ['0 0 0px rgba(251, 191, 36, 0)', '0 0 10px rgba(251, 191, 36, 0.4)', '0 0 0px rgba(251, 191, 36, 0)'] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center space-x-1.5 bg-aura-gold text-midnight px-3 py-1 rounded-full text-[10px] font-black tracking-widest border border-white/20"
              >
                <div className="w-1.5 h-1.5 bg-midnight rounded-full animate-pulse"></div>
                <span>LIVE</span>
              </motion.div>
            )}
          </div>

          <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">
            {circle.description}
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-between text-xs font-bold tracking-wider text-white/40 mb-6 py-4 border-t border-b border-white/5">
            <div className="flex items-center space-x-2">
              <Users className="w-3.5 h-3.5 text-aura-gold" />
              <span>{(circle.activeCount || 0).toLocaleString()} MEMBERS</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Activity className="w-3.5 h-3.5 text-aura-cyan" />
              <span className="text-aura-gold">{(circle.mood || 'CALM').toUpperCase()}</span>
            </div>
          </div>

          {/* Next Session */}
          {nextSession && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 group-hover:bg-white/10 transition-colors duration-300">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 rounded-xl bg-midnight flex items-center justify-center border border-white/5">
                   <Clock className="w-5 h-5 text-aura-gold" />
                 </div>
                 <div>
                   <p className="text-[10px] font-black text-white/30 tracking-widest uppercase">Next {nextSession.type} Session</p>
                   <p className="text-sm text-white font-bold">
                     {getDayOfWeek(nextSession.dow[0])} @ {formatTime(nextSession.time)}
                   </p>
                 </div>
               </div>
            </div>
          )}

          {/* Footer - Peak Hours */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[10px] font-bold text-white/20 tracking-widest">
              <Tag className="w-3 h-3" />
              <span>PEAK: {circle.peakHours.join(', ')}</span>
            </div>
            <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-aura-gold group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>

  )
}

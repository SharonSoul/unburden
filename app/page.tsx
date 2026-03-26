'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Shield,
  Users,
  Heart,
  Eye,
  Clock,
  ArrowRight,
  MessageCircle,
  Lock,
  Activity
} from 'lucide-react'
import Header from '@/components/Header'
import CircleCard from '@/components/CircleCard'
import { seedCircles } from '@/data/seedData'
import Image from 'next/image'

export default function LandingPage() {
  const featuredCircles = seedCircles.slice(0, 3)

  const howItWorks = [
    {
      step: 1,
      title: "Explore Cove Circles",
      description: "Browse topic-based spaces for addiction and recovery support.",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Join Anonymously",
      description: "Choose how you want to show up—anonymous or with a pseudonym.",
      icon: <Eye className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Connect & Share",
      description: "Participate in guided sessions or open discussions.",
      icon: <MessageCircle className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-midnight selection:bg-aura-gold selection:text-midnight">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden pt-32 pb-20">
        {/* Advanced Background Elements */}
        <div className="mesh-bg opacity-30" />
        <div className="aura-glow bg-aura-gold top-[-10%] left-[-5%] w-[40vw] h-[40vw]" />
        <div className="aura-glow bg-aura-cyan bottom-[10%] right-[-5%] w-[35vw] h-[35vw] opacity-10" />
        
        {/* Floating Ethereal Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/4 left-1/3 w-2 h-2 bg-aura-gold rounded-full blur-sm"
          />
          <motion.div 
            animate={{ y: [0, 30, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            className="absolute top-1/2 right-1/4 w-3 h-3 bg-aura-cyan rounded-full blur-md"
          />
        </div>

        <div className="container-responsive max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 space-y-10"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-aura-gold text-[10px] font-black tracking-[0.2em] uppercase"
                >
                  <Shield className="w-3 h-3" />
                  <span>Privacy-First Peer Support</span>
                </motion.div>

                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white">
                  Say what's <br />
                  <span className="text-gradient-gold">hard to say.</span>
                </h1>

                <p className="text-xl lg:text-2xl text-white/50 max-w-xl leading-relaxed font-medium">
                  Connect anonymously in topic-based circles. A judgment-free space to share your journey through addiction and recovery.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link href="/coves" className="btn-primary group px-10 py-5 text-lg">
                  <span>Start Exploring</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#how-it-works" className="btn-secondary px-10 py-5 text-lg">
                  <span>How it works</span>
                </Link>
              </div>

              {/* Minimal Trust Badge */}
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-midnight bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white/40">
                      {i === 4 ? '1k+' : ''}
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-white/30 tracking-widest uppercase">
                  Joined by 12,000+ peers
                </div>
              </div>
            </motion.div>

            {/* Hero Image / Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative z-20 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-xl aspect-square">
                {/* Glowing rings behind image */}
                <div className="absolute inset-0 bg-aura-gold/10 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute inset-10 border border-white/5 rounded-full animate-spin-slow opacity-20" />
                
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-full h-full"
                >
                  <Image
                    src="https://res.cloudinary.com/dk2e0vvpd/image/upload/v1755995725/monk_kipvm0.png"
                    alt="Safe Space Illustration"
                    width={1000}
                    height={1000}
                    priority
                    className="object-contain drop-shadow-[0_0_50px_rgba(251,191,36,0.2)]"
                  />
                </motion.div>
                
                {/* Floating UI Badges */}
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-10 right-0 glass-card p-4 flex items-center space-x-3 shadow-glow-gold/20 border-aura-gold/20"
                >
                  <div className="w-8 h-8 rounded-full bg-aura-gold flex items-center justify-center">
                    <Lock className="w-4 h-4 text-midnight" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">Privacy</p>
                    <p className="text-xs font-bold text-white">End-to-end Safe</p>
                  </div>
                </motion.div>

                <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                   className="absolute bottom-20 left-0 glass-card p-4 flex items-center space-x-3 shadow-glow-cyan/20 border-aura-cyan/20"
                >
                  <div className="w-8 h-8 rounded-full bg-aura-cyan flex items-center justify-center">
                    <Users className="w-4 h-4 text-midnight" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">Community</p>
                    <p className="text-xs font-bold text-white">Peer Supportive</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-32 overflow-hidden bg-midnight">
        <div className="container-responsive max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-8"
             >
               <div className="inline-flex items-center space-x-2 text-aura-gold font-black tracking-widest text-[10px] uppercase">
                 <div className="w-8 h-[1px] bg-aura-gold/30" />
                 <span>THE PROCESS</span>
               </div>

               <h2 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
                 Three steps to <br />
                 <span className="text-gradient-gold">finding peace.</span>
               </h2>

               <p className="text-xl text-white/40 leading-relaxed max-w-md font-medium">
                 We've built Unburden to be the simplest, safest way to connect with people who actually understand.
               </p>

               <div className="pt-10">
                 <Link href="/coves" className="btn-primary group">
                    <span>Explore Coves</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>
             </motion.div>

             <div className="space-y-4">
                {howItWorks.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card group p-8 flex items-start gap-6 hover:border-aura-gold/30 transition-all duration-500"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-aura-gold group-hover:bg-aura-gold group-hover:text-midnight transition-colors duration-500 shrink-0">
                      {item.icon}
                    </div>
                    <div className="space-y-2">
                       <span className="text-[10px] font-black text-white/20 tracking-[0.2em] uppercase">Step {item.step}</span>
                       <h3 className="text-2xl font-black text-white">{item.title}</h3>
                       <p className="text-white/40 font-medium leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Featured Circles Section */}
      <section className="relative py-32 bg-midnight/50">
        <div className="container-responsive max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 text-aura-cyan font-black tracking-widest text-[10px] uppercase">
                <div className="w-8 h-[1px] bg-aura-cyan/30" />
                <span>FEATURED COVES</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tight">
                Active <span className="text-gradient-gold">Support Circles.</span>
              </h2>
            </div>
            <Link href="/coves" className="text-aura-gold font-black tracking-widest text-[10px] uppercase hover:text-white transition-colors flex items-center gap-2">
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {featuredCircles.map((circle) => (
               <CircleCard key={circle.id} circle={circle} />
             ))}
          </div>
        </div>
      </section>

      {/* What You Control (Bento Grid) */}
      <section className="relative py-32 border-t border-white/5">
        <div className="container-responsive max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tight">
              You are in <span className="text-gradient-gold">Control.</span>
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium">
              Privacy isn't a feature, it's our foundation. Tailor your experience to your comfort level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {/* Bento Cards */}
             <div className="md:col-span-2 glass-card p-12 relative overflow-hidden group">
                <div className="aura-glow bg-aura-gold -top-20 -right-20 w-80 h-80 opacity-5 group-hover:opacity-10 transition-opacity" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                   <div className="space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-aura-gold/10 flex items-center justify-center text-aura-gold">
                         <Eye className="w-8 h-8" />
                      </div>
                      <h3 className="text-4xl font-black text-white leading-tight">Total <br />Anonymity.</h3>
                      <p className="text-xl text-white/40 max-w-md font-medium">Whether you want to be a guest, use a pseudonym, or show your face (never by default), it's your call.</p>
                   </div>
                   <div className="pt-10 flex items-center gap-4">
                      <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-widest text-white/40 uppercase">Incognito</div>
                      <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-widest text-white/40 uppercase">Pseudonym</div>
                   </div>
                </div>
             </div>

             <div className="glass-card p-10 bg-aura-cyan/5 border-aura-cyan/10">
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-aura-cyan/10 flex items-center justify-center text-aura-cyan">
                     <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-white">Trigger <br />Filters.</h3>
                  <p className="text-white/40 font-medium">Automatically blur content containing specifically chosen keywords to protect your peace.</p>
                </div>
             </div>

             <div className="glass-card p-10">
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-aura-gold/10 flex items-center justify-center text-aura-gold">
                     <Clock className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-white">Data <br />Retention.</h3>
                  <p className="text-white/40 font-medium">Choose how long your contributions stay visible: 7, 30, or 90 days. You own your history.</p>
                </div>
             </div>

             <div className="md:col-span-2 glass-card p-10 bg-white/5">
                <div className="flex flex-col md:flex-row items-center gap-10">
                   <div className="space-y-4 flex-1">
                      <h3 className="text-3xl font-black text-white">Peer-Led, Community Moderated</h3>
                      <p className="text-white/40 font-medium">Unburden is powered by people like you. Our moderators are chosen from within our most helpful community members.</p>
                   </div>
                   <div className="flex -space-x-4">
                      {[1, 2, 3, 4, 5].map(i => (
                         <div key={i} className="w-14 h-14 rounded-full border-4 border-midnight bg-slate-800" />
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Safety & Help CTA */}
      <section className="relative py-32 overflow-hidden">
         <div className="container-responsive max-w-7xl mx-auto px-6">
            <div className="glass-card-dark p-12 md:p-20 relative overflow-hidden group">
               <div className="aura-glow bg-aura-gold/20 -top-40 -left-40 w-[600px] h-[600px] blur-[150px]" />
               
               <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8">
                     <div className="w-16 h-16 rounded-2xl bg-aura-gold/10 flex items-center justify-center text-aura-gold">
                        <Heart className="w-8 h-8" />
                     </div>
                     <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight">Your safety is our <span className="text-gradient-gold">only priority.</span></h2>
                     <p className="text-xl text-white/40 font-medium max-w-md">Peer support is powerful, but it's not a substitute for crisis care. We're here to help you find both.</p>
                     
                     <div className="flex flex-wrap gap-4">
                        <Link href="/resources" className="btn-primary">
                           <span>View Crisis Resources</span>
                           <ArrowRight className="w-5 h-5" />
                        </Link>
                        <button className="btn-glass px-8">Read Safety Guidelines</button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {[
                        { title: "Compassion", desc: "Zero shaming, 100% empathy." },
                        { title: "Moderation", desc: "Active safe-space protection." },
                        { title: "Anonymity", desc: "Share without exposure." },
                        { title: "Verification", desc: "Peer-vetted resources." }
                     ].map((box, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                           <h4 className="text-white font-bold mb-2">{box.title}</h4>
                           <p className="text-white/40 text-sm font-medium">{box.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="relative pt-32 pb-20 border-t border-white/5 bg-midnight overflow-hidden">
        <div className="mesh-bg opacity-10" />
        <div className="container-responsive max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            <div className="lg:col-span-2 space-y-8">
               <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 bg-aura-gold rounded-2xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-midnight" />
                 </div>
                 <span className="text-3xl font-black text-white tracking-tighter">UNBURDEN</span>
               </div>
               <p className="text-xl text-white/40 max-w-md font-medium leading-relaxed">
                  A high-impact, anonymous space where recovery begins with honest conversation.
               </p>
               <div className="flex items-center space-x-6">
                  {/* Social placeholders */}
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-aura-gold transition-colors cursor-pointer">
                     <Activity className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-aura-gold transition-colors cursor-pointer">
                     <MessageCircle className="w-5 h-5" />
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <h4 className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase">Navigation</h4>
               <ul className="space-y-4">
                  <li><Link href="/coves" className="text-white/60 hover:text-aura-gold font-bold transition-colors">Support Circles</Link></li>
                  <li><Link href="/journal" className="text-white/60 hover:text-aura-gold font-bold transition-colors">Personal Journal</Link></li>
                  <li><Link href="/resources" className="text-white/60 hover:text-aura-gold font-bold transition-colors">Crisis Support</Link></li>
                  <li><Link href="/moderators" className="text-white/60 hover:text-aura-gold font-bold transition-colors">Peer Moderators</Link></li>
               </ul>
            </div>

            <div className="space-y-6">
               <h4 className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase">Information</h4>
               <ul className="space-y-4">
                  <li><Link href="/guidelines" className="text-white/60 hover:text-aura-gold font-bold transition-colors">Community Standards</Link></li>
                  <li><Link href="/privacy" className="text-white/60 hover:text-aura-gold font-bold transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-white/60 hover:text-aura-gold font-bold transition-colors">Terms of Service</Link></li>
               </ul>
            </div>
          </div>

          <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-black text-white/20 tracking-widest uppercase">© 2025 UNBURDEN PLATFORM • ALL RIGHTS RESERVED</p>
            <div className="flex items-center space-x-2 text-[10px] font-black text-aura-gold tracking-widest uppercase">
               <span>Made with</span>
               <Heart className="w-3 h-3 fill-aura-gold" />
               <span>for the community</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

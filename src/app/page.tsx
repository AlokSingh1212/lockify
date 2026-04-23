"use client";

import { motion } from "framer-motion";
import { Sparkles, Camera, ArrowRight, Zap, Globe, Shield, Heart, MessageCircle, Send } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020203] text-white selection:bg-brand-purple/30 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-xl bg-black/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center shadow-lg shadow-brand-purple/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Lockify</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/discover" className="hover:text-white transition-colors">Discover</Link>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all">
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-purple text-sm font-bold"
          >
            <Sparkles className="w-4 h-4" />
            Next-Gen AI Commerce
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1]"
          >
            Turn one photo into a <br />
            <span className="bg-gradient-to-r from-brand-purple via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Global Empire.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Lockify is the AI creator hub that builds your store, runs your ads, 
            and finds your customers. All you need is a single product photo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/dashboard" className="group px-8 py-4 rounded-2xl bg-brand-purple text-white font-bold text-lg flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-brand-purple/20">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/discover" className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all">
              Explore Discover
            </Link>
          </motion.div>
        </div>

        {/* Social Feed Preview Section */}
        <section className="mt-32 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">The Shop Feed</h2>
            <p className="text-gray-400">Discover what's trending from our creators.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mock Post 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card rounded-[2.5rem] overflow-hidden border-white/10"
            >
              <div className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center font-bold text-xs">J</div>
                <span className="font-bold text-sm">Jordan's Tech</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-brand-purple/20 to-blue-500/20 flex items-center justify-center">
                <Zap className="w-20 h-20 text-white opacity-40" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex gap-4">
                  <Heart className="w-6 h-6 text-red-500 fill-current" />
                  <MessageCircle className="w-6 h-6" />
                  <Send className="w-6 h-6" />
                </div>
                <p className="text-sm"><b>Jordan's Tech</b> Just launched the new Nebula Mouse! 🚀</p>
              </div>
            </motion.div>

            {/* Mock Post 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card rounded-[2.5rem] overflow-hidden border-white/10"
            >
              <div className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-bold text-xs">A</div>
                <span className="font-bold text-sm">Aria Design</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center">
                <Sparkles className="w-20 h-20 text-white opacity-40" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex gap-4">
                  <Heart className="w-6 h-6 text-white" />
                  <MessageCircle className="w-6 h-6" />
                  <Send className="w-6 h-6" />
                </div>
                <p className="text-sm"><b>Aria Design</b> Handcrafted minimalist posters for your studio. ✨</p>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link href="/discover" className="text-brand-purple font-bold flex items-center justify-center gap-2 hover:underline">
              View Global Feed <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Hero Image Mockup (Previous) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-20 max-w-6xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-brand-purple/20 blur-[100px] rounded-full group-hover:bg-brand-purple/30 transition-all duration-700" />
          <div className="relative glass-card rounded-[2rem] border-white/10 p-2 overflow-hidden shadow-2xl">
            <div className="bg-black/40 rounded-[1.8rem] aspect-video flex items-center justify-center border border-white/5">
              <div className="flex flex-col items-center gap-4 text-gray-500">
                <Camera className="w-16 h-16 opacity-20" />
                <span className="font-medium">Drop a photo to see the magic</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-32 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-6 group hover:border-brand-purple/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center">
                <Zap className="w-7 h-7 text-brand-purple" />
              </div>
              <h3 className="text-2xl font-bold text-white">Instant Onboarding</h3>
              <p className="text-gray-400 leading-relaxed">
                No complex forms. Upload a photo, and our Vision AI generates your entire product catalogue instantly.
              </p>
            </div>
            
            <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-6 group hover:border-blue-500/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <Globe className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Global Commerce</h3>
              <p className="text-gray-400 leading-relaxed">
                Reach customers worldwide with high-converting storefronts optimized for every device and language.
              </p>
            </div>

            <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-6 group hover:border-pink-500/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center">
                <Shield className="w-7 h-7 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Secure Payouts</h3>
              <p className="text-gray-400 leading-relaxed">
                Enterprise-grade security for your payments. Get paid directly to your bank account with zero friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto glass-card rounded-[3rem] p-12 md:p-20 text-center border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-brand-purple/5 -z-10" />
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to start your journey?</h2>
          <p className="text-xl text-gray-400 mb-10">Join 10,000+ creators building the future of commerce on Lockify.</p>
          <Link href="/dashboard" className="inline-flex px-10 py-5 rounded-2xl bg-white text-black font-bold text-xl hover:scale-105 transition-all">
            Join the Revolution
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-purple" />
            <span className="font-bold text-white">Lockify</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
          <p>© 2024 Lockify AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

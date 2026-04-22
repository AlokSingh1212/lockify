"use client";

import { motion } from "framer-motion";
import { ExternalLink, Settings, Copy, MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface StoreCardProps {
  store: {
    id: number;
    name: string;
    tagline: string | null;
    slug: string;
    themeColor: string;
  };
  delay?: number;
}

export function StoreCard({ store, delay = 0 }: StoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-3xl p-6 group cursor-pointer relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${store.themeColor}, transparent)` }}
      />
      
      <div className="relative z-10">
        <div 
          className="w-full h-32 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center shadow-inner"
          style={{ 
            background: `linear-gradient(135deg, ${store.themeColor}80, ${store.themeColor}20)`,
            border: `1px solid ${store.themeColor}40`
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold text-white shadow-xl border border-white/30">
            {store.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 bg-black/40 backdrop-blur-md hover:bg-black/60 rounded-xl text-white transition-colors">
              <Copy className="w-4 h-4" />
            </button>
            <button className="p-2 bg-black/40 backdrop-blur-md hover:bg-black/60 rounded-xl text-white transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-purple transition-colors">{store.name}</h3>
        <p className="text-sm text-gray-400 mb-6 line-clamp-2">{store.tagline || 'No tagline set'}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <Link href={`/${store.slug}`} className="text-sm text-gray-400 hover:text-white font-mono flex items-center gap-2 transition-colors">
            {store.slug}.lockify.com
          </Link>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <Link href={`/${store.slug}`} className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

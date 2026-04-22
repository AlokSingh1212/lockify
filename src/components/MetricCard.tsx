"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: LucideIcon;
  delay?: number;
}

export function MetricCard({ title, value, trend, isPositive, icon: Icon, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-3xl p-6 relative overflow-hidden group"
    >
      <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-brand-purple/20 transition-colors duration-500" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="p-3 bg-white/10 rounded-2xl">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`text-sm font-semibold px-3 py-1 rounded-full ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {isPositive ? '+' : '-'}{trend}
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-gray-400 font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import MagicInput from "@/components/MagicInput";
import StorefrontPreview from "@/components/StorefrontPreview";
import { type StorefrontConfig } from "@/app/api/generate/route";

export default function Home() {
  const [store, setStore] = useState<StorefrontConfig | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (file: File | null, prompt: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      if (prompt) formData.append('prompt', prompt);

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate store');
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setStore(data.store);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 sm:p-12 relative overflow-hidden selection:bg-brand-purple/30">
      {/* Background gradients */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-brand-pink/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="w-full max-w-7xl mx-auto flex flex-col items-center z-10 pt-10 sm:pt-20">
        <AnimatePresence mode="wait">
          {!store && !isGenerating && (
            <motion.div 
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center text-center"
            >


              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Start selling with a <br className="hidden sm:block" />
                <span className="text-gradient">single photo.</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 mb-2 max-w-2xl">
                Turn your idea into a business in minutes. 
              </p>
              <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl">
                AI builds your storefront, runs your campaigns, and finds you customers.
              </p>

              <MagicInput onGenerate={handleGenerate} />
              
              {error && (
                <div className="mt-6 px-6 py-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl">
                  {error}
                </div>
              )}

              <div className="mt-16 text-gray-500 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-medium">
                <span>Trusted by 350,000 entrepreneurs</span>
                <span className="w-1 h-1 rounded-full bg-gray-700 hidden sm:block" />
                <span>0% Fees</span>
                <span className="w-1 h-1 rounded-full bg-gray-700 hidden sm:block" />
                <span>Global Payments</span>
              </div>
            </motion.div>
          )}

          {isGenerating && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center min-h-[50vh]"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand-purple/20 blur-xl rounded-full" />
                <Loader2 className="w-16 h-16 text-brand-purple animate-spin relative z-10" />
              </div>
              <h2 className="mt-8 text-2xl font-bold text-white">AI is building your store...</h2>
              <p className="mt-2 text-gray-400">Analyzing your input and generating a custom storefront.</p>
              
              {/* Stepper mock */}
              <div className="mt-10 flex flex-col gap-4 text-sm font-medium">
                <div className="flex items-center gap-3 text-brand-purple">
                  <span className="w-5 h-5 rounded-full bg-brand-purple/20 flex items-center justify-center text-xs">1</span>
                  Analyzing product photo
                </div>
                <div className="flex items-center gap-3 text-gray-400 animate-pulse">
                  <span className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-xs">2</span>
                  Writing high-converting copy
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-gray-800/50 flex items-center justify-center text-xs">3</span>
                  Structuring checkout experience
                </div>
              </div>
            </motion.div>
          )}

          {store && !isGenerating && (
            <StorefrontPreview store={store} onReset={() => setStore(null)} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

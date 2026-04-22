"use client";

import React, { useState, useRef } from "react";
import { Upload, Sparkles, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MagicInputProps {
  onGenerate: (file: File | null, prompt: string) => void;
}

export default function MagicInput({ onGenerate }: MagicInputProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file || prompt) {
      onGenerate(file, prompt);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto mt-12"
    >
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-brand-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-6">
          <div
            className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer ${
              dragActive
                ? "border-brand-pink bg-brand-pink/5 scale-[1.02]"
                : file
                ? "border-brand-purple bg-brand-purple/5"
                : "border-gray-700 hover:border-gray-500 hover:bg-gray-800/30"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            
            {file ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-brand-purple/20 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-brand-purple" />
                </div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-gray-400 text-sm text-balance">
                  Click or drag to replace
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-lg text-white font-medium">Upload a photo of what you want to sell</p>
                  <p className="text-gray-400 mt-1">Or simply drag and drop it here</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-gray-800" />
            <span className="text-gray-500 text-sm font-medium">OR DESCRIBE IT</span>
            <div className="h-[1px] flex-1 bg-gray-800" />
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A yoga studio in Singapore that offers 1:1 sessions..."
              className="flex-1 bg-gray-900/50 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all"
            />
            <button
              type="submit"
              disabled={!file && !prompt}
              className="bg-white text-black px-8 rounded-xl font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover-lift flex items-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-5 h-5 text-brand-purple" />
              Generate Store
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

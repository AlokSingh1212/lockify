"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag, ArrowRight, Share2, Globe, Loader2 } from "lucide-react";
import { type StorefrontConfig } from "@/app/api/generate/route";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface StorefrontPreviewProps {
  store: StorefrontConfig;
  onReset: () => void;
}

export default function StorefrontPreview({ store, onReset }: StorefrontPreviewProps) {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    if (!isSignedIn) {
      alert("Please log in first to save your store!");
      openSignIn();
      return;
    }

    setIsPublishing(true);
    try {
      const response = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(store),
      });

      if (!response.ok) throw new Error("Failed to publish store");
      
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while publishing.");
      setIsPublishing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto mt-8"
    >
      {/* Top action bar */}
      <div className="flex justify-between items-center mb-6 px-2">
        <button 
          onClick={onReset}
          className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
        >
          &larr; Start over
        </button>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-colors">
            <Globe className="w-4 h-4" />
            Edit Domain
          </button>
          <button 
            onClick={handlePublish}
            disabled={isPublishing}
            style={{ backgroundColor: store.themeColor }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50"
          >
            {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
            {isPublishing ? "Publishing..." : "Publish Store"}
          </button>
        </div>
      </div>

      {/* Storefront Mockup Container */}
      <div className="bg-white text-gray-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 relative">
        {/* Browser Header Mockup */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="mx-auto bg-white text-gray-500 text-xs py-1 px-24 rounded-md border border-gray-200 flex items-center gap-2">
            <Globe className="w-3 h-3" />
            {store.name.toLowerCase().replace(/\s+/g, '')}.nas.com
          </div>
        </div>

        {/* Store Content */}
        <div className="p-8 sm:p-16">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-7xl font-bold tracking-tight mb-6"
              style={{ color: store.themeColor }}
            >
              {store.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-medium text-gray-800 mb-4"
            >
              {store.tagline}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600"
            >
              {store.description}
            </motion.p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {store.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    {product.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-6 flex-1">{product.description}</p>
                
                <div className="space-y-3 mb-8">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                  <button 
                    style={{ backgroundColor: store.themeColor }}
                    className="text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Buy Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

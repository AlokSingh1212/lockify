"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  storeName: string;
  storeSlug: string;
  themeColor: string;
}

interface DiscoverClientProps {
  products: Product[];
}

export function DiscoverClient({ products }: DiscoverClientProps) {
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const toggleLike = async (id: number) => {
    setLikedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    try {
      await fetch("/api/likes", {
        method: "POST",
        body: JSON.stringify({ productId: id })
      });
    } catch (e) {}
  };

  const toggleSave = (id: number) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Unique stores for the "Stories" bar
  const uniqueStores = Array.from(new Set(products.map(p => p.storeSlug))).map(slug => {
    return products.find(p => p.storeSlug === slug);
  });

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-xl mx-auto">
        
        {/* Instagram Stories Bar */}
        <div className="flex gap-4 overflow-x-auto py-4 px-4 scrollbar-hide border-b border-white/10">
          {uniqueStores.map((store, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="w-[72px] h-[72px] rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                <div className="w-full h-full rounded-full bg-black p-[2px]">
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center text-xl font-bold text-white"
                    style={{ backgroundColor: store?.themeColor }}
                  >
                    {store?.storeName.charAt(0)}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-400 truncate w-16 text-center">{store?.storeName}</span>
            </div>
          ))}
        </div>

        {/* Instagram Feed */}
        <div className="pb-20">
          {products.map((product) => (
            <div key={product.id} className="mb-4">
              {/* Post Header */}
              <div className="p-3 flex items-center justify-between">
                <Link href={`/${product.storeSlug}`} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-yellow-400 to-purple-600">
                    <div className="w-full h-full rounded-full bg-black p-[1px]">
                      <div 
                        className="w-full h-full rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ backgroundColor: product.themeColor }}
                      >
                        {product.storeName.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-white">{product.storeName}</span>
                </Link>
                <button className="text-white">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Media */}
              <div 
                className="w-full aspect-square relative flex items-center justify-center bg-zinc-900 group"
                onDoubleClick={() => toggleLike(product.id)}
              >
                <div 
                   className="absolute inset-0 opacity-20" 
                   style={{ background: `linear-gradient(135deg, ${product.themeColor}, transparent)` }} 
                />
                <div className="text-9xl select-none relative z-10">{product.name.charAt(0)}</div>
                
                {/* Like Animation */}
                <AnimatePresence>
                  {likedIds.includes(product.id) && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                    >
                      <Heart className="w-20 h-20 text-white fill-current drop-shadow-2xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Post Actions */}
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleLike(product.id)}>
                      <Heart className={`w-7 h-7 ${likedIds.includes(product.id) ? 'text-red-500 fill-current' : 'text-white'}`} />
                    </button>
                    <button>
                      <MessageCircle className="w-7 h-7 text-white" />
                    </button>
                    <button>
                      <Send className="w-7 h-7 text-white" />
                    </button>
                  </div>
                  <button onClick={() => toggleSave(product.id)}>
                    <Bookmark className={`w-7 h-7 ${savedIds.includes(product.id) ? 'text-white fill-current' : 'text-white'}`} />
                  </button>
                </div>

                {/* Likes & Caption */}
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">
                    {likedIds.includes(product.id) ? 1 : 0} likes
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-white mr-2">{product.storeName}</span>
                    <span className="text-white">{product.name} — ${product.price}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {product.description}
                  </div>
                  <button className="text-sm text-gray-500 mt-1">
                    View all comments
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ShoppingBag } from "lucide-react";
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

  const toggleLike = (id: number) => {
    setLikedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
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
    <div className="min-h-screen bg-black pt-20 pb-20">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Stories Bar */}
        <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
          {uniqueStores.map((store, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                <div className="w-full h-full rounded-full bg-black p-[2px]">
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center text-lg font-bold text-white"
                    style={{ backgroundColor: store?.themeColor }}
                  >
                    {store?.storeName.charAt(0)}
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-gray-400 truncate w-16 text-center">{store?.storeName}</span>
            </div>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-black border-y md:border border-white/10 md:rounded-xl overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-3 flex items-center justify-between">
                <Link href={`/${product.storeSlug}`} className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: product.themeColor }}
                  >
                    {product.storeName.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-white hover:text-gray-400 transition-colors">
                    {product.storeName}
                  </span>
                </Link>
                <button className="text-white hover:text-gray-400">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Media (Product Image Placeholder) */}
              <div 
                className="w-full aspect-square relative flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${product.themeColor}20, ${product.themeColor}05)` }}
                onDoubleClick={() => toggleLike(product.id)}
              >
                <div className="text-8xl select-none">{product.name.charAt(0)}</div>
                
                {/* Like Animation Overlay (Hidden by default) */}
                <AnimatePresence>
                  {likedIds.includes(product.id) && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <Heart className="w-24 h-24 text-white fill-current drop-shadow-2xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Post Actions */}
              <div className="p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleLike(product.id)} className="hover:opacity-60 transition-opacity">
                      <Heart className={`w-7 h-7 ${likedIds.includes(product.id) ? 'text-red-500 fill-current' : 'text-white'}`} />
                    </button>
                    <button className="hover:opacity-60 transition-opacity">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </button>
                    <button className="hover:opacity-60 transition-opacity">
                      <Send className="w-7 h-7 text-white" />
                    </button>
                  </div>
                  <button onClick={() => toggleSave(product.id)} className="hover:opacity-60 transition-opacity">
                    <Bookmark className={`w-7 h-7 ${savedIds.includes(product.id) ? 'text-white fill-current' : 'text-white'}`} />
                  </button>
                </div>

                {/* Likes Count */}
                <div className="text-sm font-bold text-white">
                  {likedIds.includes(product.id) ? 1 : 0} likes
                </div>

                {/* Caption */}
                <div className="text-sm space-y-1">
                  <p className="text-white">
                    <span className="font-bold mr-2">{product.storeName}</span>
                    {product.name} — Only ${product.price}
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Shop Button */}
                <Link 
                  href={`/${product.storeSlug}`}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  View in Store
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products in your feed yet.
          </div>
        )}
      </div>
    </div>
  );
}

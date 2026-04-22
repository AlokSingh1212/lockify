"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Layout, Video, Search, Zap, Loader2, Copy, Check } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  storeName: string;
}

interface AdsClientProps {
  products: Product[];
}

interface AdData {
  meta: { headline: string; primaryText: string; cta: string };
  tiktok: { hook: string; body: string; cta: string };
  google: { headline: string; description: string };
}

export function AdsClient({ products }: AdsClientProps) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(products[0]?.id || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [ads, setAds] = useState<AdData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  const handleGenerate = async () => {
    if (!selectedProduct) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch("/api/ads/generate", {
        method: "POST",
        body: JSON.stringify({
          productName: selectedProduct.name,
          productDescription: selectedProduct.description,
          storeName: selectedProduct.storeName
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setAds(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-brand-purple" />
          Magic Ads
        </h1>
        <p className="text-gray-400">Generate high-converting ads for your products in seconds.</p>
      </div>

      {/* Product Selector */}
      <div className="glass-card rounded-3xl p-8 space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-400">Select Product</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProductId(product.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedProductId === product.id
                    ? "bg-brand-purple/10 border-brand-purple text-white"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                <div className="font-bold mb-1">{product.name}</div>
                <div className="text-xs opacity-60">{product.storeName}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !selectedProductId}
          className="w-full md:w-auto px-8 py-4 bg-brand-purple text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-purple/90 transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Magic...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Generate Ad Kit
            </>
          )}
        </button>
      </div>

      {/* Ad Previews */}
      <AnimatePresence>
        {ads && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Meta Card */}
            <div className="glass-card rounded-3xl p-6 border-white/10 flex flex-col space-y-4">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Layout className="w-5 h-5" />
                <span className="font-bold uppercase text-xs tracking-wider">Facebook / Instagram</span>
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Headline</span>
                    <button onClick={() => copyToClipboard(ads.meta.headline, 'meta-h')} className="text-gray-500 hover:text-white transition-colors">
                      {copiedId === 'meta-h' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl text-sm text-white font-medium">
                    {ads.meta.headline}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Primary Text</span>
                    <button onClick={() => copyToClipboard(ads.meta.primaryText, 'meta-p')} className="text-gray-500 hover:text-white transition-colors">
                      {copiedId === 'meta-p' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl text-sm text-gray-400 italic">
                    {ads.meta.primaryText}
                  </div>
                </div>
              </div>
            </div>

            {/* TikTok Card */}
            <div className="glass-card rounded-3xl p-6 border-white/10 flex flex-col space-y-4">
              <div className="flex items-center gap-2 text-pink-500 mb-2">
                <Video className="w-5 h-5" />
                <span className="font-bold uppercase text-xs tracking-wider">TikTok / Reels</span>
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">The Hook</span>
                    <button onClick={() => copyToClipboard(ads.tiktok.hook, 'tt-h')} className="text-gray-500 hover:text-white transition-colors">
                      {copiedId === 'tt-h' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl text-sm text-white font-bold italic">
                    "{ads.tiktok.hook}"
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Video Body</span>
                    <button onClick={() => copyToClipboard(ads.tiktok.body, 'tt-b')} className="text-gray-500 hover:text-white transition-colors">
                      {copiedId === 'tt-b' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl text-sm text-gray-400">
                    {ads.tiktok.body}
                  </div>
                </div>
              </div>
            </div>

            {/* Google Card */}
            <div className="glass-card rounded-3xl p-6 border-white/10 flex flex-col space-y-4">
              <div className="flex items-center gap-2 text-yellow-500 mb-2">
                <Search className="w-5 h-5" />
                <span className="font-bold uppercase text-xs tracking-wider">Google Search</span>
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Ad Headline</span>
                    <button onClick={() => copyToClipboard(ads.google.headline, 'gg-h')} className="text-gray-500 hover:text-white transition-colors">
                      {copiedId === 'gg-h' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl text-sm text-blue-400 font-medium underline underline-offset-4">
                    {ads.google.headline}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Description</span>
                    <button onClick={() => copyToClipboard(ads.google.description, 'gg-d')} className="text-gray-500 hover:text-white transition-colors">
                      {copiedId === 'gg-d' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl text-sm text-gray-400">
                    {ads.google.description}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

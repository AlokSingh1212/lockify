"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Plus } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/store/useCartStore";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  features: string[];
}

interface ClientStorefrontProps {
  store: {
    name: string;
    tagline: string | null;
    description: string;
    themeColor: string;
  };
  products: Product[];
}

export function ClientStorefront({ store, products }: ClientStorefrontProps) {
  const { toggleCart, addItem, items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-white/20">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center backdrop-blur-md border-b border-white/5" style={{ backgroundColor: `${store.themeColor}10` }}>
        <div className="font-bold text-xl tracking-tight">{store.name}</div>
        <button 
          onClick={toggleCart}
          className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ShoppingBag className="w-6 h-6" />
          {totalItems > 0 && (
            <span 
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full text-white"
              style={{ backgroundColor: store.themeColor }}
            >
              {totalItems}
            </span>
          )}
        </button>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden flex flex-col items-center text-center">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] blur-[120px] opacity-20 pointer-events-none"
          style={{ backgroundColor: store.themeColor }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            {store.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {store.tagline || store.description}
          </p>
          <button 
            onClick={() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: store.themeColor }}
          >
            Shop Collection
          </button>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-3xl p-6 group flex flex-col h-full"
            >
              <div 
                className="w-full aspect-square rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${store.themeColor}40, ${store.themeColor}10)` }}
              >
                <div className="text-6xl">{product.name.charAt(0)}</div>
              </div>
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <span className="text-xl font-bold" style={{ color: store.themeColor }}>${product.price}</span>
              </div>
              
              <p className="text-gray-400 text-sm mb-6 flex-1">{product.description}</p>
              
              <button
                onClick={() => addItem({ id: product.id, name: product.name, price: product.price })}
                className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                style={{ backgroundColor: `${store.themeColor}20`, color: store.themeColor }}
              >
                <Plus className="w-5 h-5" />
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <CartDrawer themeColor={store.themeColor} />
    </div>
  );
}

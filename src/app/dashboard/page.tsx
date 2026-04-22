import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ExternalLink, Plus, Settings } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Fetch user's stores from Neon
  const userStores = await db.select().from(stores).where(eq(stores.userId, userId)).orderBy(stores.createdAt);

  return (
    <div className="min-h-screen bg-[#09090b] pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Stores</h1>
            <p className="text-gray-400">Manage your generated storefronts and products.</p>
          </div>
          <Link 
            href="/"
            className="flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/90 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create New Store
          </Link>
        </div>

        {userStores.length === 0 ? (
          <div className="text-center py-24 glass-card rounded-3xl border border-dashed border-white/20">
            <h3 className="text-xl font-semibold text-white mb-2">No stores yet</h3>
            <p className="text-gray-400 mb-6">You haven't generated any storefronts. Let's fix that!</p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              Start selling with a single photo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userStores.map((store) => (
              <div key={store.id} className="glass-card rounded-2xl p-6 group hover:border-brand-purple/50 transition-colors">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white mb-6 shadow-lg"
                  style={{ backgroundColor: store.themeColor }}
                >
                  {store.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{store.name}</h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2">{store.tagline}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="text-xs text-gray-500 font-mono">
                    {store.slug}.nas.com
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

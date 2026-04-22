import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Plus, DollarSign, MousePointerClick, TrendingUp } from "lucide-react";
import Link from "next/link";
import { MetricCard } from "@/components/MetricCard";
import { StoreCard } from "@/components/StoreCard";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Fetch user's stores from Neon
  const userStores = await db.select().from(stores).where(eq(stores.userId, userId)).orderBy(stores.createdAt);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
          <p className="text-gray-400">Welcome back. Here's what's happening with your stores.</p>
        </div>
        <Link 
          href="/"
          className="flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/90 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-brand-purple/20"
        >
          <Plus className="w-5 h-5" />
          Create Store
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <MetricCard 
          title="Total Revenue" 
          value="$12,450" 
          trend="14.5%" 
          isPositive={true} 
          icon={DollarSign} 
          delay={0.1}
        />
        <MetricCard 
          title="Active Visitors" 
          value="1,240" 
          trend="4.2%" 
          isPositive={true} 
          icon={MousePointerClick} 
          delay={0.2}
        />
        <MetricCard 
          title="Conversion Rate" 
          value="3.2%" 
          trend="1.1%" 
          isPositive={false} 
          icon={TrendingUp} 
          delay={0.3}
        />
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Your Storefronts</h2>
          <Link href="/dashboard/stores" className="text-sm text-brand-purple hover:text-white transition-colors font-medium">
            View all
          </Link>
        </div>

        {userStores.length === 0 ? (
          <div className="text-center py-24 glass-card rounded-3xl border border-dashed border-white/20">
            <h3 className="text-xl font-semibold text-white mb-2">No stores yet</h3>
            <p className="text-gray-400 mb-6">You haven't generated any storefronts. Let's fix that!</p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors shadow-lg shadow-white/10"
            >
              Start selling with a single photo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {userStores.map((store, index) => (
              <StoreCard key={store.id} store={store} delay={0.4 + (index * 0.1)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

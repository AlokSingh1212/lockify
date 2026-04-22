"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Store, Users, BarChart3, Settings, LogOut } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const links = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Storefronts", href: "/dashboard/stores", icon: Store },
    { name: "Audience", href: "/dashboard/audience", icon: Users },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 min-h-[calc(100vh-80px)] border-r border-white/10 hidden md:flex flex-col pt-8">
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </aside>
  );
}

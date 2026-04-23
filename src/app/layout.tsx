import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignInButton, Show, UserButton } from '@clerk/nextjs'
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lockify - Start selling with a single photo",
  description: "Turn your idea into a business in minutes. AI builds your storefront, runs your campaigns, and finds you customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <header className="absolute top-0 w-full z-50 p-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
            <div className="font-bold text-xl tracking-tight text-white">Lockify</div>
            <div>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="text-sm font-semibold text-white hover:text-gray-300 transition-colors">
                    Log in
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center gap-6">
                  <a href="/discover" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                    Discover
                  </a>
                  <a href="/dashboard" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                    Dashboard
                  </a>
                  <UserButton />
                </div>
              </Show>
            </div>
          </header>
          <main className="relative z-10 pb-20 md:pb-0">
            {children}
          </main>
          
          {/* Mobile Bottom Navigation (Instagram Style) */}
          <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-2xl border-t border-white/10 flex md:hidden items-center justify-around z-50 px-6 safe-area-pb">
            <Link href="/" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-all active:scale-90">
              <div className="w-6 h-6 flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
            </Link>
            <Link href="/discover" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-all active:scale-90">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
            </Link>
            <Link href="/dashboard" className="flex flex-col items-center justify-center w-12 h-12 bg-brand-purple rounded-2xl shadow-lg shadow-brand-purple/40 -mt-6 border-4 border-black transition-all active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </Link>
            <Link href="/dashboard/ads" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-all active:scale-90">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
              </div>
            </Link>
            <Link href="/dashboard" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-all active:scale-90">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
            </Link>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}

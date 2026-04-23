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
          <header className="fixed top-0 w-full z-50 bg-black border-b border-white/10 h-14 flex items-center px-4 justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight italic" style={{ fontFamily: "serif" }}>Lockify</h1>
            </div>
            <div className="flex items-center gap-4">
              <Show when="signed-in">
                <button className="hover:opacity-60 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
                <UserButton />
              </Show>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="text-sm font-bold text-blue-500">Log In</button>
                </SignInButton>
              </Show>
            </div>
          </header>

          <main className="relative z-10 pt-14 pb-12 md:pb-0">
            {children}
          </main>
          
          {/* Instagram-Style Mobile Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 h-12 bg-black border-t border-white/10 flex md:hidden items-center justify-around z-50 px-2">
            <Link href="/" className="hover:opacity-60 transition-all active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </Link>
            <Link href="/discover" className="hover:opacity-60 transition-all active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </Link>
            <Link href="/dashboard" className="hover:opacity-60 transition-all active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
            </Link>
            <Link href="/dashboard/ads" className="hover:opacity-60 transition-all active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </Link>
            <Link href="/dashboard" className="hover:opacity-60 transition-all active:scale-90">
               <div className="w-6 h-6 rounded-full border border-white/20 overflow-hidden">
                 <div className="w-full h-full bg-gradient-to-tr from-yellow-400 to-purple-600" />
               </div>
            </Link>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignInButton, Show, UserButton } from '@clerk/nextjs'
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
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}

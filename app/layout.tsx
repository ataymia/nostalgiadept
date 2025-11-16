import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Nostalgia Dept - Your 90s Store",
  description: "Step back into the 90s with Nostalgia Dept - your one-stop shop for retro gear, regional snacks, and all the rad stuff you remember!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen brick-wall-bg">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-black border-t-4 border-pink-500 py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="neon-text-cyan text-xl font-bold mb-2">
              NOSTALGIA DEPT
            </p>
            <p className="text-gray-400 text-sm">
              Bringing back the 90s, one rad product at a time! 🎉
            </p>
            <p className="text-gray-500 text-xs mt-4">
              © {new Date().getFullYear()} Nostalgia Dept. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

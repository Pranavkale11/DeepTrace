import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/landing/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5 bg-black/50 backdrop-blur-sm">
        <p>© 2026 INNOVIT. DeepTrace Intelligence Systems. All rights reserved.</p>
        <p className="mt-2 text-xs opacity-50 font-mono">AUTHORIZED USE ONLY // SYSTEM LOGGING ACTIVE</p>
      </footer>
    </main>
  );
}

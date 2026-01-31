'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldAlert, Menu, X, Radio } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: '/', label: 'Home' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/dashboard/campaigns', label: 'Explorer' },
        { href: '#partners', label: 'Partners' },
    ];

    return (
        <header className="fixed top-0 w-full z-40 border-b border-white/5 glass">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors border border-primary/50">
                        <Radio className="w-5 h-5 text-primary animate-pulse" />
                    </div>
                    <span className="text-xl font-bold tracking-wider text-white">
                        DEEP<span className="text-primary">TRACE</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'text-xs font-medium uppercase tracking-widest hover:text-primary transition-colors',
                                pathname === link.href ? 'text-primary drop-shadow-[0_0_5px_rgba(0,255,65,0.8)]' : 'text-gray-400'
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <Link href="/login">
                        <Button variant="ghost" size="sm">Log In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="primary" size="sm">
                            <ShieldAlert className="w-3 h-3 mr-2" />
                            Access System
                        </Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-gray-300 hover:text-primary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden glass border-b border-white/5 p-4 flex flex-col gap-4"
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                'block py-2 text-sm uppercase tracking-widest hover:text-primary transition-colors',
                                pathname === link.href ? 'text-primary' : 'text-gray-400'
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button variant="ghost" className="w-full">Log In</Button>
                        </Link>
                        <Link href="/signup" onClick={() => setIsOpen(false)}>
                            <Button variant="primary" className="w-full">Access System</Button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </header>
    );
}

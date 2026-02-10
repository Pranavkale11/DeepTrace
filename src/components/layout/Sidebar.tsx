'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Globe, FileText, Settings, ShieldAlert, LogOut, Radar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { href: '/dashboard/campaigns', label: 'Campaign Explorer', icon: Globe },
        { href: '/dashboard/reports', label: 'Intelligence Reports', icon: FileText },
        { href: '/dashboard/settings', label: 'System Settings', icon: Settings },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border flex flex-col z-30 transition-colors duration-300">
            <div className="h-16 flex items-center px-6 border-b border-border bg-surface-highlight/50">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <ShieldAlert className="w-6 h-6 text-primary relative z-10" />
                        <div className="absolute inset-0 bg-primary/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="text-lg font-bold tracking-wider text-foreground">
                        DEEP<span className="text-primary italic">TRACE</span>
                    </span>
                </Link>
            </div>

            <div className="flex-1 py-8 px-4 flex flex-col gap-1 relative overflow-y-auto">
                <div className="px-3 mb-4 flex items-center justify-between">
                    <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">Analysis Modules</p>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]"></span>
                </div>

                <nav className="space-y-1.5 mb-10 relative flex flex-col">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="relative"
                            >
                                <Link
                                    href={link.href}
                                    className={cn(
                                        'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group relative border',
                                        isActive
                                            ? 'bg-primary/20 text-primary border-primary/30 shadow-[0_0_15px_rgba(0,255,65,0.1)]'
                                            : 'text-text-muted hover:text-foreground hover:bg-surface-highlight border-transparent'
                                    )}
                                >
                                    <link.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary" : "text-text-dim group-hover:text-foreground")} />
                                    <span className="relative z-10">{link.label}</span>

                                    <AnimatePresence>
                                        {isActive && (
                                            <>
                                                <motion.span
                                                    layoutId="sidebar-active-pill"
                                                    className="absolute inset-0 bg-primary/5 rounded-md -z-0"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                                <motion.span
                                                    layoutId="sidebar-active-indicator"
                                                    className="absolute left-0 w-1 h-2/3 bg-primary rounded-r-full"
                                                    initial={{ opacity: 0, scaleY: 0 }}
                                                    animate={{ opacity: 1, scaleY: 1 }}
                                                    exit={{ opacity: 0, scaleY: 0 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            </>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>

                <div className="px-3 mb-4">
                    <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">System Status</p>
                </div>
                <div className="bg-surface-highlight/50 rounded-lg border border-border p-4 mx-1">
                    <div className="flex items-center gap-2 mb-3 text-[11px] font-medium text-secondary">
                        <Radar className="w-3.5 h-3.5 animate-spin duration-[3000ms]" />
                        <span className="tracking-wide">Global Network Scan</span>
                    </div>
                    <div className="h-1 w-full bg-border rounded-full overflow-hidden mb-3">
                        <motion.div
                            initial={{ width: "30%" }}
                            animate={{ width: "75%" }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            className="h-full bg-secondary"
                        />
                    </div>
                    <div className="space-y-1.5 mt-2 text-[10px] font-mono leading-relaxed">
                        <div className="flex justify-between items-center">
                            <span className="text-text-muted">Twitter Node:</span>
                            <span className="text-primary font-bold">ACTIVE</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-text-muted">Telegram:</span>
                            <span className="text-risk-medium font-bold">240ms</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-text-muted">DarkWeb:</span>
                            <span className="text-primary font-bold">SYNCED</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-border bg-surface-highlight/30">
                <div className="flex items-center gap-3 mb-5 px-2">
                    <div className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center text-xs font-bold text-foreground shadow-sm">
                        AG
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-foreground truncate">Agent Smith</p>
                        <p className="text-[10px] text-primary uppercase font-bold tracking-tighter">Clearance Level 4</p>
                    </div>
                </div>
                <Link href="/login">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-risk-high hover:text-risk-high hover:bg-risk-high/10 border border-transparent hover:border-risk-high/20">
                        <LogOut className="w-4 h-4 mr-2" />
                        TERMINATE SESSION
                    </Button>
                </Link>
            </div>
        </aside>
    );
}

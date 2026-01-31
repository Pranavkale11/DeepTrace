'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Globe, FileText, Settings, ShieldAlert, LogOut, Radar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { href: '/dashboard/campaigns', label: 'Campaign Explorer', icon: Globe },
        { href: '/dashboard/reports', label: 'Intelligence Reports', icon: FileText },
        { href: '/dashboard/settings', label: 'System Settings', icon: Settings },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-black/90 backdrop-blur-xl border-r border-white/10 flex flex-col z-30">
            <div className="h-16 flex items-center px-6 border-b border-white/10 bg-black/50">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <ShieldAlert className="w-6 h-6 text-primary relative z-10" />
                        <div className="absolute inset-0 bg-primary/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="text-lg font-bold tracking-wider text-white">
                        DEEP<span className="text-primary">TRACE</span>
                    </span>
                </Link>
            </div>

            <div className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
                <div className="px-3 mb-2 flex items-center justify-between">
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Analysis Modules</p>
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_5px_#0f0]"></span>
                </div>

                <div className="space-y-1 mb-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-all duration-200 group relative border border-transparent',
                                pathname === link.href
                                    ? 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(0,255,65,0.1)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10'
                            )}
                        >
                            <link.icon className={cn("w-4 h-4", pathname === link.href ? "text-primary" : "text-gray-500 group-hover:text-white")} />
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="px-3 mb-2">
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Active Monitoring</p>
                </div>
                <div className="bg-black/30 rounded border border-white/5 p-3 mx-2">
                    <div className="flex items-center gap-2 mb-2 text-xs text-secondary">
                        <Radar className="w-3 h-3 animate-spin duration-3000" />
                        <span>Scanning 4 Networks...</span>
                    </div>
                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary w-2/3 animate-pulse"></div>
                    </div>
                    <div className="mt-2 text-[10px] text-gray-500 font-mono">
                        Twitter API: <span className="text-green-500">Connected</span><br />
                        Reddit API: <span className="text-green-500">Connected</span><br />
                        Telegram: <span className="text-yellow-500">Latency 240ms</span>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-black/50">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                        AG
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">Agent Smith</p>
                        <p className="text-xs text-primary truncate">Level 4 Clearance</p>
                    </div>
                </div>
                <Link href="/login">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-950/30">
                        <LogOut className="w-4 h-4 mr-2" />
                        Terminate Session
                    </Button>
                </Link>
            </div>
        </aside>
    );
}

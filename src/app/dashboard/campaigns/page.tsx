'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Filter, AlertTriangle, Twitter, Facebook, Instagram, MessageCircle, MoreVertical, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { campaignsAPI } from '@/lib/api';

// Helper functions for data mapping
function getRelativeTime(dateString: string) {
    const now = new Date();
    const then = new Date(dateString);
    const diffInMs = now.getTime() - then.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins} min ago`;
    if (diffInHours < 24) return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
}

function getPlatformsByType(type: string) {
    const t = type?.toLowerCase() || 'default';
    switch (t) {
        case 'political': return ['twitter', 'facebook', 'telegram'];
        case 'malware': return ['twitter', 'reddit'];
        case 'commercial': return ['instagram', 'facebook', 'youtube'];
        default: return ['twitter', 'facebook'];
    }
}

export default function CampaignsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await campaignsAPI.getCampaigns();

                // Console.log API response before binding
                console.log('🔄 Campaign API response:', response);

                const mappedCampaigns = response.data.campaigns.map(c => ({
                    id: c.id,
                    name: c.title,
                    risk: Math.round(c.confidence_score),
                    status: c.status.charAt(0).toUpperCase() + c.status.slice(1),
                    bots: c.total_accounts,
                    platforms: getPlatformsByType(c.campaign_type),
                    lastActive: getRelativeTime(c.last_activity)
                }));

                setCampaigns(mappedCampaigns);
            } catch (err) {
                console.error('❌ Error fetching campaigns:', err);
                setError(err instanceof Error ? err.message : 'Failed to load campaigns data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    const filteredCampaigns = campaigns.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10 pb-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
            >
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1.5 tracking-tight group flex items-center gap-3">
                        Campaign Explorer
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse hidden md:block" />
                    </h1>
                    <p className="text-text-muted text-sm font-medium border-l-2 border-primary/30 pl-3">Real-time detection of coordinated Anti-India influence operations.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative group flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground w-full md:w-72 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                            placeholder="Search campaigns, hashtags..."
                        />
                    </div>
                    <Button variant="outline" size="sm" className="font-bold text-[10px] h-[44px] px-5 tracking-widest border-2 hover:bg-surface-highlight">
                        <Filter className="w-3.5 h-3.5 mr-2" />
                        FILTER
                    </Button>
                </div>
            </motion.div>

            {error ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="p-10 border-risk-high/30 bg-risk-high/5 text-center flex flex-col items-center gap-4">
                        <div className="p-4 bg-risk-high/10 rounded-full text-risk-high">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Connection Error</h3>
                            <p className="text-text-muted font-medium max-w-md mx-auto">{error}</p>
                        </div>
                        <Button
                            variant="outline"
                            className="mt-2 border-risk-high/50 text-risk-high hover:bg-risk-high/10"
                            onClick={() => window.location.reload()}
                        >
                            RETRY CONNECTION
                        </Button>
                    </Card>
                </motion.div>
            ) : isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="h-[280px] p-6 flex flex-col gap-5">
                            <div className="flex justify-between">
                                <Skeleton className="w-24 h-6 rounded" />
                                <Skeleton className="w-16 h-4 rounded" />
                            </div>
                            <Skeleton className="w-full h-8 rounded mt-2" />
                            <div className="flex gap-4">
                                <Skeleton className="w-20 h-4 rounded" />
                                <Skeleton className="w-24 h-4 rounded" />
                            </div>
                            <div className="mt-auto flex justify-between items-center">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(j => <Skeleton key={j} className="w-8 h-8 rounded-full border-2 border-surface" />)}
                                </div>
                                <Skeleton className="w-24 h-9 rounded" />
                            </div>
                        </Card>
                    ))}
                </div>
            ) : filteredCampaigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCampaigns.map((camp, idx) => (
                        <motion.div
                            key={camp.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <Link href={`/dashboard/campaigns/${camp.id}`} className="block focus-visible:outline-none">
                                <Card className="hover:border-primary/50 transition-all duration-500 cursor-pointer group h-full flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 border-border relative overflow-hidden focus-within:ring-2 focus-within:ring-primary/20">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={cn(
                                            "px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-[0.1em] border shadow-sm transition-all duration-500 group-hover:scale-105",
                                            camp.risk > 80 ? 'bg-risk-high/10 text-risk-high border-risk-high/20' :
                                                camp.risk > 50 ? 'bg-risk-medium/10 text-risk-medium border-risk-medium/20' :
                                                    'bg-risk-low/10 text-risk-low border-risk-low/20'
                                        )}>
                                            Risk Score: {camp.risk}
                                        </div>
                                        <span className="text-[10px] text-text-muted font-mono bg-surface-highlight px-2 py-0.5 rounded border border-border group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">{camp.lastActive}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-500 line-clamp-2 leading-tight tracking-tight">{camp.name}</h3>

                                    <div className="flex items-center gap-6 text-xs text-text-muted mb-8">
                                        <span className="flex items-center gap-1.5 font-medium group-hover:text-foreground/80 transition-colors">
                                            <AlertTriangle className="w-4 h-4 text-text-dim group-hover:text-risk-medium transition-colors" />
                                            {camp.bots.toLocaleString()} Bots
                                        </span>
                                        <div className="h-4 w-px bg-border md:block hidden" />
                                        <span className={cn(
                                            "font-bold flex items-center gap-2",
                                            camp.status === 'Active' ? 'text-foreground' : 'text-text-muted'
                                        )}>
                                            {camp.status === 'Active' && <span className="w-2 h-2 rounded-full bg-risk-high animate-pulse shadow-[0_0_8px_var(--risk-high)]" />}
                                            {camp.status.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/60 group-hover:border-primary/20 transition-colors">
                                        <div className="flex -space-x-2.5">
                                            {camp.platforms.map((p: string, i: number) => (
                                                <div key={i} className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-text-muted z-10 hover:z-20 hover:scale-110 hover:text-primary hover:border-primary/50 transition-all shadow-sm group-hover:border-primary/30">
                                                    {p === 'twitter' && <Twitter className="w-4 h-4" />}
                                                    {p === 'facebook' && <Facebook className="w-4 h-4" />}
                                                    {p === 'instagram' && <Instagram className="w-4 h-4" />}
                                                    {p === 'telegram' && <MessageCircle className="w-4 h-4" />}
                                                    {p === 'tiktok' && <span className="font-bold text-[10px]">TT</span>}
                                                    {p === 'youtube' && <span className="font-bold text-[10px]">YT</span>}
                                                    {p === 'reddit' && <span className="font-bold text-[10px]">RD</span>}
                                                    {p === 'whatsapp' && <span className="font-bold text-[10px]">WA</span>}
                                                </div>
                                            ))}
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-[10px] h-9 font-bold tracking-widest hover:bg-primary/5 group-hover:text-primary">VIEW DETAILS</Button>
                                    </div>

                                    {/* Risk Meter at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-highlight overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${camp.risk}%` }}
                                            transition={{ duration: 1.5, delay: idx * 0.1, ease: [0.4, 0, 0.2, 1] }}
                                            className={cn(
                                                "h-full transition-shadow duration-500",
                                                camp.risk > 80 ? 'bg-risk-high shadow-[0_0_10px_var(--risk-high)]' :
                                                    camp.risk > 50 ? 'bg-risk-medium' :
                                                        'bg-risk-low'
                                            )}
                                        />
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-32 text-center"
                >
                    <div className="p-8 bg-surface-highlight/20 rounded-full mb-6 relative overflow-hidden group">
                        <Search className="w-16 h-16 text-text-dim opacity-20 group-hover:scale-110 transition-transform duration-700" />
                        <motion.div
                            animate={{ x: [-30, 30], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                            className="absolute inset-0 bg-primary/10 w-1/2 rounded-full blur-2xl"
                        />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">No active campaigns detected</h3>
                    <p className="text-text-muted text-sm max-w-sm font-medium">System monitoring live feeds... Adjust your search parameters or filters to refine tracking capability.</p>
                </motion.div>
            )}
        </div>
    );
}

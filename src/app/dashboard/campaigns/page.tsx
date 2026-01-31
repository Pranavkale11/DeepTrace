'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Filter, AlertTriangle, Twitter, Facebook, Instagram, MessageCircle, MoreVertical } from 'lucide-react';
import Link from 'next/link';

const campaigns = [
    { id: '1', name: '#KhalistanReferendum Botnet', risk: 95, status: 'Active', bots: 3420, platforms: ['twitter', 'facebook'], lastActive: '2 min ago' },
    { id: '2', name: 'Fake News: Border Tensions', risk: 88, status: 'Investigating', bots: 850, platforms: ['telegram', 'whatsapp'], lastActive: '15 min ago' },
    { id: '3', name: 'Deepfake: Minister Resignation', risk: 92, status: 'Blocking', bots: 1560, platforms: ['twitter', 'youtube'], lastActive: '1 hr ago' },
    { id: '4', name: 'Narrative: Economic Collapse', risk: 75, status: 'Monitoring', bots: 430, platforms: ['reddit', 'twitter'], lastActive: '30 min ago' },
    { id: '5', name: 'Insurgent Support Group', risk: 65, status: 'Resolved', bots: 120, platforms: ['facebook'], lastActive: '5 hrs ago' },
    { id: '6', name: 'Coordinated Hate Speech', risk: 82, status: 'Active', bots: 980, platforms: ['instagram', 'twitter'], lastActive: 'Just now' },
];

export default function CampaignsPage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Campaign Explorer</h1>
                    <p className="text-gray-400 text-sm">Real-time detection of coordinated Anti-India influence operations.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative group">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                        <input type="text" className="bg-black/50 border border-white/10 rounded-md pl-9 pr-4 py-2 text-sm text-white w-64 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all" placeholder="Search campaigns, hashtags..." />
                    </div>
                    <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((camp) => (
                    <Link href={`/dashboard/campaigns/${camp.id}`} key={camp.id}>
                        <Card className="hover:border-primary/50 transition-all duration-300 cursor-pointer group h-full hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(0,0,0,0.5)] bg-[#0a0a0a]">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${camp.risk > 80 ? 'bg-red-900/40 text-red-500 border border-red-500/30 shadow-[0_0_8px_rgba(255,0,0,0.2)]' :
                                        camp.risk > 50 ? 'bg-yellow-900/40 text-yellow-500 border border-yellow-500/30' :
                                            'bg-green-900/40 text-green-500 border border-green-500/30'
                                    }`}>
                                    Risk Score: {camp.risk}
                                </div>
                                <span className="text-xs text-gray-500 font-mono">{camp.lastActive}</span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">{camp.name}</h3>

                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                                <span className="flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    {camp.bots} Bots
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                <span className={camp.status === 'Active' ? 'text-white font-medium flex items-center gap-2' : ''}>
                                    {camp.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                                    {camp.status}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <div className="flex -space-x-2">
                                    {camp.platforms.map((p, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-gray-400 z-0">
                                            {p === 'twitter' && <Twitter className="w-4 h-4" />}
                                            {p === 'facebook' && <Facebook className="w-4 h-4" />}
                                            {p === 'instagram' && <Instagram className="w-4 h-4" />}
                                            {p === 'telegram' && <MessageCircle className="w-4 h-4" />}
                                            {p === 'tiktok' && <span className="text-[10px] font-bold">TT</span>}
                                            {p === 'youtube' && <span className="text-[10px] font-bold">YT</span>}
                                            {p === 'reddit' && <span className="text-[10px] font-bold">RD</span>}
                                            {p === 'whatsapp' && <span className="text-[10px] font-bold">WA</span>}
                                        </div>
                                    ))}
                                </div>
                                <Button variant="ghost" size="sm" className="text-xs h-8">View Details</Button>
                            </div>

                            {/* Progress Bar for Risk */}
                            <div className="absolute bottom-0 left-0 h-0.5 bg-gray-800 w-full group-hover:h-1 transition-all">
                                <div className={`h-full ${camp.risk > 80 ? 'bg-red-500 shadow-[0_0_10px_red]' :
                                        camp.risk > 50 ? 'bg-yellow-500' :
                                            'bg-green-500'
                                    }`} style={{ width: `${camp.risk}%` }}></div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

'use client';

import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Download, AlertOctagon, TrendingUp, Users, FileText, Zap } from 'lucide-react';
import Link from 'next/link';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const spreadData = [
    { time: 'T-24h', mentions: 120 },
    { time: 'T-18h', mentions: 890 },
    { time: 'T-12h', mentions: 2200 },
    { time: 'T-6h', mentions: 5400 },
    { time: 'Now', mentions: 12800 },
];

export default function CampaignDetailsPage() {
    const params = useParams();
    const id = params.id;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right duration-700 pb-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-4 justify-between">
                <div className="flex items-center gap-6 w-full lg:w-auto">
                    <Link href="/dashboard/campaigns">
                        <Button variant="ghost" size="sm" className="pl-0 hover:pl-2 transition-all text-text-muted hover:text-foreground">
                            <ArrowLeft className="w-4 h-4 mr-2" /> BACK
                        </Button>
                    </Link>
                    <div className="h-10 w-px bg-border hidden md:block" />
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">#KhalistanReferendum Botnet</h1>
                            <span className="px-3 py-1 rounded-full bg-risk-high/10 text-risk-high border border-risk-high/30 text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-risk-high/10 animate-pulse">
                                CRITICAL RISK
                            </span>
                        </div>
                        <p className="text-text-muted text-[10px] font-mono mt-1.5 flex items-center gap-2">
                            <span className="text-primary font-bold">CAMPAIGN ID:</span> {id}
                            <span className="text-text-dim px-2">|</span>
                            <span className="text-primary font-bold">MODE:</span> HEURISTIC SCANNER A-7
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                    <Button variant="outline" className="font-bold text-[10px] tracking-widest flex-1 lg:flex-none py-2.5">
                        <Download className="w-4 h-4 mr-2" /> EXPORT EVIDENCE
                    </Button>
                    <Button variant="danger" className="font-bold text-[10px] tracking-widest flex-1 lg:flex-none shadow-xl shadow-risk-high/20 py-2.5">
                        <AlertOctagon className="w-4 h-4 mr-2" /> INITIATE TAKEDOWN
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Narrative */}
                <Card className="lg:col-span-2 shadow-sm border-t-2 border-primary">
                    <div className="flex items-center justify-between mb-8 border-b border-border pb-6 bg-surface-highlight/10 px-2 -mx-2 -mt-2 rounded-t-lg">
                        <h3 className="text-lg font-bold text-foreground flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <FileText className="w-5 h-5" />
                            </div>
                            Narrative Analysis
                        </h3>
                        <div className="text-right">
                            <span className="text-[10px] text-text-muted font-bold block">CONFIDENCE SCORE</span>
                            <span className="text-primary font-mono font-bold text-sm">99.2%</span>
                        </div>
                    </div>
                    <div className="space-y-8 px-2">
                        <div className="p-5 bg-surface-highlight/30 rounded-xl border border-border group hover:bg-surface-highlight transition-colors duration-300">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Core Narrative</p>
                            <p className="text-foreground leading-relaxed">
                                The campaign is artificially amplifying support for separationist movements, using manipulated images and coordinated hashtags to feign global consensus.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Origin Point</p>
                                <div className="p-4 bg-surface-highlight/20 rounded-lg border border-border border-dashed font-medium text-foreground">
                                    Traced back to a server farm in Region Z. Initially seeded via verified compromised accounts.
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Tactics Employed</p>
                                <ul className="space-y-2.5">
                                    {['Hashtag Hijacking', 'Sleeper Bot Activation', 'Deepfake Audio Clips'].map(t => (
                                        <li key={t} className="flex items-center gap-3 text-sm text-foreground font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="p-6 bg-surface-highlight/50 rounded-xl border border-secondary/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Zap className="w-12 h-12 text-secondary" />
                            </div>
                            <p className="font-bold text-[10px] text-secondary mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
                                <Zap className="w-3.5 h-3.5 animate-pulse" /> AI Extracted Keyphrases
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {['"Referendum 2026"', '"State Oppression"', '"Human Rights"', '"UN Intervention"', '"Freedom March"'].map(tag => (
                                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-surface border border-secondary/20 text-secondary text-[11px] font-mono font-bold hover:bg-secondary/10 hover:border-secondary/40 transition-all cursor-default shadow-sm">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Bot Probability */}
                <Card className="relative overflow-hidden shadow-sm border-t-2 border-risk-high">
                    <h3 className="text-lg font-bold text-foreground mb-10 flex items-center gap-3">
                        <div className="p-2 bg-risk-high/10 rounded-lg text-risk-high">
                            <Users className="w-5 h-5" />
                        </div>
                        Bot Intelligence
                    </h3>

                    <div className="flex flex-col items-center justify-center py-4">
                        <div className="relative inline-flex items-center justify-center mb-10 group">
                            <svg className="w-48 h-48 transform -rotate-90 transition-transform duration-1000">
                                <circle cx="96" cy="96" r="80" stroke="var(--border)" strokeWidth="12" fill="transparent" />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    stroke="var(--risk-high)"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray="502.4"
                                    strokeDashoffset="25.12"
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_15px_var(--accent-glow)] opacity-90 transition-all duration-1000 group-hover:opacity-100"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-5xl font-black text-foreground tracking-tighter">95%</span>
                                <span className="text-[10px] font-black text-risk-high uppercase tracking-[0.25em] mt-1.5">BOT PROBABILITY</span>
                            </div>
                        </div>

                        <div className="w-full space-y-6 px-4">
                            {[
                                { label: 'Account Age < 30 days', val: 92, color: 'var(--risk-high)' },
                                { label: 'Foreign IP Address', val: 88, color: 'var(--risk-medium)' },
                                { label: 'Posting Pattern', val: 99, color: 'var(--primary)' }
                            ].map(item => (
                                <div key={item.label} className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                                        <span className="text-text-muted">{item.label}</span>
                                        <span className="text-foreground">{item.val}% Match</span>
                                    </div>
                                    <div className="w-full bg-surface-highlight h-2 rounded-full overflow-hidden border border-border shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.val}%` }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            style={{ backgroundColor: item.color }}
                                            className="h-full rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Spread Timeline */}
                <Card className="lg:col-span-3 h-[500px] shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between mb-10 px-2 pt-2">
                        <h3 className="text-lg font-bold text-foreground flex items-center gap-3">
                            <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            Spread Velocity Analysis
                        </h3>
                        <div className="flex gap-2.5 bg-surface-highlight/50 p-1.5 rounded-xl border border-border">
                            {['1H', '24H', '7D'].map(t => (
                                <Button key={t} variant="ghost" size="sm" className={cn(
                                    "text-[10px] font-bold px-4 py-1.5 h-auto rounded-lg transition-all",
                                    t === '24H' ? 'bg-surface shadow-sm text-foreground border border-border' : 'text-text-muted hover:text-foreground'
                                )}>{t}</Button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[350px] w-full pr-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={spreadData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.5} />
                                <XAxis
                                    dataKey="time"
                                    stroke="var(--text-dim)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={15}
                                    fontWeight="bold"
                                    letterSpacing={1}
                                />
                                <YAxis
                                    stroke="var(--text-dim)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    dx={-10}
                                    fontWeight="bold"
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--foreground)',
                                        borderRadius: '12px',
                                        padding: '12px',
                                        fontSize: '12px',
                                        boxShadow: '0 10px 30px -5px rgb(0 0 0 / 0.1)'
                                    }}
                                    itemStyle={{ color: 'var(--secondary)', fontWeight: 'bold' }}
                                    cursor={{ stroke: 'var(--secondary)', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="mentions"
                                    stroke="var(--secondary)"
                                    strokeWidth={4}
                                    dot={{ fill: 'var(--surface)', stroke: 'var(--secondary)', strokeWidth: 3, r: 6 }}
                                    activeDot={{ r: 9, fill: 'var(--secondary)', stroke: 'var(--surface)', strokeWidth: 3 }}
                                    animationDuration={2000}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
}

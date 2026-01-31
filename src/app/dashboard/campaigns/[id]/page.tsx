'use client';

import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Download, AlertOctagon, TrendingUp, Users, FileText, Zap } from 'lucide-react';
import Link from 'next/link';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const spreadData = [
    { time: 'T-24h', mentions: 120 },
    { time: 'T-18h', mentions: 890 },
    { time: 'T-12h', mentions: 2200 },
    { time: 'T-6h', mentions: 5400 },
    { time: 'Now', mentions: 12800 },
];

export default function CampaignDetailsPage() {
    const params = useParams();
    const id = params.id; // In a real app, fetch data based on ID

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500 pb-10">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 justify-between">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <Link href="/dashboard/campaigns">
                        <Button variant="ghost" size="sm" className="pl-0 hover:pl-2 transition-all"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">#KhalistanReferendum Botnet</h1>
                            <span className="px-2 py-0.5 rounded bg-red-900/40 text-red-500 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(255,0,0,0.3)] animate-pulse">Critical Risk</span>
                        </div>
                        <p className="text-gray-400 text-xs font-mono mt-1">CAMPAIGN ID: {id} // DETECTED VIA HEURISTIC SCANNER A-7</p>
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export Evidence Pack</Button>
                    <Button variant="danger" className="shadow-[0_0_15px_rgba(255,0,60,0.4)]"><AlertOctagon className="w-4 h-4 mr-2" /> Initiate Takedown Protocol</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Narrative */}
                <Card className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" /> Narrative Analysis
                        </h3>
                        <span className="text-xs text-gray-500 font-mono">CONFIDENCE SCORE: 99.2%</span>
                    </div>
                    <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
                        <div className="p-4 bg-white/5 rounded border border-white/10">
                            <p className="text-white font-medium mb-1">Core Narrative</p>
                            <p className="text-gray-400">The campaign is artificially amplifying support for separationist movements, using manipulated images and coordinated hashtags to feign global consensus.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Origin Point</p>
                                <p className="text-white">Traced back to a server farm in Region Z. Initially seeded via verified compromised accounts.</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Tactics Employed</p>
                                <ul className="list-disc list-inside text-gray-400 marker:text-primary">
                                    <li>Hashtag Hijacking</li>
                                    <li>Sleeper Bot Activation</li>
                                    <li>Deepfake Audio Clips</li>
                                </ul>
                            </div>
                        </div>

                        <div className="p-4 bg-black/40 rounded border border-secondary/20 mt-4 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-secondary/5 group-hover:bg-secondary/10 transition-colors"></div>
                            <p className="font-mono text-xs text-secondary mb-3 flex items-center gap-2 uppercase tracking-wider relative z-10">
                                <Zap className="w-3 h-3" /> AI Extracted Keyphrases
                            </p>
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {['"Referendum 2026"', '"State Oppression"', '"Human Rights"', '"UN Intervention"', '"Freedom March"'].map(tag => (
                                    <span key={tag} className="px-2 py-1.5 rounded bg-black/60 border border-secondary/30 text-secondary text-xs font-mono hover:bg-secondary/20 transition-colors cursor-default">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Bot Probability */}
                <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <Users className="w-24 h-24" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                        <Users className="w-5 h-5 text-accent" /> Bot Configuration
                    </h3>

                    <div className="flex flex-col items-center justify-center py-6 relative z-10">
                        <div className="relative inline-flex items-center justify-center mb-6">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="#222" strokeWidth="10" fill="transparent" />
                                <circle cx="80" cy="80" r="70" stroke="#ff003c" strokeWidth="10" fill="transparent" strokeDasharray="440" strokeDashoffset="25" strokeLinecap="round" className="drop-shadow-[0_0_15px_rgba(255,0,60,0.6)] animate-[dash_1.5s_ease-out_forwards]" />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-4xl font-bold text-white tracking-tighter">95%</span>
                                <span className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">Bot Probability</span>
                            </div>
                        </div>

                        <div className="w-full space-y-4 px-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-gray-400">Account Age &lt; 30 days</span>
                                    <span className="text-white">92% Match</span>
                                </div>
                                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-accent h-full w-[92%] rounded-full shadow-[0_0_10px_red]"></div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-gray-400">Foreign IP Address</span>
                                    <span className="text-white">88% Match</span>
                                </div>
                                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-yellow-500 h-full w-[88%] rounded-full"></div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-gray-400">Posting Pattern (Automated)</span>
                                    <span className="text-white">99% Match</span>
                                </div>
                                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[99%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Spread Timeline */}
                <Card className="lg:col-span-3 h-[450px]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-secondary" /> Spread Velocity Analysis
                        </h3>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-xs border border-white/10 active:bg-white/10">1H</Button>
                            <Button variant="ghost" size="sm" className="text-xs border border-white/10 bg-white/5">24H</Button>
                            <Button variant="ghost" size="sm" className="text-xs border border-white/10 active:bg-white/10">7D</Button>
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={spreadData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} dy={15} />
                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#050505', borderColor: '#333', color: '#fff', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                                    itemStyle={{ color: '#00f3ff', fontWeight: 'bold' }}
                                    cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="mentions"
                                    stroke="#00f3ff"
                                    strokeWidth={3}
                                    dot={{ fill: '#000', stroke: '#00f3ff', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 8, fill: '#00f3ff', stroke: '#fff', strokeWidth: 2 }}
                                    animationDuration={1500}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
}

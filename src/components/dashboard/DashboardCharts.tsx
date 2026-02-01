'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card } from '@/components/ui/Card';

const dataPie = [
    { name: 'Low Risk', value: 45, color: '#00ff41' },
    { name: 'Medium Risk', value: 30, color: '#ffe600' },
    { name: 'High Risk', value: 25, color: '#ff003c' },
];

const dataArea = [
    { time: '00:00', activity: 2400 },
    { time: '04:00', activity: 1398 },
    { time: '08:00', activity: 9800 },
    { time: '12:00', activity: 3908 },
    { time: '16:00', activity: 4800 },
    { time: '20:00', activity: 3800 },
    { time: '23:59', activity: 4300 },
];

export function DashboardCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="min-h-[420px] flex flex-col shadow-sm">
                <div className="mb-8 flex justify-between items-center px-2">
                    <h3 className="text-lg font-bold text-foreground">Threat Distribution</h3>
                    <select className="bg-surface border border-border rounded-lg text-[10px] font-bold tracking-widest px-3 py-1.5 text-text-muted focus:outline-none focus:border-primary transition-all shadow-sm">
                        <option>LAST 24 HOURS</option>
                        <option>LAST 7 DAYS</option>
                        <option>LAST 30 DAYS</option>
                    </select>
                </div>
                <div className="flex-1 h-[260px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={dataPie}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                                animationDuration={1000}
                                animationBegin={0}
                            >
                                {dataPie.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--foreground)',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                }}
                                itemStyle={{ color: 'var(--foreground)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <p className="text-3xl font-bold text-foreground">1,240</p>
                        <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">Total Threats</p>
                    </div>
                </div>
                <div className="flex justify-center gap-8 text-[11px] font-bold tracking-tight mt-6 pb-2">
                    {dataPie.map((item) => (
                        <div key={item.name} className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-text-muted uppercase tracking-wider">{item.name}</span>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="min-h-[420px] flex flex-col shadow-sm">
                <div className="mb-8 flex justify-between items-center px-2">
                    <h3 className="text-lg font-bold text-foreground">Scanned Network Traffic</h3>
                    <div className="flex items-center gap-3">
                        <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_var(--secondary)]" />
                        <span className="text-[10px] text-secondary font-bold tracking-[0.2em]">LIVE ENGINE</span>
                    </div>
                </div>
                <div className="flex-1 h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dataArea}>
                            <defs>
                                <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.5} />
                            <XAxis
                                dataKey="time"
                                stroke="var(--text-dim)"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                dy={15}
                                letterSpacing={1}
                            />
                            <YAxis
                                stroke="var(--text-dim)"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                dx={-10}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--foreground)',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    fontSize: '12px',
                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                }}
                                cursor={{ stroke: 'var(--primary)', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="activity"
                                stroke="var(--secondary)"
                                fillOpacity={1}
                                fill="url(#colorActivity)"
                                strokeWidth={3}
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}

'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card } from '@/components/ui/Card';
import { useState, useEffect } from 'react';

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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="min-h-[400px] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            </Card>
            <Card className="min-h-[400px] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-secondary border-t-transparent animate-spin"></div>
            </Card>
        </div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="min-h-[400px]">
                <div className="mb-6 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Threat Distribution by Severity</h3>
                    <select className="bg-black border border-white/10 rounded text-xs px-2 py-1 text-gray-400 focus:outline-none focus:border-primary">
                        <option>Last 24 Hours</option>
                        <option>Last 7 Days</option>
                    </select>
                </div>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={dataPie}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {dataPie.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#050505', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 text-sm mt-6">
                    {dataPie.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full shadow-[0_0_5px_currentColor]" style={{ backgroundColor: item.color, color: item.color }} />
                            <span className="text-gray-300 font-medium">{item.name}</span>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="min-h-[400px]">
                <div className="mb-6 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Network Activity Volume</h3>
                    <div className="flex gap-2">
                        <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                        <span className="text-xs text-secondary font-mono">LIVE FEED</span>
                    </div>
                </div>
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dataArea}>
                            <defs>
                                <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                            <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                            <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#050505', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
                                cursor={{ stroke: '#fff', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area type="monotone" dataKey="activity" stroke="#00f3ff" fillOpacity={1} fill="url(#colorActivity)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}

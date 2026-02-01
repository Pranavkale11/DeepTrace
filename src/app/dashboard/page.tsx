'use client';

import { StatCard } from '@/components/dashboard/StatCard';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { AlertCircle, Globe, Share2, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';

export default function DashboardPage() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial={false}
            animate="visible"
            className="flex flex-col gap-10 pb-10"
        >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1.5 tracking-tight group flex items-center gap-3">
                        Command Center
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse hidden md:block" />
                    </h1>
                    <p className="text-text-muted text-sm flex items-center gap-2 font-medium">
                        System Status:
                        <span className="inline-flex items-center gap-1.5 text-primary font-mono font-bold text-[10px] bg-primary/10 px-2.5 py-1 rounded border border-primary/20 shadow-[0_0_10px_rgba(0,255,65,0.1)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            OPTIMAL
                        </span>
                        <span className="text-text-dim px-2">|</span>
                        Monitoring 4 Global Networks
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="font-bold text-[10px] tracking-widest border-2" aria-label="Export audit data">EXPORT DATA</Button>
                    <Button variant="primary" size="sm" className="font-bold text-[10px] tracking-widest shadow-lg shadow-primary/20" aria-label="Start new intelligence analysis">NEW ANALYSIS</Button>
                </div>
            </motion.div>

            {/* KPI Cards section wrapper */}
            <motion.section
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <StatCard title="Active Campaigns" value="12" trend="14%" trendUp icon={Share2} variant="default" index={0} />
                <StatCard title="High Risk Alerts" value="3" trend="2" trendUp icon={AlertCircle} variant="danger" index={1} />
                <StatCard title="Bot Networks" value="8" trend="Stable" trendUp={false} icon={Globe} variant="warning" index={2} />
                <StatCard title="Mitigated Threats" value="1,240" trend="24%" trendUp icon={Shield} variant="success" index={3} />
            </motion.section>

            {/* Charts */}
            <motion.div variants={itemVariants}>
                <DashboardCharts />
            </motion.div>

            {/* Recent Alerts Table */}
            <motion.div variants={itemVariants}>
                <Card className="border-t-4 border-t-accent shadow-xl shadow-black/5 overflow-hidden" noPadding>
                    <div className="flex items-center justify-between p-6 border-b border-border bg-surface-highlight/30">
                        <h3 className="text-lg font-bold text-foreground flex items-center gap-3 tracking-tight">
                            <div className="p-2 bg-accent/10 rounded-lg text-accent shadow-sm">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            Critical Security Alerts
                        </h3>
                        <Button variant="ghost" size="sm" className="text-[10px] font-bold tracking-widest hover:bg-surface-highlight">VIEW AUDIT LOGS</Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-[10px] text-text-muted uppercase tracking-[0.2em] bg-surface-highlight/50 border-b border-border font-bold">
                                <tr>
                                    <th className="px-6 py-4">Alert ID</th>
                                    <th className="px-6 py-4">Severity</th>
                                    <th className="px-6 py-4">Campaign Cluster</th>
                                    <th className="px-6 py-4">Primary Vector</th>
                                    <th className="px-6 py-4">Timestamp</th>
                                    <th className="px-6 py-4 text-right">Current Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[
                                    { id: 'ALT-104-552', sev: 'High', cam: 'Border Unrest Surge (Phase II)', vec: 'Twitter', time: '10 min ago', status: 'Active' },
                                    { id: 'ALT-104-553', sev: 'Medium', cam: 'Election Disinfo Vector 7', vec: 'Telegram', time: '45 min ago', status: 'Investigating' },
                                    { id: 'ALT-104-554', sev: 'Low', cam: 'Persona Op: Sector Gamma', vec: 'Facebook', time: '2 hrs ago', status: 'Resolved' },
                                    { id: 'ALT-104-555', sev: 'High', cam: 'Deepfake: Institutional Trust', vec: 'TikTok', time: '4 hrs ago', status: 'Blocked' },
                                    { id: 'ALT-104-556', sev: 'High', cam: 'Botnet: Regional Sentiment', vec: 'Twitter', time: '5 hrs ago', status: 'Blocked' },
                                ].map((row, idx) => (
                                    <tr key={row.id} className="hover:bg-surface-highlight/60 transition-all group cursor-pointer">
                                        <td className="px-6 py-5 font-mono text-text-muted text-xs group-hover:text-primary transition-colors">{row.id}</td>
                                        <td className="px-6 py-5">
                                            <span className={cn(
                                                "inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border shadow-sm transition-all duration-300 group-hover:scale-105",
                                                row.sev === 'High' ? 'bg-risk-high/10 text-risk-high border-risk-high/20' :
                                                    row.sev === 'Medium' ? 'bg-risk-medium/10 text-risk-medium border-risk-medium/20' :
                                                        'bg-risk-low/10 text-risk-low border-risk-low/20'
                                            )}>
                                                {row.sev}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">{row.cam}</td>
                                        <td className="px-6 py-5 text-text-muted font-medium">{row.vec}</td>
                                        <td className="px-6 py-5 text-text-muted text-xs italic">{row.time}</td>
                                        <td className="px-6 py-5 text-right">
                                            <span className="inline-flex items-center gap-2 text-text-muted font-bold text-[10px] tracking-widest ml-auto uppercase">
                                                <div className={cn(
                                                    "w-1.5 h-1.5 rounded-full",
                                                    row.status === 'Active' ? 'bg-risk-high animate-pulse shadow-[0_0_8px_var(--risk-high)]' : 'bg-text-dim'
                                                )} />
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
}

import { StatCard } from '@/components/dashboard/StatCard';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { AlertCircle, Globe, Share2, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500 pb-10">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Command Center</h1>
                <p className="text-gray-400">System Status: <span className="text-primary font-mono font-bold glow">OPTIMAL</span> // Monitoring 4 Global Networks</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Campaigns"
                    value="12"
                    trend="14%"
                    trendUp={true}
                    icon={Share2}
                    variant="default"
                />
                <StatCard
                    title="High Risk Alerts"
                    value="3"
                    trend="2"
                    trendUp={true}
                    icon={AlertCircle}
                    variant="danger"
                />
                <StatCard
                    title="Bot Networks"
                    value="8"
                    trend="Stable"
                    trendUp={false}
                    icon={Globe}
                    variant="warning"
                />
                <StatCard
                    title="Mitigated Threats"
                    value="1,240"
                    trend="24%"
                    trendUp={true}
                    icon={Shield}
                    variant="success"
                />
            </div>

            {/* Charts */}
            <DashboardCharts />

            {/* Recent Alerts Table */}
            <Card className="border-t-2 border-t-accent/50">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-accent" />
                        Recent Security Alerts
                    </h3>
                    <Button variant="outline" size="sm">View All Logs</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-white/5">
                            <tr>
                                <th className="px-6 py-3 rounded-l">Alert ID</th>
                                <th className="px-6 py-3">Severity</th>
                                <th className="px-6 py-3">Campaign</th>
                                <th className="px-6 py-3">Vector</th>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3 rounded-r">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { id: 'ALT-2024-001', sev: 'High', cam: '#Elections2024', vec: 'Twitter', time: '10 min ago', status: 'Active' },
                                { id: 'ALT-2024-002', sev: 'Medium', cam: 'CryptoScam_X', vec: 'Telegram', time: '45 min ago', status: 'Investigating' },
                                { id: 'ALT-2024-003', sev: 'Low', cam: 'BrandImpersonation', vec: 'Facebook', time: '2 hrs ago', status: 'Resolved' },
                                { id: 'ALT-2024-004', sev: 'High', cam: 'Deepfake_Viral', vec: 'TikTok', time: '4 hrs ago', status: 'Blocked' },
                                { id: 'ALT-2024-005', sev: 'High', cam: 'Coordinated_Hate', vec: 'Twitter', time: '5 hrs ago', status: 'Blocked' },
                            ].map((row) => (
                                <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-gray-300 group-hover:text-primary transition-colors">{row.id}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${row.sev === 'High' ? 'bg-red-900/20 text-red-500 border border-red-500/50 shadow-[0_0_10px_rgba(255,0,0,0.2)]' :
                                                row.sev === 'Medium' ? 'bg-yellow-900/20 text-yellow-500 border border-yellow-500/50' :
                                                    'bg-green-900/20 text-green-500 border border-green-500/50'
                                            }`}>
                                            {row.sev}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">{row.cam}</td>
                                    <td className="px-6 py-4 text-gray-400">{row.vec}</td>
                                    <td className="px-6 py-4 text-gray-400">{row.time}</td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-2 text-gray-300">
                                            <div className={`w-2 h-2 rounded-full ${row.status === 'Active' ? 'bg-red-500 animate-pulse shadow-[0_0_8px_red]' : 'bg-gray-500'}`} />
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

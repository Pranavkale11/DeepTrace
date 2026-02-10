'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileText, Download, Calendar, Lock, ShieldAlert, Zap, Search, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/Skeleton';
import { useState, useEffect } from 'react';
import { reportsAPI, ReportsResponse } from '@/lib/api';

export default function ReportsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reports, setReports] = useState<ReportsResponse['data']['reports']>([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await reportsAPI.getReports();

                // Console.log API response before binding
                console.log('🔄 Reports API response:', response);

                setReports(response.data.reports);
            } catch (err) {
                console.error('❌ Error fetching reports:', err);
                setError(err instanceof Error ? err.message : 'Failed to load intelligence reports');
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-10 pb-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
            >
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1.5 tracking-tight">Intelligence Reports</h1>
                    <p className="text-text-muted text-sm font-medium border-l-2 border-primary/30 pl-3">Automated and analyst-curated situational awareness reports for active monitoring.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="font-bold text-[10px] tracking-widest border-2 hover:bg-surface-highlight" aria-label="Filter reports by date">FILTER BY DATE</Button>
                    <Button variant="primary" size="sm" className="font-bold text-[10px] tracking-widest shadow-lg shadow-primary/20" aria-label="Generate new report">GENERATE NEW REPORT</Button>
                </div>
            </motion.div>

            {error ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                >
                    <Card className="p-10 border-risk-high/30 bg-risk-high/5 text-center flex flex-col items-center gap-4 max-w-2xl">
                        <div className="p-4 bg-risk-high/10 rounded-full text-risk-high">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Report Access Denied</h3>
                            <p className="text-text-muted font-medium mb-6">Unable to synchronize with the intelligence repository. Error: {error}</p>
                        </div>
                        <Button
                            variant="outline"
                            className="border-risk-high/50 text-risk-high hover:bg-risk-high/10"
                            onClick={() => window.location.reload()}
                        >
                            RETRY CONNECTION
                        </Button>
                    </Card>
                </motion.div>
            ) : isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="p-6 flex flex-col gap-5 h-[320px]">
                            <div className="flex justify-between">
                                <Skeleton className="w-12 h-12 rounded-xl" />
                                <Skeleton className="w-24 h-5 rounded" />
                            </div>
                            <Skeleton className="w-full h-8 rounded mt-2" />
                            <div className="space-y-2">
                                <Skeleton className="w-full h-4 rounded" />
                                <Skeleton className="w-3/4 h-4 rounded" />
                                <Skeleton className="w-1/2 h-4 rounded" />
                            </div>
                            <div className="mt-auto flex gap-3">
                                <Skeleton className="flex-1 h-10 rounded" />
                                <Skeleton className="w-10 h-10 rounded" />
                            </div>
                        </Card>
                    ))}
                </div>
            ) : reports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reports.map((report, idx) => (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <Card className="hover:border-primary/40 transition-all duration-500 cursor-pointer group flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 h-full relative overflow-hidden focus-within:ring-2 focus-within:ring-primary/20">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary/20 transition-all border border-primary/20 group-hover:border-primary/40 shadow-sm relative overflow-hidden">
                                        <FileText className="w-6 h-6 z-10 relative" />
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                            className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                    <span className="text-[10px] text-text-muted flex items-center gap-1.5 font-mono bg-surface-highlight px-2.5 py-1.5 rounded border border-border group-hover:border-primary/20 transition-colors">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {formatDate(report.published_at)}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight tracking-tight">
                                    {report.title}
                                </h3>
                                <p className="text-sm text-text-muted mb-8 line-clamp-3 leading-relaxed font-medium">
                                    {report.summary}
                                </p>

                                <div className="flex gap-3 mt-auto pt-6 border-t border-border/60 group-hover:border-primary/20 transition-colors">
                                    <Button
                                        variant="outline"
                                        className="flex-1 text-[10px] font-bold tracking-widest group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/30 transition-all h-10"
                                        aria-label={`Download ${report.title} PDF`}
                                    >
                                        <Download className="w-3.5 h-3.5 mr-2" />
                                        DOWNLOAD PDF
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="px-3 text-text-dim hover:text-foreground hover:bg-surface-highlight border border-transparent hover:border-border h-10"
                                        aria-label="Secure report options"
                                    >
                                        <Lock className="w-4 h-4" />
                                    </Button>
                                </div>
                                {(report.severity === 'high' || report.severity === 'critical') && (
                                    <div className="absolute top-0 right-0 w-2 h-2 bg-risk-high rounded-full m-3 animate-pulse shadow-[0_0_8px_var(--risk-high)]" title={`${report.severity.toUpperCase()} Priority`} />
                                )}
                            </Card>
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
                        <FileText className="w-16 h-16 text-text-dim opacity-20 group-hover:scale-110 transition-transform duration-700" />
                        <motion.div
                            animate={{ x: [-30, 30], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                            className="absolute inset-0 bg-primary/10 w-1/2 rounded-full blur-2xl"
                        />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">No intelligence reports found</h3>
                    <p className="text-text-muted text-sm max-w-sm font-medium">The system has not generated any reports for the current filter criteria.</p>
                </motion.div>
            )}
        </div>
    );
}

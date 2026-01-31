import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileText, Download, Calendar, Lock } from 'lucide-react';

export default function ReportsPage() {
    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Intelligence Reports</h1>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Filter by Date</Button>
                    <Button variant="primary" size="sm">Generate New Report</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer group bg-[#0a0a0a]">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="text-xs text-gray-500 flex items-center gap-1 font-mono">
                                <Calendar className="w-3 h-3" />
                                2026-02-{14 + i}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">Sector 7 Analysis: Threat Level {i % 2 === 0 ? 'High' : 'Medium'}</h3>
                        <p className="text-sm text-gray-400 mb-6 line-clamp-2">Detailed breakdown of coordinated activity vectors in the Eastern operational theater. Includes IP attribution data.</p>

                        <div className="flex gap-2 mt-auto">
                            <Button variant="outline" className="flex-1 text-xs group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30">
                                <Download className="w-3 h-3 mr-2" />
                                Download PDF
                            </Button>
                            <Button variant="ghost" size="sm" className="px-2 text-gray-500">
                                <Lock className="w-3 h-3" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

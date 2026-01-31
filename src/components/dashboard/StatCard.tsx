import { Card } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: string;
    trendUp?: boolean;
    icon: LucideIcon;
    variant?: 'default' | 'danger' | 'warning' | 'success';
}

export function StatCard({ title, value, trend, trendUp, icon: Icon, variant = 'default' }: StatCardProps) {
    return (
        <Card className="p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className={cn(
                    "p-2 rounded-lg bg-white/5",
                    variant === 'danger' && "text-accent bg-accent/10",
                    variant === 'warning' && "text-yellow-400 bg-yellow-400/10",
                    variant === 'success' && "text-primary bg-primary/10",
                    variant === 'default' && "text-secondary bg-secondary/10",
                )}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend && (
                    <div className={cn(
                        "text-xs font-medium px-2 py-1 rounded bg-white/5",
                        trendUp ? "text-primary" : "text-accent"
                    )}>
                        {trendUp ? '+' : ''}{trend}
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{value}</h3>
                <p className="text-sm text-gray-400">{title}</p>
            </div>

            {/* Background glow */}
            <div className={cn(
                "absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-[40px] opacity-20 group-hover:opacity-30 transition-opacity",
                variant === 'danger' && "bg-accent",
                variant === 'warning' && "bg-yellow-400",
                variant === 'success' && "bg-primary",
                variant === 'default' && "bg-secondary",
            )} />
        </Card>
    );
}

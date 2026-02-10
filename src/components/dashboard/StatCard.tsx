'use client';

import { Card } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: string;
    trendUp?: boolean;
    icon: LucideIcon;
    variant?: 'default' | 'danger' | 'warning' | 'success';
    index?: number;
    isLoading?: boolean;
}

export function StatCard({ title, value, trend, trendUp, icon: Icon, variant = 'default', index = 0, isLoading }: StatCardProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Parse numeric value for animation
    const numericValue = typeof value === 'string'
        ? parseFloat(value.replace(/,/g, ''))
        : value;

    const isNumber = !isNaN(numericValue);

    // Motion value for count-up
    const springValue = useSpring(0, {
        damping: 30,
        stiffness: 100,
        mass: 1,
    });

    const displayValue = useTransform(springValue, (current) => {
        if (!isNumber) return value;
        if (typeof value === 'string' && value.includes(',')) {
            return Math.round(current).toLocaleString();
        }
        return Math.round(current);
    });

    useEffect(() => {
        if (isInView && isNumber) {
            springValue.set(numericValue);
        }
    }, [isInView, numericValue, springValue, isNumber]);

    return (
        <motion.div
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1]
            }}
            aria-label={`${title}: ${value}`}
        >
            <Card className="p-6 relative group hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 focus-within:ring-2 focus-within:ring-primary/20 overflow-hidden">
                {isLoading ? (
                    // Loading skeleton
                    <div className="animate-pulse">
                        <div className="flex justify-between items-start mb-5">
                            <div className="w-10 h-10 bg-surface-highlight rounded-lg" />
                            <div className="w-16 h-5 bg-surface-highlight rounded-full" />
                        </div>
                        <div className="space-y-2">
                            <div className="w-24 h-8 bg-surface-highlight rounded" />
                            <div className="w-32 h-3 bg-surface-highlight rounded" />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-start mb-5">
                            <div className={cn(
                                "p-2.5 rounded-lg transition-colors duration-500",
                                variant === 'danger' && "text-risk-high bg-risk-high/10",
                                variant === 'warning' && "text-risk-medium bg-risk-medium/10",
                                variant === 'success' && "text-risk-low bg-risk-low/10",
                                variant === 'default' && "text-secondary bg-secondary/10",
                            )}>
                                <Icon className="w-5 h-5" />
                            </div>
                            {trend && (
                                <div className={cn(
                                    "text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1",
                                    trendUp
                                        ? "text-risk-low bg-risk-low/10 border-risk-low/20"
                                        : "text-risk-high bg-risk-high/10 border-risk-high/20"
                                )}>
                                    {trendUp ? '↑' : '↓'} {trend}
                                </div>
                            )}
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-baseline gap-1">
                                <h3 className="text-3xl font-bold text-foreground tracking-tight transition-colors">
                                    <ValueDisplay isNumber={isNumber} displayValue={displayValue} rawValue={value} />
                                </h3>
                            </div>
                            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-1.5">{title}</p>
                        </div>

                        {/* Decorative Elements */}
                        <div className={cn(
                            "absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-3xl opacity-5 group-hover:opacity-20 transition-opacity duration-700",
                            variant === 'danger' && "bg-risk-high",
                            variant === 'warning' && "bg-risk-medium",
                            variant === 'success' && "bg-risk-low",
                            variant === 'default' && "bg-secondary",
                        )} />
                    </>
                )}
            </Card>
        </motion.div>
    );
}

function ValueDisplay({ isNumber, displayValue, rawValue }: { isNumber: boolean, displayValue: any, rawValue: string | number }) {
    if (isNumber) {
        return <motion.span>{displayValue}</motion.span>;
    }
    return <span>{rawValue}</span>;
}

'use client';

import { Card } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: string;
    trendUp?: boolean;
    icon: LucideIcon;
    variant?: 'default' | 'danger' | 'warning' | 'success';
    index?: number;
}

export function StatCard({ title, value, trend, trendUp, icon: Icon, variant = 'default', index = 0 }: StatCardProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

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
        // Format based on original string (if it had commas)
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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
            }}
        >
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
                    <h3 className="text-3xl font-bold text-white mb-1 tracking-tight flex items-baseline">
                        <ValueDisplay isNumber={isNumber} displayValue={displayValue} rawValue={value} />
                    </h3>
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
        </motion.div>
    );
}
// Helper to render the value to avoid type errors with MotionValue
function ValueDisplay({ isNumber, displayValue, rawValue }: { isNumber: boolean, displayValue: any, rawValue: string | number }) {
    if (isNumber) {
        return <motion.span>{displayValue}</motion.span>;
    }
    return <span>{rawValue}</span>;
}

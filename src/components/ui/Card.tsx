import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass' | 'neon';
    noPadding?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', noPadding = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'relative rounded-md overflow-hidden transition-all duration-300',
                    {
                        'bg-surface border border-border': variant === 'default',
                        'glass-card': variant === 'glass',
                        'bg-black border border-primary/50 shadow-[0_0_15px_rgba(0,255,65,0.1)]': variant === 'neon',
                        'p-6': !noPadding,
                    },
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export { Card };

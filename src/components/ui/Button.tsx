import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx'; // Not used but good to have if needed, actually cn handles ClassValue. Remove if unused.

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'relative inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none rounded-sm uppercase tracking-wider',
                    'active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    {
                        'bg-primary text-black hover:bg-primary-dim hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]': variant === 'primary',
                        'bg-secondary text-black hover:bg-secondary-dim hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]': variant === 'secondary',
                        'bg-accent text-white hover:bg-red-600 hover:shadow-[0_0_20px_rgba(255,0,60,0.4)]': variant === 'danger',
                        'bg-transparent text-primary border border-primary hover:bg-primary/10': variant === 'outline',
                        'bg-transparent text-foreground hover:bg-white/5': variant === 'ghost',

                        'text-xs px-3 py-1.5': size === 'sm',
                        'text-sm px-6 py-2.5': size === 'md',
                        'text-base px-8 py-3.5': size === 'lg',
                    },
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {children}

                {/* Corner accents for cyber feel */}
                {variant !== 'ghost' && (
                    <>
                        <span className="absolute top-0 left-0 w-1 h-1 bg-current opacity-50" />
                        <span className="absolute bottom-0 right-0 w-1 h-1 bg-current opacity-50" />
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };

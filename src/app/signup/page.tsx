'use client';

import { Shield, Fingerprint, Mail, Building, ArrowLeft, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background text-foreground">
            {/* Visual Panel */}
            <div className="hidden md:flex flex-col items-center justify-center bg-black border-r border-white/10 relative overflow-hidden p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-secondary/20 via-black to-black opacity-50"></div>

                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center bg-repeat opacity-10 mix-blend-overlay"></div>

                <div className="z-10 text-center max-w-lg relative">
                    <div className="mb-6 inline-flex p-4 rounded-full bg-secondary/10 border border-secondary/20 animate-bounce-slow">
                        <UserPlus className="w-8 h-8 text-secondary" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-6">Join the <span className="text-secondary neon-text-blue">Intelligence Network</span></h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        DeepTrace protects national security by detecting coordinated influence campaigns before they spread.
                    </p>
                    <div className="mt-8 flex gap-4 justify-center">
                        <div className="px-4 py-2 rounded border border-white/10 bg-white/5 backdrop-blur text-xs font-mono text-gray-400">
                            SECURE REGISTRATION
                        </div>
                        <div className="px-4 py-2 rounded border border-white/10 bg-white/5 backdrop-blur text-xs font-mono text-gray-400">
                            256-BIT ENCRYPTION
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Panel */}
            <div className="flex items-center justify-center bg-background p-8 relative">
                <Link href="/" className="absolute top-8 left-8 text-gray-500 hover:text-white flex items-center gap-2 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>

                <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom duration-700">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                            <Shield className="w-6 h-6 text-secondary" />
                            Request Access
                        </h2>
                        <p className="text-gray-500 text-sm">Create an account for your agency.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-500 uppercase">First Name</label>
                                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-2 text-white focus:border-secondary focus:outline-none transition-colors" placeholder="John" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-500 uppercase">Last Name</label>
                                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-2 text-white focus:border-secondary focus:outline-none transition-colors" placeholder="Doe" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-500 uppercase">Agency Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-500 group-focus-within:text-secondary transition-colors" />
                                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-md px-9 py-2 text-white focus:border-secondary focus:outline-none transition-colors" placeholder="agent@agency.gov" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-500 uppercase">Department / Organization</label>
                            <div className="relative group">
                                <Building className="absolute left-3 top-2.5 w-4 h-4 text-gray-500 group-focus-within:text-secondary transition-colors" />
                                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md px-9 py-2 text-white focus:border-secondary focus:outline-none transition-colors" placeholder="Cyber Defense Unit" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-500 uppercase">Clearance Code (Optional)</label>
                            <div className="relative group">
                                <Fingerprint className="absolute left-3 top-2.5 w-4 h-4 text-gray-500 group-focus-within:text-secondary transition-colors" />
                                <input type="password" className="w-full bg-black/50 border border-white/10 rounded-md px-9 py-2 text-white focus:border-secondary focus:outline-none transition-colors" placeholder="••••••••" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button variant="secondary" className="w-full py-3" isLoading={isLoading}>
                                Submit Application
                            </Button>
                        </div>
                    </form>

                    <p className="text-center text-xs text-gray-600">
                        Already have access? <Link href="/login" className="text-white hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

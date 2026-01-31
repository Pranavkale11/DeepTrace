'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, Shield, Activity, Power, Info, Database } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
    const [liveMonitoring, setLiveMonitoring] = useState(true);
    const [deepfakeDetection, setDeepfakeDetection] = useState(true);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
            <div>
                <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-gray-400" />
                    System Settings
                </h1>
                <p className="text-gray-400 text-sm">Configure analysis parameters and system thresholds.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monitoring Controls */}
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        Monitoring Controls
                    </h3>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                            <div>
                                <p className="text-white font-medium mb-1">Live Network Scanners</p>
                                <p className="text-xs text-gray-400">Real-time ingestion from Twitter/X, Reddit, Telegram.</p>
                            </div>
                            <button
                                onClick={() => setLiveMonitoring(!liveMonitoring)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors relative ${liveMonitoring ? 'bg-primary' : 'bg-gray-700'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-black shadow transition-transform ${liveMonitoring ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                            <div>
                                <p className="text-white font-medium mb-1">Deepfake Detection Engine</p>
                                <p className="text-xs text-gray-400">Enable heavy-compute GAN analysis models.</p>
                            </div>
                            <button
                                onClick={() => setDeepfakeDetection(!deepfakeDetection)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors relative ${deepfakeDetection ? 'bg-primary' : 'bg-gray-700'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-black shadow transition-transform ${deepfakeDetection ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button variant="outline" size="sm">Reset to Defaults</Button>
                        </div>
                    </div>
                </Card>

                <div className="space-y-6">
                    {/* Alert Thresholds */}
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-accent" />
                            Alert Threshold Configuration
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Low Risk Threshold</span>
                                    <span className="text-green-500 font-mono">20-49</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[30%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Medium Risk Threshold</span>
                                    <span className="text-yellow-500 font-mono">50-79</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-500 w-[60%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">High Risk Threshold</span>
                                    <span className="text-red-500 font-mono">80+</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 w-[85%]"></div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* System Info */}
                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Database className="w-24 h-24" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 text-secondary" />
                            System Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm relative z-10">
                            <div className="p-3 bg-black/40 rounded border border-white/5">
                                <p className="text-gray-500 text-xs uppercase mb-1">Version</p>
                                <p className="text-white font-mono">v2.0.4-alpha</p>
                            </div>
                            <div className="p-3 bg-black/40 rounded border border-white/5">
                                <p className="text-gray-500 text-xs uppercase mb-1">Status</p>
                                <p className="text-green-500 font-mono flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Operational
                                </p>
                            </div>
                            <div className="p-3 bg-black/40 rounded border border-white/5">
                                <p className="text-gray-500 text-xs uppercase mb-1">Environment</p>
                                <p className="text-secondary font-mono">Demo / Sandbox</p>
                            </div>
                            <div className="p-3 bg-black/40 rounded border border-white/5">
                                <p className="text-gray-500 text-xs uppercase mb-1">Last Update</p>
                                <p className="text-white font-mono">2026-02-01</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-white/5">
                <Button variant="danger" size="sm" className="mr-auto">
                    <Power className="w-4 h-4 mr-2" />
                    Emergency Shutdown
                </Button>
                <Button variant="primary">Save Configuration</Button>
            </div>
        </div>
    );
}

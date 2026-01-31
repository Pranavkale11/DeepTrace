import { Sidebar } from '@/components/layout/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <main className="pl-64 min-h-screen transition-all duration-300">
                <div className="container mx-auto p-4 md:p-8 pt-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

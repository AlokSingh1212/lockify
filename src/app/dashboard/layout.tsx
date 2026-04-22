import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#09090b] pt-24 pb-12 flex max-w-7xl mx-auto">
      <DashboardSidebar />
      <main className="flex-1 px-8 py-8 w-full">
        {children}
      </main>
    </div>
  );
}

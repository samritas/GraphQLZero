import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden bg-[#F8FAFC]">
      <DashboardSidebar />
      <div className="ml-[260px] h-screen overflow-y-auto">
        <DashboardTopbar />
        {children}
      </div>
    </div>
  );
}

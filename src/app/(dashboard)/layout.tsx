import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await sb.from("profiles").select("*").eq("id", user.id).single();
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #fff5f7 0%, #fffcf8 60%, #f8f5ff 100%)" }}>
      <DashboardNav profile={profile} />
      {/* Soft orbs */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #ffc9d3, transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute bottom-0 left-1/4 w-96 h-72 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #ddd0ff, transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
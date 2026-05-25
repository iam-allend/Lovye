import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await sb.from("profiles").select("*").eq("id", user.id).single();

  return (
    <div className="min-h-screen" style={{ background: "#0d0a12" }}>
      <DashboardNav profile={profile} />
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #f63d5e, transparent)" }} />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #ab65ff, transparent)" }} />
      </div>
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
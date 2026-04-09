import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { PortalSidebar } from "./PortalSidebar";

interface PortalLayoutProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "employee";
}

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function PortalLayout({
  children,
  requiredRole,
}: PortalLayoutProps) {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect(requiredRole === "admin" ? "/admin/login" : "/employee/login");
  }

  const { data: profile } = await getServiceClient()
    .from("profiles")
    .select("full_name, role")
    .eq("id", session.user.id)
    .single();

  if (!profile) redirect("/employee/login");

  if (requiredRole === "admin" && profile.role !== "admin") {
    redirect("/employee/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <PortalSidebar
        role={profile.role as "admin" | "employee"}
        userName={profile.full_name ?? session.user.email ?? "User"}
      />
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}

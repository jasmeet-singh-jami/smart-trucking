import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Users, UserCircle, ClipboardList, CheckCircle2 } from "lucide-react";

export const metadata = { title: "Dashboard — Admin Portal" };
export const dynamic = "force-dynamic";

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export default async function AdminDashboardPage() {
  const anon = await createClient();
  const service = getServiceClient();

  const [clientsResult, employeesResult, pendingResult, completedResult] =
    await Promise.all([
      anon.from("clients").select("id", { count: "exact", head: true }),
      service.from("profiles").select("id", { count: "exact", head: true }).eq("role", "employee").eq("is_active", true),
      anon.from("tasks").select("id", { count: "exact", head: true }).eq("status", "pending"),
      anon
        .from("tasks")
        .select("id", { count: "exact", head: true })
        .eq("status", "completed")
        .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
    ]);

  const { data: recentClients } = await anon
    .from("clients")
    .select("id, company_name, contact_name, created_at, profiles!assigned_to(full_name)")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    { label: "Total Clients", value: clientsResult.count ?? 0, icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Active Employees", value: employeesResult.count ?? 0, icon: UserCircle, color: "text-purple-600 bg-purple-50" },
    { label: "Pending Tasks", value: pendingResult.count ?? 0, icon: ClipboardList, color: "text-orange-600 bg-orange-50" },
    { label: "Completed This Month", value: completedResult.count ?? 0, icon: CheckCircle2, color: "text-green-600 bg-green-50" },
  ];

  return (
    <PortalLayout requiredRole="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Recent Clients</h2>
            <a href="/admin/clients" className="text-xs text-orange-500 hover:underline">View all →</a>
          </div>
          {recentClients && recentClients.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recentClients.map((c: any) => (
                <div key={c.id} className="px-6 py-3.5 flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-slate-700">{c.company_name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{c.contact_name ?? "No contact"}</p>
                  </div>
                  <p className="text-xs text-slate-400">{(c.profiles as any)?.full_name ?? "Unassigned"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-6 py-8 text-sm text-slate-400 text-center">No clients yet.</p>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}

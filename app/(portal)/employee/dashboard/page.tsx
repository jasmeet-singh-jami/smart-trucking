import { createClient } from "@/lib/supabase/server";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { redirect } from "next/navigation";
import { Users, ClipboardList, AlertCircle, CheckCircle2 } from "lucide-react";

export const metadata = { title: "Dashboard — Employee Portal" };

export default async function EmployeeDashboardPage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/employee/login");

  const [clientsResult, tasksResult, overdueResult] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }).eq("assigned_to", session!.user.id),
    supabase.from("tasks").select("id", { count: "exact", head: true }).eq("assigned_to", session!.user.id).eq("status", "pending"),
    supabase.from("tasks").select("id", { count: "exact", head: true }).eq("assigned_to", session!.user.id).eq("status", "overdue"),
  ]);

  const { data: recentTasks } = await supabase
    .from("tasks")
    .select("id, service_type, status, due_date, clients(company_name)")
    .eq("assigned_to", session!.user.id)
    .order("created_at", { ascending: false })
    .limit(8);

  const stats = [
    { label: "Assigned Clients", value: clientsResult.count ?? 0, icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Pending Tasks", value: tasksResult.count ?? 0, icon: ClipboardList, color: "text-orange-600 bg-orange-50" },
    { label: "Overdue Tasks", value: overdueResult.count ?? 0, icon: AlertCircle, color: "text-red-600 bg-red-50" },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    overdue: "bg-red-100 text-red-800",
  };

  return (
    <PortalLayout requiredRole="employee">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                  <p className="text-sm text-slate-500">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Recent Tasks</h2>
          </div>
          {recentTasks && recentTasks.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recentTasks.map((task: any) => (
                <div key={task.id} className="px-6 py-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{task.service_type}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{task.clients?.company_name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {task.due_date && (
                      <span className="text-xs text-slate-400">{task.due_date}</span>
                    )}
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[task.status] ?? "bg-slate-100 text-slate-600"}`}>
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-10 text-center">
              <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No tasks assigned yet</p>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}

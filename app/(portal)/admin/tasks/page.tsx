import { createClient } from "@/lib/supabase/server";
import { PortalLayout } from "@/components/portal/PortalLayout";

export const metadata = { title: "Tasks — Admin Portal" };

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
};

export default async function AdminTasksPage() {
  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from("tasks")
    .select(`
      id, service_type, status, due_date, created_at,
      clients(company_name),
      profiles!assigned_to(full_name)
    `)
    .order("created_at", { ascending: false });

  return (
    <PortalLayout requiredRole="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">All Tasks</h1>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {tasks && tasks.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned To</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks.map((t: any) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-slate-700">{t.service_type}</td>
                    <td className="px-6 py-3.5 text-slate-600">{t.clients?.company_name ?? "—"}</td>
                    <td className="px-6 py-3.5 text-slate-500">{t.profiles?.full_name ?? "Unassigned"}</td>
                    <td className="px-6 py-3.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[t.status] ?? "bg-slate-100 text-slate-600"}`}>
                        {t.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-400 text-xs">{t.due_date ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-6 py-12 text-center text-sm text-slate-400">No tasks yet.</p>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}

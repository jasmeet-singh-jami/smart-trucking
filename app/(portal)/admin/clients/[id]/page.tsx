import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AddTaskForm } from "./AddTaskForm";
import { EditClientForm } from "./EditClientForm";

export const metadata = { title: "Manage Client — Admin Portal" };

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
};

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const service = getServiceClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/admin/login");

  const [clientResult, employeesResult, tasksResult, docsResult] = await Promise.all([
    supabase.from("clients").select("*").eq("id", id).single(),
    service.from("profiles").select("id, full_name").eq("is_active", true).order("full_name"),
    supabase.from("tasks").select("*").eq("client_id", id).order("created_at", { ascending: false }),
    supabase.from("documents").select("*").eq("client_id", id).order("created_at", { ascending: false }),
  ]);

  if (!clientResult.data) notFound();

  const client = clientResult.data;
  const employees = employeesResult.data ?? [];
  const tasks = tasksResult.data ?? [];
  const documents = docsResult.data ?? [];

  return (
    <PortalLayout requiredRole="admin">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/clients" className="text-slate-400 hover:text-slate-600">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">{client.company_name}</h1>
        </div>

        {/* Editable client info */}
        <EditClientForm client={client} employees={employees} />

        {/* Tasks */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Tasks</h2>
          </div>
          {tasks.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks.map((t: any) => (
                  <tr key={t.id}>
                    <td className="px-6 py-3.5 text-slate-700">{t.service_type}</td>
                    <td className="px-6 py-3.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[t.status] ?? "bg-slate-100 text-slate-600"}`}>
                        {t.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-500">{t.due_date ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-6 py-4 text-sm text-slate-400">No tasks yet.</p>
          )}
          <div className="px-6 py-4 border-t border-slate-100">
            <AddTaskForm clientId={id} employees={employees} createdBy={session!.user.id} />
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Documents</h2>
          </div>
          {documents.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {documents.map((d: any) => (
                <div key={d.id} className="px-6 py-3.5 flex items-center justify-between text-sm">
                  <span className="text-slate-700">{d.name}</span>
                  {d.file_path && (
                    <a href={d.file_path} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline text-xs">Download</a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="px-6 py-4 text-sm text-slate-400">No documents yet.</p>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}

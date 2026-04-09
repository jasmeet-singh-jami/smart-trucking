import { createClient } from "@/lib/supabase/server";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Client Detail — Employee Portal" };

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
};

export default async function EmployeeClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/employee/login");

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .eq("assigned_to", session!.user.id)
    .single();

  if (!client) notFound();

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  return (
    <PortalLayout requiredRole="employee">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/employee/clients" className="text-slate-400 hover:text-slate-600">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">{client.company_name}</h1>
        </div>

        {/* Client Info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 grid grid-cols-2 gap-4 text-sm">
          <div><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Contact</p><p className="text-slate-700">{client.contact_name ?? "—"}</p></div>
          <div><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Email</p><p className="text-slate-700">{client.email ?? "—"}</p></div>
          <div><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Phone</p><p className="text-slate-700">{client.phone ?? "—"}</p></div>
          <div><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Address</p><p className="text-slate-700">{client.address ?? "—"}</p></div>
          {client.notes && (
            <div className="col-span-2"><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Notes</p><p className="text-slate-700">{client.notes}</p></div>
          )}
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Tasks</h2>
          </div>
          {tasks && tasks.length > 0 ? (
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
            <p className="px-6 py-6 text-sm text-slate-400">No tasks yet.</p>
          )}
        </div>

        {/* Documents */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Documents</h2>
          </div>
          {documents && documents.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {documents.map((d: any) => (
                <div key={d.id} className="px-6 py-3.5 flex items-center justify-between text-sm">
                  <span className="text-slate-700">{d.name}</span>
                  {d.file_path && (
                    <a href={d.file_path} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline text-xs">
                      Download
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="px-6 py-6 text-sm text-slate-400">No documents yet.</p>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}

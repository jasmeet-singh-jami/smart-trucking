import { createClient } from "@/lib/supabase/server";
import { PortalLayout } from "@/components/portal/PortalLayout";
import Link from "next/link";
import { Plus, ChevronRight } from "lucide-react";

export const metadata = { title: "Clients — Admin Portal" };

export default async function AdminClientsPage() {
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("clients")
    .select("id, company_name, contact_name, phone, email, profiles!assigned_to(full_name)")
    .order("company_name");

  return (
    <PortalLayout requiredRole="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Clients</h1>
          <Link
            href="/admin/clients/new"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Client
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {clients && clients.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned To</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.map((c: any) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-slate-800">{c.company_name}</td>
                    <td className="px-6 py-3.5 text-slate-600">{c.contact_name ?? "—"}</td>
                    <td className="px-6 py-3.5 text-slate-600">{c.phone ?? "—"}</td>
                    <td className="px-6 py-3.5 text-slate-500">{c.profiles?.full_name ?? "Unassigned"}</td>
                    <td className="px-6 py-3.5 text-right">
                      <Link href={`/admin/clients/${c.id}`} className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 font-medium text-xs">
                        Manage <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-slate-400 mb-3">No clients yet.</p>
              <Link href="/admin/clients/new" className="text-orange-500 hover:underline text-sm font-medium">
                Add your first client →
              </Link>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}

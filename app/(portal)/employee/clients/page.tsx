import { createClient } from "@/lib/supabase/server";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = { title: "My Clients — Employee Portal" };

export default async function EmployeeClientsPage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/employee/login");

  const { data: clients } = await supabase
    .from("clients")
    .select("id, company_name, contact_name, phone, email")
    .eq("assigned_to", session!.user.id)
    .order("company_name");

  return (
    <PortalLayout requiredRole="employee">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">My Clients</h1>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {clients && clients.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-slate-800">{c.company_name}</td>
                    <td className="px-6 py-3.5 text-slate-600">{c.contact_name ?? "—"}</td>
                    <td className="px-6 py-3.5 text-slate-600">{c.phone ?? "—"}</td>
                    <td className="px-6 py-3.5 text-right">
                      <Link
                        href={`/employee/clients/${c.id}`}
                        className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 font-medium text-xs"
                      >
                        View <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-slate-400">No clients assigned to you yet.</p>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}

import { createClient } from "@/lib/supabase/server";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Add Client — Admin Portal" };

async function createClientAction(formData: FormData) {
  "use server";
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/admin/login");

  const assigned_to = formData.get("assigned_to") as string | null;

  const { error } = await supabase.from("clients").insert({
    company_name: formData.get("company_name") as string,
    contact_name: formData.get("contact_name") as string || null,
    email: formData.get("email") as string || null,
    phone: formData.get("phone") as string || null,
    address: formData.get("address") as string || null,
    assigned_to: assigned_to || null,
    notes: formData.get("notes") as string || null,
    created_by: session.user.id,
  });

  if (error) throw new Error(error.message);
  redirect("/admin/clients");
}

export default async function NewClientPage() {
  const supabase = await createClient();

  const { data: employees } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("role", ["admin", "employee"])
    .eq("is_active", true)
    .order("full_name");

  return (
    <PortalLayout requiredRole="admin">
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center gap-3">
          <Link href="/admin/clients" className="text-slate-400 hover:text-slate-600">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Add New Client</h1>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <form action={createClientAction} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input name="company_name" type="text" required className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Contact Name</label>
                <input name="contact_name" type="text" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input name="email" type="email" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                <input name="phone" type="tel" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Assigned To</label>
                <select name="assigned_to" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                  <option value="">— Unassigned —</option>
                  {employees?.map((e) => (
                    <option key={e.id} value={e.id}>{e.full_name}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
                <input name="address" type="text" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes</label>
                <textarea name="notes" rows={3} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <Link href="/admin/clients" className="px-6 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                Cancel
              </Link>
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors">
                Create Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </PortalLayout>
  );
}

import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { InviteUserButton } from "./InviteUserButton";
import { DeleteUserButton } from "./DeleteUserButton";
import { EditUserButton } from "./EditUserButton";

export const metadata = { title: "Users — Admin Portal" };
export const dynamic = "force-dynamic";

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export default async function AdminUsersPage() {
  const supabase = getServiceClient();
  const anonClient = await createClient();

  const [{ data: users }, { data: { session } }] = await Promise.all([
    supabase.from("profiles").select("id, full_name, role, is_active, created_at").order("created_at", { ascending: false }),
    anonClient.auth.getSession(),
  ]);

  const currentUserId = session?.user?.id ?? "";

  return (
    <PortalLayout requiredRole="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Users</h1>
          <InviteUserButton />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users?.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3.5 font-medium text-slate-800">{u.full_name ?? "—"}</td>
                  <td className="px-6 py-3.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${u.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {u.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-slate-400 text-xs">
                    {new Date(u.created_at).toLocaleDateString("en-CA")}
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center justify-end gap-3">
                      <EditUserButton user={u} />
                      <DeleteUserButton
                        userId={u.id}
                        userName={u.full_name ?? u.id}
                        currentUserId={currentUserId}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!users || users.length === 0) && (
            <p className="px-6 py-10 text-center text-sm text-slate-400">No users yet.</p>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}

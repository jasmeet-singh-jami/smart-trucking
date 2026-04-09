"use client";

import { useState, useTransition } from "react";
import { Pencil, X, Check } from "lucide-react";
import { updateClient } from "./actions";

interface Employee { id: string; full_name: string | null }

interface EditClientFormProps {
  client: {
    id: string;
    company_name: string;
    contact_name: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    assigned_to: string | null;
    notes: string | null;
  };
  employees: Employee[];
}

export function EditClientForm({ client, employees }: EditClientFormProps) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = await updateClient(client.id, fd);
      if (result?.error) setError(result.error);
      else setEditing(false);
    });
  }

  if (!editing) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">Client Details</h2>
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 font-medium"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Contact</p><p className="text-slate-700">{client.contact_name ?? "—"}</p></div>
          <div><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Email</p><p className="text-slate-700">{client.email ?? "—"}</p></div>
          <div><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Phone</p><p className="text-slate-700">{client.phone ?? "—"}</p></div>
          <div><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Address</p><p className="text-slate-700">{client.address ?? "—"}</p></div>
          <div><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Assigned To</p><p className="text-slate-700">{employees.find(e => e.id === client.assigned_to)?.full_name ?? "Unassigned"}</p></div>
          {client.notes && <div className="col-span-2"><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Notes</p><p className="text-slate-700">{client.notes}</p></div>}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-orange-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-slate-800">Edit Client Details</h2>
        <button onClick={() => setEditing(false)} className="text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Company Name <span className="text-red-500">*</span></label>
            <input name="company_name" type="text" required defaultValue={client.company_name}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Contact Name</label>
            <input name="contact_name" type="text" defaultValue={client.contact_name ?? ""}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
            <input name="email" type="email" defaultValue={client.email ?? ""}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Phone</label>
            <input name="phone" type="tel" defaultValue={client.phone ?? ""}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Assigned To</label>
            <select name="assigned_to" defaultValue={client.assigned_to ?? ""}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="">— Unassigned —</option>
              {employees.map(e => <option key={e.id} value={e.id}>{e.full_name}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Address</label>
            <input name="address" type="text" defaultValue={client.address ?? ""}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Notes</label>
            <textarea name="notes" rows={2} defaultValue={client.notes ?? ""}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button type="button" onClick={() => setEditing(false)}
            className="px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button type="submit" disabled={isPending}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-lg">
            <Check className="w-4 h-4" />
            {isPending ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

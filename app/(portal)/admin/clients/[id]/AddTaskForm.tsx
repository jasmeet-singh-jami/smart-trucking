"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { addTask } from "./actions";

const SERVICE_TYPES = [
  "Company Registration",
  "US & Canada Authorities",
  "Fuel Tax & IFTA",
  "Oversize Permits",
  "IRP & FRP Registration",
  "ACE eManifest",
  "ACI eManifest",
  "C-TPAT / PIP / FAST",
  "FAST Card & US Visa",
  "MOE & EASR",
  "Log Book Training",
  "Dispatch Training",
  "Drug & Alcohol Supervisor",
  "Dangerous Goods (TDG)",
  "Defensive Driving",
  "Other",
];

interface Employee {
  id: string;
  full_name: string | null;
}

interface AddTaskFormProps {
  clientId: string;
  employees: Employee[];
  createdBy: string;
}

export function AddTaskForm({ clientId, employees, createdBy }: AddTaskFormProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("client_id", clientId);
    fd.set("created_by", createdBy);
    setError(null);
    startTransition(async () => {
      const result = await addTask(fd);
      if (result?.error) setError(result.error);
      else setOpen(false);
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm font-semibold text-slate-700">New Task</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Service Type</label>
          <select name="service_type" required className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
            {SERVICE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Assign To</label>
          <select name="assigned_to" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option value="">— Unassigned —</option>
            {employees.map((e) => <option key={e.id} value={e.id}>{e.full_name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Due Date</label>
          <input name="due_date" type="date" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Notes</label>
          <input name="notes" type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-600 hover:bg-slate-50">
          Cancel
        </button>
        <button type="submit" disabled={isPending} className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-lg">
          {isPending ? "Saving…" : "Save Task"}
        </button>
      </div>
    </form>
  );
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateClient(clientId: string, formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("clients").update({
    company_name: formData.get("company_name") as string,
    contact_name: (formData.get("contact_name") as string) || null,
    email: (formData.get("email") as string) || null,
    phone: (formData.get("phone") as string) || null,
    address: (formData.get("address") as string) || null,
    assigned_to: (formData.get("assigned_to") as string) || null,
    notes: (formData.get("notes") as string) || null,
  }).eq("id", clientId);

  if (error) return { error: error.message };

  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/admin/clients");
  return {};
}

export async function addTask(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();

  const client_id = formData.get("client_id") as string;
  const service_type = formData.get("service_type") as string;
  const assigned_to = formData.get("assigned_to") as string || null;
  const due_date = formData.get("due_date") as string || null;
  const notes = formData.get("notes") as string || null;
  const created_by = formData.get("created_by") as string;

  const { error } = await supabase.from("tasks").insert({
    client_id,
    service_type,
    assigned_to: assigned_to || null,
    due_date: due_date || null,
    notes: notes || null,
    created_by,
    status: "pending",
  });

  if (error) return { error: error.message };

  revalidatePath(`/admin/clients/${client_id}`);
  return {};
}

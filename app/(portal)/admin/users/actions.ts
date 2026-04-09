"use server";

import { createClient as createServiceClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getAdminClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function inviteUser(formData: FormData): Promise<{ error?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const full_name = formData.get("full_name") as string;
  const role = formData.get("role") as string;

  if (!email || !password || !full_name || !role) {
    return { error: "All fields are required." };
  }

  const supabase = getAdminClient();

  // Create auth user
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, role },
  });

  if (error) return { error: error.message };
  if (!data.user) return { error: "Failed to create user." };

  // Explicitly upsert profile — trigger may not fire for admin-created users
  const { error: profileError } = await supabase
    .from("profiles")
    .upsert({
      id: data.user.id,
      full_name,
      role,
      is_active: true,
    });

  if (profileError) return { error: `User created but profile failed: ${profileError.message}` };

  revalidatePath("/admin/users");
  return {};
}

export async function updateUser(userId: string, formData: FormData): Promise<{ error?: string }> {
  const full_name = formData.get("full_name") as string;
  const role = formData.get("role") as string;
  const is_active = formData.get("is_active") === "true";

  const supabase = getAdminClient();

  const { error } = await supabase
    .from("profiles")
    .update({ full_name, role, is_active })
    .eq("id", userId);

  if (error) return { error: error.message };

  revalidatePath("/admin/users");
  return {};
}

export async function deleteUser(userId: string): Promise<{ error?: string }> {
  const supabase = getAdminClient();

  // Delete auth user — cascade deletes the profile row via FK
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) return { error: error.message };

  revalidatePath("/admin/users");
  return {};
}

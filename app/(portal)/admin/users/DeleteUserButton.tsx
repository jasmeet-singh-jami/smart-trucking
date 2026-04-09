"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteUser } from "./actions";

interface DeleteUserButtonProps {
  userId: string;
  userName: string;
  currentUserId: string;
}

export function DeleteUserButton({ userId, userName, currentUserId }: DeleteUserButtonProps) {
  const [isPending, startTransition] = useTransition();
  const isSelf = userId === currentUserId;

  if (isSelf) {
    return (
      <span title="You cannot delete your own account" className="text-slate-200 cursor-not-allowed">
        <Trash2 className="w-4 h-4" />
      </span>
    );
  }

  function handleDelete() {
    if (!confirm(`Delete "${userName}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteUser(userId);
      if (result?.error) alert(`Error: ${result.error}`);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Delete user"
      className="text-slate-400 hover:text-red-500 disabled:opacity-40 transition-colors"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

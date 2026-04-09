"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  ClipboardList,
  LogOut,
  Truck,
} from "lucide-react";
import { logout } from "@/app/actions/auth";

const employeeNav = [
  { label: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
  { label: "My Clients", href: "/employee/clients", icon: Users },
];

const adminNav = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: UserCircle },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Tasks", href: "/admin/tasks", icon: ClipboardList },
];

interface PortalSidebarProps {
  role: "admin" | "employee";
  userName: string;
}

export function PortalSidebar({ role, userName }: PortalSidebarProps) {
  const pathname = usePathname();
  const navItems = role === "admin" ? adminNav : employeeNav;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-700">
        <Truck className="w-6 h-6 text-orange-400" />
        <div>
          <p className="font-bold text-sm leading-tight">Smart Trucking</p>
          <p className="text-xs text-slate-400 capitalize">
            {role} Portal
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-orange-500 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-700">
        <p className="text-xs text-slate-400 truncate mb-3">{userName}</p>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-2 text-slate-300 hover:text-white text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}

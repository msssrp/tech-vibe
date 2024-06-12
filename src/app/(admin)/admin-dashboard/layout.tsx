"use client";

import { AdminUserProvider } from "@/context/AdminUserContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminUserProvider>{children}</AdminUserProvider>;
}

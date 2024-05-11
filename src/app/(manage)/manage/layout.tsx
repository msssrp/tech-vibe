"use client";

import { ArticleProvider } from "@/context/ArticleContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArticleProvider>{children}</ArticleProvider>;
}

"use client";
import { ComplaintProvider } from "@/context/ComplaintContext";

export default function ComplaintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ComplaintProvider>{children}</ComplaintProvider>;
}

"use client";
import { CertificateProvider } from "./context/Certificate";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CertificateProvider>{children}</CertificateProvider>;
}

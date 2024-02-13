import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/MainNavbar";
import React from "react";

type LayoutWithFooterProps = {
  children: React.ReactNode;
  showFooter: boolean;
};

export default function LayoutWithFooter({
  children,
  showFooter = true,
}: LayoutWithFooterProps) {
  return (
    <section>
      <Navbar />
      {children}
      {showFooter && <Footer />}
    </section>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import MainNavbar from "@/components/main/MainNavbar";
import Footer from "@/components/main/Footer";
import { MantineProvider } from "@mantine/core";
import LayoutWithFooter from "@/layout/LayoutWithFooter";
export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TechVibe",
    template: "%s - TechVibe",
  },
  description: "Come and read Our Blog",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>
          <MainNavbar />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}

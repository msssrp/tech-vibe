import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";

export const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TechVibe",
    template: "%s - TechVibe",
  },
  description: "Come and read Our Blog",
  icons: {
    icon: "https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/Logo/techvibe-logo.png",
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}

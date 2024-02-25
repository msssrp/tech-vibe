import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import MainNavbar from "@/components/main/MainNavbar";
import Footer from "@/components/main/Footer";
import { MantineProvider } from "@mantine/core";
import getUserSession from "@/libs/actions/getSession";
import UserNavbar from "@/components/main/UserNavbar";
export const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TechVibe",
    template: "%s - TechVibe",
  },
  description: "Come and read Our Blog",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUserSession();
  if (data.user) {
    return (
      <html lang="en">
        <body className={lora.className}>
          <MantineProvider>
            <UserNavbar />
            {children}
          </MantineProvider>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body className={lora.className}>
        <MantineProvider>
          <MainNavbar />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/dropzone/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
//export const lora = Lora({ subsets: ["latin"] });
import NextTopLoader from "nextjs-toploader";
import { Notifications } from "@mantine/notifications";
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

const theme = createTheme({
  cursorType: "pointer",
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme}>
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}

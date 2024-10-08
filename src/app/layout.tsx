import type { Metadata } from "next";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/dropzone/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
//export const lora = Lora({ subsets: ["latin"] });
import NextTopLoader from "nextjs-toploader";
import { Notifications } from "@mantine/notifications";
import { getWebLogoUrl } from "@/libs/actions/setting/webSetting";
const imagesPath = process.env.NEXT_PUBLIC_IMAGES_PATH as string;
export async function generateMetadata(): Promise<Metadata> {
  const webLogoUrl = await getWebLogoUrl();
  const logoUrl = imagesPath + webLogoUrl;
  return {
    title: {
      default: "TechVibe",
      template: "%s - TechVibe",
    },
    description: "an Online weblog application",
    icons: {
      icon: logoUrl,
    },
    openGraph: {
      title: "TechVibe",
      description: "an Online weblog application",
      url: "https://techvibe.app",
      siteName: "TechVibe",
      images: [
        {
          url: logoUrl,
          width: 800,
          height: 600,
        },
      ],
      locale: "th_TH",
      type: "website",
    },
  };
}

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

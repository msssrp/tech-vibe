import VerifyNavbar from "@/components/main/VerifyNavbar";
import { getWebLogoUrl } from "@/libs/actions/setting/webSetting";

const imagesPath = process.env.NEXT_PUBLIC_IMAGES_PATH as string;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoUrl = await getWebLogoUrl();
  const webLogoUrl = imagesPath + logoUrl;
  return (
    <div>
      <VerifyNavbar webLogoUrl={webLogoUrl} />
      {children}
    </div>
  );
}

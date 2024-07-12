import MainNavbar from "@/components/main/MainNavbar";
import Footer from "@/components/main/Footer";
import getUserSession from "@/libs/actions/user/auth/getSession";
import UserNavbar from "@/components/main/UserNavbar";
import { getNotification } from "@/libs/actions/notification/notification";
import { getWebLogoUrl } from "@/libs/actions/setting/webSetting";
const imagesPath = process.env.NEXT_PUBLIC_IMAGES_PATH as string;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUserSession();
  const logoUrl = await getWebLogoUrl();
  const webLogoUrl = imagesPath + logoUrl;
  if (data.user) {
    const notification = await getNotification(data.user.id);
    return (
      <div>
        <UserNavbar notification={notification} webLogoUrl={webLogoUrl} />
        {children}
      </div>
    );
  }
  return (
    <div>
      <MainNavbar webLogoUrl={webLogoUrl} />
      <div className="mt-16"></div>
      {children}
      <Footer />
    </div>
  );
}

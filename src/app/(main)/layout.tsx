import MainNavbar from "@/components/main/MainNavbar";
import Footer from "@/components/main/Footer";
import getUserSession from "@/libs/actions/user/auth/getSession";
import UserNavbar from "@/components/main/UserNavbar";
import { getNotification } from "@/libs/actions/notification/notification";
import { getWebLogoUrl } from "@/libs/actions/setting/webSetting";
import { getUserActive } from "@/libs/actions/user/user";
import { redirect } from "next/navigation";
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
    const userActiveStatus = await getUserActive(data.user.id);
    const notification = await getNotification(data.user.id);
    //@ts-ignore
    if (userActiveStatus && userActiveStatus.user_status === "active") {
      return (
        <div>
          <UserNavbar notification={notification} webLogoUrl={webLogoUrl} />
          {children}
        </div>
      );
    }
    return redirect("/account-issue");
  }
  return (
    <div>
      <MainNavbar webLogoUrl={webLogoUrl} />
      <div className="mt-32"></div>
      {children}
      <Footer />
    </div>
  );
}

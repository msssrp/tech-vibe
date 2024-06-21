import MainNavbar from "@/components/main/MainNavbar";
import Footer from "@/components/main/Footer";
import getUserSession from "@/libs/actions/user/auth/getSession";
import UserNavbar from "@/components/main/UserNavbar";
import { getNotification } from "@/libs/actions/notification/notification";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUserSession();
  if (data.user) {
    const notification = await getNotification(data.user.id);
    return (
      <div>
        <UserNavbar notification={notification} />
        {children}
      </div>
    );
  }
  return (
    <div>
      <MainNavbar />
      {children}
      <Footer />
    </div>
  );
}

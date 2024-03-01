import MainNavbar from "@/components/main/MainNavbar";
import Footer from "@/components/main/Footer";
import getUserSession from "@/libs/actions/auth/getSession";
import UserNavbar from "@/components/main/UserNavbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUserSession();
  if (data.user) {
    return (
      <div>
        <UserNavbar />
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

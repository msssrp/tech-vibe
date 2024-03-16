import MainNavbar from "@/components/main/MainNavbar";
import Footer from "@/components/main/Footer";
import getUserSession from "@/libs/actions/user/auth/getSession";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUserSession();
  if (data.user) {
    return <div>{children}</div>;
  }
  return (
    <div>
      <MainNavbar />
      {children}
      <Footer />
    </div>
  );
}

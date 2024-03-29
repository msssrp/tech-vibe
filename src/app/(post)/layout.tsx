import MainNavbar from "@/components/main/MainNavbar";
import UserNavbar from "@/components/main/UserNavbar";
import getUserSession from "@/libs/actions/user/auth/getSession";

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
      <div className="pt-16">{children}</div>
    </div>
  );
}

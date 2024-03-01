import MainNavbar from "@/components/main/MainNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainNavbar />
      {children}
    </div>
  );
}

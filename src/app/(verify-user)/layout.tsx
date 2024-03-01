import VerifyNavbar from "@/components/main/VerifyNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <VerifyNavbar />
      {children}
    </div>
  );
}

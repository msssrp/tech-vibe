import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

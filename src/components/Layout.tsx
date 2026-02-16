import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Navbar />
      <main className="w-full max-w-[1440px] mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

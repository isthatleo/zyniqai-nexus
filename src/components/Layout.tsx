import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Navbar />
      <main className="w-full flex flex-col items-center justify-center">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

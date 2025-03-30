import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  const excludePage = ["/signUp", "/signIn"];
  const excludeFooter = ["/dashboard", "/createBlog"];

  const showNavbar = !excludePage.includes(location.pathname);
  const showFooter = showNavbar && !excludeFooter.includes(location.pathname);

  return (
    <>
      {showNavbar && (
        <Navbar
          isDashboard={
            location.pathname.includes("/dashboard") ||
            location.pathname.includes("/createBlog")
          }
        />
      )}
      <main className="content">{children}</main>
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;

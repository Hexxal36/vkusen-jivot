import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Вкусен живот",
  description: "Статичен сайт с рецепти – Вкусен живот.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="bg">
      <body className="page">
        <SiteHeader />

        <main className="container pageMain">{children}</main>

        <footer className="footer">
          <div className="container footerInner">
            © {new Date().getFullYear()} Вкусен живот
          </div>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;

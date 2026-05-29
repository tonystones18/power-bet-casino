import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import Notifications from "@/components/ui/Notifications";
import AuthModals from "@/components/auth/AuthModals";

export const metadata: Metadata = {
  title: "POWER.BET — Ultimate Online Casino & Sports Betting",
  description:
    "Experience the ultimate online casino and sports betting platform. Slots, live casino, sports betting, poker and more. Join now and claim your welcome bonus!",
  keywords:
    "online casino, sports betting, slots, live casino, poker, bonuses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-dark font-sans text-white antialiased min-h-screen">
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
          <Notifications />
          <AuthModals />
        </Providers>
      </body>
    </html>
  );
}

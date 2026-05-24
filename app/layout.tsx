import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "NorthGrid",
  description: "Sustainable energy and mobility intelligence"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <head>
        <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="anonymous" />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NorthGrid",
  description: "Sustainable energy and mobility intelligence"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}

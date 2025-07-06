import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./Components/Navbar/NavBar";
import Footer from "./Components/Footer/Footer";

export const metadata: Metadata = {
  title: "Croma Drone Division",
  description: "Fornecedor oficial de drones DJI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className="mb-24">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

import { Open_Sans } from "next/font/google";
import Navbar from "@molecules/navbar/Navbar";
import "@atoms/globals.css";

export const metadata = {
  title: "Reservation App",
  description: "List of reservations",
};

const font = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

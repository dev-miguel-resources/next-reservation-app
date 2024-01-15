import { Open_Sans } from "next/font/google";
import ClientProcessor from "@atoms/clientProcessor/ClientProcessor";
import Navbar from "@atoms/navbar/Navbar";
import ToasterProvider from "@providers/ToasterProvider";
import LoginModal from "@atoms/modals/LoginModal";
import RegisterModal from "@atoms/modals/RegisterModal";
import RentModal from "@atoms/modals/RentModal";
import getCurrentUser from "./serverActions/getCurrentUser";
import "./globals.css";

export const metadata = {
  title: "Alquiler de alojamientos vacacionales y apartamentos",
  description:
    "Encuentra todo tipo de alojamientos personalizados desde pequeños apartamentos y casas a grandes hoteles y resorts.",
};

const font = Open_Sans({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientProcessor>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientProcessor>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}

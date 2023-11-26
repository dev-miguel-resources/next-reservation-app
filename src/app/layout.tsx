import { Open_Sans } from "next/font/google";
import ClientProcessor from "@molecules/clientProcessor/ClientProcessor";
import Navbar from "@molecules/navbar/Navbar";
import ToasterProvider from "@providers/ToasterProvider";
import LoginModal from "@molecules/modals/LoginModal";
import RegisterModal from "@molecules/modals/RegisterModal";
import RentModal from "@molecules/modals/RentModal";
import getCurrentUser from "./serverActions/getCurrentUser";
import "@atoms/globals.css";

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

import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthContextProvider } from "@/context/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-between">
        <AuthContextProvider>
          <Header/>
          <div className="h-24"></div>
          <main className={inter.className}>{children}</main>
          <Footer/>
        </AuthContextProvider>
      </body>
    </html>
  );
}

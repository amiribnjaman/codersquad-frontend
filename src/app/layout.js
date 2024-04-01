import { Inter } from "next/font/google";
import "./globals.css";
import LayoutComponent from "./layoutComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dasboard - AmarTask",
  description: "AmarTask is a task management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <LayoutComponent children={children} />
    </html>
  );
}

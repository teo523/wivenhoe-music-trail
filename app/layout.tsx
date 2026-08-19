import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wivenhoe Music Trail",
  description: "Live Wivenhoe Music Trail timetable",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

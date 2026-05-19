import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lovye — Digital Emotional Greeting",
    template: "%s | Lovye",
  },
  description:
    "Buat halaman ucapan digital interaktif yang aesthetic dan bisa dibagikan. Birthday, Anniversary, Confess, dan lebih banyak lagi.",
  openGraph: {
    title: "Lovye",
    description: "Digital Emotional Greeting Experience",
    url: "https://lovye.site",
    siteName: "Lovye",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-white text-gray-900 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
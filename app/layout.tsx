import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Manrope } from "next/font/google";
import { BRAND_LOGO_SRC } from "@/components/brand";
import { ApolloClientProvider } from "@/components/providers/apollo-provider";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GraphQL Zero",
  description: "Clean Next.js App Router starter with Tailwind CSS",
  icons: {
    icon: [{ url: BRAND_LOGO_SRC, type: "image/png", sizes: "32x32" }],
    apple: BRAND_LOGO_SRC,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}

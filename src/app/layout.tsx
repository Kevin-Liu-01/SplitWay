import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Anek_Devanagari, Inconsolata, Manrope } from "next/font/google";

const anek = Anek_Devanagari({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anek",
  weight: ["400", "500", "600", "700", "800"],
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inconsolata",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Splitway",
  description: "Track expenses and split them with friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="stylesheet" href="https://use.typekit.net/vxq6req.css"></link>
      <body
        className={`${anek.variable} ${inconsolata.variable} ${manrope.variable} antialiased`}
      >
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Montserrat, Bebas_Neue } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "700", "800"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://twosuns-pressurewashing.vercel.app"),
  title: "Two Suns Pressure Washing | Riverside's Best Pressure Washing Service",
  description: "Professional pressure washing in Riverside, CA. Expert cleaning for driveways, homes, roofs, and more. Get a free quote fast from Two Suns.",
  keywords: ["Riverside pressure washing", "power washing Riverside", "driveway cleaning", "roof soft washing", "Two Suns Pressure Washing"],
  openGraph: {
    title: "Two Suns Pressure Washing",
    description: "Bold, local, trustworthy pressure washing services in Riverside.",
    url: "https://twosuns-pressurewashing.vercel.app",
    siteName: "Two Suns Pressure Washing",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${bebasNeue.variable} scroll-smooth`}>
      <body className="antialiased bg-[#0A1628] text-white">
        <SmoothScroll>
          <ScrollProgressBar />
          <BackToTop />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

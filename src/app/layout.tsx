import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/providers/WalletProvider";
import { InstallPrompt } from "@/components/InstallPrompt";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://solana-price-clash.vercel.app"),
  title: "Solana Price Clash | Predict SOL Price & Win",
  description: "A fast-paced prediction game on Solana. Predict if SOL price goes UP or DOWN in 10 seconds and win points!",
  keywords: ["Solana", "crypto", "prediction", "game", "SOL", "price", "trading"],
  authors: [{ name: "Solana Price Clash" }],
  openGraph: {
    title: "Solana Price Clash",
    description: "Predict SOL price movements and compete on the leaderboard!",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solana Price Clash",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solana Price Clash",
    description: "Predict SOL price movements and compete on the leaderboard!",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0F0F19",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <WalletContextProvider>
          {children}
          <InstallPrompt />
        </WalletContextProvider>
      </body>
    </html>
  );
}

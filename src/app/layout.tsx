import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INEMA S.R.L. — Keep Moving Forward",
  description: "Leader nella consulenza operativa. Strategia, Operations, Continuous Improvement, Industrial Engineering e Data Management per industria, servizi e P.A.",
  openGraph: {
    title: "INEMA S.R.L.",
    description: "Leader nella consulenza operativa — Keep moving forward.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tajinsurance.com"),
  title: "Taj Insurance | Abdul Rahim Aljouja",
  description:
    "RIBO licensed insurance broker serving clients across Canada. Compare auto, home, tenant and business insurance options in English or Arabic.",
  keywords: ["insurance broker Canada", "auto insurance", "home insurance", "tenant insurance", "business insurance", "Arabic insurance broker"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Taj Insurance — Coverage that fits. Service that cares.",
    description: "Personal insurance guidance from Abdul Rahim Aljouja, RIBO Licensed Insurance Broker.",
    url: "https://tajinsurance.com",
    siteName: "Taj Insurance",
    locale: "en_CA",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Taj Insurance — Coverage that fits. Service that cares." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taj Insurance — Coverage that fits. Service that cares.",
    description: "Personal insurance guidance from Abdul Rahim Aljouja, RIBO Licensed Insurance Broker.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tajinsurance.com"),
  title: "Abdul Rahim Al Jouja | RIBO Licensed Insurance Broker",
  description:
    "RIBO licensed insurance broker serving Ontario. Personal help with auto, home, business and travel insurance in English or Arabic.",
  keywords: ["insurance broker Ontario", "auto insurance Ontario", "home insurance Ontario", "business insurance Ontario", "travel insurance", "Arabic insurance broker"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Abdul Rahim Al Jouja — RIBO Licensed Insurance Broker",
    description: "Personal insurance guidance for clients across Ontario, in English and Arabic.",
    url: "https://tajinsurance.com",
    siteName: "Abdul Rahim Al Jouja",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Rahim Al Jouja — RIBO Licensed Insurance Broker",
    description: "Personal insurance guidance for clients across Ontario, in English and Arabic.",
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

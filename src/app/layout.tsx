import type { Metadata } from "next";
import "./site.css";

export const metadata: Metadata = {
  title: {
    default: "Maa Sharda Sangeet Academy | Music Classes in Azamgarh",
    template: "%s | Maa Sharda Sangeet Academy",
  },
  description:
    "Learn classical music, light music, harmonium and guitar at Maa Sharda Sangeet Academy in Kolpanday, Azamgarh.",
  icons: {
    icon: "/maa-sharda.png",
    apple: "/maa-sharda.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

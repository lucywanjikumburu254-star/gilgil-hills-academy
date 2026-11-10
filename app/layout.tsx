import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gilgilhillsschools.co.ke"),
  title: "Gilgil Hills Academy | Excellence in All We Do",
  description:
    "Discover Gilgil Hills Academy in Gilgil, Nakuru County. Quality education from pre-primary to Grade 9, with day and boarding options.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Gilgil Hills Academy",
    description: "Excellence in All We Do. Learn, grow and rise higher at Gilgil Hills Academy.",
    type: "website",
    url: "https://gilgilhillsschools.co.ke"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

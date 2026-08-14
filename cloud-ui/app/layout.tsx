import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloud UI | Professional Storage",
  description: "A professional and modern cloud storage application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn("antialiased", "h-full", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

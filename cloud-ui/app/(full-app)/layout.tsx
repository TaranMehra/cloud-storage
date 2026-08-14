import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cloud } from "lucide-react";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { redirect } from "next/navigation";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="features" className="w-full h-full py-24 flex-1 justify-center">
        {children}
        {/* redirect.push('/') */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

import { Cloud } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Cloud className="h-6 w-6 text-primary" />
          <span>CloudUI</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="#features" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton />
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}

export default Header;

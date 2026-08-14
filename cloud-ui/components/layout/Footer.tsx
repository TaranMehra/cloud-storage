import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6 text-sm text-muted-foreground">
        <p>© 2026 CloudUI Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:underline">
            Terms
          </Link>
          <Link href="#" className="hover:underline">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

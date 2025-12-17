import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ChartColumnBig } from "lucide-react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/buttons/UserDropwdown";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextCash",
  description: "NextJS and Postgres",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.variable}  antialiased`}>
          <nav className="bg-primary p-4 text-white h-10 flex justify-between items-center">
            <Link
              className="font-bold text-2xl gap-1 flex items-center"
              href="/"
            >
              <ChartColumnBig className="text-lime-500" />
              NextCash
            </Link>
            <div>
              <SignedOut>
                <div className="flex items-center gap-1">
                  <Button asChild variant="link" className="text-white">
                    <SignInButton />
                  </Button>
                  <Button asChild variant="link" className="text-white">
                    <SignUpButton />
                  </Button>
                </div>
              </SignedOut>
              <SignedIn>
                <UserDropdown />
              </SignedIn>
            </div>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

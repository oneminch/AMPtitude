import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import Sidebar from "@/components/layout/sidebar";
import GlobalHeading from "@/components/shared/global-heading";
import initializeDatabase from "@/lib/db/init";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SidebarOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: {
    template: "%s · AMPtitude",
    default: "AMPtitude"
  },
  description:
    "Customer Service Representative (CSR) portal for AMP Memberships.",
  openGraph: {
    title: {
      template: "%s · AMPtitude",
      default:
        "Customer Service Representative (CSR) portal for AMP Memberships."
    },
    description:
      "Customer Service Representative (CSR) portal for AMP Memberships.",
    url: "https://AMPtitude.com",
    siteName: "AMPtitude",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    title: {
      template: "%s · AMPtitude",
      default:
        "Customer Service Representative (CSR) portal for AMP Memberships."
    },
    description:
      "Customer Service Representative (CSR) portal for AMP Memberships.",
    card: "summary_large_image"
  },
  robots: {
    index: false,
    follow: false
  }
};

const RootLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = async ({ children }) => {
  await initializeDatabase();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen">
        <div className="flex h-full">
          {/* Desktop Sidebar */}
          <Sidebar className="hidden md:flex max-w-3xs" />

          <div className="w-full h-full overflow-y-auto bg-zinc-50 *:max-w-7xl *:mx-auto">
            <header className="w-full p-3 sm:p-6 flex items-center gap-4">
              {/* Mobile Sidebar */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden flex">
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Open Sidebar Menu">
                    <SidebarOpen className="size-6 text-zinc-700" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <Sidebar className="border-none" />
                </SheetContent>
              </Sheet>

              <Separator
                orientation="vertical"
                className="md:hidden flex bg-zinc-300 w-0.5! h-4!"
              />

              {/* Global Page Indicator */}
              <GlobalHeading />
            </header>

            <main className="relative space-y-4 px-3 sm:px-6 py-4">
              <NuqsAdapter>{children}</NuqsAdapter>

              <Toaster />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
};
export default RootLayout;

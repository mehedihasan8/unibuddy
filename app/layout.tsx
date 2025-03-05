import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { ThemeProvider } from "@/providers/theme-provider";
import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unibuddy - All in one university solution.",
  description:
    "Unibuddy - All in one university solution. Manage your university.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${inter.className} bg-background text-foreground antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}

import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { CssBaseline } from "@mui/material";
import { ThemeContextProvider } from "@/lib/ThemeContext";
import { VoiceProvider } from "@/lib/VoiceContext";
import { AuthProvider } from "@/lib/AuthContext";
import "./globals.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "SADAQAPP - Voice-First, Inclusive Financial Aid Platform",
  description: "A Shariah-compliant fintech platform helping low-income users manage finances, request aid, and make donations with voice-first interactions.",
  keywords: ["Sadaqah", "Zakah", "Islamic Finance", "Voice-First", "Accessibility", "Financial Aid"],
  authors: [{ name: "SADAQAPP Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={roboto.className}>
        <ThemeContextProvider>
          <VoiceProvider>
            <AuthProvider>
              <CssBaseline />
              <main>
                {children}
              </main>
            </AuthProvider>
          </VoiceProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}

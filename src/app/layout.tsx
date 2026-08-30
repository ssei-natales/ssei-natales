import type { Metadata, Viewport } from "next";
import { Red_Hat_Display, Geist_Mono, Michroma } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const michroma = Michroma({
  variable: "--font-brand",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SSEI Natales",
  description: "Servicio de Salvamento y Extinción de Incendios — Aeródromo Teniente Julio Gallardo",
  icons: {
    icon: [{ url: "/logo/ssei-logo.png", sizes: "500x500", type: "image/png" }],
    apple: [{ url: "/logo/ssei-logo.png", sizes: "500x500", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SSEI Natales",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f9" },
    { media: "(prefers-color-scheme: dark)", color: "#080a0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${redHatDisplay.variable} ${geistMono.variable} ${michroma.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

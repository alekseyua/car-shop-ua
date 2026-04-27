import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "../widgets/header/ui/Header";
import Footer from "../widgets/footer/ui/Footer";
import ModalProvider from "../providers/modal-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "car shop Ukrain app",
  description: "New and used car parts in Ukraine",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {

  const { locale } = await params;
  const messages =  await getMessages(locale);

  console.log('RootLayout loaded with locale:', locale, '---- ', messages);
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} timeZone="Europe/Vienna" messages={messages}>
          <Header />
          {children}
          <Footer />
          <ModalProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

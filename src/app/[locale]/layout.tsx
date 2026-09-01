import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import Header from "../../widgets/header/ui/Header";
import Footer from "../../widgets/footer/ui/Footer";
import ModalProvider from "../../providers/modal-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { GarageProvider } from "@/src/providers/garage-provider";
import { Container } from "@/src/shared/ui/layout/Container/Container";
import VehicleFilters from "@/src/features/vehicleFilters/ui/VehicleFilters";

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
  const messages = await getMessages(locale);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider
          locale={locale}
          timeZone="Europe/Vienna"
          messages={messages}
        >
          <GarageProvider />
          <Header />
          <div className="sticky top-0 z-50 w-full bg-[#f2f4f3]">
            <Container className="!p-0">
              <div className="px-5 py-[17px]">
                <VehicleFilters />
              </div>
            </Container>
          </div>
          <main className="flex-1">{children}</main>
          <Footer />
          <ModalProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

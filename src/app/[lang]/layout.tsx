import { Rajdhani, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "../globals.css";

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: {
      template: '%s | Cursor Hackathon',
      default: lang === 'es' ? 'Cursor Hackathon San Salvador' : 'Cursor Hackathon San Salvador',
    },
    description: lang === 'es' 
      ? 'La primera plataforma de builders en Centroamérica. Únete a nosotros el 31 de Enero.'
      : 'Central America\'s first builder platform. Join us on January 31st.',
    openGraph: {
      title: 'Cursor Hackathon San Salvador',
      description: 'Central America\'s first builder platform.',
      type: 'website',
      // images: ['/og-image.png'],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className={`${rajdhani.variable} ${jetbrainsMono.variable} antialiased font-sans`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

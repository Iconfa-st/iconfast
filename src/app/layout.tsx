import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Iconfa.st - Generate All Your Icons from a Single SVG",
  description:
      "Iconfa.st allows you to effortlessly generate a complete set of icons from a single SVG file. Streamline your design process and ensure consistency across your projects with our powerful tool.",
  keywords: [
    "Icon Generator",
    "SVG to Icons",
    "Iconfa",
    "Icon Design",
    "SVG Tool",
    "Web Icons",
    "Design Tools",
    "Icon Library",
  ],
  metadataBase: new URL("https://iconfa.st"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iconfa.st",
    title: "Iconfa.st - Generate All Your Icons from a Single SVG",
    description:
        "Iconfa.st allows you to effortlessly generate a complete set of icons from a single SVG file. Streamline your design process and ensure consistency across your projects with our powerful tool.",
    siteName: "Iconfa.st",
    images: [
      {
        url: "https://iconfa.st/og-image.png",
        width: 1200,
        height: 630,
        alt: "Iconfa.st - Generate All Your Icons from a Single SVG",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iconfa.st - Generate All Your Icons from a Single SVG",
    description:
        "Iconfa.st allows you to effortlessly generate a complete set of icons from a single SVG file. Streamline your design process and ensure consistency across your projects with our powerful tool.",
    images: ["https://iconfa.st/twitter-image.png"],
    site: "@iconfast",
    creator: "@iconfast",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    // Add other verification codes as needed
  },
  // Structured Data (JSON-LD)
  meta: [ // Changed from additionalMetaTags to meta
    {
      name: "application-name",
      content: "Iconfa.st",
    },
    {
      name: "theme-color",
      content: "#ffffff",
    },
    {
      name: "msapplication-TileColor",
      content: "#ffffff",
    },
    {
      name: "msapplication-config",
      content: "/browserconfig.xml",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
  ],
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
        {/* Structured Data */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "Iconfa.st",
                url: "https://iconfa.st",
                description:
                    "Iconfa.st allows you to effortlessly generate a complete set of icons from a single SVG file. Streamline your design process and ensure consistency across your projects with our powerful tool.",
                applicationCategory: "DesignTool",
                operatingSystem: "All",
                browserRequirements: "Requires JavaScript",
              }),
            }}
        />
        {/* Removed redundant <title> tag */}
      </head>
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
      >
      {children}
      </body>
      </html>
  );
}

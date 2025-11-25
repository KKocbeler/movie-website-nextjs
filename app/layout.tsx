import type { Metadata } from "next";
import { Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/navbar/Navbar";
import Footer from "@/components/layouts/footer/Footer";
import BackToTop from "@/components/common/BackToTop";
import AlwaysTop from "@/components/common/AlwaysTop";
import { HydrateGenres } from "@/components/api/HydrateGenres";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    default: "Movieland — Discover Movies & TV Shows",
    template: "%s | Movieland",
  },
  description:
    "Explore trending movies, TV shows, actors and genres. Powered by TMDB API for movie lovers.",
  keywords: [
    "movies",
    "films",
    "series",
    "Tv shows",
    "movie app",
    "serie app",
    "tmdb",
    "movie browser",
    "MovieLand",
  ],
  openGraph: {
    title: "MovieLand — Discover Movies & TV Shows",
    description:
      "Explore trending movies, TV shows, actors and genres.",
    url: "https://movie-website-nexjs.netlify.app/",
    siteName: "MovieLand",
    images: [
      {
        url: "https://yourwebsite.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "MovieLand OG Image",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MovieLand — Discover Movies & TV Shows",
    description:
      "Explore trending movies, TV shows, actors and genres. Powered by TMDB API.",
    images: ["https://movilandfake.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(0, 0%, 100%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(240, 3%, 8%)" },
],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
    { cache: "force-cache" }
  );

  const data: { genres: { id: number; name: string }[] } = await res.json();

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${geistMono.variable}`}>
        <Navbar />
        <HydrateGenres genres={data.genres} />
        {children}
        <Footer />
        <BackToTop />
        <AlwaysTop />
      </body>
    </html>
  );
}

import type { Metadata } from 'next'
import localFont from "next/font/local"
import { Inter } from 'next/font/google'
import './globals.css'

// Google font (Inter)
const inter = Inter({ subsets: ['latin'], variable: "--font-inter" })

// Local font 1 (HeroFont Regular + Bold)
const heroFont = localFont({
  src: [
    { path: "../public/fonts/grooved.ttf", weight: "400", style: "normal" }
  ],
  variable: "--font-heroFont"
})

const heroFont2 = localFont({
  src: [
    { path: "../public/fonts/Avigea.ttf", weight: "400", style: "normal" }
  ],
  variable: "--font-heroFont2"
})



export const metadata: Metadata = {
  title: 'Unburden - Peer Support for Addiction Recovery',
  description: 'A privacy-first, judgment-free space for honest talk about addiction and recovery. Join topic-based Cove Circles for peer support.',
  keywords: 'addiction recovery, peer support, mental health, recovery community, addiction support, sobriety, mental wellness',
  authors: [{ name: 'Unburden' }],
  openGraph: {
    title: 'Unburden - Peer Support for Addiction Recovery',
    description: 'A privacy-first, judgment-free space for honest talk about addiction and recovery. Join topic-based Cove Circles for peer support.',
    url: 'https://unburden.com',
    siteName: 'Unburden',
    images: [
      {
        url: '/images/monk.png',
        width: 1200,
        height: 630,
        alt: 'Unburden - Peer Support for Addiction Recovery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unburden - Peer Support for Addiction Recovery',
    description: 'A privacy-first, judgment-free space for honest talk about addiction and recovery. Join topic-based Cove Circles for peer support.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${heroFont.variable} ${heroFont2.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}

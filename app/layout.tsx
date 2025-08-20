import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Unburden - Safe, Anonymous Peer Support',
  description: 'Join topic-based Cove Circles for honest talk about addiction and recovery. You\'re in control of what you share and what you see.',
  keywords: 'peer support, addiction recovery, anonymous support, mental health, community',
  authors: [{ name: 'Unburden Team' }],
  openGraph: {
    title: 'Unburden - Safe, Anonymous Peer Support',
    description: 'Join topic-based Cove Circles for honest talk about addiction and recovery.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unburden - Safe, Anonymous Peer Support',
    description: 'Join topic-based Cove Circles for honest talk about addiction and recovery.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}

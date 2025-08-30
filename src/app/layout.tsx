import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Decrypt The Girl',
    default: 'Decrypt The Girl - Elite Military Recruitment Platform',
  },
  description: 'Professional military recruitment platform connecting elite candidates with specialized military roles and career opportunities.',
  keywords: [
    'military recruitment',
    'military careers',
    'armed forces',
    'military jobs',
    'defense careers',
    'military training',
    'military leadership',
    'veterans',
    'military service'
  ],
  authors: [{ name: 'A.C. Van Cura' }],
  creator: 'A.C. Van Cura',
  publisher: 'Decrypt The Girl',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://decrypt-the-girl.vercel.app',
    title: 'Decrypt The Girl - Elite Military Recruitment Platform',
    description: 'Professional military recruitment platform connecting elite candidates with specialized military roles and career opportunities.',
    siteName: 'Decrypt The Girl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decrypt The Girl - Elite Military Recruitment Platform',
    description: 'Professional military recruitment platform connecting elite candidates with specialized military roles and career opportunities.',
    creator: '@DeCrypt_The_Girl',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://decrypt-the-girl.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-military-800 text-military-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm">
                  © 2024 Decrypt The Girl. Professional Military Recruitment Platform.
                </div>
                <div className="text-sm text-military-300 mt-2 md:mt-0">
                  Connecting elite candidates with specialized military roles
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
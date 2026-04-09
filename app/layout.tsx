import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'duddha - Live Looping Artist',
  description: 'duddha | live looping · lotus flower collective',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"/>
      </head>
      <body>{children}</body>
    </html>
  )
}

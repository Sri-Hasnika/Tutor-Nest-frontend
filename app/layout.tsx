import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tutor Nest',
  description: 'Place where tutees and tutors meet',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

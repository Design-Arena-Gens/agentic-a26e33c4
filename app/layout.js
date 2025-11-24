export const metadata = {
  title: 'Instagram Reel Viewer',
  description: 'Interactive Instagram-style reel viewer with smooth animations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Isometric Graphics System',
  description: 'A procedural isometric illustration using PixiJS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

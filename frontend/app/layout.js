import "./globals.css";

export const metadata = {
  title: "Simple Storage dApp",
  description: "Minimal TRON + Next.js demo for the workshop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

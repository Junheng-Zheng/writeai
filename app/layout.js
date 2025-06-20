import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Writely",
  description: "AI powered writing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
        />
        <link rel="icon" href="/assets/icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}

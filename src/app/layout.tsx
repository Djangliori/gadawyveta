import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "გადაწყვეტა - დროის აღრიცხვა",
  description: "დროის აღრიცხვისა და დავალებების მართვის აპლიკაცია",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

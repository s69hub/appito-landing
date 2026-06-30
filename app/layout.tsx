import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://appito.app"),
  title: "اپیتو | اپلیکیشن فروشگاهی اختصاصی و حرفه‌ای",
  description:
    "اپیتو یک پلتفرم وایت‌لیبل برای ساخت اپلیکیشن فروشگاهی اختصاصی است. تنها چیزی که نیاز دارید یک دامنه است؛ ما اپلیکیشن فروشگاهی اختصاصی شما را راه‌اندازی می‌کنیم؛ کاملاً قابل سفارشی‌سازی از پنل مدیریت.",
  keywords: ["اپیتو", "Appito", "فروشگاه اینترنتی", "فروشگاه‌ساز", "اپلیکیشن فروشگاهی", "وایت لیبل", "دامنه اختصاصی"],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  openGraph: {
    title: "اپیتو | اپلیکیشن فروشگاهی اختصاصی و حرفه‌ای",
    description: "تنها به یک دامنه نیاز دارید؛ اپلیکیشن فروشگاهی اختصاصی و حرفه‌ای‌تان را تحویل بگیرید. بدون کدنویسی.",
    type: "website",
    locale: "fa_IR",
  },
};

export const viewport: Viewport = {
  themeColor: "#7a4dff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

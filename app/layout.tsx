import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://appito.app"),
  title: "اپیتو | فروشگاه اینترنتی حرفه‌ای روی دامنه‌ی خودتان",
  description:
    "اپیتو یک پلتفرم فروشگاه‌ساز سفید (white-label) است. دامنه‌تان را ثبت کنید، DNS را تنظیم کنید و ما اپلیکیشن فروشگاهی شما را روی دامنه‌ی خودتان راه‌اندازی می‌کنیم؛ کاملاً قابل سفارشی‌سازی از پنل مدیریت.",
  keywords: [
    "اپیتو",
    "Appito",
    "فروشگاه اینترنتی",
    "فروشگاه‌ساز",
    "اپلیکیشن فروشگاهی",
    "وایت لیبل",
    "دامنه اختصاصی",
  ],
  openGraph: {
    title: "اپیتو | فروشگاه اینترنتی حرفه‌ای روی دامنه‌ی خودتان",
    description:
      "دامنه‌تان را وصل کنید، فروشگاه موبایلی حرفه‌ای‌تان را تحویل بگیرید. بدون کدنویسی.",
    type: "website",
    locale: "fa_IR",
  },
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

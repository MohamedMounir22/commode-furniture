import ChatWidget from "@/components/ChatWidget";
import HeaderNav from "@/components/HeaderNav";
import { CartProvider } from "@/lib/context/CartContext";
import LanguageProvider from "@/lib/context/LanguageProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata = {
    title: "Commode Furniture | Modern Artisanal Designs",
    description: "Premium furniture for the modern home.",
};

export default function RootLayout({
    children,
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            {/* 🖤 تعديل الألوان وبس: الأسود الفاحم الصافي للموقع كله */}
            <body className="min-h-full flex flex-col text-zinc-100 font-sans antialiased bg-[url('/luxury-bg.jpeg')] bg-fixed bg-cover bg-center bg-no-repeat">
                <LanguageProvider>
                    <CartProvider>
                        <HeaderNav />

                        <main className="flex-1 flex flex-col ">{children}</main>

                        <SpeedInsights />
                    </CartProvider>
                </LanguageProvider>

                {/* 🎯 تعديل ألوان الفوتر وبس ليصبح أسود فاحم متناسق */}
                <footer className="border-t border-white/[0.05] py-12 bg-black">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <p className="text-sm text-primary/80 font-medium tracking-wider">
                            &copy; {new Date().getFullYear()} Commode Furniture Inc. All
                            rights reserved.
                        </p>
                    </div>
                </footer>

                <ChatWidget />
            </body>
        </html>
    );
}

import ChatWidget from "@/components/ChatWidget";
import HeaderNav from "@/components/HeaderNav";
import { CartProvider } from "@/lib/context/CartContext";
import LanguageProvider from "@/lib/context/LanguageProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Commode Furniture | Modern Artisanal Designs",
    description: "Premium furniture for the modern home.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
                <LanguageProvider>
                    <CartProvider>
                        <HeaderNav />

                        <main className="flex-1 flex flex-col">{children}</main>
                        <SpeedInsights />
                    </CartProvider>
                </LanguageProvider>

                <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-zinc-50 dark:bg-zinc-950">
                    {/* <div className="mt-4 flex items-center justify-center gap-2 group">
                        <span className="text-xs text-gray-400">Developed by</span>
                        <a
                            href="https://wa.me/2010XXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm font-bold text-green-500 hover:text-green-600 transition-all duration-300"
                        >
                            Mohamed mounir
                            <svg
                                className="w-7 h-7   text-green-500 transition-transform group-hover:scale-110"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12.031 6.172c-3.181 co 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.129l-.651 2.375 2.436-.639c.822.449 1.751.686 2.766.688 3.184 0 5.771-2.587 5.771-5.767 0-3.181-2.587-5.752-5.779-5.752zm3.367 8.033c-.145.408-.84.823-1.164.877-.324.053-.747.094-1.21-.061-.282-.094-.614-.223-.974-.383-1.536-.684-2.52-2.249-2.597-2.351-.077-.102-.628-.834-.628-1.59 0-.756.397-1.127.538-1.281.141-.153.308-.191.411-.191.103 0 .205.001.296.005.099.004.23-.037.362.281.137.329.47 1.144.512 1.226.041.082.068.177.013.286-.054.11-.081.177-.163.272-.082.095-.172.212-.246.28-.083.076-.17.159-.073.326.097.167.433.714.928 1.154.638.568 1.175.744 1.343.826.168.082.266.068.365-.045.099-.113.424-.493.538-.663.113-.17.227-.143.383-.085.157.058 1.001.472 1.171.557.171.085.285.127.327.201.041.073.041.424-.104.832z" />
                            </svg>
                        </a>
                    </div> */}

                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <p className="text-sm text-zinc-500">
                            &copy; {new Date().getFullYear()} Commode Furniture Inc. All
                            rights reserved.
                        </p>
                    </div>
                </footer>

                {/* The Chat Widget is added here */}
                <ChatWidget />
            </body>
        </html>
    );
}

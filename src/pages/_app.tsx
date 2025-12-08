import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

import { ThemeProvider } from "@/context/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <main className={`${plusJakartaSans.className}`}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}

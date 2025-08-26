import "./globals.css";
import { AuthProvider } from "./Providers";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: "Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)",
  description: "Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
      <GoogleAnalytics gaId="G-DXHW85NLTH" />
    </html>
  );
}

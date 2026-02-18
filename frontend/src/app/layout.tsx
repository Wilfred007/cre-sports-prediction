// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ThirdwebProvider } from "thirdweb/react";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Sports Prediction Market | CRE Powered",
//   description: "Predict sports outcomes with automated AI settlement via Chainlink CRE",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="dark">
//       <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen`}>
//         <ThirdwebProvider>
//           {children}
//         </ThirdwebProvider>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { ThirdwebProvider } from "thirdweb/react";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: 'PredictChain - Decentralized Sports Predictions',
  description: 'Decentralized prediction markets settled by AI with Chainlink CRE. No middleman, just code and consensus.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-foreground bg-background`}>
        <ThirdwebProvider>
          {children}
          <Analytics />
        </ThirdwebProvider>
      </body>
    </html>
  )
}

import './globals.css'
import { Raleway } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";




const raleway = Raleway({ 
  subsets: ['latin'], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={raleway.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}

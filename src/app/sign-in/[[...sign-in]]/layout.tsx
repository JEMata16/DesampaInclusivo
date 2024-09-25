// app/sign-in/layout.tsx

import { GeistSans } from "geist/font/sans";
export default function SignInLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          {children}
        </body>
      </html>
      
    );
  }
  
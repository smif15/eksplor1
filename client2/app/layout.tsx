import type { Metadata } from "next";
import "./globals.css";
import { inter } from '@/app/fonts';

import { clsx } from 'clsx';
import Link from "next/link";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const navigation = [
  {name: 'Tanya', href: '/'},
  {name: 'Klasifikasi', href: '/klasifikasi'},
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body
        className={`${inter.className} antialiased`}
      >
        {/* bikin sidebar */}
        <div>
          <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 bg-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <p className="text-lg font-bold text-sky-700">Sistem Informasi Question Answering</p>
            </div>
          </nav>

          {/* sidebar  */}
          <aside
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
              <ul className="space-y-2 font-medium">
                <li>
                  <a
                    href="/tanya"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="ms-3">Tanya Jawab</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">Pemetaan</span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          {/* end sidebar  */}
          <div className="p-4 sm:ml-64 border border-gray-500 h-screen">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-blue-700 mt-14">
              {children}
            </div>
          </div>

        </div>
      </body>
    </html>
  );
}

import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { Onest } from "next/font/google"

// 初始化 Onest 字体
const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
})

export const metadata: Metadata = {
  title: "陈彬宇 · 前端开发者 & AI 实践者",
  description:
    "信息安全学院 2025 级软件工程在校生，前端开发者与 AI 实践者，记录前端技术与个人成长。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${onest.variable} font-sans antialiased overflow-x-hidden`}>{children}</body>
    </html>
  )
}
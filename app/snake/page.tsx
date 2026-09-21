import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SnakeGame } from "@/components/snake-game"

export const metadata: Metadata = {
  title: "贪吃蛇 · 陈彬宇",
  description: "一个用 HTML5 Canvas 实现的霓虹风贪吃蛇小游戏。",
}

export default function SnakePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#16182e] via-[#1a1a2e] to-[#0f1020] text-white">
      {/* 顶部导航 */}
      <header className="w-full pt-5 pb-2 px-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-white/70 hover:text-[#00ff88] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <span className="font-mono text-xs text-white/40 hidden sm:inline">
            SNAKE · HTML5 Canvas
          </span>
        </div>
      </header>

      {/* 游戏主体 */}
      <section className="flex flex-col items-center justify-center flex-1 pt-8 md:pt-14 pb-28 md:pb-20 px-4">
        <SnakeGame />
        <p className="mt-8 font-mono md:hidden text-[10px] text-white/35 text-center leading-5">
          方向键移动 · 空格暂停 · 回车重新开始
        </p>
      </section>
    </main>
  )
}
import { Mail, FolderOpen, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* 柔和背景光斑 */}
      <div className="pointer-events-none absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-brand-soft blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -bottom-36 -left-28 w-[420px] h-[420px] rounded-full bg-sky blur-3xl opacity-70" />

      <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-16 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-7">
          <div>
            <span className="inline-flex items-center gap-2 bg-brand-soft text-brand-deep text-sm font-semibold px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-brand rounded-full" />
              信息安全学院 · 软件工程 2025 级
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink leading-[1.15]">
            你好，我是<span className="text-[#172149]">陈彬宇</span>
            <span className="block text-2xl md:text-4xl font-semibold text-ink-2 mt-3">
              前端爱好者
            </span>
          </h1>

          <p className="text-ink-2 text-base md:text-lg leading-relaxed max-w-xl">
            软件工程专业在读，喜欢用代码把想法变成打开就能用的界面。
            这个网页正是我用 AI 辅助一步步搭建起来的——探索前端与 AI 结合的更多可能，
            也是我正在做的事。
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
            <Button asChild className="bg-brand-deep text-white hover:bg-brand-dark rounded-full h-[52px] px-8 text-base font-semibold">
              <a href="#projects">
                <FolderOpen className="w-5 h-5" />
                查看我的项目
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-white hover:bg-neutral-50 rounded-full h-[52px] px-8 text-base font-semibold text-ink border border-neutral-300"
            >
              <a href="#contact">
                <Mail className="w-5 h-5" />
                联系我
              </a>
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-full max-w-md aspect-square rounded-[28px] overflow-hidden bg-gradient-to-br from-[#1fb1d6] via-[#2fc2e8] to-[#9ee4f5] border-8 border-white/80 shadow-2xl shadow-brand/15">
            <img
              src="/images/2423c9628a3f7e2ed86a842ed26e95f2.jpg"
              alt="陈彬宇头像"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-5 left-6 md:left-2 bg-white rounded-2xl shadow-lg shadow-neutral-200/60 border border-neutral-100 px-4 py-3 flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-brand-soft flex items-center justify-center flex-shrink-0">
              <Code2 className="w-4.5 h-4.5 text-brand" />
            </span>
            <div>
              <div className="text-sm font-semibold text-ink">JavaScript</div>
              <div className="text-xs text-ink-3 mt-0.5">正在深耕前端工程</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
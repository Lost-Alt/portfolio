import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4">
      <nav className="mx-auto max-w-5xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-neutral-200/70 rounded-full px-4 py-2 shadow-sm shadow-neutral-200/50">
        <a href="#top" className="flex items-center gap-2.5 pl-1">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center text-white text-[15px] font-bold flex-shrink-0">
            陈
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-semibold text-ink text-[15px]">陈彬宇</span>
            <span className="text-[11px] text-ink-3 font-normal tracking-wide">2025218174</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6 font-medium text-[15px] text-ink-2">
          <a href="#top" className="hover:text-brand-deep transition-colors">首页</a>
          <a href="#skills" className="hover:text-brand-deep transition-colors">专业技能</a>
          <a href="#projects" className="hover:text-brand-deep transition-colors">项目作品</a>
          <a href="#about" className="hover:text-brand-deep transition-colors">荣誉</a>
          <a href="#timeline" className="hover:text-brand-deep transition-colors">成长时间线</a>
        </div>

        <Button asChild className="bg-brand-deep text-white hover:bg-brand-dark rounded-full h-10 px-5 text-sm font-semibold flex-shrink-0">
          <a href="#contact">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">联系我</span>
          </a>
        </Button>
      </nav>
    </header>
  )
}
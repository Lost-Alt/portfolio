import { Mail, MessageCircle, ArrowUp } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#17181f] text-white pt-14 pb-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 pb-12 border-b border-white/10 mb-10">
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold mb-2">保持联系</h3>
            <p className="text-white/60 text-sm md:text-base">
              邮箱、微信都随时欢迎 —— 技术讨论、项目合作，或者只是打个招呼。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:3395152162@qq.com"
              className="w-11 h-11 bg-white/10 hover:bg-brand-deep rounded-full flex items-center justify-center transition-colors"
              aria-label="邮箱"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="#top"
              className="w-11 h-11 bg-brand-deep rounded-full flex items-center justify-center transition-colors hover:bg-brand-dark"
              aria-label="回到顶部"
            >
              <ArrowUp className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center text-white text-sm font-bold">
                陈
              </span>
              <span className="text-lg font-bold">陈彬宇</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              信息安全学院 2025 级软件工程在校生。
              前端开发者 · AI 实践者，认真记录每一段成长。
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white/90">站内导航</h3>
            <ul className="space-y-2.5 text-white/50 text-sm">
              <li>
                <a href="#top" className="hover:text-white transition-colors">
                  首页
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  项目作品
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  关于我
                </a>
              </li>
            </ul>
          </div>

          <div id="contact" className="scroll-mt-24">
            <h3 className="font-semibold mb-4 text-white/90">联系我</h3>
            <ul className="space-y-3 text-white/50 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:3395152162@qq.com" className="hover:text-white transition-colors">
                  3395152162@qq.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>微信：a13452002029</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 text-center text-white/40 text-[13px]">
          <p>© 2026 陈彬宇 · 用 Next.js 认真写下的个人主页</p>
        </div>
      </div>
    </footer>
  )
}
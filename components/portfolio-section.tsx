import { ArrowRight, Globe, Gamepad2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function PortfolioSection() {
  const projects = [
    {
      title: "个人作品集重构",
      description:
        "基于 Next.js + Tailwind CSS 打造的个人主页，此内容是通过AI辅助技术，并基于VO开源网站平台开发的演示版本（Demo）所形成的，其中包含的所有元素均由本人独立设计与创建。",
      tag: "前端开发 · TypeScript",
      icon: Globe,
      gradBg: "from-blush to-cream",
      illustration: "/images/venture-workspace.svg",
      href: "#",
    },
    {
      title: "贪吃蛇游戏",
      description:
        "用 HTML5 Canvas 从零实现的经典贪吃蛇，支持方向键与移动端虚拟按键、暂停和最高分记录。",
      tag: "游戏开发 · Canvas",
      icon: Gamepad2,
      gradBg: "from-sage to-sky",
      illustration: "",
      href: "/snake",
    },
  ]

  return (
    <section id="projects" className="py-16 md:py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl mb-12 md:mb-14">
          <h2 className="text-3xl md:text-[44px] md:leading-[56px] font-bold text-ink mb-4">
            一些我<span className="text-brand-deep">认真做过</span>的东西
          </h2>
          <p className="text-ink-2 text-base md:text-lg leading-relaxed">
            前端、AI 与游戏方向的实践项目，从构思到实现，都是自己一步步走完的。
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group grid md:grid-cols-2 bg-white rounded-[28px] border border-neutral-200 overflow-hidden hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-7 md:p-12 flex flex-col justify-center order-2 md:order-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradBg} flex items-center justify-center`}>
                    <project.icon className="w-5 h-5 text-brand" />
                  </span>
                </div>

                <span className="inline-block bg-brand-soft text-brand-deep text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5 w-fit">
                  {project.tag}
                </span>

                <h3 className="text-xl md:text-[26px] font-bold mb-3 leading-snug text-ink">
                  {project.title}
                </h3>

                <p className="text-ink-2 text-base md:text-[17px] mb-7 leading-relaxed font-normal">
                  {project.description}
                </p>

                <Link
                  href={project.href}
                  className="inline-flex items-center gap-2 font-semibold text-brand-deep hover:gap-3.5 transition-all text-sm md:text-[15px] w-fit"
                >
                  {project.href === "/snake" ? "去玩一玩" : "查看项目"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div
                className={`bg-gradient-to-br ${project.gradBg} relative overflow-hidden min-h-[220px] md:min-h-[440px] order-1 md:order-2 flex items-center justify-center`}
              >
                {project.illustration ? (
                  <Image
                    src={project.illustration}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <Link href={project.href} className="group/game flex flex-col items-center gap-4 px-6 text-center hover:scale-105 transition-transform duration-300">
                    <span className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center shadow-lg shadow-black/5">
                      <Gamepad2 className="w-10 h-10 text-brand" />
                    </span>
                    <span className="inline-flex items-center gap-2 bg-white/90 text-brand-deep text-sm font-semibold px-5 py-2.5 rounded-full shadow-md">
                      点击开始游戏
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/game:translate-x-1" />
                    </span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
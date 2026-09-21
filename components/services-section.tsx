import { Mail, Terminal, Cpu, FileCode, Palette, Network, PlugZap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ServicesSection() {
  const skills = [
    {
      title: "C 语言",
      description: "掌握指针、内存管理与模块化编程，能写出干净可靠的底层逻辑。",
      icon: Terminal,
      tile: "bg-brand-soft text-brand",
    },
    {
      title: "C++",
      description: "理解面向对象与 STL，会用它高效实现数据结构和算法。",
      icon: Cpu,
      tile: "bg-sky text-[#3b6ea8]",
    },
    {
      title: "HTML",
      description: "遵循语义化标签与标准结构，搭建清晰、可访问的页面骨架。",
      icon: FileCode,
      tile: "bg-blush text-[#b06278]",
    },
    {
      title: "CSS",
      description: "熟悉布局、响应式与交互动效，注重还原度与细节打磨。",
      icon: Palette,
      tile: "bg-cream-deep text-[#a0812f]",
    },
    {
      title: "数据结构与算法",
      description: "熟悉线性表、树、图与常用算法，打好扎实的编程基本功。",
      icon: Network,
      tile: "bg-sage text-[#4c7a5f]",
    },
    {
      title: "API 接入能力",
      description: "能快速读懂接口文档，把 REST、大模型等外部 API 接入到实际项目中。",
      icon: PlugZap,
      tile: "bg-[#e6e9fb] text-brand-deep",
    },
  ]

  return (
    <section id="skills" className="py-16 md:py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-[44px] md:leading-[56px] font-extrabold text-[#fbe9a1] mb-4">专业技能</h2>
          <p className="text-ink-2 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            课程所学与兴趣驱动，一步一个脚印打磨出来的技术栈。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-neutral-200 p-8 flex flex-col hover:-translate-y-2 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/15 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl ${skill.tile} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
              >
                <skill.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">{skill.title}</h3>
              <p className="text-ink-2 text-[15px] leading-relaxed font-normal">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-cream border border-neutral-200/80 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-ink mb-2">有想聊的想法或合作？</h3>
            <p className="text-ink-2 text-[15px]">无论是技术讨论、项目合作，还是找我一起捣鼓点什么，都欢迎随时找我。</p>
          </div>
          <Button asChild className="bg-brand-deep text-white hover:bg-brand-dark rounded-full h-12 px-7 text-[15px] font-semibold flex-shrink-0">
            <a href="#contact">
              <Mail className="w-4 h-4 mr-1" />
              联系我
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
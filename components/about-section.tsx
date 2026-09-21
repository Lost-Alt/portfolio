import { Medal, Star, Mic, Trophy, Laptop, Languages, GraduationCap, Award } from "lucide-react"

const honors = [
  {
    icon: Medal,
    badge: "校级",
    badgeCls: "bg-brand-soft text-brand-deep",
    title: "五四红旗团支部学生干部",
    meta: "荣誉称号",
    tile: "bg-brand-soft text-brand",
  },
  {
    icon: Star,
    badge: "",
    badgeCls: "",
    title: "军训优秀学员",
    meta: "荣誉称号",
    tile: "bg-sky text-[#3b6ea8]",
  },
  {
    icon: Mic,
    badge: "国家级",
    badgeCls: "bg-blush text-[#b06278]",
    title: "普通话水平测试",
    meta: "等级证书",
    tile: "bg-blush text-[#b06278]",
  },
  {
    icon: Trophy,
    badge: "校级",
    badgeCls: "bg-brand-soft text-brand-deep",
    title: "重庆移通学院第九届大学生程序设计大赛",
    meta: "二等奖",
    tile: "bg-cream-deep text-[#a0812f]",
  },
  {
    icon: Laptop,
    badge: "全国",
    badgeCls: "bg-sky text-[#3b6ea8]",
    title: "计算机等级考试二级",
    meta: "合格证书",
    tile: "bg-sage text-[#4c7a5f]",
  },
  {
    icon: Languages,
    badge: "",
    badgeCls: "",
    title: "大学英语四级（CET-4）",
    meta: "合格证书",
    tile: "bg-[#e6e9fb] text-brand-deep",
  },
  {
    icon: GraduationCap,
    badge: "校级",
    badgeCls: "bg-brand-soft text-brand-deep",
    title: "移通学院优秀学生",
    meta: "三等奖",
    tile: "bg-cream-deep text-[#a0812f]",
  },
  {
    icon: Award,
    badge: "校级",
    badgeCls: "bg-brand-soft text-brand-deep",
    title: "三好学生",
    meta: "荣誉称号",
    tile: "bg-brand-soft text-brand",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-[42px] md:leading-[54px] font-bold text-ink mb-4">
            获得的<span className="text-brand-deep">荣誉</span>
          </h2>
          <p className="text-ink-2 text-base md:text-lg leading-relaxed">
            过去的成绩是出发的起点。严于律己，把每一件事做到位，剩下的交给时间。
          </p>
        </div>

        <ul className="space-y-6">
          {honors.map((item, index) => (
            <li key={index} className="flex items-center gap-4 bg-white rounded-2xl border border-neutral-200 p-5 md:p-6 shadow-[0_2px_8px_rgba(23,33,73,0.15)] hover:-translate-y-1.5 hover:border-2 hover:border-[#002475] hover:shadow-[0_4px_12px_rgba(23,33,73,0.28)] transition-all duration-300 ease-out">
              <div
                className={`w-11 h-11 rounded-xl ${item.tile} flex items-center justify-center flex-shrink-0`}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-base md:text-lg font-bold text-ink leading-snug">{item.title}</h3>
                  {item.badge && (
                    <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ${item.badgeCls}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-ink-2 text-sm leading-relaxed">{item.meta}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
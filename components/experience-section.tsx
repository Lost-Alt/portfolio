export function ExperienceSection() {
  const experiences = [
    {
      stage: "01",
      period: "2025.09",
      title: "Hello World · 出发",
      description:
        "在 C 语言课上写下人生第一行 printf(\"Hello World\")，从此推开编程世界的大门。",
    },
    {
      stage: "02",
      period: "2025 冬",
      title: "洛谷刷题 · 转战 C++",
      description:
        "在洛谷在线评测平台用 C 语言刷题入门，渐渐发现 C++ 在竞赛编程中更顺手、更高效，果断切换语言继续前进。",
    },
    {
      stage: "03",
      period: "2026 春",
      title: "STL · 数据结构与算法",
      description:
        "接触到 C++ 标准库 STL 后觉得妙趣横生，顺势深入研究，并系统学习数据结构与算法，为自己夯实编程地基。",
    },
    {
      stage: "04",
      period: "进行中",
      title: "前端 · AI 之旅",
      description:
        "被刘宇轩学长的讲座点燃了前端热情，开始系统学习前端技术，并尝试把 AI 工具融入开发流程——这个网站就是答案。",
    },
  ]

  return (
    <section id="timeline" className="bg-[#17181f] py-16 md:py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-12 items-start">
        <div className="text-white pt-0 md:pt-14 md:sticky md:top-28 self-start">
          <h2 className="text-3xl md:text-[44px] md:leading-[56px] font-bold mb-6 md:mb-8">
            我的<span className="text-[#a5b4fc]">成长时间线</span>
          </h2>
          <p className="text-white/60 mb-8 md:mb-10 leading-relaxed text-base md:text-lg">
            从入学到现在，一步一步积累的足迹。进度条还在加载中，进度 1% 已经让人兴奋。
          </p>
        </div>

        <div className="space-y-5 relative">
          <div className="absolute left-[27px] top-3 bottom-3 w-px bg-white/10 hidden md:block" />
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative flex gap-5 bg-white rounded-2xl p-6 md:p-7 shadow-lg shadow-black/20 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="hidden md:flex w-[54px] flex-shrink-0 flex-col items-center pt-0.5">
                <span className="w-8 h-8 rounded-full bg-brand-soft text-brand-deep text-xs font-bold flex items-center justify-center">
                  {exp.stage}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-brand-deep mb-2">{exp.period}</div>
                <h3 className="text-lg md:text-[22px] font-bold text-ink mb-2 leading-snug">{exp.title}</h3>
                <p className="text-ink-2 text-sm md:text-[15px] leading-relaxed font-normal">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
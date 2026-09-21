export function LogoMarquee() {
  const items = [
    "HTML",
    "CSS",
    "JavaScript",
    "Vue",
    "React",
    "Next",
    "AI 应用",
  ]

  return (
    <div className="relative px-4 md:px-0 py-10 md:py-12 overflow-hidden" aria-hidden="true">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-black border border-neutral-800 py-5">
        <div className="flex items-center animate-marquee whitespace-nowrap w-max">
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <span key={index} className="flex items-center px-8">
              <span className="text-lg md:text-xl font-semibold text-white/85">{item}</span>
              <span className="ml-8 w-1.5 h-1.5 rounded-full bg-brand/70 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
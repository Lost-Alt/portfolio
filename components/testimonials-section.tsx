"use client"

import Image from "next/image"

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12 pt-2 md:pt-8">
          <h2 className="text-3xl md:text-[44px] md:leading-[56px] font-bold text-ink mb-4 leading-[1.3]">
            我的一句话
          </h2>
          <p className="text-ink-2 text-base md:text-lg max-w-2xl mx-auto">
            写给同样在路上的你，也写给自己。
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative">
            <div className="bg-white rounded-3xl border border-neutral-200 py-10 md:py-14 px-6 md:px-12">
              <div className="absolute -top-5 md:-top-6 left-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-soft flex items-center justify-center">
                <Quote className="w-5 h-5 text-brand" />
              </div>

              <div className="md:max-w-[85%]">
                <p className="text-base md:text-xl leading-relaxed md:leading-9 text-ink font-medium mb-8">
                  “代码是通往真实世界的桥梁——我作为一个刚刚大二的学生可能有很多都不懂，
                  但是被前端学习中的及时反馈感到兴趣，所以我希望我每天都能进步一点，
                  也希望学长学姐们给我一个进步的机会。”
                </p>

                <div>
                  <div className="font-bold text-base md:text-lg text-ink">陈彬宇</div>
                  <div className="text-ink-3 text-sm md:text-[15px] mt-1">
                    信息安全学院 · 软件工程 2025 级
                  </div>
                  <div className="text-ink-3 text-sm md:text-[15px] mt-0.5">学号：2025218174</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full overflow-hidden hidden lg:block ring-8 ring-cream">
              <Image
                src="/images/2423c9628a3f7e2ed86a842ed26e95f2.jpg"
                alt="陈彬宇"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Quote({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
    </svg>
  )
}
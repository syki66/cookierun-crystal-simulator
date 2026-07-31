import { Sparkles } from 'lucide-react';

interface PageHeroProps {
  title: string;
  description: string;
  eyebrow: string;
}

export default function PageHero({
  title,
  description,
  eyebrow,
}: PageHeroProps) {
  return (
    <section className="relative mx-auto mb-8 mt-5 flex min-h-48 max-w-screen-xl items-center overflow-hidden rounded-[2rem] border-[3px] border-amber-300 bg-[url('/branding/crystal-hero.webp')] bg-cover bg-[68%_center] shadow-[0_7px_0_#9a4a1d,0_16px_36px_rgb(120_53_15_/_22%)] sm:min-h-60">
      <div className="absolute inset-0 bg-gradient-to-r from-[#51250f]/80 via-[#6b2d12]/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-amber-950/30 to-transparent" />
      <div className="relative max-w-2xl px-5 py-8 sm:px-10 lg:px-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-white/70 bg-sky-400/90 px-3 py-1 text-xs font-black text-sky-950 shadow-[0_3px_0_#0369a1] sm:text-sm">
          <Sparkles className="size-4" />
          {eyebrow}
        </div>
        <h1 className="game-title break-keep text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl break-keep text-sm font-bold leading-6 text-white/95 [text-shadow:0_2px_3px_rgb(69_26_3_/_80%)] sm:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}

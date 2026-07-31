import { Card, CardContent } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  value: string;
  subtext: string;
}

export default function DashboardCard({
  title,
  icon: Icon,
  value,
  subtext,
}: DashboardCardProps) {
  return (
    <Card className="group relative h-full overflow-hidden rounded-[1.5rem] border-[3px] border-[#704027] bg-[#fff2d2] text-[#5d341f] shadow-[0_7px_0_#9a6534,0_12px_24px_rgba(97,54,31,0.15)] motion-safe:transition-transform motion-safe:duration-200 hover:-translate-y-1">
      <div
        aria-hidden="true"
        className="absolute -right-7 -top-7 size-24 rotate-12 rounded-[2rem] border-2 border-[#87d9ee]/60 bg-[#c9f5ff]/60"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-3 left-4 size-2 rounded-full bg-[#d59b5d]/40 shadow-[14px_5px_0_#e4b878,27px_-3px_0_#c8874e]"
      />
      <CardContent className="relative z-10 flex h-full flex-col p-4 sm:p-5">
        <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4">
          <h3 className="pt-1 text-xs font-black leading-snug text-[#805033] sm:text-sm">
            {title}
          </h3>
          <div className="flex size-9 shrink-0 rotate-3 items-center justify-center rounded-xl border-2 border-[#287da7] bg-[#c9f4ff] text-[#287da7] shadow-[0_3px_0_#287da7] sm:size-11">
            <Icon
              aria-hidden="true"
              className="size-4 stroke-[2.75] sm:size-5"
            />
          </div>
        </div>
        <p className="mt-auto break-keep text-lg font-black leading-tight tracking-tight text-[#58301d] sm:text-2xl">
          {value}
        </p>
        <p className="mt-2 break-keep text-[10px] font-bold leading-snug text-[#946443] sm:text-xs">
          {subtext}
        </p>
      </CardContent>
    </Card>
  );
}

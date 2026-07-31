import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { crystalItemsData } from '@/data/lootboxData';
import Image from 'next/image';
import { Gem } from 'lucide-react';
import { getGradeByName } from '@/lib/gacha';

interface SpecialCardProps {
  name: string;
  expectedValue: number;
  count: number;
}

const SpecialCard: React.FC<SpecialCardProps> = ({
  name,
  expectedValue,
  count,
}) => {
  const imageUrl = crystalItemsData.find((item) => item.name === name)?.imageUrl;
  const grade = getGradeByName(name);
  const isSGrade = grade === 'S';
  const isAGrade = grade === 'A';

  return (
    <Card
      className={`group relative h-44 w-[calc(50%_-_0.375rem)] min-w-[8.5rem] max-w-40 overflow-hidden rounded-[1.6rem] border-[3px] bg-[#fff4d7] text-[#5b321f] motion-safe:transition-transform motion-safe:duration-200 hover:-translate-y-1 sm:h-48 sm:w-48 sm:max-w-none ${
        isSGrade
          ? 'border-[#9b542e] shadow-[0_7px_0_#9b542e,0_12px_22px_rgba(143,67,40,0.24)]'
          : isAGrade
            ? 'border-[#256f9e] shadow-[0_7px_0_#256f9e,0_12px_22px_rgba(36,111,158,0.22)]'
            : 'border-[#77503a] shadow-[0_7px_0_#77503a,0_12px_22px_rgba(85,50,30,0.2)]'
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-12 border-b-2 transition-[height] duration-200 group-hover:h-full sm:h-14 ${
          isSGrade
            ? 'border-[#bc5d46] bg-gradient-to-br from-[#ffd66f] via-[#ffad68] to-[#ee7968]'
            : isAGrade
              ? 'border-[#2788b8] bg-gradient-to-br from-[#bff3ff] via-[#6dd7f5] to-[#4798dd]'
              : 'border-[#92664a] bg-gradient-to-br from-[#f4d29a] via-[#d4a56c] to-[#a87750]'
        }`}
      />
      <div
        aria-hidden="true"
        className="absolute -right-3 top-10 size-14 rotate-12 rounded-2xl border-2 border-white/40 bg-white/15"
      />
      {grade && (
        <div
          aria-hidden="true"
          className={`absolute right-2 top-2 flex size-9 rotate-3 items-center justify-center rounded-xl border-2 text-xl font-black text-white shadow-[0_3px_0_rgba(75,42,28,0.3)] ${
            isSGrade
              ? 'border-[#8d4229] bg-[#e45f58]'
              : isAGrade
                ? 'border-[#205f8d] bg-[#318fc7]'
                : 'border-[#68432f] bg-[#8e674d]'
          }`}
        >
          {grade}
        </div>
      )}
      <CardContent className="relative z-10 flex h-full flex-col items-center p-3 sm:p-4">
        {grade && <span className="sr-only">{grade}등급</span>}
        <CardTitle className="line-clamp-1 min-h-5 max-w-[calc(100%_-_2.25rem)] self-start text-left text-sm font-black leading-tight text-[#59301e] group-hover:line-clamp-none sm:text-base">
          {name}
        </CardTitle>
        <p className="mt-auto translate-y-2 text-2xl font-black tabular-nums tracking-tight text-[#5c321f] transition-transform duration-200 group-hover:translate-y-0 drop-shadow-[0_2px_0_rgba(255,255,255,0.9)] sm:text-3xl">
          {count.toLocaleString()}
        </p>
        <CardDescription className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-[#d39a3a] bg-[#fff9e8] px-1.5 py-1 text-center text-[10px] font-bold text-[#6a3b23] shadow-[0_3px_0_#d39a3a] sm:text-xs">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              width={28}
              height={28}
              className="size-7 shrink-0 object-contain"
            />
          ) : (
            <Gem
              aria-hidden="true"
              className="size-5 shrink-0 fill-[#8ce7fa] text-[#2587ba]"
            />
          )}
          <span className="whitespace-nowrap">
            기댓값 <strong className="text-[#1e79a8]">{expectedValue}</strong>
          </span>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default SpecialCard;

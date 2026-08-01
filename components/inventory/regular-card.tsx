import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { getGradeByName } from '@/lib/gacha';

interface RegularCardProps {
  name: string;
  count: number;
  compact?: boolean;
}

const RegularCard: React.FC<RegularCardProps> = ({
  name,
  count,
  compact = false,
}) => {
  const grade = getGradeByName(name);
  const isSGrade = grade === 'S';
  const isAGrade = grade === 'A';

  return (
    <Card
      className={`group relative h-28 max-w-28 overflow-hidden rounded-[1.35rem] border-[3px] bg-[#fff5db] text-[#5a321f] transition-all duration-200 hover:-translate-y-1 ${
        compact
          ? 'w-[calc(33.333%_-_0.333rem)] min-w-0 sm:w-[calc(33.333%_-_0.5rem)] sm:min-w-[5.25rem]'
          : 'w-[calc(33.333%_-_0.5rem)] min-w-[5.25rem]'
      } ${
        isSGrade
          ? 'border-[#a75031] shadow-[0_6px_0_#a75031,0_10px_18px_rgba(142,66,38,0.2)]'
          : isAGrade
            ? 'border-[#2b78a7] shadow-[0_6px_0_#2b78a7,0_10px_18px_rgba(43,120,167,0.18)]'
            : 'border-[#765039] shadow-[0_6px_0_#765039,0_10px_18px_rgba(83,48,29,0.18)]'
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-12 border-b-2 transition-[height] duration-200 group-hover:h-full ${
          isSGrade
            ? 'border-[#c8654b] bg-gradient-to-br from-[#ffe08a] via-[#ffb76d] to-[#ef7b68]'
            : isAGrade
              ? 'border-[#3c91bc] bg-gradient-to-br from-[#c9f5ff] via-[#83dcf4] to-[#5aa9e1]'
              : 'border-[#916448] bg-gradient-to-br from-[#f5d6a5] via-[#d6aa75] to-[#b27c55]'
        }`}
      />
      {grade && (
        <div
          aria-hidden="true"
          className={`absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-lg border-2 text-base font-black text-white shadow-[0_2px_0_rgba(74,40,25,0.3)] ${
            isSGrade
              ? 'border-[#8f442b] bg-[#e05e57]'
              : isAGrade
                ? 'border-[#22638f] bg-[#328fc4]'
                : 'border-[#66432e] bg-[#896249]'
          }`}
        >
          {grade}
        </div>
      )}
      <CardContent className="relative z-10 flex h-full flex-col items-center p-2.5">
        {grade && <span className="sr-only">{grade}등급</span>}
        <CardTitle className="line-clamp-2 min-h-9 max-w-[calc(100%_-_1.75rem)] self-start text-left text-[11px] font-black leading-tight text-[#57301f] group-hover:line-clamp-none sm:text-xs">
          {name}
        </CardTitle>
        <p className="mt-auto w-full rounded-lg border-2 border-[#d29a3d] bg-[#fff9e8] px-1 py-0.5 text-center text-xs font-black tabular-nums tracking-tight text-[#633820] shadow-[0_2px_0_#d29a3d] sm:text-base">
          {count.toLocaleString()}
        </p>
        <CardDescription className="sr-only">{name} 보유 개수</CardDescription>
      </CardContent>
    </Card>
  );
};

export default RegularCard;

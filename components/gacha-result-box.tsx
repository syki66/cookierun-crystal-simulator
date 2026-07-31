import { ReactNode } from 'react';

interface GachaResultBoxProps {
  children: ReactNode;
}

export default function GachaResultBox({ children }: GachaResultBoxProps) {
  return (
    <section
      aria-labelledby="gacha-result-title"
      className="relative overflow-hidden rounded-[2.25rem] border-[3px] border-[#6c3b24] bg-[#e5a73d] p-1.5 shadow-[0_9px_0_#6c3b24,0_16px_34px_rgba(91,48,27,0.22)]"
    >
      <div
        aria-hidden="true"
        className="absolute -left-5 -top-5 size-24 rounded-full border-[12px] border-[#ffd979]/50 bg-[#efbd55]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-8 -right-5 size-28 rounded-full border-[12px] border-[#dc8659]/40 bg-[#f3c45d]"
      />
      <div className="relative flex h-full flex-col justify-center rounded-[1.75rem] border-2 border-[#f6d37c] bg-[#fff2d3] p-4 sm:p-7">
        <div className="mb-6 text-center">
          <h2
            id="gacha-result-title"
            className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#753d27] bg-[#e46455] px-5 py-2 text-2xl font-black text-[#fff5d5] shadow-[0_5px_0_#753d27] sm:px-7 sm:text-3xl"
          >
            <span
              aria-hidden="true"
              className="text-xl drop-shadow-[0_2px_0_#925025]"
            >
              ★
            </span>
            뽑힌 보물
            <span
              aria-hidden="true"
              className="text-xl drop-shadow-[0_2px_0_#925025]"
            >
              ★
            </span>
          </h2>
          <p className="mt-3 text-sm font-bold text-[#8b5a35]">
            반짝이는 새 보물이 도착했어요!
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {children}
        </div>
      </div>
    </section>
  );
}

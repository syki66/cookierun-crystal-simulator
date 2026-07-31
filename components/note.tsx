import { ReactNode } from 'react';

interface NoteProps {
  children: ReactNode;
}

export default function Note({ children }: NoteProps) {
  return (
    <aside
      role="note"
      className="relative isolate overflow-hidden rounded-[1.4rem] border-[3px] border-[#543124] bg-[#fff7df] px-4 py-4 text-[#543124] shadow-[0_6px_0_#d9a63d] sm:px-5"
    >
      <span
        aria-hidden="true"
        className="absolute -right-5 -top-7 size-24 rounded-full border-[3px] border-[#543124]/10 bg-[#f3d487]/50"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-3 right-7 size-2 rounded-full bg-[#c78b32]/35"
      />

      <div className="relative flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-[3px] border-[#543124] bg-[#75d9eb] shadow-[0_3px_0_#2f8299]">
          <span
            aria-hidden="true"
            className="size-3.5 rotate-45 rounded-[3px] border-2 border-[#543124] bg-[#e9fbff]"
          />
        </span>

        <div className="min-w-0 pt-0.5">
          <span className="mb-1 block text-xs font-black tracking-[0.14em] text-[#b06d1d]">
            알려드려요!
          </span>
          <p className="break-keep text-sm font-semibold leading-6 text-[#6f4a36]">
            {children}
          </p>
        </div>
      </div>
    </aside>
  );
}

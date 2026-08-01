import { Cookie, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t-[3px] border-[#4f2d22] bg-[#f5d99d] text-[#4f2d22] shadow-[inset_0_5px_0_#fff0c9]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#b6782d_1.5px,transparent_1.5px)] bg-[length:28px_28px] opacity-15"
      />
      <div
        aria-hidden="true"
        className="absolute left-[12%] top-5 size-3 rounded-full bg-[#a8672a]/30"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-5 right-[15%] size-2 rounded-full bg-[#a8672a]/35"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-5 py-8 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-[3px] border-[#4f2d22] bg-[#d99847] shadow-[0_4px_0_#9a5a25]">
            <Cookie aria-hidden="true" className="size-6 text-[#fff1c6]" />
          </span>
          <span className="whitespace-nowrap text-sm font-bold leading-6 text-[#76503c]">
            © {new Date().getFullYear()}{' '}
            <a
              href="https://pokugi.com/"
              className="font-black text-[#4f2d22] underline decoration-[#d89b32] decoration-2 underline-offset-4 transition-colors hover:text-[#b74751] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5ac8df]"
            >
              Pokugi Studio
            </a>
            <span>. All rights reserved.</span>
          </span>
        </div>

        <div className="flex flex-row-reverse items-center gap-3 sm:flex-row">
          <span className="text-xs font-black tracking-[0.12em] text-[#936029]">
            우체통
          </span>
          <a
            href="mailto:66syki@gmail.com"
            aria-label="Pokugi Studio에 이메일 보내기"
            className="flex size-11 items-center justify-center rounded-xl border-[3px] border-[#4f2d22] bg-[#e85462] text-white shadow-[0_4px_0_#9e303c] transition-transform hover:-translate-y-0.5 hover:bg-[#f26270] active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ac8df]"
          >
            <Mail aria-hidden="true" className="size-5" strokeWidth={2.75} />
          </a>
        </div>
      </div>
    </footer>
  );
}

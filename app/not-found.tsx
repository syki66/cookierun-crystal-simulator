import Link from 'next/link';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <main className="-mx-3 relative isolate flex min-h-[72vh] items-center justify-center overflow-hidden bg-[#fff3d5] px-4 py-16 text-center text-[#4f2d22] sm:-mx-5">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#bd7a30_1.5px,transparent_1.5px)] bg-[length:30px_30px] opacity-15"
      />
      <span
        aria-hidden="true"
        className="absolute -left-9 top-14 size-28 rounded-full border-[3px] border-[#4f2d22]/15 bg-[#e8bb68]/45"
      />
      <span
        aria-hidden="true"
        className="absolute -right-10 bottom-12 size-32 rotate-12 rounded-[2.5rem] border-[3px] border-[#4f2d22]/15 bg-[#72d6e9]/30"
      />

      <section className="relative w-full max-w-2xl rounded-[2rem] border-[3px] border-[#4f2d22] bg-[#fffaf0] px-5 py-9 shadow-[0_10px_0_#d7a33d] sm:px-10 sm:py-12">
        <span className="inline-flex rounded-full border-[3px] border-[#4f2d22] bg-[#f0bd47] px-4 py-1.5 text-xs font-black tracking-[0.14em] shadow-[0_3px_0_#a86d21]">
          길을 잃은 쿠키 발견!
        </span>

        <p
          aria-hidden="true"
          className="mt-5 text-8xl font-black leading-none tracking-tight text-[#72d8eb] drop-shadow-[0_6px_0_#4f2d22] sm:text-9xl"
        >
          404
        </p>
        <h1 className="mt-6 break-keep text-2xl font-black leading-tight sm:text-4xl">
          잘못된 경로로 접속했습니다
        </h1>
        <p className="mx-auto mt-4 max-w-md break-keep text-sm font-semibold leading-6 text-[#76503c] sm:text-base sm:leading-7">
          이 길에는 아무것도 없어요.
          <br className="hidden sm:block" /> 익숙한 길로 되돌아가 볼까요?
        </p>

        <Link
          href="/simulator/ready"
          className="mx-auto mt-8 flex min-h-14 w-full max-w-sm items-center justify-center rounded-2xl border-[3px] border-[#4f2d22] bg-[#e65060] px-5 py-3 text-base font-black text-white shadow-[0_6px_0_#9e303c] transition-transform hover:-translate-y-0.5 hover:bg-[#f25e6d] active:translate-y-1.5 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#55cce4] sm:text-lg"
        >
          <span aria-hidden="true" className="mr-2">
            ←
          </span>
          시뮬레이터로 돌아가기
        </Link>
      </section>
    </main>
  );
};

export default NotFound;

'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const newOrigin = 'https://cookierun.pokugi.com';
const redirectDelay = 5;

interface DomainMovedNoticeProps {
  returnTo?: string;
}

export default function DomainMovedNotice({
  returnTo = '/simulator/ready',
}: DomainMovedNoticeProps) {
  const [secondsLeft, setSecondsLeft] = useState(redirectDelay);
  const targetUrl = useMemo(() => {
    const safePath = returnTo.startsWith('/') ? returnTo : '/simulator/ready';
    return `${newOrigin}${safePath}`;
  }, [returnTo]);

  useEffect(() => {
    const countdown = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    const redirect = window.setTimeout(() => {
      window.location.replace(targetUrl);
    }, redirectDelay * 1000);

    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(redirect);
    };
  }, [targetUrl]);

  return (
    <main className="-mx-3 relative isolate flex min-h-[72vh] items-center justify-center overflow-hidden bg-[#fff3d5] px-4 py-16 text-[#4f2d22] sm:-mx-5">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#c88b3b_1.5px,transparent_1.5px)] bg-[length:32px_32px] opacity-15"
      />
      <span
        aria-hidden="true"
        className="absolute -left-10 top-16 size-32 rotate-12 rounded-[2.5rem] border-[3px] border-[#4f2d22]/15 bg-[#edc16f]/45"
      />
      <span
        aria-hidden="true"
        className="absolute -right-8 bottom-10 size-28 -rotate-12 rounded-full border-[3px] border-[#4f2d22]/15 bg-[#72d6e9]/30"
      />

      <section className="relative w-full max-w-2xl rounded-[2rem] border-[3px] border-[#4f2d22] bg-[#fffaf0] px-5 py-8 text-center shadow-[0_10px_0_#d7a33d] sm:px-10 sm:py-11">
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border-[3px] border-[#4f2d22] bg-[#f0bd47] px-5 py-2 text-xs font-black tracking-[0.12em] text-[#4f2d22] shadow-[0_3px_0_#a86d21]">
          사이트 주소 이전 안내
        </span>

        <div className="mx-auto mb-6 mt-2 flex size-28 items-center justify-center rounded-[2rem] border-[3px] border-[#4f2d22] bg-[#def8fd] shadow-[0_6px_0_#3f9bb1]">
          <Image
            src="/branding/crystal-mark.webp"
            alt=""
            width={96}
            height={96}
            priority
            className="size-24 object-contain"
          />
        </div>

        <p className="mb-2 text-sm font-black tracking-[0.08em] text-[#c17a25]">
          새로운 보금자리로 출발!
        </p>
        <h1 className="break-keep text-3xl font-black leading-tight text-[#4f2d22] sm:text-4xl">
          새 주소로 이전했습니다
        </h1>
        <p className="mx-auto mt-5 max-w-lg break-keep text-base font-semibold leading-7 text-[#76503c]">
          쿠키런 크리스탈 시뮬레이터의 주소가 아래와 같이 변경되었습니다.
        </p>
        <strong className="mx-auto mt-4 block w-fit rounded-xl border-2 border-[#4f2d22] bg-[#e5faff] px-4 py-2 text-sm font-black text-[#277f99] shadow-[0_3px_0_#82cfe0] sm:text-base">
          cookierun.pokugi.com
        </strong>

        <p
          className="mx-auto mt-6 w-fit rounded-full border-2 border-[#c99337] bg-[#fff0bb] px-4 py-2 text-sm font-black text-[#865622]"
          aria-live="polite"
        >
          <span className="text-[#e34c5c]">{secondsLeft}초</span> 뒤 자동으로
          이동합니다
        </p>

        <a
          href={targetUrl}
          className="mx-auto mt-7 flex min-h-14 w-full max-w-sm items-center justify-center rounded-2xl border-[3px] border-[#4f2d22] bg-[#e65060] px-5 py-3 text-base font-black text-white shadow-[0_6px_0_#9e303c] transition-transform hover:-translate-y-0.5 hover:bg-[#f25e6d] active:translate-y-1.5 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#55cce4] sm:text-lg"
        >
          지금 새 주소로 이동하기
          <span aria-hidden="true" className="ml-2 text-xl">
            →
          </span>
        </a>
      </section>
    </main>
  );
}

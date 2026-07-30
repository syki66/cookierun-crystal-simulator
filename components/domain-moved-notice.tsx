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
    <main className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-4 py-16">
      <section className="game-panel w-full p-6 text-center sm:p-10">
        <Image
          src="/branding/crystal-mark.webp"
          alt=""
          width={112}
          height={112}
          priority
          className="mx-auto mb-5 size-28"
        />
        <p className="mb-2 font-black text-amber-600">사이트 주소 이전 안내</p>
        <h1 className="mb-5 break-keep text-3xl font-black text-amber-950 sm:text-4xl">
          새 주소로 이전했습니다
        </h1>
        <p className="break-keep text-base font-medium leading-7 text-amber-950/70">
          쿠키런 크리스탈 시뮬레이터의 주소가
          <br />
          <strong className="text-rose-600">cookierun.pokugi.com</strong>으로
          변경되었습니다.
        </p>
        <p className="mt-4 text-sm font-bold text-amber-800">
          {secondsLeft}초 뒤 자동으로 이동합니다.
        </p>
        <a
          href={targetUrl}
          className="game-action mx-auto mt-8 flex h-14 w-full max-w-sm items-center justify-center text-lg"
        >
          지금 새 주소로 이동하기
        </a>
      </section>
    </main>
  );
}

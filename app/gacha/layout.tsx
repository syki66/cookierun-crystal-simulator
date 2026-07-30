import { Metadata } from 'next';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Note from '@/components/note';

export const metadata: Metadata = {
  title: '쿠키런 보물 뽑기 시뮬레이션',
  description:
    '카카오 쿠키런 모바일 게임에서 최고급 보물상자 1개 또는 6+1개 세트 뽑기를 체험해 볼 수 있는 시뮬레이션 입니다.',
  alternates: {
    canonical: '/gacha',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/gacha',
    siteName: '쿠키런 크리스탈 시뮬레이터',
    title: '쿠키런 보물 뽑기 시뮬레이션 | Pokugi Studio',
    description:
      '최고급 보물상자 1개와 S등급 3개 이상이 보장되는 6+1 세트 뽑기를 체험합니다.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '쿠키런 보물 뽑기 시뮬레이션 | Pokugi Studio',
    description:
      '최고급 보물상자 1개와 S등급 3개 이상이 보장되는 6+1 세트 뽑기를 체험합니다.',
    images: ['/og.png'],
  },
};

const KakaoAdfit = dynamic(() => import('@/components/kakao-adfit'), {
  ssr: false,
});

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <h1 className="text-4xl md:text-7xl break-keep font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center mt-10 mb-10">
        최고급 보물상자 뽑기
      </h1>

      <div className="hidden md:block">
        <KakaoAdfit adUnit={'DAN-u57341CMIeyBXond'} adSize={['728', '90']} />
      </div>
      <div className="block md:hidden">
        <KakaoAdfit adUnit={'DAN-xmOa3sTTtsSKKgUD'} adSize={['320', '100']} />
      </div>

      {children}

      <div className="md:w-[750px] mx-auto mt-20">
        <Note>
          * 쿠키런 최고급 보물상자 뽑기 시뮬레이션은{' '}
          <a
            href="https://cookierun.zendesk.com/hc/ko/articles/28813434627993-%EC%83%81%EC%84%B8%EC%A0%95%EB%B3%B4"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            쿠키런 고객센터에 공개된 확률정보
          </a>
          를 바탕으로 제작되었습니다.
          <br />* 최고급 보물상자 6+1개 세트는 최고급 보물상자를 7번
          뽑으며, S등급 보물을 3개 이상 확정적으로 획득합니다.
          <br />* 크리스탈 기댓값을 계산할 때, 보물은 +9강으로 가정하고
          계산됩니다.
        </Note>
      </div>

      <div className="mt-5">
        <KakaoAdfit adUnit={'DAN-F0gt5sOnJ8XI8YL6'} adSize={['300', '250']} />
      </div>
    </>
  );
}

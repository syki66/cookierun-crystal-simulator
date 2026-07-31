import { Metadata } from 'next';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Note from '@/components/note';
import PageHero from '@/components/page-hero';

export const metadata: Metadata = {
  title: '쿠키런 크리스탈 기댓값 계산기 - 카쿠 크보 기댓값 계산기',
  description:
    '카카오 쿠키런 모바일 게임에서 크리스탈 보유효과 보물 개수를 입력하면 현재 하루당 기댓값이 얼마인지 계산해주는 페이지입니다.',
  alternates: {
    canonical: '/calculator',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/calculator',
    siteName: '쿠키런 크리스탈 시뮬레이터',
    title: '쿠키런 크리스탈 기댓값 계산기 | Pokugi Studio',
    description:
      '크리스탈 보유효과 보물 개수를 입력해 하루 크리스탈 기댓값을 계산합니다.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '쿠키런 크리스탈 기댓값 계산기 | Pokugi Studio',
    description:
      '크리스탈 보유효과 보물 개수를 입력해 하루 크리스탈 기댓값을 계산합니다.',
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
      <PageHero
        eyebrow="CRYSTAL CALCULATOR"
        title="크리스탈 기댓값 계산기"
        description="내가 가진 크리스탈 보유효과 보물을 입력하면 하루 크리스탈 기댓값을 빠르게 계산해 드려요."
      />

      <div className="mb-8 hidden md:block">
        <KakaoAdfit adUnit={'DAN-u57341CMIeyBXond'} adSize={['728', '90']} />
      </div>
      <div className="mb-8 block md:hidden">
        <KakaoAdfit adUnit={'DAN-xmOa3sTTtsSKKgUD'} adSize={['320', '100']} />
      </div>

      {children}

      <div className="mx-auto mt-12 w-full max-w-md">
        <Note>
          * 보물은 +9강으로 가정하여 계산됩니다. <br />* 빈 값은 계산에서
          제외됩니다.
          <br />* 계산이 완료되면 입력값은 웹 브라우저에 자동으로 저장됩니다.
        </Note>
      </div>

      <div className="mt-8">
        <KakaoAdfit adUnit={'DAN-F0gt5sOnJ8XI8YL6'} adSize={['300', '250']} />
      </div>
    </>
  );
}

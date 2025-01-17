import { Metadata } from 'next';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: '쿠키런 크리스탈 기댓값 계산기 - 카쿠 크보 기댓값 계산기',
  description:
    '카카오 쿠키런 모바일 게임에서 크리스탈 보유효과 보물 개수를 입력하면 현재 하루당 기댓값이 얼마인지 계산해주는 페이지입니다.',
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
        크리스탈 기댓값 계산기
      </h1>

      <div className="hidden md:block">
        <KakaoAdfit adUnit={'DAN-u57341CMIeyBXond'} adSize={['728', '90']} />
      </div>
      <div className="block md:hidden">
        <KakaoAdfit adUnit={'DAN-xmOa3sTTtsSKKgUD'} adSize={['320', '100']} />
      </div>

      {children}

      <div className="mt-5">
        <KakaoAdfit adUnit={'DAN-F0gt5sOnJ8XI8YL6'} adSize={['300', '250']} />
      </div>
    </>
  );
}

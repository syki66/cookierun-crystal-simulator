import { ReactNode } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: '쿠키런 크리스탈 시뮬레이션',
  description:
    '카카오 쿠키런 모바일 게임에서 현재 크리스탈 보유효과 보물들로 미래 크리스탈 기댓값이 얼마나 늘어날 수 있는지 실시간으로 시각화하여 체험해 볼 수 있는 시뮬레이션 사이트 입니다.',
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
        쿠키런 크리스탈 기댓값 시뮬레이션
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

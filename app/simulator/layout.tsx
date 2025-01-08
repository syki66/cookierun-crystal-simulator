import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

interface LayoutProps {
  children: ReactNode;
}

const KakaoAdfit = dynamic(() => import('@/components/kakao-adfit'), {
  ssr: false,
});

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <h1 className="text-4xl md:text-7xl break-keep font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center mt-5 mb-10">
        쿠키런 크리스탈 기댓값 시뮬레이터
      </h1>
      <KakaoAdfit adUnit={'DAN-u57341CMIeyBXond'} />
      {children}
    </>
  );
}

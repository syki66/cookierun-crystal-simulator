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
      {/* pc용 */}
      <KakaoAdfit adUnit={'DAN-u57341CMIeyBXond'} adSize={['728', '90']} />
      {/* 모바일 pc 겸용 */}
      <KakaoAdfit adUnit={'DAN-F0gt5sOnJ8XI8YL6'} adSize={['300', '250']} />
      {/* 모바일용 */}
      <KakaoAdfit adUnit={'DAN-xmOa3sTTtsSKKgUD'} adSize={['320', '100']} />

      <h1 className="text-4xl md:text-7xl break-keep font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center mt-10 mb-10">
        쿠키런 크리스탈 기댓값 시뮬레이션
      </h1>
      {children}
    </>
  );
}

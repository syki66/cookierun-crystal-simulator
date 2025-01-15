import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '쿠키런 보물 뽑기 시뮬레이션',
  description:
    '카카오 쿠키런 모바일 게임에서 최고급 보물상자 1개 또는 6+1개 세트 뽑기를 체험해 볼 수 있는 시뮬레이션 입니다.',
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <h1 className="text-4xl md:text-7xl break-keep font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center mt-10 mb-10">
        최고급 보물상자 뽑기
      </h1>
      {children}
    </>
  );
}

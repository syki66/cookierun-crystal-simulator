import { Metadata } from 'next';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Note from '@/components/note';

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

      <div className="w-full md:w-96 mx-auto mt-5">
        <Note>
          * 보물은 +9강으로 가정하여 계산됩니다. <br />* 빈 값은 계산에서
          제외됩니다.
          <br />* 계산이 완료되면 입력값은 웹 브라우저에 자동으로 저장됩니다.
        </Note>
      </div>

      <div className="mt-10">
        <KakaoAdfit adUnit={'DAN-F0gt5sOnJ8XI8YL6'} adSize={['300', '250']} />
      </div>
    </>
  );
}

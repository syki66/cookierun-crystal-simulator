import { ReactNode } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Note from '@/components/note';
import PageHero from '@/components/page-hero';

export const metadata: Metadata = {
  title: '쿠키런 크리스탈 시뮬레이션',
  description:
    '카카오 쿠키런 모바일 게임에서 현재 크리스탈 보유효과 보물들로 미래 크리스탈 기댓값이 얼마나 늘어날 수 있는지 실시간으로 시각화하여 체험해 볼 수 있는 시뮬레이션 사이트 입니다.',
  alternates: {
    canonical: '/simulator/ready',
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
        eyebrow='CRYSTAL SIMULATION'
        title='크리스탈 기댓값 시뮬레이션'
        description='보유 중인 크리스탈 보유효과 보물을 입력하고, 미래 크리스탈 기댓값이 어떻게 달라지는지 실시간으로 확인해 보세요.'
      />

      <div className='mb-8 hidden md:block'>
        <KakaoAdfit adUnit={'DAN-u57341CMIeyBXond'} adSize={['728', '90']} />
      </div>
      <div className='mb-8 block md:hidden'>
        <KakaoAdfit adUnit={'DAN-xmOa3sTTtsSKKgUD'} adSize={['320', '100']} />
      </div>

      {children}

      <div className='mx-auto mt-12 max-w-screen-md'>
        <Note>
          * 쿠키런 크리스탈 기댓값 시뮬레이션은{' '}
          <a
            href='https://cookierun.zendesk.com/hc/ko/articles/28813434627993-%EC%83%81%EC%84%B8%EC%A0%95%EB%B3%B4'
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            쿠키런 고객센터에 공개된 확률정보
          </a>
          를 바탕으로 제작되었습니다.
          <br />* 정상적인 범위를 벗어난 숫자를 입력하거나 오랜시간 시뮬레이션을
          실행하면 웹 브라우저가 느려지거나 정지할 수 있습니다.
          <br />* 보물상자 오픈 트리거가 발동하게 되면 현재 보유하고 있는
          크리스탈이 최대로 소진됩니다. <br />* 크리스탈 기댓값을 계산할 때,
          보물은 +9강으로 가정하고 계산됩니다.
          <br />* 하루당 크리스탈 획득량은 반올림되어 자연수로 표기됩니다.
        </Note>
      </div>

      <div className='mt-8'>
        <KakaoAdfit adUnit={'DAN-F0gt5sOnJ8XI8YL6'} adSize={['300', '250']} />
      </div>
    </>
  );
}

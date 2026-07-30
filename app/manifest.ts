import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '쿠키런 크리스탈 시뮬레이터 | Pokugi Studio',
    short_name: '크리스탈 시뮬레이터',
    description:
      '카카오 쿠키런 모바일 게임의 크리스탈 보유효과 보물들을 사용자가 입력하여 미래 크리스탈 기댓값을 실시간으로 예측해서 시각화해주는 시뮬레이션 웹사이트',
    start_url: '/simulator/ready',
    display: 'standalone',
    background_color: '#fffaf2',
    theme_color: '#8b5cf6',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

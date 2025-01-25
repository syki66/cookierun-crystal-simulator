import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Analytics } from '@vercel/analytics/next';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: '쿠키런 크리스탈 시뮬레이션',
  description:
    '카카오 쿠키런 모바일 게임의 크리스탈 보유효과 보물들을 사용자가 입력하여 미래 크리스탈 기댓값을 실시간으로 예측해서 시각화해주는 시뮬레이션을 체험할 수 있습니다. 또한 크리스탈 기댓값 계산기, 보물 뽑기 시뮬레이션을 제공합니다.',
  keywords: [
    '쿠키런',
    '카카오 쿠키런',
    '카쿠',
    '크보',
    '계산기',
    '크리스탈',
    '기댓값',
    '시뮬레이터',
    '시뮬레이션',
    '보물 뽑기',
    '카쿠 크보 기댓값 계산기',
    '크보계산기',
    '카카오쿠키런',
    '카쿠크보기댓값',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="mx-3">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

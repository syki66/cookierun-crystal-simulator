import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

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
    '카카오 쿠키런 모바일 게임에서 현재 크리스탈 보유효과 보물들로 미래 크리스탈 기댓값이 얼마나 늘어날 수 있는지 실시간으로 시각화하여 체험해 볼 수 있는 시뮬레이션과 보물 뽑기, 크리스탈 보물 기댓값 계산기를 제공합니다.',
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
      </body>
    </html>
  );
}

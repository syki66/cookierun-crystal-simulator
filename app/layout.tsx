import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Analytics } from '@vercel/analytics/next';

const siteUrl = 'https://cookierun.pokugi.com';
const siteName = '쿠키런 크리스탈 시뮬레이터';
const siteDescription =
  '카카오 쿠키런 모바일 게임의 크리스탈 보유효과 보물들을 사용자가 입력하여 미래 크리스탈 기댓값을 실시간으로 예측해서 시각화해주는 시뮬레이션을 체험할 수 있습니다. 또한 크리스탈 기댓값 계산기, 보물 뽑기 시뮬레이션을 제공합니다.';

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
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Pokugi Studio`,
    template: `%s | Pokugi Studio`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: 'Pokugi Studio', url: 'https://pokugi.com/' }],
  creator: 'Pokugi Studio',
  publisher: 'Pokugi Studio',
  category: 'game utility',
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
    'Pokugi Studio',
  ],
  alternates: {
    canonical: '/simulator/ready',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/simulator/ready',
    siteName,
    title: `${siteName} | Pokugi Studio`,
    description: siteDescription,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${siteName} - Pokugi Studio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Pokugi Studio`,
    description: siteDescription,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteName,
    url: `${siteUrl}/simulator/ready`,
    description: siteDescription,
    applicationCategory: 'UtilitiesApplication',
    applicationSubCategory: '게임 도우미 및 계산 도구',
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    author: {
      '@type': 'Organization',
      name: 'Pokugi Studio',
      url: 'https://pokugi.com/',
    },
  };

  return (
    <html lang='ko'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <div className='mx-3'>{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

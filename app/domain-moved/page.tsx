import DomainMovedNotice from '@/components/domain-moved-notice';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '사이트 주소 이전 안내',
  robots: {
    index: false,
    follow: false,
  },
};

interface DomainMovedPageProps {
  searchParams: {
    returnTo?: string;
  };
}

export default function DomainMovedPage({
  searchParams,
}: DomainMovedPageProps) {
  return <DomainMovedNotice returnTo={searchParams.returnTo} />;
}

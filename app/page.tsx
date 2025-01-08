import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center my-5">
          쿠키런 도구 모음
        </h1>
        <div>
          <Button className="inline">
            <Link href="/simulator/ready">
              쿠키런 보물 뽑기 시뮬레이터 바로가기
            </Link>
          </Button>
        </div>
        <div>
          <Button>쿠키런 툴</Button>
        </div>
      </div>
    </>
  );
}

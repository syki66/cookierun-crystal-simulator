import Simulator from '@/components/simulator';

export default function Home() {
  return (
    <>
      <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center">
        쿠키런 보물 뽑기 시뮬레이터
      </h1>
      <Simulator />
    </>
  );
}

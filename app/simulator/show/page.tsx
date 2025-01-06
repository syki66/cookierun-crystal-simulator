import Simulator from '@/components/simulator';
import { initDataParams } from '@/types/params';

interface PageProps {
  searchParams: initDataParams;
}

export default function Page({ searchParams }: PageProps) {
  const { date, currentCrystals, crystalsPerDay, skip, speed, threshold } =
    searchParams;
  return (
    <>
      <Simulator
        initData={{
          date: new Date(date),
          currentCrystals: Number(currentCrystals),
          crystalsPerDay: Number(crystalsPerDay),
          skip: Number(skip),
          speed: Number(speed),
          threshold: Number(threshold),
        }}
      />
    </>
  );
}

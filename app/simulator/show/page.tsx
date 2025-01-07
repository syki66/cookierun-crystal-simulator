import Simulator from '@/components/simulator';
import { getCrystalsPerDay, initInventoryData } from '@/lib/gacha';
import { initDataParams } from '@/types/params';

interface PageProps {
  searchParams: initDataParams;
}

export default function Page({ searchParams }: PageProps) {
  const {
    timestamp,
    skip,
    speed,
    threshold,
    crystals,
    defaultCrystal,
    currentCrystals,
  } = searchParams;

  const numberedCrystals = String(crystals).split(',').map(Number); // 숫자 배열로 변환
  const initInventory = initInventoryData(
    numberedCrystals,
    Number(defaultCrystal)
  ); // 초기 인벤토리 생성
  const initCrystalsPerDay = getCrystalsPerDay(
    initInventory,
    Number(defaultCrystal)
  ); // 초기 크리스탈 기댓값 생성

  return (
    <>
      <Simulator
        initData={{
          timestamp: Number(timestamp),
          currentCrystals: Number(currentCrystals),
          defaultCrystal: Number(defaultCrystal),
          crystalsPerDay: initCrystalsPerDay,
          inventory: initInventory,
          skip: Number(skip),
          speed: Number(speed),
          threshold: Number(threshold),
        }}
      />
    </>
  );
}

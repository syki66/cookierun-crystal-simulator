import Simulator from '@/components/simulator';
import { getCrystalsPerDay, initInventoryData } from '@/lib/gacha';
import { initDataParams } from '@/types/params';

interface PageProps {
  searchParams: initDataParams;
}

export default function Page({ searchParams }: PageProps) {
  const {
    timestamp = Date.now(),
    skip = 10,
    speed = 8,
    threshold = 1,
    crystals = '0,0,0,0,0,0,0,0,0',
    defaultCrystal = 30,
    currentCrystals = 1000,
  } = searchParams; // url 파라미터가 존재하면 그대로 쓰고, 없다면 기본값 대입

  const numberedCrystals = String(crystals).split(',').map(Number); // 숫자 배열로 변환
  const initInventory = initInventoryData(
    numberedCrystals,
    Number(defaultCrystal)
  ); // 초기 인벤토리 생성
  const initCrystalsPerDay = getCrystalsPerDay(initInventory); // 초기 크리스탈 기댓값 생성

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <Simulator
          initData={{
            timestamp: Number(timestamp),
            currentCrystals: Number(currentCrystals),
            crystalsPerDay: initCrystalsPerDay,
            inventory: initInventory,
            skip: Number(skip),
            speed: Number(speed),
            threshold: Number(threshold),
          }}
        />
      </div>
    </>
  );
}

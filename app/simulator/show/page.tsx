import Note from '@/components/note';
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

        <div className="mt-10">
          <Note>
            * 쿠키런 크리스탈 기댓값 시뮬레이션은{' '}
            <a
              href="https://cookierun.zendesk.com/hc/ko/articles/28813434627993-%EC%83%81%EC%84%B8%EC%A0%95%EB%B3%B4"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              쿠키런 고객센터에 공개된 확률정보
            </a>
            를 바탕으로 제작되었습니다.
            <br />* 정상적인 범위를 벗어난 숫자를 입력하거나 오랜시간
            시뮬레이션을 실행하면 웹 브라우저가 느려지거나 정지할 수 있습니다.
            <br />* 보물상자 오픈 트리거가 발동하게 되면 현재 보유하고 있는
            크리스탈이 최대로 소진됩니다. <br />* 크리스탈 기댓값을 계산할 때,
            보물은 +9강으로 가정하고 계산됩니다.
            <br />* 하루당 크리스탈 획득량은 반올림되어 자연수로 표기됩니다.
          </Note>
        </div>
      </div>
    </>
  );
}

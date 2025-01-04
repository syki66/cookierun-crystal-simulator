import { itemProps } from '@/types/item';
import { getFileData } from '@/lib/api';
import { pickItemFromWeightedRandom } from '@/lib/random';

export default async function Home() {
  let crystalsPerDay = 100; // 하루당 크리스탈 기댓값
  let crystals = 0; // 현재 보유한 크리스탈 개수

  const multiLootboxData = await getFileData('/data/multiLootboxData.json'); // 6+1개 세트 구매했을때의 S보물 및 A보물 등장 확률 데이터

  for (let i = 0; i < 100; i++) {
    crystals += crystalsPerDay; // 하루당 크리스탈 획득

    // 크리스탈이 335개 이상이면 최고급 보물 상자 6+1개 세트 구매
    if (crystals >= 335) {
      crystals -= 335;

      // 6+1세트 가중치 총합
      const totalWeight = multiLootboxData.reduce(
        (sum: number, item: itemProps) => sum + item.weight,
        0
      );

      // 6+1세트 구매시 S보물 및 A보물 등장 확률별 분기 처리
      switch (pickItemFromWeightedRandom(multiLootboxData, totalWeight)) {
        case multiLootboxData[0].name:
          console.log('S등급 보물 3개 + A등급 보물 4개');
          break;
        case multiLootboxData[1].name:
          console.log('S등급 보물 4개 + A등급 보물 3개');
          break;
        case multiLootboxData[2].name:
          console.log('S등급 보물 5개 + A등급 보물 2개');
          break;
        case multiLootboxData[3].name:
          console.log('S등급 보물 6개 + A등급 보물 1개');
          break;
        case multiLootboxData[4].name:
          console.log('S등급 보물 7개');
          break;
        default:
          console.log('예외 발생');
      }
    }
  }

  // return <>{crystals}</>;
}

import { getPickedItem } from '@/lib/gacha';

export default async function Home() {
  let crystalsPerDay = 100; // 하루당 크리스탈 기댓값
  let crystals = 0; // 현재 보유한 크리스탈 개수

  for (let i = 0; i < 100; i++) {
    crystals += crystalsPerDay; // 하루당 크리스탈 획득

    // 크리스탈이 335개 이상이면 최고급 보물 상자 6+1개 세트 구매
    if (crystals >= 335) {
      crystals -= 335;

      const pickedMultiLootbox = await getPickedItem(
        '/data/multiLootboxData.json' // 최고급 보물 상자 6+1개 세트 뽑기 데이터
      );

      // 6+1세트 구매시 S보물 및 A보물 등장 확률별 분기 처리
      switch (pickedMultiLootbox) {
        case 'S등급 보물 3개 + A등급 보물 4개':
          const [S1, S2, S3, A1, A2, A3, A4] = await Promise.all([
            getPickedItem('/data/lootboxDataSGrade.json'),
            getPickedItem('/data/lootboxDataSGrade.json'),
            getPickedItem('/data/lootboxDataSGrade.json'),
            getPickedItem('/data/lootboxDataAGrade.json'),
            getPickedItem('/data/lootboxDataAGrade.json'),
            getPickedItem('/data/lootboxDataAGrade.json'),
            getPickedItem('/data/lootboxDataAGrade.json'),
          ]);
          console.log(S1, S2, S3, A1, A2, A3, A4);
          break;
        case 'S등급 보물 4개 + A등급 보물 3개':
          console.log('S등급 보물 4개 + A등급 보물 3개');
          break;
        case 'S등급 보물 5개 + A등급 보물 2개':
          console.log('S등급 보물 5개 + A등급 보물 2개');
          break;
        case 'S등급 보물 6개 + A등급 보물 1개':
          console.log('S등급 보물 6개 + A등급 보물 1개');
          break;
        case 'S등급 보물 7개':
          console.log('S등급 보물 7개');
          break;
        default:
          console.error('알 수 없는 결과:', pickedMultiLootbox); // 예외 발생 시 에러 로그 출력
      }
    }
  }

  return <>{crystalsPerDay}</>;
}

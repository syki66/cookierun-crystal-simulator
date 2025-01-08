import { itemProps } from '@/types/item';
import {
  multiLootboxData,
  lootboxDataAGrade,
  lootboxDataSGrade,
} from '@/data/lootboxData';
import { inventoryProps } from '@/types/inventory';

// 가중치에 따라 랜덤으로 항목을 선택해서 이름을 반환하는 함수
const pickItemFromWeightedRandom = (
  items: itemProps[],
  totalWeight: number
) => {
  let random = Math.random() * totalWeight; // 0부터 totalWeight 사이의 랜덤 값 생성

  for (const item of items) {
    random -= item.weight; // 랜덤 값에서 가중치를 차감
    if (random <= 0) {
      return item.name; // 가중치가 초과된 항목 반환
    }
  }
};

// 가중치 총합을 반환하는 함수
const getWeightedTotal = (items: itemProps[]) =>
  items.reduce((sum: number, item: itemProps) => sum + item.weight, 0);

// 가챠 뽑기 함수
const getPickedItem = (lootboxData: itemProps[]) => {
  const pickedItem = pickItemFromWeightedRandom(
    lootboxData,
    getWeightedTotal(lootboxData)
  );
  return pickedItem;
};

// 역치값 이상으로 크리스탈을 보유했을 경우 가챠 실행 횟수와 남은 크리스탈 값을 반환
// threshold는 119,227,335,443,551,659,767,875,983,1091,1199,1307,1415,1523,1631,1739,1847,1955,2063...
const crystalThresholdReducer = (crystals: number, threshold: number) => {
  let count = 0;

  if (crystals >= threshold) {
    while (crystals >= 108) {
      if (count === 0) {
        crystals -= 119;
      } else {
        crystals -= 108;
      }
      count++;
    }
  }
  return [count, crystals];
};

// 가챠 로직
export const gachaMachine = (
  crystals: number,
  threshold: number,
  inventory: inventoryProps[]
) => {
  const [loopCount, updatedCrystals] = crystalThresholdReducer(
    crystals,
    threshold
  ); // 반복 횟수와 남은 크리스탈 개수 연산

  for (let i = 0; i < loopCount; i++) {
    const pickedMultiLootbox = getPickedItem(
      multiLootboxData // 최고급 보물 상자 6+1개 세트 뽑기 데이터
    );

    // 6+1세트 구매시 S보물 및 A보물 등장 확률별 분기 처리
    const _pickedItems = [];
    switch (pickedMultiLootbox) {
      case 'S등급 보물 3개 + A등급 보물 4개':
        _pickedItems.push(
          ...Array(3)
            .fill(null)
            .map(() => getPickedItem(lootboxDataSGrade)),
          ...Array(4)
            .fill(null)
            .map(() => getPickedItem(lootboxDataAGrade))
        );
        break;
      case 'S등급 보물 4개 + A등급 보물 3개':
        _pickedItems.push(
          ...Array(4)
            .fill(null)
            .map(() => getPickedItem(lootboxDataSGrade)),
          ...Array(3)
            .fill(null)
            .map(() => getPickedItem(lootboxDataAGrade))
        );
        break;
      case 'S등급 보물 5개 + A등급 보물 2개':
        _pickedItems.push(
          ...Array(5)
            .fill(null)
            .map(() => getPickedItem(lootboxDataSGrade)),
          ...Array(2)
            .fill(null)
            .map(() => getPickedItem(lootboxDataAGrade))
        );
        break;
      case 'S등급 보물 6개 + A등급 보물 1개':
        _pickedItems.push(
          ...Array(6)
            .fill(null)
            .map(() => getPickedItem(lootboxDataSGrade)),
          ...Array(1)
            .fill(null)
            .map(() => getPickedItem(lootboxDataAGrade))
        );
        break;
      case 'S등급 보물 7개':
        _pickedItems.push(
          ...Array(7)
            .fill(null)
            .map(() => getPickedItem(lootboxDataSGrade))
        );
        break;
      default:
        console.error('알 수 없는 결과:', pickedMultiLootbox); // 예외 발생 시 에러 로그 출력
    }

    // 인벤토리 업데이트
    _pickedItems.forEach((pickedItem) => {
      const foundIndex = inventory.findIndex(
        (inventoryItem) => inventoryItem.name === pickedItem
      );
      if (foundIndex === -1 && pickedItem) {
        inventory.push({
          name: pickedItem,
          count: 1,
          expectedValue:
            [...lootboxDataSGrade, ...lootboxDataAGrade].find(
              (x) => x.name === pickedItem
            )?.expectedValue || 0,
        });
      } else {
        inventory[foundIndex].count++;
      }
    });
  }

  return { updatedCrystals, inventory };
};

// 초기 인벤토리 데이터  생성 함수
export const initInventoryData = (
  crystals: number[],
  defaultCrystal: number
) => {
  const names = [
    '레어 크리스탈 사파이어',
    '희귀한 크리스탈 조개',
    '커다란 크리스탈 원석',
    '최고급 크리스탈 보석함',
    '청명한 크리스탈 자명종',
    '왕 크리스탈 보석반지',
    '장식용 크리스탈 포크스푼',
    '마음에 품은 신성한 크리스탈 검',
    '진주 크리스탈 귀걸이',
  ];

  const initialInventory = names.map((name, index) => ({
    name,
    count: crystals[index],
    expectedValue:
      [...lootboxDataSGrade, ...lootboxDataAGrade].find((x) => x.name === name)
        ?.expectedValue || 0,
  }));

  initialInventory.push({
    name: '기타 크리스탈 보물',
    count: 1,
    expectedValue: defaultCrystal,
  });

  return initialInventory;
};

// 인벤토리와 기본값을 이용하여 하루 당 받을 수 있는 크리스탈 기댓값 반환
export const getCrystalsPerDay = (inventory: inventoryProps[]) => {
  return inventory.reduce((sum, item) => {
    if (item.name.includes('크리스탈') && item.expectedValue) {
      return sum + item.count * item.expectedValue;
    }
    return sum; // "크리스탈"이 포함되지 않은 경우 기존 sum 반환
  }, 0); // 초기값;
};

import { itemProps } from '@/types/item';
import {
  lootboxDataAGrade,
  lootboxDataSGrade,
  crystalItemsData,
} from '@/data/lootboxData';
import { inventoryProps } from '@/types/inventory';

// 가중치에 따라 랜덤으로 항목을 선택해서 이름을 반환하는 함수
const pickItemFromWeightedRandom = (
  items: itemProps[],
  totalWeight: number
): string => {
  let random = Math.random() * totalWeight; // 0부터 totalWeight 사이의 랜덤 값 생성

  for (const item of items) {
    random -= item.weight; // 랜덤 값에서 가중치를 차감
    if (random <= 0) {
      return item.name; // 가중치가 초과된 항목 반환
    }
  }

  return '선택항목없음';
};

// 가중치 총합을 반환하는 함수
const getWeightedTotal = (items: itemProps[]) =>
  items.reduce((sum: number, item: itemProps) => sum + item.weight, 0);

// 가챠 뽑기 함수
const getPickedItem = (lootboxData: itemProps[]): string => {
  const pickedItem: string = pickItemFromWeightedRandom(
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

// 보물 1개 뽑기
export const singleGachaMachine = (): string[] => {
  const pickedItem = getPickedItem([
    ...lootboxDataSGrade,
    ...lootboxDataAGrade,
  ]);
  return [pickedItem];
};

// 최고급 보물상자를 7번 뽑되 S등급 보물을 최소 3개 보장
export const multiGachaMachine = (): string[] => {
  const pickedItems = Array(7)
    .fill(null)
    .map(() =>
      getPickedItem([...lootboxDataSGrade, ...lootboxDataAGrade])
    );
  const sGradeNames = new Set(lootboxDataSGrade.map((item) => item.name));
  const sGradeCount = pickedItems.filter((name) =>
    sGradeNames.has(name)
  ).length;
  const guaranteedCount = 3;

  if (sGradeCount < guaranteedCount) {
    const aGradeIndexes = pickedItems
      .map((name, index) => (sGradeNames.has(name) ? -1 : index))
      .filter((index) => index !== -1);

    for (let i = 0; i < guaranteedCount - sGradeCount; i++) {
      const randomIndex = Math.floor(Math.random() * aGradeIndexes.length);
      const [pickedIndex] = aGradeIndexes.splice(randomIndex, 1);
      pickedItems[pickedIndex] = getPickedItem(lootboxDataSGrade);
    }
  }

  return pickedItems;
};

export const updateInventory = (
  pickedItems: string[],
  inventory: inventoryProps[]
): inventoryProps[] => {
  if (pickedItems === undefined) {
    return inventory;
  }

  const inventoryClone = structuredClone(inventory);

  pickedItems.forEach((pickedItem) => {
    const foundIndex = inventoryClone.findIndex(
      (inventoryItem) => inventoryItem.name === pickedItem
    );
    if (foundIndex === -1 && pickedItem) {
      inventoryClone.push({
        name: pickedItem,
        count: 1,
        expectedValue: getExpectedValueByName(pickedItem),
      });
    } else {
      inventoryClone[foundIndex].count++;
    }
  });

  return inventoryClone;
};

// 이름값으로 크리스탈 보물 기대값을 리턴해주는 함수
export const getExpectedValueByName = (name: string): number => {
  const expectedValue =
    [...lootboxDataSGrade, ...lootboxDataAGrade].find((x) => x.name === name)
      ?.expectedValue || 0;
  return expectedValue;
};

// 시뮬레이터 로직
export const simulator = (
  crystals: number,
  threshold: number,
  inventory: inventoryProps[]
) => {
  const [loopCount, updatedCrystals] = crystalThresholdReducer(
    crystals,
    threshold
  ); // 반복 횟수와 남은 크리스탈 개수 연산

  let updatedInventory: inventoryProps[] = inventory;
  for (let i = 0; i < loopCount; i++) {
    const pickedItems: string[] = multiGachaMachine();

    // 인벤토리 업데이트
    updatedInventory = updateInventory(pickedItems, updatedInventory);
  }

  return { updatedCrystals, updatedInventory };
};

// 초기 인벤토리 데이터  생성 함수
export const initInventoryData = (
  crystals: number[],
  defaultCrystal: number
) => {
  const initialInventory = crystalItemsData.map((item, index) => ({
    name: item.name,
    count: crystals[index] ?? 0,
    expectedValue: getExpectedValueByName(item.name),
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

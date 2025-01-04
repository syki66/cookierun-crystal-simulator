import { itemProps } from '@/types/item';

// 가중치에 따라 랜덤으로 항목을 선택해서 이름을 반환하는 함수
const pickItemFromWeightedRandom = (
  items: itemProps[],
  totalWeight: number
) => {
  let random = Math.random() * totalWeight; // 0부터 totalWeight 사이의 랜덤 값 생성

  for (let item of items) {
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
export const getPickedItem = async (lootboxData: itemProps[]) => {
  const pickedItem = pickItemFromWeightedRandom(
    lootboxData,
    getWeightedTotal(lootboxData)
  );
  return pickedItem;
};

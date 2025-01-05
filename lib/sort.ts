import { inventoryProps } from '@/types/inventory';

// 크리스탈 키워드를 배열 최상단으로 이동해주는 함수
export const moveCrystalToFront = (items: inventoryProps[]) => {
  const crystalObjects = items.filter((item) => item.name.includes('크리스탈'));
  const otherObjects = items.filter((item) => !item.name.includes('크리스탈'));

  return [...crystalObjects, ...otherObjects];
};

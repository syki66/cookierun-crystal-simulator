import { inventoryProps } from '@/types/inventory';

// 크리스탈 키워드 유무로 배열을 분리해주는 함수
export const splitArrayByCrystalKeyword = (items: inventoryProps[]) => {
  const crystalItems = items.filter((item) => item.name.includes('크리스탈'));
  const nonCrystalItems = items.filter(
    (item) => !item.name.includes('크리스탈')
  );

  return { crystalItems, nonCrystalItems };
};

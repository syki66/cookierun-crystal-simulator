'use client';

import { Fragment, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import RegularCard from '@/components/inventory/regular-card';
import SpecialCard from '@/components/inventory/special-card';
import {
  multiGachaMachine,
  singleGachaMachine,
  updateInventory,
} from '@/lib/gacha';
import Inventory from '@/components/inventory';
import { inventoryProps } from '@/types/inventory';
import { splitArrayByCrystalKeyword } from '@/lib/split';

export default function Page() {
  const [singleCount, setSingleCount] = useState(0); // 보물 1개 뽑기 카운트
  const [multiCount, setMultiCount] = useState(0); // 6+1개 뽑기 카운트
  const [pickedItems, setPickedItems] = useState<string[]>([]); // 뽑힌 보물 목록
  const [inventory, setInventory] = useState<inventoryProps[]>([]); // 누적 보물 목록

  useEffect(() => {
    if (singleCount > 0) {
      const items = multiGachaMachine();
      const updatedInventory = updateInventory(items, inventory);

      setInventory(updatedInventory);
      setPickedItems(items);
    }
  }, [singleCount]);

  useEffect(() => {
    if (multiCount > 0) {
      const item = singleGachaMachine();
      const updatedInventory = updateInventory(item, inventory);

      setInventory(updatedInventory);
      setPickedItems(item);
    }
  }, [multiCount]);

  return (
    <>
      {singleCount.toLocaleString()}회 시도
      {multiCount.toLocaleString()}회
      <Button
        type="submit"
        className="w-full h-16 my-10 text-white text-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
        onClick={() => {
          setSingleCount((prev) => prev + 1);
        }}
      >
        최고급 보물상자 1개 뽑기
      </Button>
      <Button
        type="submit"
        className="w-full h-16 my-10 text-white text-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
        onClick={() => {
          setMultiCount((prev) => prev + 1);
        }}
      >
        최고급 보물상자 6+1개 뽑기
      </Button>
      <div className="flex justify-center space-x-4">
        {pickedItems.map((name, index) => (
          <Fragment key={`${name}-${index}`}>
            {name.includes('크리스탈') ? (
              <SpecialCard
                name={name}
                count={1}
                expectedValue={
                  inventory.find((x) => x.name === name)?.expectedValue ?? 0
                }
              />
            ) : (
              <RegularCard name={name} count={1} />
            )}
          </Fragment>
        ))}
      </div>
      <Inventory items={splitArrayByCrystalKeyword(inventory)} />
    </>
  );
}

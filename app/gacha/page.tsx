'use client';

import { Fragment, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import RegularCard from '@/components/inventory/regular-card';
import SpecialCard from '@/components/inventory/special-card';
import { simulator } from '@/lib/gacha';
import Inventory from '@/components/inventory';
import { inventoryProps } from '@/types/inventory';
import { splitArrayByCrystalKeyword } from '@/lib/split';

export default function Page() {
  const [count, setCount] = useState(0); // 보물뽑기 카운트
  const [pickedItems, setPickedItems] = useState<string[]>([]); // 뽑힌 보물 목록
  const [inventory, setInventory] = useState<inventoryProps[]>([]); // 누적 보물 목록

  useEffect(() => {
    // 1회 뽑기마다 실행됨
    if (count > 0) {
      const { inventory: updatedInventory, lastPickedItems } = simulator(
        119,
        119,
        inventory
      ); // 1회 뽑기 후 인벤토리 업데이트

      setInventory(updatedInventory);
      setPickedItems(lastPickedItems);
    }
  }, [count]);

  return (
    <>
      {count.toLocaleString()}회 시도
      <Button
        type="submit"
        className="w-full h-16 my-10 text-white text-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        뽑기
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

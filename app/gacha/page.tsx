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
import DashboardCard from '@/components/crystal-chart/dashboard-card';
import { Box, Boxes } from 'lucide-react';
import GachaResultBox from '@/components/gacha-result-box';

export default function Page() {
  const [singleCount, setSingleCount] = useState(0); // 보물 1개 뽑기 카운트
  const [multiCount, setMultiCount] = useState(0); // 6+1개 뽑기 카운트
  const [pickedItems, setPickedItems] = useState<string[]>([]); // 뽑힌 보물 목록
  const [inventory, setInventory] = useState<inventoryProps[]>([]); // 누적 보물 목록

  useEffect(() => {
    if (multiCount > 0) {
      const items = multiGachaMachine();
      const updatedInventory = updateInventory(items, inventory);

      setInventory(updatedInventory);
      setPickedItems(items);
    }
  }, [multiCount]);

  useEffect(() => {
    if (singleCount > 0) {
      const item = singleGachaMachine();
      const updatedInventory = updateInventory(item, inventory);

      setInventory(updatedInventory);
      setPickedItems(item);
    }
  }, [singleCount]);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid gap-6 grid-cols-2 md:w-[800px] mx-auto">
          <DashboardCard
            title="보물상자 1개"
            subtext={`소요 크리스탈: ${(singleCount * 25).toLocaleString()}개`}
            value={`${singleCount.toLocaleString()}회 개봉`}
            icon={Box}
          />
          <DashboardCard
            title="보물상자 6+1 세트"
            subtext={`소요 크리스탈: ${(multiCount === 0
              ? 0
              : 119 + 108 * (multiCount - 1)
            ).toLocaleString()}개`}
            value={`${multiCount.toLocaleString()}회 개봉`}
            icon={Boxes}
          />
        </div>
        <div className="grid gap-6 grid-cols-2 md:w-[800px] mx-auto mb-10">
          <Button
            type="submit"
            className="w-full h-16 my-10 text-white text-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
            onClick={() => {
              setSingleCount((prev) => prev + 1);
            }}
          >
            1개 뽑기
          </Button>
          <Button
            type="submit"
            className="w-full h-16 my-10 text-white text-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
            onClick={() => {
              setMultiCount((prev) => prev + 1);
            }}
          >
            6+1개 뽑기
          </Button>
        </div>

        {pickedItems.length > 0 && (
          <>
            <GachaResultBox>
              {pickedItems.map((name, index) => (
                <Fragment key={`${name}-${index}`}>
                  {name.includes('크리스탈') ? (
                    <SpecialCard
                      name={name}
                      count={1}
                      expectedValue={
                        inventory.find((x) => x.name === name)?.expectedValue ??
                        0
                      }
                    />
                  ) : (
                    <RegularCard name={name} count={1} />
                  )}
                </Fragment>
              ))}
            </GachaResultBox>
          </>
        )}

        <Inventory items={splitArrayByCrystalKeyword(inventory)} />
      </div>
    </>
  );
}

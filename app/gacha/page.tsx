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
import { Box, Boxes, Sparkles } from 'lucide-react';
import GachaResultBox from '@/components/gacha-result-box';

export default function Page() {
  const [singleCount, setSingleCount] = useState(0); // 보물 1개 뽑기 카운트
  const [multiCount, setMultiCount] = useState(0); // 6+1개 뽑기 카운트
  const [pickedItems, setPickedItems] = useState<string[]>([]); // 뽑힌 보물 목록
  const [inventory, setInventory] = useState<inventoryProps[]>([]); // 누적 보물 목록

  useEffect(() => {
    if (multiCount > 0) {
      const items = multiGachaMachine();

      setInventory((currentInventory) =>
        updateInventory(items, currentInventory)
      );
      setPickedItems(items);
    }
  }, [multiCount]);

  useEffect(() => {
    if (singleCount > 0) {
      const item = singleGachaMachine();

      setInventory((currentInventory) =>
        updateInventory(item, currentInventory)
      );
      setPickedItems(item);
    }
  }, [singleCount]);

  return (
    <div className="mx-auto max-w-screen-xl pb-8">
      <section className="game-panel p-3 sm:p-6">
        <div className="mb-6 text-center">
          <span className="game-kicker">
            <Sparkles className="mr-1 size-3.5" />
            OPEN THE BOX
          </span>
          <h2 className="game-heading mt-4 text-2xl sm:text-3xl">
            어떤 보물상자를 열까요?
          </h2>
          <p className="mt-2 break-keep text-sm font-medium text-amber-900/60">
            획득한 보물과 사용한 크리스탈은 아래에 차곡차곡 기록됩니다.
          </p>
        </div>

        <div className="mx-auto grid max-w-[750px] grid-cols-2 gap-3 sm:gap-6">
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
        <div className="mx-auto mb-8 grid max-w-[750px] grid-cols-2 gap-3 sm:gap-6">
          <Button
            type="button"
            variant="secondary"
            className="my-7 h-16 w-full select-none text-lg sm:text-2xl"
            onClick={() => {
              setSingleCount((prev) => prev + 1);
            }}
          >
            <Box className="size-5 sm:size-6" />
            1개 뽑기
          </Button>
          <Button
            type="button"
            className="game-action my-7 h-16 w-full select-none text-lg sm:text-2xl"
            onClick={() => {
              setMultiCount((prev) => prev + 1);
            }}
          >
            <Boxes className="size-5 sm:size-6" />
            6+1개 뽑기
          </Button>
        </div>

        {pickedItems.length > 0 && (
          <GachaResultBox>
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
                  <RegularCard name={name} count={1} compact />
                )}
              </Fragment>
            ))}
          </GachaResultBox>
        )}

        <Inventory items={splitArrayByCrystalKeyword(inventory)} />
      </section>
    </div>
  );
}

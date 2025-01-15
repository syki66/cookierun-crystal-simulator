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
import Note from '@/components/note';

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
        <div className="grid gap-6 grid-cols-2 md:w-[750px] mx-auto">
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
        <div className="grid gap-6 grid-cols-2 md:w-[750px] mx-auto mb-10">
          <Button
            type="submit"
            className="w-full h-16 my-10 select-none text-white text-2xl md:text-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
            onClick={() => {
              setSingleCount((prev) => prev + 1);
            }}
          >
            1개 뽑기
          </Button>
          <Button
            type="submit"
            className="w-full h-16 my-10 select-none text-white text-2xl md:text-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
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

        <div className="w-[750px] mx-auto mt-20">
          <Note>
            * 쿠키런 크리스탈 기댓값 시뮬레이션은{' '}
            <a
              href="https://cookierun.zendesk.com/hc/ko/articles/28813434627993-%EC%83%81%EC%84%B8%EC%A0%95%EB%B3%B4"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              쿠키런 고객센터에 공개된 확률정보
            </a>
            를 바탕으로 제작되었습니다.
            <br />* 정상적인 범위를 벗어난 숫자를 입력하거나 오랜시간
            시뮬레이션을 실행하면 웹 브라우저가 느려지거나 정지할 수 있습니다.
            <br />* 보물상자 오픈 트리거가 발동하게 되면 현재 보유하고 있는
            크리스탈이 최대로 소진됩니다. <br />* 크리스탈 기댓값을 계산할 때,
            보물은 +9강으로 가정하고 계산됩니다.
          </Note>
        </div>
      </div>
    </>
  );
}

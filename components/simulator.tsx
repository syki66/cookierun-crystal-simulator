'use client';

import { useEffect, useState } from 'react';
import {
  multiLootboxData,
  lootboxDataAGrade,
  lootboxDataSGrade,
} from '@/data/lootboxData';
import { getPickedItem } from '@/lib/gacha';
import { inventoryProps } from '@/types/inventory';

const Simulator: React.FC = () => {
  const [crystals, setCrystals] = useState(0); // 현재 보유한 크리스탈 개수
  const [crystalsPerDay, setCrystalsPerDay] = useState(100); // 하루당 크리스탈 획득 기댓값
  const [date, setDate] = useState(0); // 현재 날짜
  const [inventory, setInventory] = useState<inventoryProps[]>([
    { name: '기타 크리스탈 보유효과', count: 10 },
  ]); // 보물 별 수량 데이터

  useEffect(() => {
    // 크리스탈이 335개 이상이면 최고급 보물 상자 6+1개 세트 구매
    let _crystals = 0;
    let _crystalsPerDay = 100;
    let _date = 0;
    let _inventory: inventoryProps[] = [
      { name: '기타 크리스탈 보유효과', count: 10 },
    ];

    const intervalId = setInterval(() => {
      _date++;
      _crystals += _crystalsPerDay;
      if (_crystals >= 335) {
        _crystals -= 335;

        const pickedMultiLootbox = getPickedItem(
          multiLootboxData // 최고급 보물 상자 6+1개 세트 뽑기 데이터
        );

        // 6+1세트 구매시 S보물 및 A보물 등장 확률별 분기 처리
        const pickedItems = [];
        switch (pickedMultiLootbox) {
          case 'S등급 보물 3개 + A등급 보물 4개':
            pickedItems.push(
              getPickedItem(lootboxDataSGrade),
              getPickedItem(lootboxDataSGrade),
              getPickedItem(lootboxDataSGrade),
              getPickedItem(lootboxDataAGrade),
              getPickedItem(lootboxDataAGrade),
              getPickedItem(lootboxDataAGrade),
              getPickedItem(lootboxDataAGrade)
            );
            break;
          case 'S등급 보물 4개 + A등급 보물 3개':
            console.log('S등급 보물 4개 + A등급 보물 3개');
            break;
          case 'S등급 보물 5개 + A등급 보물 2개':
            console.log('S등급 보물 5개 + A등급 보물 2개');
            break;
          case 'S등급 보물 6개 + A등급 보물 1개':
            console.log('S등급 보물 6개 + A등급 보물 1개');
            break;
          case 'S등급 보물 7개':
            console.log('S등급 보물 7개');
            break;
          default:
            console.error('알 수 없는 결과:', pickedMultiLootbox); // 예외 발생 시 에러 로그 출력
        }
        pickedItems.forEach((pickedItem) => {
          const foundIndex = _inventory.findIndex(
            (inventoryItem) => inventoryItem.name === pickedItem
          );
          if (foundIndex === -1 && pickedItem) {
            _inventory.push({ name: pickedItem, count: 1 });
          } else {
            _inventory[foundIndex].count++;
          }
        });

        console.log(_inventory);
      }
      console.log(_date, _crystals);

      setInventory(_inventory);
      setCrystals(_crystals);
      setDate(_date);
    }, 500);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 clearInterval
  }, []);

  return (
    <>
      <h1>Simulator</h1>
      <div>{crystals}</div>
    </>
  );
};

export default Simulator;

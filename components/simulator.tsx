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
    { name: '기타 크리스탈 보유효과 보물', count: 1, expectedValue: 10 },
  ]); // 보물 별 수량 데이터

  useEffect(() => {
    let _inventory: inventoryProps[] = [
      { name: '기타 크리스탈 보유효과', count: 1, expectedValue: 10 },
    ];
    let _crystals = 0;
    let _crystalsPerDay = 0;
    let _date = 0;

    const intervalId = setInterval(() => {
      _date++;
      _crystalsPerDay = _inventory.reduce((sum, item) => {
        if (item.name.includes('크리스탈') && item.expectedValue) {
          return sum + item.count * item.expectedValue;
        }
        return sum; // "크리스탈"이 포함되지 않은 경우 기존 sum 반환
      }, 200); // 초기값;

      _crystals += _crystalsPerDay;
      if (_crystals >= 335) {
        const loopCount = Math.floor(_crystals / 335); // 몫
        _crystals = _crystals % 335; // 나머지

        for (let i = 0; i < loopCount; i++) {
          const pickedMultiLootbox = getPickedItem(
            multiLootboxData // 최고급 보물 상자 6+1개 세트 뽑기 데이터
          );

          // 6+1세트 구매시 S보물 및 A보물 등장 확률별 분기 처리
          const _pickedItems = [];
          switch (pickedMultiLootbox) {
            case 'S등급 보물 3개 + A등급 보물 4개':
              _pickedItems.push(
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
              _pickedItems.push(
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataAGrade),
                getPickedItem(lootboxDataAGrade),
                getPickedItem(lootboxDataAGrade)
              );
              break;
            case 'S등급 보물 5개 + A등급 보물 2개':
              _pickedItems.push(
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataAGrade),
                getPickedItem(lootboxDataAGrade)
              );
              break;
            case 'S등급 보물 6개 + A등급 보물 1개':
              _pickedItems.push(
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataAGrade)
              );
              break;
            case 'S등급 보물 7개':
              _pickedItems.push(
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade),
                getPickedItem(lootboxDataSGrade)
              );
              break;
            default:
              console.error('알 수 없는 결과:', pickedMultiLootbox); // 예외 발생 시 에러 로그 출력
          }

          _pickedItems.forEach((pickedItem) => {
            const foundIndex = _inventory.findIndex(
              (inventoryItem) => inventoryItem.name === pickedItem
            );
            if (foundIndex === -1 && pickedItem) {
              _inventory.push({
                name: pickedItem,
                count: 1,
                expectedValue: [
                  ...lootboxDataSGrade,
                  ...lootboxDataAGrade,
                ].find((x) => x.name === pickedItem)?.expectedValue,
              });
            } else {
              _inventory[foundIndex].count++;
            }
          });
        }
      }

      setDate(_date);
      setCrystals(_crystals);
      setCrystalsPerDay(_crystalsPerDay);
      setInventory(_inventory);
    }, 200);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 clearInterval
  }, []);

  return (
    <>
      <h1>Simulator</h1>
      <div>일수 : {date}</div>
      <div>크리스탈 보유효과 : {crystalsPerDay}</div>
      <div>현재 크리스탈 개수 : {crystals}</div>
    </>
  );
};

export default Simulator;

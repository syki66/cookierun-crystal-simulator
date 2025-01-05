'use client';

import { useEffect, useState } from 'react';

import { gachaMachine } from '@/lib/gacha';
import { inventoryProps } from '@/types/inventory';
import Inventory from './inventory';
import { splitArrayByCrystalKeyword } from '@/lib/split';
import CrystalChart from './crystal-chart';

const Simulator: React.FC = () => {
  const [crystals, setCrystals] = useState(0); // 현재 보유한 크리스탈 개수
  const [crystalsPerDay, setCrystalsPerDay] = useState(100); // 하루당 크리스탈 획득 기댓값
  const [date, setDate] = useState(0); // 현재 날짜
  const [inventory, setInventory] = useState<inventoryProps[]>([
    { name: '기타 크리스탈 보유효과 보물', count: 1, expectedValue: 10 },
  ]); // 보물 별 수량 데이터
  const [chartData, setChartData] = useState<chartDataProps[]>([]);

  useEffect(() => {
    const _chartData: chartDataProps[] = []; // 차트 시각화용 데이터 수집
    let _inventory: inventoryProps[] = [
      { name: '기타 크리스탈 보유효과 보물들', count: 1, expectedValue: 10 },
    ];
    let _crystals = 0;
    let _crystalsPerDay = 0;
    let _date = 0;
    const threshold = 3; // 한번에 오픈할 개수
    const _crystalsThreshold = 119 + 108 * (threshold - 1); // 1회 오픈 시 크리스탈 소모량

    const intervalId = setInterval(() => {
      _date++;
      _crystalsPerDay = _inventory.reduce((sum, item) => {
        if (item.name.includes('크리스탈') && item.expectedValue) {
          return sum + item.count * item.expectedValue;
        }
        return sum; // "크리스탈"이 포함되지 않은 경우 기존 sum 반환
      }, 320); // 초기값;

      _crystals += _crystalsPerDay;

      const { updatedCrystals, inventory: updatedInventory } = gachaMachine(
        _crystals,
        _crystalsThreshold,
        _inventory
      );

      _inventory = updatedInventory;
      _crystals = updatedCrystals;

      // 차트용 데이터 수집
      _chartData.push({
        date: `${_date}`,
        crystals: _crystalsPerDay,
      });

      setDate(_date);
      setCrystals(_crystals);
      setCrystalsPerDay(_crystalsPerDay);
      setInventory(_inventory);

      // 차트용 데이터 업데이트
      if (_date % 10 === 0) {
        setChartData((prevChartData) => {
          return [
            ...prevChartData,
            { date: `${_date}`, crystals: _crystalsPerDay },
          ];
        });
      }
    }, 1000);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 clearInterval
  }, []);

  return (
    <>
      <div>일수 : {date}</div>
      <div>크리스탈 보유효과 : {crystalsPerDay}</div>
      <div>현재 크리스탈 개수 : {crystals}</div>
      <CrystalChart chartData={chartData} />
      <Inventory items={splitArrayByCrystalKeyword(inventory)} />
    </>
  );
};

export default Simulator;

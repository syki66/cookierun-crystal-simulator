'use client';

import { useEffect, useState } from 'react';

import { simulator, getCrystalsPerDay } from '@/lib/gacha';
import { inventoryProps } from '@/types/inventory';
import Inventory from './inventory';
import { splitArrayByCrystalKeyword } from '@/lib/split';
import CrystalChart from './crystal-chart';
import DashboardCard from './crystal-chart/dashboard-card';
import { initDataParams } from '@/types/params';
import {
  addDaysToTimestamp,
  convertToYearsMonthDays,
  formatTimestampToDate,
} from '@/lib/date';
import { Calendar, Tally5, Gem, HandCoins } from 'lucide-react';

interface SimulatorProps {
  initData: initDataParams;
}

const Simulator = ({ initData }: SimulatorProps) => {
  const [crystals, setCrystals] = useState(initData.currentCrystals); // 현재 보유한 크리스탈 개수
  const [crystalsPerDay, setCrystalsPerDay] = useState(initData.crystalsPerDay); // 하루당 크리스탈 획득 기댓값
  const [days, setDays] = useState(0); // 경과 일수
  const [inventory, setInventory] = useState<inventoryProps[]>(
    initData.inventory
  ); // 보물 별 수량 데이터
  const [chartData, setChartData] = useState<chartDataProps[]>([]);

  useEffect(() => {
    let _inventory = initData.inventory;
    let _crystals = initData.currentCrystals;
    let _crystalsPerDay = initData.crystalsPerDay;
    let _days = 0;
    const threshold = initData.threshold; // 보물함 몇개를 열 수 있을 경우 트리거가 작동하는지에 대한 개수
    const _crystalsThreshold = 119 + 108 * (threshold - 1); // 1회 오픈 시 크리스탈 소모량

    const intervalId = setInterval(() => {
      _days++;
      _crystalsPerDay = Math.round(getCrystalsPerDay(_inventory));

      _crystals += _crystalsPerDay;

      const { updatedCrystals, updatedInventory } = simulator(
        _crystals,
        _crystalsThreshold,
        _inventory
      );

      _inventory = updatedInventory;
      _crystals = Math.round(updatedCrystals);

      setCrystals(_crystals);
      setCrystalsPerDay(_crystalsPerDay);
      setInventory(_inventory);
      setDays(_days);

      // 차트용 데이터 업데이트
      if (_days % initData.skip === 0) {
        setChartData((prevChartData) => {
          return [
            ...prevChartData,
            {
              date: addDaysToTimestamp(initData.timestamp, _days),
              crystals: _crystalsPerDay,
            },
          ];
        });
      }
    }, 1000 / initData.speed);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 clearInterval
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-10">
          <DashboardCard
            title="날짜"
            icon={Calendar}
            value={`${addDaysToTimestamp(initData.timestamp, days)}`}
            subtext={`시작일: ${formatTimestampToDate(initData.timestamp)}`}
          />
          <DashboardCard
            title="경과"
            icon={Tally5}
            value={`${convertToYearsMonthDays(initData.timestamp, days)}`}
            subtext={`D+${days}`}
          />
          <DashboardCard
            title="하루당 크리스탈 획득량"
            icon={Gem}
            value={`${crystalsPerDay.toLocaleString()} 개`}
            subtext={`초기 기댓값: ${initData.crystalsPerDay}`}
          />
          <DashboardCard
            title="현재 크리스탈 개수"
            icon={HandCoins}
            value={`${crystals.toLocaleString()} 개`}
            subtext={`6+1 보물상자 ${initData.threshold}개치 크리스탈 모이면 오픈`}
          />
        </div>
        <CrystalChart chartData={chartData} />
        <Inventory items={splitArrayByCrystalKeyword(inventory)} />
      </div>
    </>
  );
};

export default Simulator;

import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Gem } from 'lucide-react';

const chartConfig = {
  crystals: {
    label: '크리스탈',
    color: '#32bce8',
  },
} satisfies ChartConfig;

type CrystalChartProp = {
  chartData: chartDataProps[];
};

export default function CrystalChart({ chartData }: CrystalChartProp) {
  return (
    <Card className="overflow-hidden rounded-[2rem] border-[3px] border-[#704027] bg-[#fff3d6] text-[#5a321f] shadow-[0_8px_0_#9e6835,0_15px_30px_rgba(101,56,31,0.16)]">
      <CardHeader className="relative items-center border-b-2 border-[#e1b866] bg-[#ffe8ae] px-4 py-5 text-center sm:px-6 sm:py-6">
        <div
          aria-hidden="true"
          className="absolute left-5 top-5 size-2.5 rounded-full bg-[#d89450]/40 shadow-[14px_7px_0_#e4ad63,30px_-2px_0_#cf8546]"
        />
        <div className="mb-1 flex size-11 items-center justify-center rounded-2xl border-2 border-[#277ca6] bg-[#cef5ff] text-[#2585b2] shadow-[0_4px_0_#277ca6]">
          <Gem aria-hidden="true" className="size-6 fill-[#75dcf5]" />
        </div>
        <CardTitle className="text-xl font-black tracking-tight text-[#5d341f] sm:text-2xl">
          크리스탈 기댓값 그래프
        </CardTitle>
        <CardDescription className="font-bold text-[#8c5c3a]">
          시간에 따라 쌓여가는 크리스탈 기댓값을 확인해 보세요
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-5 sm:p-6 sm:pt-7">
        <ChartContainer
          config={chartConfig}
          className="h-[240px] w-full aspect-auto text-[#6d4129] sm:h-[320px] [&_.recharts-cartesian-axis-tick_text]:!fill-[#7b4a2f] [&_.recharts-cartesian-grid_line]:!stroke-[#dcbf82] [&_.recharts-legend-item-text]:!text-[#694029]"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 12,
              top: 8,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="5 5" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={6} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent className="border-2 border-[#c98e36] bg-[#fff9e9] font-bold text-[#5d341f] shadow-[0_4px_0_#c98e36,0_9px_18px_rgba(94,51,28,0.18)]" />
              }
            />
            <Legend />
            <Line
              dataKey="crystals"
              type="natural"
              stroke="var(--color-crystals)"
              strokeWidth={4}
              dot={false}
              name="기댓값"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

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

const chartConfig = {
  crystals: {
    label: '크리스탈',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

type CrystalChartProp = {
  chartData: chartDataProps[];
};

export default function CrystalChart({ chartData }: CrystalChartProp) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl">
          크리스탈 기댓값 그래프
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Legend />
            <Line
              dataKey="crystals"
              type="natural"
              stroke="var(--color-crystals)"
              strokeWidth={2}
              dot={false}
              name="기댓값"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

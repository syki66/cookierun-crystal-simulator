import { Card, CardContent } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  value: string;
  subtext: string;
}

export default function DashboardCard({
  title,
  icon: Icon,
  value,
  subtext,
}: DashboardCardProps) {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-none shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {title}
          </h3>
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon className="w-5 h-5 text-blue-500" />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {value}
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {subtext}
        </p>
      </CardContent>
    </Card>
  );
}

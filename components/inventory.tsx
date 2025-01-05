import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { inventoryProps } from '@/types/inventory';
import { useEffect } from 'react';

interface InventoryProps {
  items: inventoryProps[];
}

const Inventory: React.FC<InventoryProps> = ({ items }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item: inventoryProps) => (
        <div className="">
          <Card className="w-48 h-48 overflow-hidden rounded-xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                item.name.includes('크리스탈')
                  ? 'from-red-400 via-yellow-400 via-green-400 via-blue-400 via-indigo-400 to-purple-400'
                  : 'from-blue-100 via-blue-200 to-blue-300'
              } animate-gradient opacity-75`}
            ></div>
            <CardContent
              className={`relative h-full flex flex-col items-center justify-between ${
                item.name.includes('크리스탈') ? 'text-white' : 'text-gray-800'
              } p-4 z-10`}
            >
              <CardTitle className="text-xl font-bold text-center">
                {item.name}
              </CardTitle>
              <p className="text-3xl font-bold">{item.count}</p>
              {
                <CardDescription className="text-center text-xs text-white">
                  {item.expectedValue !== 0
                    ? `크리스탈 기댓값 : ${item.expectedValue}`
                    : ''}
                </CardDescription>
              }
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Inventory;

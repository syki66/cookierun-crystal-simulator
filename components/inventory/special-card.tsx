import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { crystalItemsData } from '@/data/lootboxData';
import Image from 'next/image';
import { Gem } from 'lucide-react';

interface SpecialCardProps {
  name: string;
  expectedValue: number;
  count: number;
}

const SpecialCard: React.FC<SpecialCardProps> = ({
  name,
  expectedValue,
  count,
}) => {
  const imageUrl = crystalItemsData.find((item) => item.name === name)?.imageUrl;

  return (
    <>
      <Card className="w-40 h-40 sm:w-48 sm:h-48 overflow-hidden rounded-xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-yellow-400 to-purple-400 opacity-75 animate-gradient"></div>
        <CardContent className="relative h-full flex flex-col items-center justify-between text-white p-4 z-10">
          <CardTitle className="sm:text-xl font-bold text-center">
            {name}
          </CardTitle>
          <p className="text-3xl font-bold">{count.toLocaleString()}</p>
          {
            <CardDescription className="text-center text-xs text-white flex">
              <div className="mr-2">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={name}
                    width={30}
                    height={30}
                  />
                ) : (
                  <Gem
                    aria-label={name}
                    className="size-[30px] rounded bg-sky-300 p-1 text-blue-500"
                  />
                )}
              </div>
              <div className="flex items-center">기댓값 : {expectedValue}</div>
            </CardDescription>
          }
        </CardContent>
      </Card>
    </>
  );
};

export default SpecialCard;

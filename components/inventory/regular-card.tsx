import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { getGradeByName } from '@/lib/gacha';

interface RegularCardProps {
  name: string;
  count: number;
}

const RegularCard: React.FC<RegularCardProps> = ({ name, count }) => {
  const grade = getGradeByName(name);
  const isSGrade = grade === 'S';

  return (
    <Card
      className={`relative w-28 h-28 overflow-hidden rounded-lg border-2 shadow-md transform transition-all hover:scale-105 hover:shadow-lg ${
        isSGrade ? 'border-amber-400' : 'border-blue-400'
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-75 ${
          isSGrade
            ? 'from-amber-100 via-yellow-200 to-orange-300'
            : 'from-blue-100 via-blue-200 to-blue-300'
        }`}
      ></div>
      {grade && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-7xl font-black text-white/25">
          {grade}
        </div>
      )}
      <CardContent className="relative h-full flex flex-col items-center justify-between text-gray-800 p-2 z-10">
        <CardTitle className="text-sm font-bold text-center mb-auto">
          {name}
        </CardTitle>
        <p className="text-xl font-bold">{count.toLocaleString()}</p>
        {
          <CardDescription className="text-center text-[8px] line-clamp-2">
            {''}
          </CardDescription>
        }
      </CardContent>
    </Card>
  );
};

export default RegularCard;

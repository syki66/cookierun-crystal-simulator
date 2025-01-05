import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

interface RegularCardProps {
  name: string;
  count: number;
}

const RegularCard: React.FC<RegularCardProps> = ({ name, count }) => {
  return (
    <Card className="w-28 h-28 overflow-hidden rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 opacity-75"></div>
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

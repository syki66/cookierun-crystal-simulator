import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

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
  return (
    <Card className="w-40 h-40 sm:w-48 sm:h-48 overflow-hidden rounded-xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-yellow-400 to-purple-400 opacity-75 animate-gradient"></div>
      <CardContent className="relative h-full flex flex-col items-center justify-between text-white p-4 z-10">
        <CardTitle className="text-xl font-bold text-center">{name}</CardTitle>
        <p className="text-3xl font-bold">{count.toLocaleString()}</p>
        {
          <CardDescription className="text-center text-xs text-white">
            크리스탈 기댓값 : {expectedValue}
          </CardDescription>
        }
      </CardContent>
    </Card>
  );
};

export default SpecialCard;

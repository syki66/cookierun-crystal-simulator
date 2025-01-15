import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getExpectedValueByName } from '@/lib/gacha';
import Image from 'next/image';

interface ColorScheme {
  bg: string;
  border: string;
  text: string;
}

interface Item {
  name: string;
  imageUrl?: string;
}

interface CrystalCardProps {
  colorScheme: ColorScheme;
  item: Item;
  form: any; // 또는 구체적인 타입
  name: string;
  placeholder: string;
}

const CrystalInputCard: React.FC<CrystalCardProps> = ({
  colorScheme,
  form,
  name,
  item,
  placeholder,
}) => {
  return (
    <Card
      className={`w-full md:w-72 ${colorScheme.bg} ${colorScheme.border} border-2 transition-all duration-300 hover:shadow-lg hover:scale-105`}
    >
      <CardHeader className="p-4">
        <CardTitle className={`${colorScheme.text} font-bold text-sm flex`}>
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={28}
              height={28}
              className="mr-2"
            />
          )}
          <div className="flex items-center">{item.name}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid w-full items-center gap-2">
          <div className="flex flex-col space-y-1">
            <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className="mb-10">
                  <FormLabel className={`${colorScheme.text} text-xs`}>
                    기댓값:{' '}
                    {getExpectedValueByName(item.name) === 0
                      ? 1
                      : getExpectedValueByName(item.name)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className={`${colorScheme.border} ${colorScheme.text} placeholder:${colorScheme.text} placeholder:opacity-50 bg-white bg-opacity-50 text-sm`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrystalInputCard;

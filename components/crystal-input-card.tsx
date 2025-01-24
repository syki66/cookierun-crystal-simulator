import { CalculatorFormSchema } from '@/app/calculator/page';
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
import { Gem } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

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
  form: CalculatorFormSchema & {
    control: ReturnType<typeof useForm>['control'];
  };
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
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={48}
              height={48}
              className="mr-2 w-10 h-10 md:w-12 md:h-12"
            />
          ) : (
            <Gem className="mr-2 min-w-10 min-h-10 md:w-12 md:h-12 text-blue-500 bg-sky-300 rounded-lg" />
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
                    {name.startsWith('crystal_') ? '기댓값' : '개수'}:{' '}
                    {getExpectedValueByName(item.name) === 0
                      ? 1
                      : getExpectedValueByName(item.name)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className={`${colorScheme.border} ${colorScheme.text} placeholder:${colorScheme.text} placeholder:opacity-50 bg-white bg-opacity-50`}
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

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
  form,
  name,
  item,
  placeholder,
}) => {
  return (
    <Card
      className="group relative w-full min-w-0 overflow-hidden border-amber-300 bg-gradient-to-b from-[#fffdf6] to-[#fff1c9] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_7px_0_#d97706,0_14px_24px_rgb(120_53_15_/_15%)]"
    >
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-sky-300 via-cyan-400 to-sky-300" />
      <CardHeader className="px-3 pb-2 pt-5 sm:p-4 sm:pt-6">
        <CardTitle className="flex flex-col items-center gap-2 text-center text-[11px] font-black leading-4 text-amber-950 sm:flex-row sm:text-left sm:text-sm">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={48}
              height={48}
              className="size-12 drop-shadow-md transition-transform group-hover:scale-110 sm:size-14"
            />
          ) : (
            <Gem className="size-12 shrink-0 rounded-xl border-2 border-sky-300 bg-sky-100 p-2 text-sky-600 shadow-[0_3px_0_#38bdf8] sm:size-14" />
          )}
          <div className="flex items-center">{item.name}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-3 pt-0 sm:px-4 sm:pb-4">
        <div className="grid w-full items-center">
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] text-amber-900/70 sm:text-xs">
                    {name.startsWith('crystal_')
                      ? `기댓값 ${getExpectedValueByName(item.name)}`
                      : '기타 보물 하루 기댓값'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      {...field}
                      inputMode="numeric"
                      className="border-amber-200 bg-white text-center text-amber-950"
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

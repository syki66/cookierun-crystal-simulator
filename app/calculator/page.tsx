'use client';

import CrystalInputCard from '@/components/crystal-input-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';

import { crystalItemsData } from '@/data/lootboxData';
import { getExpectedValueByName } from '@/lib/gacha';
import { zodResolver } from '@hookform/resolvers/zod';
import { Gem, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const colorSchemes = [
  { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-800' },
  { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800' },
  { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-800' },
  { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-800' },
  { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-800' },
  { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-800' },
  { bg: 'bg-indigo-100', border: 'border-indigo-300', text: 'text-indigo-800' },
  { bg: 'bg-teal-100', border: 'border-teal-300', text: 'text-teal-800' },
  { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-800' },
  { bg: 'bg-cyan-100', border: 'border-cyan-300', text: 'text-cyan-800' },
  { bg: 'bg-lime-100', border: 'border-lime-300', text: 'text-lime-800' },
];

const FormSchema = z.object({
  crystal_0: z
    .string()
    .max(4, '최대 4자까지 입력 가능합니다.')
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_1: z
    .string()
    .max(4, '최대 4자까지 입력 가능합니다.')
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_2: z
    .string()
    .max(4, '최대 4자까지 입력 가능합니다.')
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_3: z
    .string()
    .max(4, '최대 4자까지 입력 가능합니다.')
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_4: z
    .string()
    .max(4, '최대 4자까지 입력 가능합니다.')
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_5: z
    .string()
    .max(4, '최대 4자까지 입력 가능합니다.')
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_6: z
    .string()
    .max(4, '최대 4자까지 입력 가능합니다.')
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_7: z
    .string()
    .max(4, '최대 4자까지 입력 가능합니다.')
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_8: z
    .string()
    .max(4, '최대 4자까지 입력 가능합니다.')
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_9: z
    .string()
    .max(4, '최대 4자까지 입력 가능합니다.')
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  otherCrystal: z
    .string()
    .max(6, '최대 6자까지 입력 가능합니다.')
    .refine((val) => /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(val), {
      message: '유효한 숫자를 입력해야 합니다.',
    })
    .or(z.literal(''))
    .optional(),
});

export type CalculatorFormSchema = z.infer<typeof FormSchema>;

export default function Page() {
  const [expectedValue, setExpectedValue] = useState<number>(0);
  const [savedCrystals] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const storedCrystals = window.localStorage.getItem('crystals');
      return storedCrystals ? JSON.parse(storedCrystals) : Array(11).fill('');
    }
    return Array(11).fill('');
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      crystal_0: savedCrystals[0],
      crystal_1: savedCrystals[1],
      crystal_2: savedCrystals[2],
      crystal_3: savedCrystals[3],
      crystal_4: savedCrystals[4],
      crystal_5: savedCrystals[5],
      crystal_6: savedCrystals[6],
      crystal_7: savedCrystals[7],
      crystal_8: savedCrystals[8],
      crystal_9: savedCrystals[9],
      otherCrystal: savedCrystals[10],
    },
  });

  // 기댓값 계산
  const calculateExpectedValue = (crystals: number[]) => {
    let totalExpectedVal = 0;
    crystalItemsData.forEach((item, index) => {
      const expVal = getExpectedValueByName(item.name); // 보물의 기댓값
      const count = crystals[index]; // 개수
      totalExpectedVal += count * expVal;
    });

    return Number(totalExpectedVal.toFixed(2));
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const crystalValues = Object.values(data)
      .slice(0, -1)
      .map((value) => Number(value) || 0);
    const _expectedValue =
      calculateExpectedValue(crystalValues) + (Number(data.otherCrystal) || 0);

    setExpectedValue(_expectedValue);
    window.localStorage.setItem(
      'crystals',
      JSON.stringify(Object.values(data))
    ); // 로컬에 저장
  };

  return (
    <div className="mx-auto max-w-screen-xl pb-8">
      <section className="game-panel p-3 sm:p-6">
        <div className="mb-6 text-center">
          <span className="game-kicker">
            <Sparkles className="mr-1 size-3.5" />
            MY CRYSTALS
          </span>
          <h2 className="game-heading mt-4 text-2xl sm:text-3xl">
            보유한 보물을 입력해 주세요
          </h2>
          <p className="mt-2 break-keep text-sm font-medium text-amber-900/60">
            각 보물의 수량을 입력하면 하루 크리스탈 기댓값을 계산합니다.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {crystalItemsData.map((item, index) => (
                <CrystalInputCard
                  key={`${item.name}-${index}`}
                  colorScheme={colorSchemes[index]}
                  form={form}
                  name={`crystal_${index}`}
                  item={item}
                  placeholder="개수 입력"
                />
              ))}
              <CrystalInputCard
                colorScheme={colorSchemes[10]}
                form={form}
                name="otherCrystal"
                placeholder="기댓값 입력"
                item={{ name: '기타 크리스탈 보물들의 기댓값' }}
              />
            </div>

            <div className="flex flex-col items-center">
              <Button
                type="submit"
                className="game-action mb-16 mt-10 h-16 w-full max-w-xl select-none text-2xl sm:text-3xl"
              >
                계산하기
              </Button>

              <Card className="relative h-64 w-full max-w-md overflow-hidden border-sky-300 bg-gradient-to-br from-sky-100 via-cyan-200 to-blue-300 shadow-[0_7px_0_#0284c7,0_16px_30px_rgb(3_105_161_/_22%)]">
                <div className="absolute -right-10 -top-10 size-36 rounded-full bg-white/35 blur-sm" />
                <CardContent className="relative flex h-full flex-col items-center justify-center p-6 text-sky-950">
                  <Gem className="mb-3 size-11 fill-cyan-300 text-sky-600 drop-shadow-md" />
                  <div className="mb-6 text-lg font-black">
                    하루 크리스탈 기댓값
                  </div>
                  <div
                    aria-live="polite"
                    className="text-5xl font-black tracking-tight [text-shadow:0_3px_0_#fff] sm:text-6xl"
                  >
                    {expectedValue === 0
                      ? '???'
                      : expectedValue.toLocaleString()}
                  </div>
                  <div className="mt-3 rounded-full bg-white/55 px-3 py-1 text-xs font-bold">
                    CRYSTAL / DAY
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
}

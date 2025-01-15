'use client';

import CrystalInputCard from '@/components/crystal-input-card';
import Note from '@/components/note';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';

import { crystalItemsData } from '@/data/lootboxData';
import { getExpectedValueByName } from '@/lib/gacha';
import { zodResolver } from '@hookform/resolvers/zod';
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
];

const FormSchema = z.object({
  crystal_0: z
    .string()
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_1: z
    .string()
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_2: z
    .string()
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_3: z
    .string()
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_4: z
    .string()
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_5: z
    .string()
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_6: z
    .string()
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_7: z
    .string()
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  crystal_8: z
    .string()
    .regex(/^\d*$/, '자연수를 숫자만 입력해주세요.')
    .optional(),
  otherCrystal: z
    .string()
    .refine((val) => /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(val), {
      message: '유효한 숫자를 입력해야 합니다.',
    })
    .or(z.literal(''))
    .optional(),
});

export type CalculatorFormSchema = z.infer<typeof FormSchema>;

export default function Page() {
  const [expectedValue, setExpectedValue] = useState<number>(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      crystal_0: '',
      crystal_1: '',
      crystal_2: '',
      crystal_3: '',
      crystal_4: '',
      crystal_5: '',
      crystal_6: '',
      crystal_7: '',
      crystal_8: '',
      otherCrystal: '',
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
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:justify-center">
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
                colorScheme={colorSchemes[9]}
                form={form}
                name="otherCrystal"
                placeholder="기댓값 입력"
                item={{ name: '기타 크리스탈 보물들의 기댓값' }}
              />
            </div>

            <div className="flex flex-col items-center">
              <Button
                type="submit"
                className="w-full md:w-[576px] h-16 my-10 select-none text-white text-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
              >
                계산하기
              </Button>

              <Card className="w-full md:w-96 h-64 overflow-hidden">
                <CardContent className="p-6 h-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-300 via-blue-400 to-cyan-300 text-white">
                  <div className="text-xl font-semibold text-purple-100 mb-10">
                    하루 크리스탈 기댓값
                  </div>
                  <div className="text-6xl font-bold mb-2 animate-pulse">
                    {expectedValue === 0
                      ? '???'
                      : expectedValue.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <div className="mt-20">
                <Note>
                  * 크리스탈 기댓값을 계산할 때, 보물은 +9강으로 가정하고
                  계산됩니다.
                </Note>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

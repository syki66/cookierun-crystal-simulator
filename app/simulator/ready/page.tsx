'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Card, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  date: z.date({
    required_error: '시작 날짜를 필수로 입력해야 합니다.',
  }),
  crystals: z
    .string({
      required_error: '기댓값을 필수로 입력해야 합니다.',
      invalid_type_error: '쉼표를 통해 9개의 숫자를 입력해야 합니다.',
    })
    .refine(
      (value) => {
        const parts = value.split(',');
        return (
          parts.length === 9 && parts.every((part) => /^\d+$/.test(part.trim()))
        );
      },
      {
        message: '쉼표가 8개 있고 그 사이에 자연수가 위치해야 합니다.',
      }
    ),
  defaultCrystal: z
    .string({
      required_error: '크리스탈의 개수를 필수로 입력해야 합니다.',
      invalid_type_error: '숫자를 입력해야 합니다.',
    })
    .refine((val) => /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(val), {
      // 정규식 테스트
      message: '유효한 숫자를 입력해야 합니다.',
    }),
  currentCrystals: z
    .number({
      required_error: '크리스탈의 개수를 필수로 입력해야 합니다.',
      invalid_type_error: '자연수를 입력해야 합니다.',
    })
    .int(),
  threshold: z.string({
    required_error: '트리거 개수를 필수로 입력해야 합니다.',
  }),
  skip: z
    .number({
      required_error: '데이터 간격을 필수로 입력해야 합니다.',
      invalid_type_error: '자연수를 입력해야 합니다.',
    })
    .int(),
  speed: z.string({
    required_error: '배속을 필수로 입력해야 합니다.',
  }),
});

export default function InputForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
      currentCrystals: 0,
      crystals: '0,0,0,0,0,0,0,0,0',
      defaultCrystal: '10.35',
      threshold: '3',
      skip: 1,
      speed: '1',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const {
      date,
      crystals,
      defaultCrystal,
      currentCrystals,
      skip,
      speed,
      threshold,
    } = data;
    const crystalsArray = crystals.split(',').map((e) => e.trim()); // 공백 제거
    router.push(
      `/simulator/show?timestamp=${date.getTime()}&crystals=${crystalsArray}&defaultCrystal=${defaultCrystal}&currentCrystals=${currentCrystals}&skip=${skip}&speed=${speed}&threshold=${threshold}`
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <Card>
          <CardHeader className="text-center">시뮬레이션 정보 입력</CardHeader>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  시작 날짜 <span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'yyyy년 MM월 dd일')
                        ) : (
                          <span>날짜 선택</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  시뮬레이션이 시작될 기준 날짜를 골라주세요.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="crystals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  크리스탈 보유효과를 가진 쉼표를 이용해서 입력해주세요.
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="각각의 개수를 입력해주세요." {...field} />
                </FormControl>
                <FormDescription>
                  현재 가지고 있는 크리스탈 보물 9개의 개수를 순서대로
                  입력해주세요.
                </FormDescription>
                <FormDescription>
                  [레어 크리스탈 사파이어, 희귀한 크리스탈 조개, 커다란 크리스탈
                  원석, 최고급 크리스탈 보석함, 청명한 크리스탈 자명종, 왕
                  크리스탈 보석반지, 장식용 크리스탈 포크스푼, 마음에 품은
                  신성한 크리스탈 검, 진주 크리스탈 귀걸이]
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="defaultCrystal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  기타 크리스탈 보물들의 기댓값
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="기타 크리스탈 기댓값" {...field} />
                </FormControl>
                <FormDescription>
                  위에서 입력한 크리스탈 보물을 제외한 모든 크리스탈 보물의
                  하루당 기댓값을 입력해주세요.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentCrystals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  크리스탈 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="크리스탈 개수 입력"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(
                        value === ''
                          ? ''
                          : isNaN(Number(value))
                          ? value
                          : Number(value)
                      );
                    }}
                  />
                </FormControl>
                <FormDescription>
                  현재 가지고 있는 크리스탈의 개수를 입력해주세요.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="threshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  보물상자 오픈 트리거가 발동되기 위한 크리스탈 개수
                  <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="역치값 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">119</SelectItem>
                    <SelectItem value="2">227</SelectItem>
                    <SelectItem value="3">335</SelectItem>
                    <SelectItem value="4">443</SelectItem>
                    <SelectItem value="5">551</SelectItem>
                    <SelectItem value="6">659</SelectItem>
                    <SelectItem value="7">767</SelectItem>
                    <SelectItem value="8">875</SelectItem>
                    <SelectItem value="9">983</SelectItem>
                    <SelectItem value="10">1091</SelectItem>
                    <SelectItem value="11">1199</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  크리스탈이 몇개가 넘을 경우 보물상자를 오픈할지 입력해주세요.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  그래프 간소화 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="건너뛸 데이터량 입력"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(
                        value === ''
                          ? ''
                          : isNaN(Number(value))
                          ? value
                          : Number(value)
                      );
                    }}
                  />
                </FormControl>
                <FormDescription>
                  그래프에 데이터를 1번 표시할때마다 몇번의 데이터를 건너뛸지
                  입력합니다.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="speed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  시뮬레이션 배속 <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="배속 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">x1</SelectItem>
                    <SelectItem value="2">x2</SelectItem>
                    <SelectItem value="4">x4</SelectItem>
                    <SelectItem value="8">x8</SelectItem>
                    <SelectItem value="16">x16</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  시뮬레이션 배속을 선택해주세요.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <Button type="submit">시뮬레이션 시작</Button>
      </form>
    </Form>
  );
}

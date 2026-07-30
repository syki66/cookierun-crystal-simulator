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
import { CalendarIcon, Gem, Loader2 } from 'lucide-react';
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
import { useState } from 'react';
import Image from 'next/image';
import { crystalItemsData } from '@/data/lootboxData';
import { getExpectedValueByName } from '@/lib/gacha';

const crystalItemCount = crystalItemsData.length;

const FormSchema = z.object({
  date: z.date({
    required_error: '시작 날짜를 필수로 입력해야 합니다.',
  }),
  crystals: z
    .array(
      z
        .string()
        .max(4, '최대 4자리까지 입력할 수 있습니다.')
        .regex(/^\d*$/, '숫자만 입력해주세요.')
    )
    .length(crystalItemCount),
  defaultCrystal: z
    .string({
      required_error: '크리스탈의 개수를 필수로 입력해야 합니다.',
      invalid_type_error: '숫자를 입력해야 합니다.',
    })
    .refine((val) => /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(val), {
      // 정규식 테스트
      message: '유효한 숫자를 입력해야 합니다.',
    })
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1;
      },
      {
        message:
          '출석체크만 해도 기본적으로 1개의 크리스탈은 받을 수 있습니다.',
      }
    ),
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

export default function Page() {
  const router = useRouter();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      date: new Date(),
      currentCrystals: 1000,
      crystals: Array(crystalItemCount).fill(''),
      defaultCrystal: '30',
      threshold: '1',
      skip: 10,
      speed: '8',
    },
  });

  const crystalsValue = form.watch('crystals');
  const crystalExpValue = (() => {
    if (
      crystalsValue.length !== crystalItemCount ||
      !crystalsValue.every((value) => /^\d*$/.test(value))
    ) {
      return '-';
    }

    const totalExpectedValue = crystalItemsData.reduce(
      (total, item, index) =>
        total +
        (Number(crystalsValue[index]) || 0) *
          getExpectedValueByName(item.name),
      0
    );

    return Number(totalExpectedValue.toFixed(2));
  })();

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
    const crystalsArray = crystals.map((value) => value || '0');
    setIsPending(true);
    router.push(
      `/simulator/show?timestamp=${date.getTime()}&crystals=${crystalsArray.join(',')}&defaultCrystal=${defaultCrystal}&currentCrystals=${currentCrystals}&skip=${skip}&speed=${speed}&threshold=${threshold}`
    );
  };

  // 말 다듬고 커밋하기
  return (
    <div className="max-w-screen-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="p-10">
            <CardHeader className="text-center text-2xl font-semibold pt-0">
              시뮬레이션 정보 입력
            </CardHeader>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-5 mb-10">
                  <FormLabel>
                    시작 날짜 <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
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
                        onSelect={(selectedDate) => {
                          field.onChange(selectedDate);
                          setIsCalendarOpen(false); // 날짜 선택 시 팝업 닫기
                        }}
                        disabled={(date) =>
                          date > new Date('2099-12-31') ||
                          date < new Date('1900-01-01')
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

            <div className="mb-10">
              <div className="mb-1 text-sm font-medium">
                크리스탈 보물들의 개수
                <span className="text-red-500">*</span>{' '}
                <span className="text-muted-foreground">
                  ({crystalExpValue})
                </span>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                현재 보유하고 있는 각 크리스탈 보물의 개수를 입력해주세요.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {crystalItemsData.map((item, index) => (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={`crystals.${index}` as const}
                    render={({ field }) => (
                      <FormItem>
                        <Card className="flex h-full flex-col items-center gap-3 border-blue-100 bg-blue-50/50 p-3 text-center">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="size-16"
                            />
                          ) : (
                            <Gem
                              aria-label={item.name}
                              className="size-16 rounded-xl bg-sky-200 p-3 text-blue-500"
                            />
                          )}
                          <FormLabel className="flex min-h-8 items-center text-center text-xs leading-4">
                            {item.name}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              inputMode="numeric"
                              placeholder="0"
                              className="h-9 text-center"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </Card>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="defaultCrystal"
              render={({ field }) => (
                <FormItem className="mb-10">
                  <FormLabel>
                    기타 크리스탈 보물들의 기댓값
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="기타 크리스탈 기댓값 입력 (ex. 출석시 1크리스탈, 70레벨 크리스탈 보물 등)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    위에서 입력한 크리스탈 보물을 제외한 모든 크리스탈 보물들의
                    하루 기댓값 총합을 입력해주세요.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentCrystals"
              render={({ field }) => (
                <FormItem className="mb-10">
                  <FormLabel>
                    크리스탈 보유량 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="크리스탈 보유 개수 입력"
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
                <FormItem className="mb-10">
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
                    크리스탈이 몇개가 넘을 경우 보물상자를 오픈할지
                    입력해주세요.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skip"
              render={({ field }) => (
                <FormItem className="mb-10">
                  <FormLabel>
                    그래프 축약 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="자연수 입력"
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
                    몇 일마다 그래프에 데이터를 표기할지 선택해주세요.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="speed"
              render={({ field }) => (
                <FormItem className="mb-10">
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
                      <SelectItem value="32">x32</SelectItem>
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

          <Button
            type="submit"
            className="w-full h-16 mt-10 select-none text-white text-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="w-12 h-12 animate-spin text-blue-300" />
                <Loader2 className="w-12 h-12 animate-pulse text-red-300" />
                <Loader2 className="w-12 h-12 animate-ping text-yellow-300" />
                <Loader2 className="w-12 h-12 animate-bounce text-lime-300" />
                <span className="text-2xl animate-spin">준비중입니다</span>
                <Loader2 className="w-12 h-12 animate-ping text-indigo-300" />
                <Loader2 className="w-12 h-12 animate-spin text-pink-300" />
                <Loader2 className="w-12 h-12 animate-pulse text-teal-300" />
                <Loader2 className="w-12 h-12 animate-spin text-amber-300" />
              </>
            ) : (
              '시뮬레이션 시작하기'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

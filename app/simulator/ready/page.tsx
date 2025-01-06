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
  crystalsPerDay: z.number({
    required_error: '기댓값을 필수로 입력해야 합니다.',
    invalid_type_error: '숫자를 입력해야 합니다.',
  }),
  currentCrystals: z
    .number({
      required_error: '크리스탈의 개수를 필수로 입력해야 합니다.',
      invalid_type_error: '자연수를 입력해야 합니다.',
    })
    .int(),
  threshold: z
    .number({
      required_error: '1회 개봉량을 필수로 입력해야 합니다.',
      invalid_type_error: '자연수를 입력해야 합니다.',
    })
    .int(),
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
      crystalsPerDay: 0,
      threshold: 3,
      skip: 1,
      speed: '1',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { date, currentCrystals, crystalsPerDay, skip, speed, threshold } =
      data;
    router.push(
      `/simulator/show?date=${date}&currentCrystals=${currentCrystals}&crystalsPerDay=${crystalsPerDay}&skip=${skip}&speed=${speed}&threshold=${threshold}`
    );
  }

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
                <FormLabel>시작 날짜</FormLabel>
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
            name="crystalsPerDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>크리스탈 기댓값</FormLabel>
                <FormControl>
                  <Input disabled placeholder="기댓값 입력" {...field} />
                </FormControl>
                <FormDescription>
                  하루당 벌 수 있는 크리스탈의 기댓값입니다. 보물 입력 정보를
                  바탕으로 자동 계산됩니다.
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
                <FormLabel>크리스탈</FormLabel>
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
                <FormLabel>보물상자 개봉량</FormLabel>
                <FormControl>
                  <Input
                    placeholder="현재 보유중인 크리스탈 개수 입력"
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
                  [6+1개 세트 최고급 보물상자]를 한 번에 몇 개를 개봉할지
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
              <FormItem>
                <FormLabel>그래프 간소화</FormLabel>
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

          {/** select는 string으로 값이 넘어오는데 쿼리스트링으로 값을 넘길거라 굳이 타입 변환 하지 않음 */}
          <FormField
            control={form.control}
            name="speed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>시뮬레이션 배속</FormLabel>
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

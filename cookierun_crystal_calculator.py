# 하루당 버는 크리스탈이 몇개당 뽑겟다하는 크리스탈보다 크면 작동 제대로안함  


def cookie_crystal_expectation(now_crystal, how_much_open_percrystal, future_want_crystal_perday):
    future_crystal = 0
    days = 0
    n = 0
    reset_crystal = 0
    cycle = 0
    past_day = 0

    while (now_crystal < future_want_crystal_perday):
        n += 1
        days +=1
        future_crystal = reset_crystal + now_crystal * n

        print(days, "일차", future_crystal, "개")
        
        if (future_crystal > how_much_open_percrystal):

            day_last = days - past_day
            reset_crystal = future_crystal - how_much_open_percrystal
            n = 0
            now_crystal += 1
            cycle += 1
            print("--------------" , cycle, "사이클--------(사이클당", day_last, "일)---- 하루당 크리스탈 :", now_crystal)
            past_day = days
        
    
    
'''
now_crystal = 67.2357
future_crystal = 0
days = 0
n = 0
reset_crystal = 0
cycle = 0
past_day = 0

while (now_crystal < 100):
    n += 1
    days +=1
    future_crystal = reset_crystal + now_crystal * n

    print(days, "일차", future_crystal)
    
    if (future_crystal > 1523):

        day_last = days - past_day
        reset_crystal = future_crystal - 1523
        n = 0
        now_crystal += 1
        cycle += 1
        print("--------------" , cycle, "사이클--------(사이클당", day_last, "일)---- 하루당 크리스탈 :", now_crystal)
        past_day = days
'''




#cookie_crystal_expectation(67.2357, 1523,100)


cookie_crystal_expectation(72.0357, 1523, 119)




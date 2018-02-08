#include "stdio.h"

//쿠키런 크리스탈 수확량 예측기

int main(void)
{
	int days = 0;
	double sum_oneday_crystal = 0;
	double oneday_crystal = 0;
	double all_treasure_amount = 110; /*최고급보물상자에서 뽑아지는 보물만 해당됨*/
	double all_crystal_treasure_amount = 9; /*최고급보물상자에서 뽑아지는 크리스탈 보물만 해당*/
	double crystal_treasure_expectation_avg = (9.12 / 9); /*최고급보물상자 크리스탈보물 기댓값*/
	double crystal_treasure_get_probability = 9 / 110 * 7; /*6+1개 세트로 파는 최고급보물상자 기준*/
	double one_click_crystal_get = crystal_treasure_get_probability * crystal_treasure_expectation_avg; /*6+1클릭시 크리스탈 얻는 기댓값*/
	double rest_oneday_crystal = 0;

	printf("              ※※※※※※\n");
	printf("※※※※※※※※주의사항※※※※※※※※※※\n");
	printf("※ 119이상을 입력하면 값이 정확하지 않음  ※\n");
	printf("※         매일 출첵했을때 기준           ※\n");
	printf("※출석체크시 1크리스탈 받는 거 포함해야됨 ※\n");
	printf("※  6+1 스페셜 최고급보물상자패키지기준임 ※\n");
	printf("※   120개 모였을때 바로 쓰는거 기준ㅇㅇ  ※\n");
	printf("※※※※※※※※※※※※※※※※※※※※※※\n\n");
	printf("하루평균 버는 크리스탈량 기댓값:");
	scanf_s("%lf", &oneday_crystal);

	while (sum_oneday_crystal<119)
	{
		sum_oneday_crystal = sum_oneday_crystal + oneday_crystal;
		if (sum_oneday_crystal >= 119)
		{
			sum_oneday_crystal = sum_oneday_crystal - 119;
			oneday_crystal = oneday_crystal + 0.580363;
		}
		days++;
	}

	printf("★★★★%d일 후★★★★에 하루에 스페셜패키지 1개씩 GET\n", days);
	printf("★★★%d개월 %d일★★★\n\n", days / 30, days % 30);

		return 0;
}
export const formatTimestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp); // 타임스탬프를 Date 객체로 변환

  const year = date.getFullYear(); // 연도 (YYYY)
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (MM), 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, '0'); // 일 (DD)

  return `${year}년 ${month}월 ${day}일`;
};

export const addDaysToTimestamp = (timestamp: number, days: number) => {
  const date = new Date(timestamp); // 타임스탬프를 Date 객체로 변환
  date.setDate(date.getDate() + days); // 일수를 더함
  return formatTimestampToDate(date.getTime()); // 새로운 타임스탬프 반환
};

// 타임스탬프와 기간을 입력받아 `년 개월 일`을 출력해주는 함수
export const convertToYearsMonthDays = (
  timestamp: number,
  daysToAdd: number
) => {
  const startDate = new Date(timestamp);
  const endDate = new Date(
    startDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000
  );

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (days === 0 && (years !== 0 || months !== 0)) {
    days = 0; // 다른 단위가 있으면 0일로 유지
  } else if (years === 0 && months === 0 && days === 0) {
    return '0일'; // 모든 단위가 0이면 "0일" 반환
  }

  let result = '';

  if (years > 0) {
    result += `${years}년 `;
  }

  if (months > 0) {
    result += `${months}개월 `;
  }

  if (days > 0) {
    result += `${days}일`;
  }

  return result.trim();
};

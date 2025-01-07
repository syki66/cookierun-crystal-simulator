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

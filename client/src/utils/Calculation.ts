// 날짜 포맷 변환
export function formatRelativeTime(dateString: string): string {
  const targetDate = new Date(dateString);
  const currentDate = new Date();

  // targetDate와 currentDate의 날짜 부분만 추출
  const targetDateWithoutTime = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );
  const currentDateWithoutTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  // 날짜 차이 계산
  const dayDifference = Math.floor(
    (currentDateWithoutTime.getTime() - targetDateWithoutTime.getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const monthsDifference = Math.floor(dayDifference / 30);

  // 오늘 날짜이면 HH:MM 형식으로 출력
  if (dayDifference === 0) {
    const hours = targetDate.getHours().toString().padStart(2, "0");
    const minutes = targetDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // 어제 게시물이면 '어제 HH:MM' 형식으로 출력
  if (dayDifference === 1) return `하루 전`;

  // 오늘 이전이면 'N일 전' 형식으로 출력
  if (dayDifference < 30) {
    return `${dayDifference}일 전`;
  }

  // 한달 이후면 'N달 전' 형식으로 출력
  return `${monthsDifference}달 전`;
}

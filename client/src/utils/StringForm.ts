/**
 * @param input:string
 * @returns string
 *
 * String에서 HTML 태그를 제거하는 함수
 */
export function RemoveHtmlTags(input: string) {
  const regex = /<[^>]*>/g;
  return input.replace(regex, "");
}

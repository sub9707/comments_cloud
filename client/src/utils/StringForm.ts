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
export const validatePassword = (value: string) => {
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  return (
    passwordRegex.test(value) ||
    "영문자, 숫자, 특수문자를 모두 포함해야 합니다."
  );
};

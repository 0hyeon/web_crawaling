export function DateTrans(inputDate: string): string | null {
  if (inputDate === null) {
    return null; // null인 경우 null 반환
  }
  const dateObj = new Date(inputDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");
  const outputDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return outputDate;
}

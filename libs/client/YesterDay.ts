export function adjustDateForVercel(
  dateString: string | null | undefined
): string | null {
  if (dateString === undefined || dateString === null) {
    return null;
  }
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  return date.toISOString();
}

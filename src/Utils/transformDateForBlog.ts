interface TransformedDate {
  day: number;
  month: string;
  year: number;
}

export const transformDate = (isoDate: string): TransformedDate | null => {
  const dateTime = new Date(isoDate);

  if (isNaN(dateTime.getTime())) {
    return null;
  }

  const monthsPolish: string[] = [
    "stycznia",
    "lutego",
    "marca",
    "kwietnia",
    "maja",
    "czerwca",
    "lipca",
    "sierpnia",
    "września",
    "października",
    "listopada",
    "grudnia",
  ];

  const day: number = dateTime.getDate();
  const month: string = monthsPolish[dateTime.getMonth()];
  const year: number = dateTime.getFullYear();

  return { day, month, year };
};

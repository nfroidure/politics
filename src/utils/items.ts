export type Item = {
  id: string;
  leafname?: string;
  title: string;
  description: string;
  date: string;
  draft: boolean;
  illustration?: {
    url: string;
    alt: string;
  };
};

export function datedItemsSorter<T extends { date: string }>(
  { date: dateA }: T,
  { date: dateB }: T
): number {
  return Date.parse(dateA) === Date.parse(dateB)
    ? 0
    : Date.parse(dateA) > Date.parse(dateB)
    ? -1
    : 1;
}

export function toItem<T extends Item>({
  id,
  leafname,
  title,
  description,
  date,
  draft,
  illustration,
}: T): Item {
  return {
    id,
    title,
    description,
    date,
    draft,
    ...(leafname ? { leafname } : {}),
    ...(illustration ? { illustration } : {}),
  };
}

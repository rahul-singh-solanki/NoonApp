export function productKeyExtractor<Item extends { id: number }>(item: Item): string {
  return item.id.toString()
}
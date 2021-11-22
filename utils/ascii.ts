export function toASCIIString(str: string): string {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[éèêë]/g, "e")
    .replace(/[ùüû]/g, "u")
    .replace(/[ïî]/g, "i")
    .replace(/[àäâ]/g, "a")
    .replace(/[ç]/g, "c")
    .replace(/[^a-z0-9\-_]/g, "-")
    .replace(/[_\-]+$/g, "")
    .replace(/^[_\-]+/g, "");
}

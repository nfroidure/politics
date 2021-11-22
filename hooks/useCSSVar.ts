export default function useCSSVar(name: string, fallback: string) {
  typeof navigator === "undefined"
    ? fallback
    : getComputedStyle(document.documentElement).getPropertyValue(name);
}

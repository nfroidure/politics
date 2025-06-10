export default function useCSSRemValue(fallbackSize = 16): number {
  if (typeof window === "undefined") {
    return fallbackSize;
  }

  return parseFloat(window.getComputedStyle(document.documentElement).fontSize);
}

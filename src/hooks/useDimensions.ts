import {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react';

export type DimensionObject = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export type UseDimensionResult = DimensionObject | 'none';

export type UseDimensionsHook = [
  (node: HTMLElement) => void,
  UseDimensionResult,
  HTMLElement | null,
];

export interface UseDimensionsArgs {
  liveMeasure?: boolean;
}

function useDimensions(
  { liveMeasure = true }: UseDimensionsArgs = {},
  deps: Parameters<typeof useEffect>[1] = [],
): UseDimensionsHook {
  const [dimensions, setDimensions] = useState<UseDimensionResult>('none');
  const [node, _setNode] = useState<HTMLElement | null>(null);
  const nodeRef = useRef(node);
  const setNode = (node: HTMLElement | null) => {
    nodeRef.current = node;
    _setNode(node);
  };

  const ref = useCallback((node: HTMLElement | null) => {
    setNode(node);
  }, []);
  const measure = () => {
    window.requestAnimationFrame(() => {
      const dimensions = nodeRef.current
        ? getDimensionObject(nodeRef.current)
        : 'none';
      setDimensions(dimensions);
    });
  };

  useLayoutEffect(() => {
    if (node) {
      measure();
    }
  }, [node, ...deps]);

  useEffect(() => {
    if (liveMeasure) {
      window.addEventListener('resize', measure);
      window.addEventListener('click', measure);
      window.addEventListener('scroll', measure, true);

      return () => {
        window.removeEventListener('resize', measure);
        window.removeEventListener('click', measure);
        window.removeEventListener('scroll', measure, true);
      };
    }
  }, [liveMeasure]);

  return [ref, dimensions, node];
}

export default useDimensions;

function getDimensionObject(node: HTMLElement): DimensionObject {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    x:
      'x' in rect
        ? rect.x
        : (rect as unknown as { left: number; top: number }).left,
    y:
      'y' in rect
        ? rect.y
        : (rect as unknown as { left: number; top: number }).top,
  };
}

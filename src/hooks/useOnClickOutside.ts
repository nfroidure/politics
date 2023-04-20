import React, { useEffect, useCallback, useRef, useState } from "react";

export type UseOnClickOutsideHook = (
  handler: (event: MouseEvent | TouchEvent) => void
) => [Array<React.Ref<HTMLElement>>, Array<HTMLElement| null>];

export default function createUseOnClickOutside(
  nbRef = 1
): UseOnClickOutsideHook {
  return function useOnClickOutside(
    handler: Parameters<UseOnClickOutsideHook>[0]
  ): ReturnType<UseOnClickOutsideHook> {
    const arrayNode: Array<
      [HTMLElement | null, React.Dispatch<React.SetStateAction<HTMLElement | null>>]
    > = new Array(nbRef).fill("").map(() => useState<HTMLElement | null>(null));
    const arrayNodeRef: Array<React.MutableRefObject<HTMLElement | null>> = new Array(
      nbRef
    )
      .fill("")
      .map((_, index) => useRef(arrayNode[index][0]));
    const arrayRef: Array<(node: HTMLElement) => void> = new Array(nbRef)
      .fill("")
      .map((_, index) => {
        const [, setNode] = arrayNode[index];
        const nodeRef = arrayNodeRef[index];
        const _setNode = (node: HTMLElement | null) => {
          nodeRef.current = node;
          setNode(node);
        };

        const ref = useCallback((node: HTMLElement | null) => {
          _setNode(node);
        }, []);

        return ref;
      });

    useEffect(() => {
      const listener = (event: MouseEvent | TouchEvent) => {
        for (let i = 0; i < nbRef; i++) {
          if (
            !arrayNode[i] ||
            !arrayNodeRef[i].current ||
            arrayNodeRef[i].current?.contains(event.target as Node)
          ) {
            return;
          }
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [...arrayNode, handler]);

    return [arrayRef, arrayNode.map((node) => node[0])];
  };
}

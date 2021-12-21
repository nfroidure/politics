import useDimensions from "./useDimensions";
import YError from "yerror";
import { useState, useEffect } from "react";
import type { DimensionObject } from "./useDimensions";

export const HORIZONTAL_SIDE = ["top", "bottom"] as const;
export const VERTICAL_SIDE = ["right", "left"] as const;
export const HORIZONTAL_ALIGNMENT = ["left", "center", "right"] as const;
export const VERTICAL_ALIGNMENT = ["top", "middle", "bottom"] as const;
export const UNSET = "unset" as const;

export type Position = {
  x: number;
  y: number;
};
export type VerticalAnchor = {
  side: typeof VERTICAL_SIDE[number];
  alignment: typeof VERTICAL_ALIGNMENT[number];
};
export type HorizontalAnchor = {
  side: typeof HORIZONTAL_SIDE[number];
  alignment: typeof HORIZONTAL_ALIGNMENT[number];
};
export type ElementAnchor = VerticalAnchor | HorizontalAnchor;

export type RelativePosition = { base: ElementAnchor; popin: ElementAnchor };

export type AbsolutePositionUnset = typeof UNSET;
export type AbsolutePositionValue = number;

export type VerticalPosition =
  | {
      top: AbsolutePositionValue;
      bottom: AbsolutePositionUnset;
    }
  | {
      top: AbsolutePositionUnset;
      bottom: AbsolutePositionValue;
    };
export type HorizontalPosition =
  | {
      left: AbsolutePositionValue;
      right: AbsolutePositionUnset;
    }
  | {
      left: AbsolutePositionUnset;
      right: AbsolutePositionValue;
    };
export type AbsolutePosition =
  | null
  | ((VerticalPosition & HorizontalPosition) & {
      position: "absolute";
    });

export type UseRelativePositionHook = [
  (node: HTMLElement) => void,
  (node: HTMLElement) => void,
  [AbsolutePosition, RelativePosition | "none"]
];

//find the closest scrollable parent of the element
const regex = /(auto|scroll)/;
const style = (node: Element, prop: string) =>
  getComputedStyle(node, null).getPropertyValue(prop);
const scroll = (node: Element) =>
  regex.test(
    style(node, "overflow") +
      style(node, "overflow-y") +
      style(node, "overflow-x")
  );
const getScrollParent = (node: Element): Element | null =>
  !node || node === document.body
    ? document.body
    : scroll(node)
    ? node
    : getScrollParent(node.parentNode as Element);

export default function useRelativePosition(
  {
    allowedPositions,
    spacing = 0,
  }: {
    allowedPositions?: RelativePosition[];
    spacing: number;
  },
  deps: Parameters<typeof useEffect>[1] = []
): UseRelativePositionHook {
  const [baseElementRef, baseElementDimensions, baseNode] = useDimensions(
    { liveMeasure: true },
    deps
  );
  const [popinElementRef, popinElementDimensions, popinNode] = useDimensions(
    { liveMeasure: true },
    [...deps, baseElementDimensions]
  );
  const [state, setState] = useState<
    [AbsolutePosition, RelativePosition | "none"]
  >([null, "none"]);

  useEffect(() => {
    if (
      !baseNode ||
      !popinNode ||
      baseElementDimensions === "none" ||
      popinElementDimensions === "none" ||
      popinElementDimensions.height == 0
    ) {
      setState([null, "none"]);
      return;
    }

    const parentRect = getScrollParent(baseNode)?.getBoundingClientRect();

    if (
      !allowedPositions?.some((allowedPosition) => {
        const baseAnchorTranslation = computeAnchorTranslation(
          baseElementDimensions,
          allowedPosition.base
        );
        const popinAnchorTranslation = computeAnchorTranslation(
          popinElementDimensions,
          allowedPosition.popin
        );
        let verticalPosition: VerticalPosition;
        let horizontalPosition: HorizontalPosition;
        switch (allowedPosition.base.side) {
          case "right":
            horizontalPosition = {
              left:
                baseElementDimensions.width -
                popinAnchorTranslation.x +
                spacing,
              right: UNSET,
            };
            verticalPosition = {
              top: baseAnchorTranslation.y - popinAnchorTranslation.y,
              bottom: UNSET,
            };
            break;
          case "bottom":
            horizontalPosition = {
              left: baseAnchorTranslation.x - popinAnchorTranslation.x,
              right: UNSET,
            };
            verticalPosition = {
              top: baseAnchorTranslation.y - popinAnchorTranslation.y + spacing,
              bottom: UNSET,
            };
            break;
          case "left":
            horizontalPosition = {
              left: UNSET,
              right: 0 + popinAnchorTranslation.x + spacing,
            };
            verticalPosition = {
              top: baseAnchorTranslation.y - popinAnchorTranslation.y,
              bottom: UNSET,
            };
            break;
          case "top":
            horizontalPosition = {
              left: baseAnchorTranslation.x - popinAnchorTranslation.x,
              right: UNSET,
            };
            verticalPosition = {
              top: UNSET,
              bottom:
                baseElementDimensions.height -
                popinElementDimensions.height +
                popinAnchorTranslation.y +
                spacing,
            };
            break;
        }

        const position: AbsolutePosition = {
          ...horizontalPosition,
          ...verticalPosition,
          position: "absolute",
        };
        const baseLeftSpace = baseElementDimensions.x - (parentRect?.left || 0);
        const baseTopSpace = baseElementDimensions.y - (parentRect?.top || 0);
        const baseRightSpace =
          (parentRect?.width || 0) - (baseLeftSpace + baseElementDimensions.width);
        const baseBottomSpace =
          (parentRect?.height || 0) - (baseTopSpace + baseElementDimensions.height);
        const leftSpace =
          baseLeftSpace + baseElementDimensions.width - baseAnchorTranslation.x;
        const rightSpace =
          baseRightSpace +
          baseElementDimensions.width -
          baseAnchorTranslation.x;
        const topSpace =
          baseTopSpace + baseElementDimensions.height - baseAnchorTranslation.y;
        const bottomSpace =
          baseBottomSpace +
          baseElementDimensions.height -
          baseAnchorTranslation.y;

        if (position.left !== UNSET) {
          const hasEnoughSpaceOnTheRight =
            popinElementDimensions.width - popinAnchorTranslation.x <=
            rightSpace;

          if (!hasEnoughSpaceOnTheRight) {
            return false;
          }
          // Here `right` is set
        } else {
          const hasEnoughSpaceOnTheLeft =
            popinElementDimensions.width -
              (popinElementDimensions.width - popinAnchorTranslation.x) <=
            leftSpace;

          if (!hasEnoughSpaceOnTheLeft) {
            return false;
          }
        }
        if (position.top !== UNSET) {
          const hasEnoughSpaceOnTheBottom =
            popinElementDimensions.height - popinAnchorTranslation.y <=
            bottomSpace;
          if (!hasEnoughSpaceOnTheBottom) {
            return false;
          }
          // Here `bottom` is set
        } else {
          const hasEnoughSpaceOnTheTop =
            popinElementDimensions.height -
              (popinElementDimensions.height - popinAnchorTranslation.y) <=
            topSpace;

          if (!hasEnoughSpaceOnTheTop) {
            return false;
          }
        }

        setState([position, allowedPosition]);
        return true;
      })
    ) {
      setState([null, "none"]);
    }
  }, [baseElementDimensions, popinElementDimensions, ...deps]);
  return [baseElementRef, popinElementRef, state];
}

export function computeAnchorPoint(
  dimensions: DimensionObject,
  anchor: ElementAnchor
): Position {
  const translation = computeAnchorTranslation(dimensions, anchor);

  return {
    x: dimensions.x + translation.x,
    y: dimensions.y + translation.y,
  };
}
export function computeAnchorTranslation(
  dimensions: DimensionObject,
  anchor: ElementAnchor
): Position {
  let x: number;

  switch (anchor.side) {
    case "left":
      x = 0;
      break;
    case "right":
      x = dimensions.width;
      break;
    case "top":
    case "bottom":
      switch (anchor.alignment) {
        case "left":
          x = 0;
          break;
        case "right":
          x = dimensions.width;
          break;
        case "center":
          x = dimensions.width / 2;
          break;
      }
      break;
    default:
      throw new YError("E_INVALID_ANCHOR", anchor);
  }

  let y: number;

  switch (anchor.side) {
    case "top":
      y = 0;
      break;
    case "bottom":
      y = dimensions.height;
      break;
    case "left":
    case "right":
      switch (anchor.alignment) {
        case "top":
          y = 0;
          break;
        case "bottom":
          y = dimensions.height;
          break;
        case "middle":
          y = dimensions.height / 2;
          break;
      }
      break;
    default:
      throw new YError("E_INVALID_ANCHOR", anchor);
  }
  return { x, y };
}

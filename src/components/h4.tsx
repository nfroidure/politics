import type { HTMLAttributes } from "react";

const Heading4 = ({
  children,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLElement>) => (
  <h4 className="root" {...props}>
    {children}
    <style jsx>{`
      .root {
        font-family: var(--headingFont);
        font-size: var(--bigFontSize);
        line-height: var(--bigLineHeight);
        margin: 0 0 var(--vRythm) 0;
      }
    `}</style>
  </h4>
);

export default Heading4;

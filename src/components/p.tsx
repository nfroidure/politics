import type { HTMLAttributes } from "react";

const Paragraph = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & HTMLAttributes<HTMLParagraphElement>) => (
  <p className="root" {...props}>
    {children}
    <style jsx>{`
      .root {
        margin: 0 0 var(--vRythm) 0;
      }
    `}</style>
  </p>
);

export default Paragraph;

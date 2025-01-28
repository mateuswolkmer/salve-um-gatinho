import { CountUp } from "countup.js";
import type { Component, JSX } from "solid-js";

export type CountNumberProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  value?: number;
  plus?: boolean;
};

export const CountNumber: Component<CountNumberProps> = ({
  id,
  value,
  plus = false,
}) => {
  if (!value) return null;

  new CountUp(id, value, {
    enableScrollSpy: true,
    scrollSpyOnce: true,
    formattingFn: (n) => (plus ? `${n}+` : `${n}`),
  });

  return value;
};

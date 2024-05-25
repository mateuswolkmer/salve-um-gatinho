import { CountUp } from "countup.js";
import type { Component, JSX } from "solid-js";

export type CountNumberProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  value?: number;
};

export const CountNumber: Component<CountNumberProps> = ({
    id,
    value
}) => {
    if(!value) return null;

    new CountUp(id, value, { enableScrollSpy: true, scrollSpyOnce: true });

    return value;
};

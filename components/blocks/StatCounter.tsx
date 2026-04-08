"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
};

export function StatCounter({ value, suffix = "", prefix = "", label, duration = 2000 }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-heading font-bold text-navy">
        {prefix}{count}{suffix}
      </div>
      <div className="text-slate-500 text-sm mt-1">{label}</div>
    </div>
  );
}

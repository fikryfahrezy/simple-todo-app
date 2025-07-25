"use client";

import { useEffect, useRef } from "react";

export type IntersectorProps = {
  onIntsersecting: () => void;
  children?: React.ReactNode;
};

export function Intersector({ onIntsersecting, children }: IntersectorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const onObserved = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          onIntsersecting();
        }
      }
    };

    const observer = new IntersectionObserver(onObserved, {
      rootMargin: "0px",
      threshold: 0.8,
    });
    observer.observe(ref.current);

    return () => {
      return observer.disconnect();
    };
  }, [onIntsersecting]);

  return <div ref={ref}>{children}</div>;
}

"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { StarIcon } from "./icons";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export type SearchContextProps = {
  className?: React.ReactNode;
};

export function SearchContext({ className }: SearchContextProps) {
  const backgroundId = useId();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const aborter = new AbortController();

    const toggleModal = (open: boolean) => {
      document.body.style.overflow = open ? "hidden" : "";
      setSearchOpen(open);
    };

    window.addEventListener(
      "click",
      (event) => {
        if ((event.target as HTMLElement).id === backgroundId) {
          toggleModal(false);
        }
      },
      { signal: aborter.signal },
    );

    let isCtrlPressed = false;
    window.addEventListener(
      "keydown",
      (event) => {
        if (event.ctrlKey) {
          isCtrlPressed = true;
        }

        if (isCtrlPressed && event.key === "/") {
          toggleModal(true);
        }

        if (event.key === "Escape") {
          toggleModal(false);
        }
      },
      { signal: aborter.signal },
    );

    window.addEventListener(
      "keyup",
      (event) => {
        if (!event.ctrlKey) {
          isCtrlPressed = false;
        }
      },
      { signal: aborter.signal },
    );

    return () => {
      aborter.abort();
    };
  }, [backgroundId]);

  return (
    <div
      className={cn(
        "tw:flex tw:text-placeholder tw:items-center tw:gap-2",
        className,
      )}
    >
      <StarIcon />
      Search (Ctrl+/)
      {searchOpen &&
        createPortal(
          <div
            id={backgroundId}
            className='tw:fixed tw:flex tw:w-screen tw:h-screen tw:items-center tw:justify-center tw:bg-black/30 tw:inset-0'
          >
            <Card className='tw:w-full tw:max-w-2xl tw:p-4'>
              <Input placeholder='Search' />
            </Card>
          </div>,
          document.body,
        )}
    </div>
  );
}

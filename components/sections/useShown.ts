"use client";
import { useEffect, useState } from "react";

// Returns true once isActive has been true at least once, then stays true.
export function useShown(isActive: boolean) {
  const [shown, setShown] = useState(isActive);
  useEffect(() => {
    if (isActive) setShown(true);
  }, [isActive]);
  return shown;
}

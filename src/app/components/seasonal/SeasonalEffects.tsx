"use client";

import { useEffect, useState } from "react";
import { isWinter, winter } from "@/lib/seasonal";
import WinterPopup from "./WinterPopup";

/** Mounts winter features only in season, on the client (avoids hydration mismatch). */
export default function SeasonalEffects() {
  const [inSeason, setInSeason] = useState(false);
  useEffect(() => setInSeason(isWinter()), []);
  if (!inSeason) return null;
  return winter.popup ? <WinterPopup /> : null;
}

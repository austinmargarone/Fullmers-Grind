"use client";

import { useEffect, useState } from "react";
import { isWinter, winter } from "@/lib/seasonal";
import Snowfall from "./Snowfall";
import WinterPopup from "./WinterPopup";

/** Mounts winter features only in season, on the client (avoids hydration mismatch). */
export default function SeasonalEffects() {
  const [inSeason, setInSeason] = useState(false);
  useEffect(() => setInSeason(isWinter()), []);
  if (!inSeason) return null;
  return (
    <>
      {winter.snow && <Snowfall />}
      {winter.popup && <WinterPopup />}
    </>
  );
}

// Seasonal features (snowfall + snow plowing pop-up).
// Turns on automatically each winter and off in spring; edit the months here.

export const winter = {
  /** First month (1-12) the winter features show */
  startMonth: 11, // November
  /** Last month (1-12) the winter features show */
  endMonth: 3, // March
  snow: true,
  popup: true,
  /** Seconds before the pop-up appears */
  popupDelaySeconds: 5,
  /** Pages where the pop-up never appears */
  popupExcludePaths: ["/estimate", "/contact"],
};

export function isWinter(date = new Date()) {
  const m = date.getMonth() + 1;
  const { startMonth: s, endMonth: e } = winter;
  return s <= e ? m >= s && m <= e : m >= s || m <= e;
}

/** Season label like "2026-27", used so the pop-up shows once per winter. */
export function seasonKey(date = new Date()) {
  const y = date.getFullYear();
  const start = date.getMonth() + 1 >= winter.startMonth ? y : y - 1;
  return `${start}-${String((start + 1) % 100).padStart(2, "0")}`;
}

const SUN_SIGN_RANGES = [
  { sign: "Capricorn", start: [12, 22], end: [1, 19] },
  { sign: "Aquarius", start: [1, 20], end: [2, 18] },
  { sign: "Pisces", start: [2, 19], end: [3, 20] },
  { sign: "Aries", start: [3, 21], end: [4, 19] },
  { sign: "Taurus", start: [4, 20], end: [5, 20] },
  { sign: "Gemini", start: [5, 21], end: [6, 20] },
  { sign: "Cancer", start: [6, 21], end: [7, 22] },
  { sign: "Leo", start: [7, 23], end: [8, 22] },
  { sign: "Virgo", start: [8, 23], end: [9, 22] },
  { sign: "Libra", start: [9, 23], end: [10, 22] },
  { sign: "Scorpio", start: [10, 23], end: [11, 21] },
  { sign: "Sagittarius", start: [11, 22], end: [12, 21] }
] as const;

const SYNODIC_MONTH = 29.530588853; // days
const MOON_PHASES = [
  { name: "New Moon", min: 0, max: 1.84566 },
  { name: "Waxing Crescent", min: 1.84566, max: 5.53699 },
  { name: "First Quarter", min: 5.53699, max: 9.22831 },
  { name: "Waxing Gibbous", min: 9.22831, max: 12.91963 },
  { name: "Full Moon", min: 12.91963, max: 16.61096 },
  { name: "Waning Gibbous", min: 16.61096, max: 20.30228 },
  { name: "Last Quarter", min: 20.30228, max: 23.99361 },
  { name: "Waning Crescent", min: 23.99361, max: 27.68493 }
] as const;

interface RetrogradeWindow {
  start: string;
  end: string;
  planet: string;
}

const RETROGRADE_WINDOWS: RetrogradeWindow[] = [
  { start: "2024-04-01", end: "2024-04-25", planet: "Mercury" },
  { start: "2024-08-04", end: "2024-08-28", planet: "Mercury" },
  { start: "2024-11-25", end: "2024-12-15", planet: "Mercury" },
  { start: "2025-03-14", end: "2025-04-07", planet: "Mercury" },
  { start: "2025-07-17", end: "2025-08-11", planet: "Mercury" },
  { start: "2025-11-09", end: "2025-11-29", planet: "Mercury" },
  { start: "2026-02-25", end: "2026-03-20", planet: "Mercury" },
  { start: "2026-06-29", end: "2026-07-23", planet: "Mercury" },
  { start: "2026-10-25", end: "2026-11-15", planet: "Mercury" }
];

function getSunSign(date: Date): string {
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  for (const range of SUN_SIGN_RANGES) {
    const [startMonth, startDay] = range.start;
    const [endMonth, endDay] = range.end;

    if (startMonth === 12 && month === 12 && day >= startDay) {
      return range.sign;
    }

    if (endMonth === 1 && month === 1 && day <= endDay) {
      return range.sign;
    }

    const isBetween =
      month > startMonth && month < endMonth ? true :
      month === startMonth && day >= startDay ? true :
      month === endMonth && day <= endDay;

    if (isBetween) {
      return range.sign;
    }
  }

  return "Capricorn";
}

function getMoonAge(date: Date): number {
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14, 0); // Jan 6 2000 18:14 UTC
  const diff = date.getTime() - knownNewMoon;
  const daysSinceNew = diff / (1000 * 60 * 60 * 24);
  const age = daysSinceNew % SYNODIC_MONTH;
  return age < 0 ? age + SYNODIC_MONTH : age;
}

function getMoonPhase(age: number): string {
  const phase = MOON_PHASES.find(({ min, max }) => age >= min && age < max);
  return phase ? phase.name : "Dark Moon";
}

function getPhaseStatus(age: number): "Void" | "Active" {
  const voidThreshold = SYNODIC_MONTH - 1.5; // about last 36 hours of the cycle
  return age >= voidThreshold || age <= 1 ? "Void" : "Active";
}

function getActiveRetrogrades(date: Date): string {
  const isoDate = date.toISOString().split("T")[0];
  const dayTimestamp = Date.parse(`${isoDate}T12:00:00Z`);

  const activePlanets = RETROGRADE_WINDOWS.filter(({ start, end }) => {
    const startTime = Date.parse(`${start}T00:00:00Z`);
    const endTime = Date.parse(`${end}T23:59:59Z`);
    return dayTimestamp >= startTime && dayTimestamp <= endTime;
  }).map(({ planet }) => planet);

  if (activePlanets.length === 0) {
    return "None";
  }

  const uniquePlanets = Array.from(new Set(activePlanets));
  return uniquePlanets.join(", ");
}

export async function GET(): Promise<Response> {
  const now = new Date();
  const age = getMoonAge(now);
  const sign = getSunSign(now);
  const moonPhase = getMoonPhase(age);
  const phase = getPhaseStatus(age);
  const retrograde = getActiveRetrogrades(now);

  return Response.json(
    {
      timestamp: now.toISOString(),
      sign,
      moonPhase,
      phase,
      retrograde
    },
    {
      headers: { "content-type": "application/json" }
    }
  );
}

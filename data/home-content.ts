import type { Journey } from "@/types";

/** Homepage journey cards. Copy is translated via `home.journeys.<key>`. */
export const journeys: Journey[] = [
  { key: "buy", href: "/buy", icon: "buy" },
  { key: "sell", href: "/sell", icon: "sell" },
  { key: "invest", href: "/invest", icon: "invest" },
  { key: "move", href: "/relocation", icon: "move" },
  { key: "firstTime", href: "/first-time-buyers", icon: "first-time" },
];

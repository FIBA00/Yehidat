import teamData from "./team.json";
import { toSrcSet } from "./gallery";

export const TEAM_MEMBERS = teamData.items.map((item, index) => ({
  id: item.id,
  alt: item.alt,
  labelKey: `team.photo${index + 1}`,
  width: item.width,
  height: item.height,
  avif: toSrcSet(item.avif),
  webp: toSrcSet(item.webp),
}));

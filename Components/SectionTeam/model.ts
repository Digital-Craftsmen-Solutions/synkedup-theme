import type { HeadingModel } from "../Heading/model";
import { TeamModel } from "../Team/model";

export type SectionTeamModel = {
  heading: HeadingModel;
  team: TeamModel[];
  options?: {
    theme?: "light" | "dark";
  };
};

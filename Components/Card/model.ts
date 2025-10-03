import { ButtonModel } from "../Button/model";
import { BadgeModel } from "../Badge/model";
import { ItemBoxModel } from "../ItemBox/model";

type FeatureListItem = {
  icon?: string;
  label: string;
};

export type CardModel = ItemBoxModel & {
  actionButton?: ButtonModel;
  badge?: BadgeModel;
  features?: FeatureListItem[];
  options?: {
    align?: "left" | "center";
    theme?: "light" | "dark";
  };
};

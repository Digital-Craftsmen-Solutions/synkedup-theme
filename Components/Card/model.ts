import { ButtonModel } from "../Button/model";
import { BadgeModel } from "../Badge/model";
import { ItemBoxModel } from "../ItemBox/model";
import { FeatureListModel } from "../List/model";

export type CardModel = ItemBoxModel & {
  actionButton?: ButtonModel;
  badge?: BadgeModel;
  features?: FeatureListModel;
  options?: {
    align?: "left" | "center";
    theme?: "light" | "dark";
  };
};

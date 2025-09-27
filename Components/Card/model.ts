import { ButtonModel } from "../Button/model";
import { BadgeModel } from "../Badge/model";
import { ItemBoxModel } from "../ItemBox/model";

export type CardModel = ItemBoxModel & {
  actionButton?: ButtonModel;
  badge?: BadgeModel;
  options?: {
    align?: "left" | "center";
    theme?: "light" | "dark";
  };
};

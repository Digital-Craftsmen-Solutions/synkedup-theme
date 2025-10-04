import { ButtonModel } from "../Button/model";
import { FeatureListModel } from "../List/model";

export type CardPricingModel = {
  icon?: string;
  title?: string;
  description?: string;
  priceMonth: number;
  priceYear: number;
  labelMonth: string;
  labelYear: string;
  switchId?: string;
  period?: "month" | "year";
  extraCost?: string;
  actionButton?: ButtonModel;
  badge?: string;
  features: FeatureListModel;
  options?: {
    align?: "left" | "center";
    theme?: "light" | "dark";
  };
};

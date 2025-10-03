import type { HeadingModel } from "../Heading/model";
import type { ActionModel } from "../Action/model";
import type { SectionIconItemsModel } from "../SectionIconItems/model";
import { ImageModel } from "../Common/model";
import { BreadcrumbsModel } from "../Breadcrumbs/model";

export type SectionHeroFullModel = {
  backgroundImage?: ImageModel;
  heading: HeadingModel;
  image?: ImageModel;
  mobileImage?: ImageModel;
  gravityForm?: string;
  video?: string;
  action?: ActionModel;
  extraItems?: SectionIconItemsModel;
  breadcrumbs?: BreadcrumbsModel;
  options?: {
    theme?: "light" | "dark";
    display?: "full" | "split";
  };
};

import { ImageModel } from "../Common/model";

export type ItemBoxModel = {
  type: "icon" | "image" | "figure";
  icon?: string;
  image?: ImageModel;
  figure?: string;
  title?: string;
  link?: {
    url: string;
    target?: "_self" | "_blank";
  };
  description?: string;
  class?: string;
  options?: {
    align?: "left" | "center";
    theme?: "light" | "dark";
  };
};

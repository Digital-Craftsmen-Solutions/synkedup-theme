import { ImageModel } from "../Common/model";

export type TeamModel = {
  image: ImageModel;
  name: string;
  role: string;
  options?: {
    theme?: "light" | "dark";
  };
};

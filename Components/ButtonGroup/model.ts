import type { ButtonModel } from "../Button/model";

export type ButtonGroupModel = {
  buttons: {
    url: string;
    title: string;
    isActive?: boolean;
  }[];
};

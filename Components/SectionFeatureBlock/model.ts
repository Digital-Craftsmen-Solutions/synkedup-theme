import type { HeadingModel } from "../Heading/model";
import type { ActionModel } from "../Action/model";
import type { QuoteModel } from "../Quote/model";
import { ImageModel } from "../Common/model";
import { FeatureListModel } from "../List/model";

export type HubspotForm = {
  portalId: string;
  formId: string;
  region?: string;
  class?: string;
  targetId?: string;
};

// The SectionFeatureBlock model supports an optional `hubspotForm`:
// { hubspotForm?: HubspotForm }

export type SectionFeatureBlockModel = {
  icon?: string;
  heading: HeadingModel;
  features: FeatureListModel;
  action?: ActionModel;
  quote?: QuoteModel;
  image: ImageModel;
  mobileImage?: ImageModel;
  options?: {
    theme?: "light" | "dark";
    imageDisplay?: "full" | "left" | "right";
    imageAlign?: "bottom" | "center" | "top";
    textAlign?: "default" | "center" | "left";
  };
};

import template from "@/Components/List/index.twig?url";
import type { Meta, StoryObj } from "@storybook/html";
import type { FeatureListModel } from "./model";
import { renderTwig } from "../../stories/utils";

type FeatureListObject = {
  features: {
    label: string;
    icon?: string;
    title?: string;
  }[];
};

const meta: Meta<FeatureListObject> = {
  title: "Components/List",
  tags: ["autodocs"],
  args: {
    features: [{ label: "Feature 1" }, { label: "Feature 2" }],
  },
  argTypes: {
    features: {
      control: "object",
    },
  },
  decorators: [(Story) => `<div class="max-w-xs">${Story()}</div>`],
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: FeatureListObject) => {
  return compiled.render({ model: args });
};

export const Default: StoryObj<FeatureListObject> = {
  render: Template,
  args: {
    features: [{ label: "Feature 1" }, { label: "Feature 2" }],
  },
};

export const WithIcon: StoryObj<FeatureListObject> = {
  render: Template,
  args: {
    features: [
      { label: "Feature 1", icon: "home" },
      { label: "Feature 2", icon: "home" },
    ],
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const WithTitle: StoryObj<FeatureListObject> = {
  render: Template,
  args: {
    features: [
      { label: "Feature 1", title: "title 1" },
      { label: "Feature 2", title: "title 2" },
    ],
  },
};

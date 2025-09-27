import template from "@/Components/Badge/index.twig?url";
import type { Meta, StoryObj } from "@storybook/html";
import type { BadgeModel } from "./model";
import { renderTwig } from "../../stories/utils";

const defaultData: BadgeModel = {
  type: "default",
  text: "Badge",
};

const meta: Meta<BadgeModel> = {
  title: "Components/Badge",
  tags: ["autodocs"],
  args: {
    ...defaultData,
  },
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["default", "red", "yellow", "green", "blue", "orange"],
    },
    text: { control: "text" },
  },
  decorators: [(Story) => `<div class="max-w-xs">${Story()}</div>`],
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: BadgeModel) => {
  return compiled.render({ model: args });
};

export const Light: StoryObj<BadgeModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: "default",
  },
};

export const Dark: StoryObj<BadgeModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: "default",
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const Orange: StoryObj<BadgeModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: "orange",
  },
};

export const OrangeDark: StoryObj<BadgeModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: "orange",
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

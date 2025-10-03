import template from "@/Components/Card/index.twig?url";
import type { Meta, StoryObj } from "@storybook/html";
import type { CardModel } from "./model";
import { renderTwig } from "../../stories/utils";

const defaultData: CardModel = {
  type: "icon",
  icon: "home",
  title: "Responsive",
  description: "Responsive, and mobile-first project on the web",
  actionButton: {
    type: "secondary",
    title: "Learn More",
    url: "#",
  },
  options: {
    align: "left",
    theme: "light",
  },
};

const meta: Meta<CardModel> = {
  title: "Components/Card",
  tags: ["autodocs"],
  args: {
    ...defaultData,
  },
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["icon", "image"],
    },
    icon: { control: "text" },
    image: { control: "object" },
    options: {
      control: "object",
    },
  },
  decorators: [(Story) => `<div class="max-w-xs">${Story()}</div>`],
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: CardModel) => {
  return compiled.render({ model: args });
};

export const WithIcon: StoryObj<CardModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: "icon",
    options: {
      align: "left",
      theme: "light",
    },
  },
};

export const Dark: StoryObj<CardModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: "icon",
    actionButton: undefined,
    options: {
      align: "left",
      theme: "dark",
    },
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const WithImage: StoryObj<CardModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: "image",
    icon: undefined,
    image: {
      src: "../stories/assets/logo.svg",
      alt: "Placeholder",
    },
    options: {
      align: "left",
      theme: "light",
    },
  },
};

export const CenterAligned: StoryObj<CardModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: "icon",
    options: {
      align: "center",
      theme: "light",
    },
  },
};
export const Mobile: StoryObj<CardModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: "icon",
    options: {
      align: "center",
      theme: "light",
    },
  },
};

export const WithBadge: StoryObj<CardModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: "icon",
    badge: {
      text: "Badge",
      type: "green",
    },
    options: {
      align: "left",
      theme: "light",
    },
  },
};

export const DarkWithBadge: StoryObj<CardModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: "icon",
    actionButton: undefined,
    badge: {
      text: "Badge",
      type: "green",
    },
    options: {
      align: "left",
      theme: "dark",
    },
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const WithFeatures: StoryObj<CardModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: "icon",
    features: [{ label: "Feature 1" }, { label: "Feature 2" }],
  },
};

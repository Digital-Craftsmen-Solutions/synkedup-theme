import template from "./index.twig?url";
import type { Meta, StoryObj } from "@storybook/html";
import type { SectionTeamModel } from "./model";
import { renderTwig } from "../../stories/utils";

const defaultData: SectionTeamModel = {
  heading: {
    before: "Our Team",
    description: "Meet the team that makes it all possible.",
    type: "h2",
  },
  team: [...Array(4)].map(() => ({
    name: "John Doe",
    role: "CEO",
    image: {
      src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      alt: "John Doe",
    },
  })),
  options: {
    theme: "light",
  },
};

const meta: Meta<SectionTeamModel> = {
  title: "Sections/Team",
  tags: ["autodocs"],
  args: {
    ...defaultData,
  },
  argTypes: {
    options: {
      control: "object",
    },
  },
};
export default meta;

const compiled = renderTwig(template);
const Template = (args: SectionTeamModel) => compiled.render({ model: args });

export const Light: StoryObj<SectionTeamModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      theme: "light",
    },
  },
};

export const Dark: StoryObj<SectionTeamModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: { ...defaultData.options, theme: "dark" },
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

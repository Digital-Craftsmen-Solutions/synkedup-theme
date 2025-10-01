import template from "./index.twig?url";
import type { Meta, StoryObj } from "@storybook/html";
import type { TeamModel } from "./model";
import { renderTwig } from "../../stories/utils";

const defaultData: TeamModel = {
  image: {
    src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    alt: "Avatar",
  },
  name: "John Doe",
  role: "CEO",
  options: {
    theme: "light",
  },
};

const meta: Meta<TeamModel> = {
  title: "Components/Team",
  tags: ["autodocs"],
  args: {
    ...defaultData,
  },
  argTypes: {
    options: {
      control: { type: "object" },
    },
  },
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: TeamModel) => compiled.render({ model: args });

export const Default: StoryObj<TeamModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: { ...defaultData.options },
  },
};

export const Dark: StoryObj<TeamModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: { ...defaultData.options, theme: "dark" },
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

import template from "@/Components/ButtonGroup/index.twig?url";
import type { Meta, StoryObj } from "@storybook/html";
import { type ButtonGroupModel } from "./model";
import { renderTwig } from "../../stories/utils";

const meta: Meta<ButtonGroupModel> = {
  title: "Components/ButtonGroup",
  tags: ["autodocs"],
  argTypes: {
    buttons: {
      control: "object",
    },
  },
  decorators: [(Story) => `<div class="min-w-sm text-center">${Story()}</div>`],
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: ButtonGroupModel) => {
  return compiled.render({ model: args });
};

export const Default: StoryObj<ButtonGroupModel> = {
  render: Template,
  args: {
    buttons: [
      {
        title: "Button 1",
        url: "#",
        isActive: true,
      },
      {
        title: "Button 2",
        url: "#",
      },
      {
        title: "Button 3",
        url: "#",
      },
      {
        title: "Button 4",
        url: "#",
      },
      {
        title: "Button 5",
        url: "#",
      },
    ],
  },
  parameters: {
    layout: "centered",
  },
};

import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionCompanyLogosModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: SectionCompanyLogosModel = {
  heading: {
    before: 'Trusted by leading',
    highlight: 'companies',
    after: '',
    type: 'h2',
    options: {
      theme: 'light',
      align: 'center',
      size: 'default'
    }
  },
  logos: [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      alt: 'Microsoft',
      width: 120,
      height: 48
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
      alt: 'Netflix',
      width: 120,
      height: 48
    },
    {
      src: '../../stories/assets/logo.svg',
      alt: 'Apple',
      width: 60,
      height: 48
    },
    {
      src: '../../stories/assets/logo.svg',
      alt: 'Spotify',
      width: 48,
      height: 48
    },
    {
      src: '../../stories/assets/logo.svg',
      alt: 'Spotify',
      width: 48,
      height: 48
    },
    {
      src: '../../stories/assets/logo.svg',
      alt: 'Spotify',
      width: 48,
      height: 48
    },
    {
      src: '../../stories/assets/logo.svg',
      alt: 'Spotify',
      width: 48,
      height: 48
    }
  ],
  options: {
    theme: 'light'
  }
};

const meta: Meta<SectionCompanyLogosModel> = {
  title: 'Sections/CompanyLogos',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    options: { control: 'object' }
  }
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: SectionCompanyLogosModel) => compiled.render({ model: args });

export const Light: StoryObj<SectionCompanyLogosModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

export const Dark: StoryObj<SectionCompanyLogosModel> = {
  render: Template,
  args: {
    ...defaultData,
    heading: {
      ...defaultData.heading,
      options: {
        ...defaultData.heading.options,
        theme: 'dark'
      }
    },
    options: {
      ...defaultData.options,
      theme: 'dark'
    }
  },
};
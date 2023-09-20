import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'body1',
        'subtitle1',
        'body2',
        'subtitle2',
        'caption',
        'overline',
        'link1',
        'link2',
      ],
      control: { type: 'radio' },
    },
    label: {
      control: 'text',
      description: 'Overwritten description',
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    variant: 'large',
    label: 'large title',
    as: 'h1',
  },
}

export const H1: Story = {
  args: {
    variant: 'h1',
    label: 'h1 title',
    as: 'h1',
  },
}

export const H2: Story = {
  args: {
    variant: 'h2',
    label: 'h2 title',
    as: 'h2',
  },
}

export const H3: Story = {
  args: {
    variant: 'h3',
    label: 'h3 title',
    as: 'h3',
  },
}

export const Body1: Story = {
  args: {
    variant: 'body1',
    label: 'body1 text',
  },
}

export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    label: 'subtitle1 title',
    as: 'h3',
  },
}

export const Body2: Story = {
  args: {
    variant: 'body2',
    label: 'body2 text',
  },
}

export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    label: 'subtitle2 title',
    as: 'h3',
  },
}

export const Caption: Story = {
  args: {
    variant: 'caption',
    label: 'caption text',
  },
}

export const Overline: Story = {
  args: {
    variant: 'overline',
    label: 'overline text',
  },
}

export const Link1: Story = {
  args: {
    variant: 'link1',
    label: 'link1 text',
    as: 'a',
    href: 'https://www.google.com',
    target: '_blank',
  },
}

export const Link2: Story = {
  args: {
    variant: 'link2',
    label: 'link2 text',
    as: 'a',
    href: 'https://www.google.com',
    target: '_blank',
  },
}

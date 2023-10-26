import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

import { TypographyVariant } from '@/common'

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
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    variant: TypographyVariant.large,
    children: 'large title',
    as: 'h1',
  },
}

export const H1: Story = {
  args: {
    variant: TypographyVariant.h1,
    children: 'h1 title',
    as: 'h1',
  },
}

export const H2: Story = {
  args: {
    variant: TypographyVariant.h2,
    children: 'h2 title',
    as: 'h2',
  },
}

export const H3: Story = {
  args: {
    variant: TypographyVariant.h3,
    children: 'h3 title',
    as: 'h3',
  },
}

export const Body1: Story = {
  args: {
    variant: TypographyVariant.body1,
    children: 'body1 text',
  },
}

export const Body2: Story = {
  args: {
    variant: TypographyVariant.body2,
    children: 'body2 text',
  },
}

export const Subtitle1: Story = {
  args: {
    variant: TypographyVariant.subtitle1,
    children: 'subtitle2 title',
    as: 'h3',
  },
}

export const Subtitle2: Story = {
  args: {
    variant: TypographyVariant.subtitle2,
    children: 'subtitle2 title',
    as: 'h3',
  },
}

export const Caption: Story = {
  args: {
    variant: TypographyVariant.caption,
    children: 'caption text',
  },
}

export const Overline: Story = {
  args: {
    variant: TypographyVariant.overline,
    children: 'overline text',
  },
}

export const Link1: Story = {
  args: {
    variant: TypographyVariant.link1,
    children: 'link1 text',
    as: 'a',
    href: 'https://www.google.com',
    target: '_blank',
  },
}

export const Link2: Story = {
  args: {
    variant: TypographyVariant.link2,
    children: 'link2 text',
    as: 'a',
    href: 'https://www.google.com',
    target: '_blank',
  },
}

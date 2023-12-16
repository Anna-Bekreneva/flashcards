import type { Meta, StoryObj } from '@storybook/react'

import { NotFound } from './'

import notFoundImg from '@/assets/images/not-found.png'
import { TypographyVariant } from '@/common'
import { Typography } from '@/components'

const meta = {
  title: 'Components/NotFound',
  component: NotFound,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NotFound>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <NotFound>
        <img src={notFoundImg} alt="Not found" width={400} height={200} />
        <Typography variant={TypographyVariant.h3}> Decks not found </Typography>
      </NotFound>
    )
  },
}

import { Meta, StoryObj } from '@storybook/react'

import { DropDownMenu, ItemType } from './'

import { EditIcon } from '@/assets/iconsComponents/edit.tsx'
import { SignOutIcon } from '@/assets/iconsComponents/signOut.tsx'
import { StartIcon } from '@/assets/iconsComponents/start.tsx'
import { UserPhoto } from '@/assets/iconsComponents/userPhoto.tsx'

const items: ItemType[] = [
  {
    icon: <UserPhoto />,
    extraValue: 'www@bbfghfdhfjgfjgfhjhgvv',
    value: 'Ivan',
  },
  {
    icon: <EditIcon />,
    value: 'edit',
  },
  {
    icon: <StartIcon />,
    value: 'learn',
  },
  {
    icon: <SignOutIcon />,
    value: 'sign out',
  },
]

const onItemSelect = (e: Event) => {
  console.log(e)
}

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
  argTypes: {
    items,
    onItemSelect,
    children: <UserPhoto />,
  },
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownMenuDefault: Story = {
  args: {
    items,
    onItemSelect,
    children: <UserPhoto />,
  },
}

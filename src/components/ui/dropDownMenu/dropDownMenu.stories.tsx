import { Meta, StoryObj } from '@storybook/react'

import userPhoto from '../../../assets/images/userPhoto.png'

import { DropDownMenu, ItemType } from './'

import { EditIcon } from '@/assets/iconsComponents/edit.tsx'
import { SignOutIcon } from '@/assets/iconsComponents/signOut.tsx'
import { StartIcon } from '@/assets/iconsComponents/start.tsx'

const items: ItemType[] = [
  {
    icon: <img src={userPhoto} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />,
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
    // triggerIMG: userPhoto,
    // alignType: 'start',
  },
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownMenuDefault: Story = {
  args: {
    items,
    onItemSelect,
    triggerIMG: userPhoto,
    alignType: 'start',
  },
}

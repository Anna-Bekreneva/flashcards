import { Meta, StoryObj } from '@storybook/react'

import { EditIcon } from '@/assets/iconsComponents/edit.tsx'
import { SignOutIcon } from '@/assets/iconsComponents/signOut.tsx'
import { StartIcon } from '@/assets/iconsComponents/start.tsx'
import userPhoto from '@/assets/images/userPhoto.png'
import { Button } from '@/components/ui/button'
import { DropDownMenu, ItemType } from '@/components/ui/dropDownMenu'
import Header from '@/components/ui/header/header.tsx'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const itemsForDropDown: ItemType[] = [
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

export const HeaderWithButton: Story = {
  args: {
    element: <Button>{'Sign In'}</Button>,
  },
}

export const HeaderWithDropDownMenu: Story = {
  args: {
    element: <DropDownMenu items={itemsForDropDown} triggerIMG={userPhoto} alignType={'end'} />,
    userName: 'Ivan',
  },
}

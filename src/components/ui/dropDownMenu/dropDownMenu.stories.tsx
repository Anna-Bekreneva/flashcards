import { Meta, StoryObj } from '@storybook/react'

import userPhoto from '../../../assets/images/userPhoto.png'

import { DropDownMenu } from './'

import { EditIcon } from '@/assets/iconsComponents/edit.tsx'
import { SignOutIcon } from '@/assets/iconsComponents/signOut.tsx'
import { TypographyVariant } from '@/common/types/types.ts'
import { DropDownItem } from '@/components/ui/dropDownMenu/dropDownItem.tsx'
import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
  argTypes: {
    align: {
      options: ['center', 'start', 'end'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>
export const DropDownMenuDefault: Story = {
  args: {
    align: 'center',
    trigger: (
      <img
        style={{ borderRadius: '50%', width: '36px', height: '36px', objectFit: 'cover' }}
        src={userPhoto}
        alt={'ava'}
      />
    ),
    children: (
      <>
        <DropDownItem>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              style={{ borderRadius: '50%', width: '36px', height: '36px', objectFit: 'cover' }}
              src={userPhoto}
              alt={'ava'}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography style={{}} variant={TypographyVariant.subtitle2} as={'span'}>
                Ivan
              </Typography>
              <Typography
                style={{ color: '#808080' }}
                variant={TypographyVariant.caption}
                as={'span'}
              >
                j&johnson@gmail.com
              </Typography>
            </div>
          </div>
        </DropDownItem>
        <DropDownItem>
          <Typography
            as={'button'}
            type={'button'}
            variant={TypographyVariant.caption}
            style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
          >
            <EditIcon /> My Profile
          </Typography>
        </DropDownItem>
        <DropDownItem>
          <Typography
            as={'button'}
            type={'button'}
            variant={TypographyVariant.caption}
            style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
          >
            <SignOutIcon /> Sign Out
          </Typography>
        </DropDownItem>
      </>
    ),
  },
}

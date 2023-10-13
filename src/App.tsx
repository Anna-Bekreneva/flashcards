import userPhoto from '../src/assets/images/userPhoto.png'

import { EditIcon } from '@/assets/iconsComponents/edit.tsx'
import { SignOutIcon } from '@/assets/iconsComponents/signOut.tsx'
import { TypographyVariant } from '@/common/types/types.ts'
import { DropDownMenu } from '@/components/ui/dropDownMenu'
import { DropDownItem } from '@/components/ui/dropDownMenu/dropDownItem.tsx'
import { Typography } from '@/components/ui/typography'

export function App() {
  return (
    <div style={{ margin: '230px' }}>
      <DropDownMenu trigger={'Test'} align={'center'}>
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
      </DropDownMenu>
    </div>
  )
}

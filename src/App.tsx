import { EditIcon } from '@/assets/iconsComponents/edit.tsx'
import { SignOutIcon } from '@/assets/iconsComponents/signOut.tsx'
import { StartIcon } from '@/assets/iconsComponents/start.tsx'
import userPhoto from '@/assets/images/userPhoto.png'
import { Button } from '@/components/ui/button'
import { DropDownMenu, ItemType } from '@/components/ui/dropDownMenu'
import Header from '@/components/ui/header/header.tsx'

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

export function App() {
  return (
    <div>
      Hello
      <div>
        <Header element={<Button>{'Sign In'}</Button>} />
      </div>
      <div>
        <Header
          userName={'Ivan'}
          element={<DropDownMenu items={items} triggerIMG={userPhoto} alignType={'end'} />}
        />
      </div>
    </div>
  )
}

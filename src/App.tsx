import userPhoto from '../src/assets/images/userPhoto.png'

import { EditIcon } from '@/assets/iconsComponents/edit.tsx'
import { SignOutIcon } from '@/assets/iconsComponents/signOut.tsx'
import { StartIcon } from '@/assets/iconsComponents/start.tsx'
import { DropDownMenu, ItemType } from '@/components/ui/dropDownMenu'

const items: ItemType[] = [
  {
    icon: <img src={userPhoto} />,
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

export function App() {
  return (
    <div>
      Hello
      <div style={{ margin: '230px' }}>
        <DropDownMenu
          items={items}
          onItemSelect={onItemSelect}
          alignType={'end'}
          triggerIMG={userPhoto}
        />
      </div>
    </div>
  )
}

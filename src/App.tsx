import { useState } from 'react'

import { ButtonVariant } from '@/common/types/types.ts'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'

export function App() {
  const [isOpen, setIsOpen] = useState(false)
  const onOpenChange = (isOpen: boolean) => setIsOpen(isOpen)

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Open modal</Button>
      <Modal className={'testModal'} isOpen={isOpen} onOpenChange={onOpenChange} overlay>
        <div style={{ padding: '18px 24px 36px' }}>
          <Typography>
            Do you really want to remove Card Name? All cards will be deleted.
          </Typography>
          <footer
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              paddingTop: '20px',
            }}
          >
            <Button variant={ButtonVariant.secondary} type={'button'}>
              Cancel
            </Button>
            <Button type={'button'}>Delete Card</Button>
          </footer>
        </div>
      </Modal>
    </>
  )
}

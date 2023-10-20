import { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button/button'

import { Modal } from './'

import { ButtonVariant } from '@/common/types/types.ts'
import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    close: { type: 'boolean' },
    title: { type: 'string' },
    open: { type: 'boolean', defaultValue: true },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalDefault: Story = {
  render: args => {
    return (
      <Modal {...args}>
        <div style={{ padding: '18px 24px 36px' }}>
          <Typography>
            Do you really want to remove Card Name? All cards will be deleted.{' '}
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
    )
  },
}

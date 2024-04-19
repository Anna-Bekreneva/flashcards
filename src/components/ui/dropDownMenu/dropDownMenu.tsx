import { ElementRef, forwardRef, ReactNode } from 'react'

import * as RadixDropDownMenu from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import { AnimatePresence, motion } from 'framer-motion'

import s from './dropDownMenu.module.scss'

type DropDownMenuPropsType = DropdownMenuContentProps & {
  trigger: ReactNode
  align?: 'center' | 'start' | 'end'
  className?: string
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

export const DropDownMenu = forwardRef<
  ElementRef<typeof RadixDropDownMenu.Root>,
  DropDownMenuPropsType
>(({ className, align = 'center', trigger, open, onOpenChange, children, ...props }, ref?) => {
  const contentClassName = `${s.content} ${s[align]} ${className ? className : ''}`

  const dropIn = {
    exit: {
      opacity: 0,
      height: 0,
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
    visible: {
      opacity: 1,
      height: 'auto',
    },
  }

  return (
    <RadixDropDownMenu.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        <RadixDropDownMenu.Trigger asChild>{trigger}</RadixDropDownMenu.Trigger>
        {open && (
          <RadixDropDownMenu.Portal forceMount>
            <RadixDropDownMenu.Content
              className={contentClassName}
              asChild
              forceMount
              align={align}
              ref={ref}
              {...props}
            >
              <motion.div
                style={{ overflow: 'hidden' }}
                animate={'visible'}
                exit={'exit'}
                initial={'hidden'}
                variants={dropIn}
              >
                {children}
              </motion.div>
            </RadixDropDownMenu.Content>
          </RadixDropDownMenu.Portal>
        )}
      </AnimatePresence>
    </RadixDropDownMenu.Root>
  )
})

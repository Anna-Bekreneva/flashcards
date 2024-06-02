import { ElementRef, forwardRef, ReactNode } from 'react'

import * as RadixDialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'

import s from './modal.module.scss'

import { TypographyVariant } from '@/common'
import { Card, Typography } from '@/components'

type Props = {
  className?: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title?: string
  close?: boolean
  overlay?: boolean
  children: ReactNode
}

export const Modal = forwardRef<ElementRef<typeof RadixDialog.Content>, Props>(
  ({ className, isOpen, onOpenChange, title, close = true, overlay = true, children }, ref?) => {
    const dropIn = {
      exit: {
        opacity: 0,
        x: '-50%',
        y: '-100%',
      },
      hidden: {
        opacity: 0,
        x: '-50%',
        y: '-100%',
      },
      visible: {
        opacity: 1,
        x: '-50%',
        y: '-50%',
      },
    }

    return (
      <RadixDialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <AnimatePresence>
          {isOpen && (
            <RadixDialog.Portal forceMount>
              {overlay && (
                <RadixDialog.Overlay className={s.overlay} asChild>
                  <motion.div
                    animate={{ opacity: 1 }}
                    className={s.overlay}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                  />
                </RadixDialog.Overlay>
              )}
              <RadixDialog.Content className={`${s.modal} ${className}`} forceMount asChild>
                <motion.div animate={'visible'} exit={'exit'} initial={'hidden'} variants={dropIn}>
                  <Card className={s.content} ref={ref}>
                    {(title || close) && (
                      <header className={s.header}>
                        {title && (
                          <Typography as={'span'} variant={TypographyVariant.h2}>
                            {title}
                          </Typography>
                        )}
                        {close && (
                          <RadixDialog.Close asChild>
                            <button
                              className={s.close}
                              type={'button'}
                              aria-label={'Close modal'}
                            />
                          </RadixDialog.Close>
                        )}
                      </header>
                    )}
                    {children}
                  </Card>
                </motion.div>
              </RadixDialog.Content>
            </RadixDialog.Portal>
          )}
        </AnimatePresence>
      </RadixDialog.Root>
    )
  }
)

// export const Modal = forwardRef<ElementRef<typeof RadixDialog.Content>, Props>(
//   ({ className, isOpen, onOpenChange, title, close = true, overlay = true, children }, ref?) => {
//     const modalClasName = `${s.modal} ${className ? className : ''}`
//
//     const dropIn = {
//       exit: {
//         opacity: 0,
//         y: '100vh',
//       },
//       hidden: {
//         opacity: 0,
//         x: '-50%',
//         y: '-100vh',
//       },
//       visible: {
//         opacity: 1,
//         transition: {
//           damping: 25,
//           duration: 0.1,
//           stiffness: 500,
//           type: 'spring',
//         },
//         x: '-50%',
//         y: '-50%',
//       },
//     }
//
//     const content = (
//       <RadixDialog.Content asChild forceMount>
//         <motion.div
//           className={modalClasName}
//           animate={'visible'}
//           exit={'exit'}
//           initial={'hidden'}
//           variants={dropIn}
//         >
//           <Card className={s.content} as={RadixDialog.Content} ref={ref}>
//             {(title || close) && (
//               <header className={s.header}>
//                 {title && (
//                   <Typography as={'span'} variant={TypographyVariant.h2}>
//                     {title}
//                   </Typography>
//                 )}
//                 {close && (
//                   <RadixDialog.Close asChild>
//                     <button className={s.close} type={'button'} aria-label={'Close modal'} />
//                   </RadixDialog.Close>
//                 )}
//               </header>
//             )}
//             {children}
//           </Card>
//         </motion.div>
//       </RadixDialog.Content>
//     )
//
//     return (
//       <RadixDialog.Root open={isOpen} onOpenChange={onOpenChange}>
//         <AnimatePresence>
//           {isOpen && (
//             <RadixDialog.Portal forceMount>
//               {overlay && (
//                 <RadixDialog.Overlay asChild>
//                   <motion.div
//                     animate={{ opacity: 1 }}
//                     className={s.overlay}
//                     exit={{ opacity: 0 }}
//                     initial={{ opacity: 0 }}
//                   />
//                 </RadixDialog.Overlay>
//               )}
//               {content}
//             </RadixDialog.Portal>
//           )}
//         </AnimatePresence>
//       </RadixDialog.Root>
//     )
//   }
// )

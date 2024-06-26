export const TypographyVariant = {
  large: 'large',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body1: 'body1',
  subtitle1: 'subtitle1',
  body2: 'body2',
  subtitle2: 'subtitle2',
  caption: 'caption',
  overline: 'overline',
  link1: 'link1',
  link2: 'link2',
} as const

export const ButtonVariant = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  link: 'link',
} as const

export const DecksTabsVariant = {
  myCards: 'my',
  allCards: 'all',
} as const

export type DecksTabsVariantType = (typeof DecksTabsVariant)[keyof typeof DecksTabsVariant]

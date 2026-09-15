export type MenuLink = {
  label: string
  route: string
}

export type Tab = {
  id: string
  label: string
  icon?: string
}

export type MenuItem = {
  id: string
  number: string
  label: string
  route: string
  tab: string
  description?: string
  link?: MenuLink
}

export type MenuData = {
  tabs: Tab[]
  items: MenuItem[]
}

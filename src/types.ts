export type MenuLink = {
  label: string
  route: string
}

export type MenuItem = {
  id: string
  number: string
  label: string
  route: string
  description?: string
  link?: MenuLink
}

export type MenuData = {
  items: MenuItem[]
}

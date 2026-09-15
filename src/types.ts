export type MenuItem = {
  id: string
  number: string
  label: string
  route: string
  description?: string
}

export type MenuData = {
  items: MenuItem[]
}

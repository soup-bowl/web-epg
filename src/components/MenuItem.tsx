import type { MenuItem as MenuItemData } from '../types.ts'
import './MenuItem.css'

type MenuItemProps = {
  item: MenuItemData
  selected: boolean
  onHover: () => void
  onActivate: () => void
}

export default function MenuItem({ item, selected, onHover, onActivate }: MenuItemProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      className={`menu-item${selected ? ' is-selected' : ''}`}
      onMouseEnter={onHover}
      onClick={onActivate}
    >
      <span className="menu-item__number">{item.number}</span>
      <span className="menu-item__label">{item.label}</span>
    </button>
  )
}

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MenuItem as MenuItemData } from '../types.ts'
import MenuItem from './MenuItem.tsx'
import './MenuList.css'

type MenuListProps = {
  items: MenuItemData[]
}

export default function MenuList({ items }: MenuListProps) {
  const navigate = useNavigate()
  const listRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const activeIndex = items.length === 0 ? 0 : Math.min(selectedIndex, items.length - 1)

  useEffect(() => {
    listRef.current?.focus()
  }, [items])

  const activate = (item: MenuItemData) => {
    navigate(item.route, {
      state: { label: item.label, description: item.description, link: item.link },
    })
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (items.length === 0) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex((index) => (index + 1) % items.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedIndex((index) => (index - 1 + items.length) % items.length)
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      const item = items[activeIndex]
      if (item) {
        activate(item)
      }
    }
  }

  return (
    <div
      ref={listRef}
      className="menu-list"
      role="listbox"
      aria-label="Channel categories"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {items.map((item, index) => (
        <MenuItem
          key={item.id}
          item={item}
          selected={index === activeIndex}
          onHover={() => setSelectedIndex(index)}
          onActivate={() => activate(item)}
        />
      ))}
    </div>
  )
}

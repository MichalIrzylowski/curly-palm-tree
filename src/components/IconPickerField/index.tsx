'use client'

import { icons } from 'lucide-react'
import { useField } from '@payloadcms/ui'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'

type IconEntry = {
  name: string
  Component: LucideIcon
}

const toKebab = (pascal: string) =>
  pascal.replace(/([A-Z])/g, (m, c, i) => (i ? '-' : '') + c.toLowerCase())

const allIcons: IconEntry[] = Object.entries(icons).map(([pascal, Component]) => ({
  name: toKebab(pascal),
  Component: Component as LucideIcon,
}))

type Props = {
  path: string
}

export function IconPickerField({ path }: Props) {
  const { value, setValue } = useField<string>({ path })
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [highlighted, setHighlighted] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(
    () =>
      search ? allIcons.filter((i) => i.name.includes(search.toLowerCase())) : allIcons,
    [search],
  )

  const selectedIcon = useMemo(
    () => (value ? allIcons.find((i) => i.name === value) ?? null : null),
    [value],
  )

  const handleOpen = useCallback(() => {
    setSearch('')
    setHighlighted(0)
    setOpen(true)
  }, [])

  const handleSelect = useCallback(
    (name: string) => {
      setValue(name)
      setOpen(false)
    },
    [setValue],
  )

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setValue('')
      setOpen(false)
    },
    [setValue],
  )

  useEffect(() => {
    if (open) searchRef.current?.focus()
  }, [open])

  useEffect(() => {
    setHighlighted(0)
  }, [search])

  useEffect(() => {
    const item = listRef.current?.children[highlighted] as HTMLElement | undefined
    item?.scrollIntoView({ block: 'nearest' })
  }, [highlighted])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlighted((h) => Math.min(h + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlighted((h) => Math.max(h - 1, 0))
      } else if (e.key === 'Enter' && filtered[highlighted]) {
        e.preventDefault()
        handleSelect(filtered[highlighted].name)
      }
    },
    [open, filtered, highlighted, handleSelect],
  )

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'relative', maxWidth: '360px' }}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          padding: '8px 12px',
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: '4px',
          background: 'var(--theme-elevation-0)',
          color: 'var(--theme-text)',
          cursor: 'pointer',
          fontSize: '14px',
          textAlign: 'left',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {selectedIcon ? (
            <>
              <selectedIcon.Component size={18} />
              <span>{selectedIcon.name}</span>
            </>
          ) : (
            <span style={{ color: 'var(--theme-elevation-400)' }}>Wybierz ikonę…</span>
          )}
        </span>
        {selectedIcon && (
          <span
            role="button"
            onClick={handleClear}
            title="Wyczyść"
            style={{
              fontSize: '16px',
              lineHeight: 1,
              color: 'var(--theme-elevation-400)',
              cursor: 'pointer',
            }}
          >
            ×
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            background: 'var(--theme-elevation-0)',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '4px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            marginTop: '4px',
            overflow: 'hidden',
          }}
        >
          {/* Search */}
          <div
            style={{ padding: '8px', borderBottom: '1px solid var(--theme-elevation-100)' }}
          >
            <input
              ref={searchRef}
              type="text"
              placeholder="Szukaj ikony…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: '4px',
                background: 'var(--theme-elevation-0)',
                color: 'var(--theme-text)',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Count */}
          <div
            style={{
              padding: '4px 12px',
              fontSize: '11px',
              color: 'var(--theme-elevation-400)',
              borderBottom: '1px solid var(--theme-elevation-100)',
            }}
          >
            {filtered.length} ikon
          </div>

          {/* List */}
          <ul
            ref={listRef}
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              maxHeight: '280px',
              overflowY: 'auto',
            }}
          >
            {filtered.map(({ name, Component }, idx) => {
              const isSelected = value === name
              const isHighlighted = idx === highlighted
              return (
                <li
                  key={name}
                  onClick={() => handleSelect(name)}
                  onMouseEnter={() => setHighlighted(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '7px 12px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    background: isSelected
                      ? 'var(--theme-success-100, #d1fae5)'
                      : isHighlighted
                        ? 'var(--theme-elevation-50, rgba(0,0,0,0.04))'
                        : 'transparent',
                    color: 'var(--theme-text)',
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  <Component size={18} style={{ flexShrink: 0 }} />
                  <span>{name}</span>
                  {isSelected && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontSize: '12px',
                        color: 'var(--theme-success-500)',
                      }}
                    >
                      ✓
                    </span>
                  )}
                </li>
              )
            })}
            {filtered.length === 0 && (
              <li
                style={{
                  padding: '12px',
                  color: 'var(--theme-elevation-400)',
                  fontSize: '13px',
                }}
              >
                Brak wyników
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

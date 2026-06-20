import { useEffect, useRef } from 'react'

export type Shortcut = {
  key: string
  ctrl?: boolean
  shift?: boolean
  handler: () => void
  skipInInput?: boolean
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  const shortcutsRef = useRef(shortcuts)

  useEffect(() => {
    shortcutsRef.current = shortcuts
  })

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const active = document.activeElement
      const isInput =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        (active instanceof HTMLElement && active.isContentEditable)

      for (const sc of shortcutsRef.current) {
        if (isInput && sc.skipInInput !== false) continue

        const ctrlActual = e.ctrlKey || e.metaKey
        const ctrlMatch = sc.ctrl === undefined ? true : ctrlActual === sc.ctrl
        const shiftMatch = sc.shift === undefined ? true : e.shiftKey === sc.shift
        const keyMatch = e.key.toLowerCase() === sc.key.toLowerCase()

        if (keyMatch && ctrlMatch && shiftMatch) {
          e.preventDefault()
          sc.handler()
          return
        }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
}

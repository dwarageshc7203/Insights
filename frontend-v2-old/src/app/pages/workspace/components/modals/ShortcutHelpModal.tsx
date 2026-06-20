import Modal from '@/app/components/ui/Modal'

const SHORTCUTS = [
  { keys: ['⌘', 'N'], description: 'Create workspace' },
  { keys: ['⌘', '⇧', 'N'], description: 'Create canvas' },
  { keys: ['⌘', 'K'], description: 'Focus search' },
  { keys: ['⌫'], description: 'Delete selected (canvas)' },
  { keys: ['Esc'], description: 'Close modal / dismiss' },
  { keys: ['?'], description: 'Show keyboard shortcuts' },
]

type Props = {
  open: boolean
  onClose: () => void
}

export default function ShortcutHelpModal({ open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="Keyboard shortcuts">
      <div className="space-y-1">
        {SHORTCUTS.map((sc) => (
          <div
            key={sc.description}
            className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0"
          >
            <span className="text-sm text-neutral-600">{sc.description}</span>
            <div className="flex items-center gap-1">
              {sc.keys.map((k) => (
                <kbd
                  key={k}
                  className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 text-[11px] font-mono font-semibold bg-neutral-100 border border-neutral-200 rounded-md text-neutral-600"
                >
                  {k}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}

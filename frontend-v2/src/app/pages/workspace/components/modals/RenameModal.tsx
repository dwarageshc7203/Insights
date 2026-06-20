import { useState, useEffect, type FormEvent } from 'react'
import Modal from '@/app/components/ui/Modal'
import Button from '@/app/components/ui/Button'
import type { RenameTarget } from '@/app/pages/workspace/workspaceTypes'

type Props = {
  open: boolean
  onClose: () => void
  target: RenameTarget | null
  onRename: (id: string, type: 'workspace' | 'canvas', name: string) => void
}

export default function RenameModal({ open, onClose, target, onRename }: Props) {
  const [name, setName] = useState('')

  useEffect(() => {
    if (open && target) setName(target.name)
  }, [open, target])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !target) return
    onRename(target.id, target.type, name.trim())
    onClose()
  }

  const label = target?.type === 'workspace' ? 'Workspace name' : 'Canvas name'
  const title = target?.type === 'workspace' ? 'Rename workspace' : 'Rename canvas'

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="rename-input" className="block text-xs font-medium text-neutral-700 mb-1.5">
            {label}
          </label>
          <input
            id="rename-input"
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            maxLength={48}
          />
        </div>
        <div className="flex gap-2.5 pt-1">
          <Button variant="outline" type="button" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={!name.trim() || name === target?.name}
            className="flex-1"
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}

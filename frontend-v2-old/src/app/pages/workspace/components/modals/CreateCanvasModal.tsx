import { useState, type FormEvent } from 'react'
import Modal from '@/app/components/ui/Modal'
import Button from '@/app/components/ui/Button'

type Props = {
  open: boolean
  onClose: () => void
  workspaceId: number | null
  workspaceName: string
  onCreate: (workspaceId: number, name: string) => void
}

export default function CreateCanvasModal({
  open,
  onClose,
  workspaceId,
  workspaceName,
  onCreate,
}: Props) {
  const [name, setName] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !workspaceId) return
    onCreate(workspaceId, name.trim())
    setName('')
    onClose()
  }

  const handleClose = () => {
    setName('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="New canvas"
      description={workspaceName ? `Adding to "${workspaceName}"` : undefined}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="canvas-name" className="block text-xs font-medium text-neutral-700 mb-1.5">
            Canvas name
          </label>
          <input
            id="canvas-name"
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Wireframes"
            className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 focus:bg-white transition-colors placeholder:text-neutral-400"
            maxLength={48}
          />
        </div>
        <div className="flex gap-2.5 pt-1">
          <Button variant="outline" type="button" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={!name.trim() || !workspaceId}
            className="flex-1"
          >
            Create canvas
          </Button>
        </div>
      </form>
    </Modal>
  )
}

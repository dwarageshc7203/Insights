import { useState, type FormEvent } from 'react'
import Modal from '@/app/components/ui/Modal'
import Button from '@/app/components/ui/Button'

type Props = {
  open: boolean
  onClose: () => void
  onCreate: (name: string) => void
}

export default function CreateWorkspaceModal({ open, onClose, onCreate }: Props) {
  const [name, setName] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onCreate(name.trim())
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
      title="New workspace"
      description="Create a workspace to organize your canvases."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ws-name" className="block text-xs font-medium text-neutral-700 mb-1.5">
            Workspace name
          </label>
          <input
            id="ws-name"
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Product Design"
            className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 focus:bg-white transition-colors placeholder:text-neutral-400"
            maxLength={48}
          />
        </div>
        <div className="flex gap-2.5 pt-1">
          <Button variant="outline" type="button" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={!name.trim()} className="flex-1">
            Create workspace
          </Button>
        </div>
      </form>
    </Modal>
  )
}

import * as Dialog from '@radix-ui/react-dialog'

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'workspace' | 'canvas' | null;
}

export default function DeleteConfirmationModal({ open, onClose, onConfirm, type }: Props) {
  if (!type) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl w-full max-w-sm p-6 z-[101]">
          <Dialog.Title className="text-lg font-semibold text-neutral-900 mb-2">
            {type === 'workspace' ? 'Delete Workspace?' : 'Delete Canvas?'}
          </Dialog.Title>
          <p className="text-sm text-neutral-500 mb-6">
            This action is irreversible.
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

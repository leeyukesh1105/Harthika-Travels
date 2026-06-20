import React from 'react';
import Modal from './Modal';

export default function ConfirmDialog({ title = 'Are you sure?', message, onConfirm, onCancel, confirmLabel = 'Delete' }) {
  return (
    <Modal title={title} onClose={onCancel} maxWidth="max-w-sm">
      <p className="text-ink/70 text-sm">{message}</p>
      <div className="flex gap-3 mt-6">
        <button
          onClick={onCancel}
          className="flex-1 rounded-full border border-ink/15 text-ink font-semibold py-2.5 hover:bg-ink/5 transition-colors focus-ring"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 rounded-full bg-sunset text-white font-semibold py-2.5 hover:bg-sunset-dark transition-colors focus-ring"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

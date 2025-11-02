import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, isLoading }) => {
  const { t } = useTranslations();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-red-600">{t('deleteAccountConfirmTitle')}</h2>
        <p className="text-gray-700 mb-6">
          {t('deleteAccountConfirmMessage')}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            {t('cancel')}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed w-36"
          >
            {isLoading ? t('deleting') : t('deleteAccountConfirmButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

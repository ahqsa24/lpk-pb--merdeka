import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isDanger?: boolean;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    isDanger = false,
    confirmText = "Confirm",
    cancelText = "Cancel"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-200">
                <div className="p-6 text-center">
                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${isDanger ? 'bg-red-100' : 'bg-yellow-100'} mb-4`}>
                        <FaExclamationTriangle className={`h-8 w-8 ${isDanger ? 'text-red-600' : 'text-yellow-600'}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-500 mb-6">{message}</p>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={onClose}
                            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2.5 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`${isDanger
                                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'} 
                                text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-sm focus:ring-2 focus:ring-offset-2`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    isOpen: boolean;
    onClose: () => void;
    duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
    message,
    type = 'info',
    isOpen,
    onClose,
    duration = 4000
}) => {
    const [progress, setProgress] = useState(100);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (isOpen && duration > 0) {
            setProgress(100);
            setIsExiting(false);

            // Progress bar animation
            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    const newProgress = prev - (100 / (duration / 50));
                    return newProgress > 0 ? newProgress : 0;
                });
            }, 50);

            // Auto close timer
            const timer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => {
                    onClose();
                }, 300); // Wait for exit animation
            }, duration);

            return () => {
                clearTimeout(timer);
                clearInterval(progressInterval);
            };
        }
    }, [isOpen, duration, onClose]);

    if (!isOpen) return null;

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const getConfig = () => {
        switch (type) {
            case 'success':
                return {
                    icon: <FaCheckCircle className="text-2xl" />,
                    bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
                    borderColor: 'border-green-300',
                    iconColor: 'text-green-600',
                    progressColor: 'bg-green-500',
                    shadowColor: 'shadow-green-200/50'
                };
            case 'error':
                return {
                    icon: <FaExclamationCircle className="text-2xl" />,
                    bgColor: 'bg-gradient-to-r from-red-50 to-rose-50',
                    borderColor: 'border-red-300',
                    iconColor: 'text-red-600',
                    progressColor: 'bg-red-500',
                    shadowColor: 'shadow-red-200/50'
                };
            case 'warning':
                return {
                    icon: <FaExclamationTriangle className="text-2xl" />,
                    bgColor: 'bg-gradient-to-r from-yellow-50 to-amber-50',
                    borderColor: 'border-yellow-300',
                    iconColor: 'text-yellow-600',
                    progressColor: 'bg-yellow-500',
                    shadowColor: 'shadow-yellow-200/50'
                };
            default:
                return {
                    icon: <FaInfoCircle className="text-2xl" />,
                    bgColor: 'bg-gradient-to-r from-blue-50 to-cyan-50',
                    borderColor: 'border-blue-300',
                    iconColor: 'text-blue-600',
                    progressColor: 'bg-blue-500',
                    shadowColor: 'shadow-blue-200/50'
                };
        }
    };

    const config = getConfig();

    return (
        <div
            className={`fixed top-4 right-4 z-[100] transition-all duration-300 ${isExiting
                    ? 'opacity-0 translate-x-full scale-95'
                    : 'opacity-100 translate-x-0 scale-100'
                }`}
        >
            <div
                className={`
                    relative overflow-hidden
                    flex items-start gap-4 
                    px-5 py-4 rounded-xl border-2
                    ${config.bgColor} ${config.borderColor} ${config.shadowColor}
                    shadow-xl backdrop-blur-sm
                    min-w-[320px] max-w-md
                    transform transition-all duration-300
                    hover:scale-[1.02]
                `}
            >
                {/* Icon */}
                <div className={`${config.iconColor} flex-shrink-0 mt-0.5`}>
                    {config.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 leading-relaxed break-words">
                        {message}
                    </p>
                </div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-700 transition-colors p-1 hover:bg-white/50 rounded-lg"
                    aria-label="Close notification"
                >
                    <FaTimes className="text-sm" />
                </button>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30">
                    <div
                        className={`h-full ${config.progressColor} transition-all duration-50 ease-linear`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

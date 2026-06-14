'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from "react-dom";
import useModal from '../../hooks/use-modal';
import VinRequestModal from '../../features/vin-request/ui/VinRequestModal';
import SearchModal from '../../features/search/ui/SearchModal';

const ModalRoot = () => {
    const { isOpen, type, closeModal } = useModal();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeModal]);
    
    if (!mounted || !isOpen) return null;
    
    const modalContent = (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow-lg min-w-[400px]"
                >
                    <div className="flex justify-end">
                        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                            Close
                        </button>
                    </div>
                    {type === 'example' && <div>Example Modal Content</div>}
                    {type === 'vinRequest' && <VinRequestModal />}
                    {type === 'search' && <SearchModal />}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    return createPortal(
        modalContent,
        document.body as HTMLElement
    )
}

export default ModalRoot
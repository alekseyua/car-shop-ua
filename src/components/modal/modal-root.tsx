'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from "react-dom";
import useModal from '../../hooks/use-modal';
import VinRequestModal from '../../features/vin-request/ui/VinRequestModal';
import SearchModal from '../../features/search/ui/SearchModal';
import GarageModal from '@/src/features/garage/ui/GarageModal';
import VehicleModal from '@/src/features/vehicleFilters/ui/VehicleModal';
import Image from 'next/image';
import iconCross from '../../shared/assets/icons/iconCross.svg';

const ModalRoot = () => {
    const { isOpen, type, visible, closeModal } = useModal();
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
                className={
                    visible === 'right'
                        ? "fixed inset-0 bg-black/50 z-50"
                        : "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"}
                onClick={closeModal}
            >
                <motion.div
                    initial={
                        visible === 'right'
                            ? { x: "100%" }
                            : { scale: 0.8, opacity: 0 }
                        }
                    animate={
                        visible === 'right'
                            ? {x: 0}
                            : { scale: 1, opacity: 1 }
                        }
                    exit={
                        visible === 'right'
                            ? { x: "100%" }
                            : { scale: 0.8, opacity: 0 }
                        }
                    transition={
                        visible === 'right'
                            ? {
                                duration: 0.3,
                                ease: "easeInOut",
                                }
                            : { duration: 0.3 }
                        }
                    className={
                        visible === 'right'
                            ? "fixed top-0 right-0 h-full w-full md:absolute md:right-0 md:top-0 md:h-full md:w-1/3 md:min-w-[400px] bg-white shadow-xl p-6"
                            : "relative bg-white p-6 rounded-lg shadow-lg min-w-[400px]"
                        }
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute top-4 right-4">
                        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
                            <Image 
                                src={iconCross}
                                alt='icon-cross'
                                width={35}
                                height={35}
                                className='w-[35px] h-[35px]'
                            />
                        </button>
                    </div>
                    {type === 'example' && <div>Example Modal Content</div>}
                    {type === 'vinRequest' && <VinRequestModal />}
                    {type === 'search' && <SearchModal />}
                    {type === 'garage' && <GarageModal />}
                    {type === 'vehicle' && <VehicleModal />}
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
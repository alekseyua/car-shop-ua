'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import useModal from '../../hooks/use-modal';
import VinRequestModal from '../../features/vin-request/ui/VinRequestModal';
import SearchModal from '../../features/search/ui/SearchModal';
import GarageModal from '@/src/features/garage/ui/GarageModal';
import Image from 'next/image';
import iconCross from '../../shared/assets/icons/iconCross.svg';
import AddVehicle from '@/src/features/vehicleFilters/ui/AddVehicle';
import ListGarage from '@/src/features/garage/ui/ListGarage';
import MenuAccessories from '@/src/widgets/catalogAccessories/ui/MenuAccessories';
import MobileMenuContact from '@/src/widgets/header/ui/MobileMenuContact';
import CatalogSidebar from '@/src/widgets/catalog/ui/CatalogSidebar';

const ModalRoot = () => {
    const { isOpen, openModal, type, visible, closeModal, isActive } = useModal();
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

    React.useEffect(() => {
        if (!isOpen) return;

        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    React.useEffect(() => {
      console.log({ isActive, type, openModal, visible });
      if (isActive && type) {
        openModal({ type, visible });
      }
    }, [isActive, type, openModal, visible]);

    if (!mounted || !isOpen) return null;

    const isRight = visible === 'right';
    const isLeft = visible === 'left';
    const isSideModal = isRight || isLeft;

    const modalContent = (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={
            isSideModal
              ? "fixed inset-0 bg-black/50 z-250"
              : "fixed inset-0 bg-black/50 flex items-center justify-center z-250 p-2 sm:p-4"
          }
          onClick={closeModal}
        >
          <motion.div
            initial={
              isRight
                ? { x: "100%" }
                : isLeft
                  ? { x: "-100%" }
                  : { scale: 0.8, opacity: 0 }
            }
            animate={isRight || isLeft ? { x: 0 } : { scale: 1, opacity: 1 }}
            exit={
              isRight
                ? { x: "100%" }
                : isLeft
                  ? { x: "-100%" }
                  : { scale: 0.8, opacity: 0 }
            }
            transition={
              isRight || isLeft
                ? {
                    duration: 0.3,
                    ease: "easeInOut",
                  }
                : {
                    duration: 0.3,
                  }
            }
            className={
              isRight
                ? `
                                fixed
                                top-0
                                right-0
                                h-dvh
                                w-full
                                sm:w-2/3
                                md:w-2/3
                                lg:w-1/3
                                md:min-w-[400px]
                                bg-white
                                shadow-xl
                                p-4
                                sm:p-6
                                overflow-y-auto
                            `
                : isLeft
                  ? `
                                fixed
                                top-0
                                left-0
                                h-dvh
                                w-full
                                sm:w-2/3
                                md:w-2/3
                                lg:w-1/3
                                md:min-w-[400px]
                                bg-white
                                shadow-xl
                                p-4
                                sm:p-6
                                overflow-y-auto
                            `
                  : `
                                relative
                                bg-white
                                w-full
                                max-w-[600px]
                                max-h-[calc(100dvh-16px)]
                                sm:max-h-[calc(100dvh-32px)]
                                p-4
                                sm:p-6
                                rounded-lg
                                shadow-lg
                                overflow-y-auto
                            `
            }
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close button */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-210">
              <button
                onClick={closeModal}
                className="
                                flex
                                items-center
                                justify-center
                                text-gray-500
                                hover:text-gray-700
                                cursor-pointer
                            "
                type="button"
                aria-label="Close modal"
              >
                <Image
                  src={iconCross}
                  alt="icon-cross"
                  width={35}
                  height={35}
                  className="w-7 h-7 sm:w-[35px] sm:h-[35px]"
                />
              </button>
            </div>

            {/* Content */}
            {type === "example" && <div>Example Modal Content</div>}

            {type === "vinRequest" && <VinRequestModal />}

            {type === "search" && <SearchModal />}

            {type === "garage" && <GarageModal />}

            {type === "vehicle" && <AddVehicle />}

            {type === "vehicle-list" && <ListGarage />}

            {type === "accessories-menu" && <MenuAccessories />}

            {type === "mobile-contact-menu" && <MobileMenuContact />}
            {type === "menu-catalog" && <CatalogSidebar />}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );

    return createPortal(
        modalContent,
        document.body
    );
};

export default ModalRoot;

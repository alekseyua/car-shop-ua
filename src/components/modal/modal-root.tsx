"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";

import useModal from "../../hooks/use-modal";
import VinRequestModal from "../../features/vin-request/ui/VinRequestModal";
import SearchModal from "../../features/search/ui/SearchModal";
import GarageModal from "@/src/features/garage/ui/GarageModal";
import Image from "next/image";
import iconCross from "../../shared/assets/icons/iconCross.svg";
import AddVehicle from "@/src/features/vehicleFilters/ui/AddVehicle";
import ListGarage from "@/src/features/garage/ui/ListGarage";
import MenuAccessories from "@/src/entities/catalogAccessories/ui/MenuAccessories";
import MobileMenuContact from "@/src/widgets/header/ui/MobileMenuContact";
import CartModal from "@/src/features/cart/ui/CartModal";
import CatalogSidebar from "@/src/entities/catalog/ui/CatalogSidebar";
import PdfViewer from "@/src/entities/PdfViewer/ui/PdfViewer";
import { RegistrationRequiredModal } from "@/src/features/auth-by-email/ui/registration-required-modal/registration-required-modal";

const ModalRoot = () => {
  const { isOpen, openModal, type, visible, closeModal, isActive } = useModal();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // ESC
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  // Запрещаем scroll body
  React.useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // Синхронизация состояния modal
  React.useEffect(() => {
    if (isActive && type) {
      openModal({
        type,
        visible,
      });
    }
  }, [isActive, type, openModal, visible]);

  if (!mounted || !isOpen) {
    return null;
  }

  const isRight = visible === "right";
  const isLeft = visible === "left";
  const isTop = visible === "top";
  const isTopTop = visible === "top_top";

  const isSideModal = isRight || isLeft;

  /*
   * ---------------------------------------------------
   * BACKDROP
   * ---------------------------------------------------
   */

  const backdropClassName =
    isSideModal || isTopTop
      ? `
          fixed
          inset-0
          bg-black/50
          z-[1550]
        `
      : `
          fixed
          inset-0
          bg-black/50
          flex
          items-center
          justify-center
          z-[1550]
          p-2
          sm:p-4
        `;

  /*
   * ---------------------------------------------------
   * MODAL ANIMATION
   * ---------------------------------------------------
   */

  const initialAnimation = isRight
    ? {
        x: "100%",
      }
    : isLeft
      ? {
          x: "-100%",
        }
      : isTop || isTopTop
        ? {
            y: "-100%",
            opacity: 0,
          }
        : {
            scale: 0.8,
            opacity: 0,
          };

  const animateAnimation =
    isRight || isLeft
      ? {
          x: 0,
        }
      : isTop || isTopTop
        ? {
            y: 0,
            opacity: 1,
          }
        : {
            scale: 1,
            opacity: 1,
          };

  const exitAnimation = isRight
    ? {
        x: "100%",
      }
    : isLeft
      ? {
          x: "-100%",
        }
      : isTop || isTopTop
        ? {
            y: "-100%",
            opacity: 0,
          }
        : {
            scale: 0.8,
            opacity: 0,
          };

  /*
   * ---------------------------------------------------
   * MODAL TRANSITION
   * ---------------------------------------------------
   */

  const transition =
    isRight || isLeft || isTop || isTopTop
      ? {
          duration: 0.3,
          ease: "easeInOut" as const,
        }
      : {
          duration: 0.3,
        };

  /*
   * ---------------------------------------------------
   * MODAL CLASS
   * ---------------------------------------------------
   */

  const modalClassName = isRight
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
        relative
          fixed
          top-0
          left-0
          h-dvh
          w-full
          sm:w-2/3
          lg:w-1/3
          md:w-1/3
          md:min-w-[400px]
          bg-white
          shadow-xl
          p-4
          sm:p-6
          overflow-y-auto
        `
      : isTopTop
        ? `
        relative
            fixed
            top-4
            left-1/2
            -translate-x-1/2
            w-[calc(100%-16px)]
            max-w-[600px]
            max-h-[calc(100dvh-32px)]
            bg-white
            p-4
            sm:p-6
            rounded-lg
            shadow-lg
            overflow-y-auto
          `
        : `
            relative
            bg-white
            w-full
            max-w-[calc(100dvw-20px)]
            sm:max-w-[calc(100dvw-100px)]

            max-h-[calc(100dvh-16px)]
            sm:max-h-[calc(100dvh-32px)]
            p-4
            sm:p-6
            rounded-lg
            shadow-lg
            overflow-y-auto
          `;

  /*
   * ---------------------------------------------------
   * MODAL
   * ---------------------------------------------------
   */

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={backdropClassName}
        onClick={closeModal}
      >
        <motion.div
          initial={initialAnimation}
          animate={animateAnimation}
          exit={exitAnimation}
          transition={transition}
          className={modalClassName}
          onClick={(event) => event.stopPropagation()}
        >
          {/* -------------------------------------------
              CLOSE BUTTON
          ------------------------------------------- */}

          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[210]">
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

          {/* -------------------------------------------
              CONTENT
          ------------------------------------------- */}

          {type === "example" && <div>Example Modal Content</div>}

          {type === "vinRequest" && <VinRequestModal />}

          {type === "search" && <SearchModal />}

          {type === "garage" && <GarageModal />}

          {type === "vehicle" && <AddVehicle />}

          {type === "vehicle-list" && <ListGarage />}

          {type === "accessories-menu" && <MenuAccessories />}

          {type === "mobile-contact-menu" && <MobileMenuContact />}

          {type === "menu-catalog" && <CatalogSidebar />}

          {type === "cart" && <CartModal />}

          {type === "pdf" && <PdfViewer />}

          {type === "please_registration" && <RegistrationRequiredModal />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ModalRoot;

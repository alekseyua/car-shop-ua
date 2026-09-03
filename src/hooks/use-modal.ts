import {create} from 'zustand';

interface ModalState {
  isOpen: boolean;
  openModal: ({
    type,
    visible,
    isActive,
  }: {
    type: string;
    visible?: "center" | "right" | "left";
    isActive?: boolean;
  }) => void;
  closeModal: () => void;
  type: string | null;
  isActive: boolean;
  visible: "center" | "right" | "left";
  setType: (type: string) => void;
}

const useModal = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  visible: "center",
  isActive: false,
  openModal: ({ type, visible, isActive }) =>
    set({ type, isOpen: true, visible: visible ? visible : "center", isActive }),
  closeModal: () => set({ isOpen: false, type: null }),
  setType: (type) => set({ type }),
}));

export default useModal;
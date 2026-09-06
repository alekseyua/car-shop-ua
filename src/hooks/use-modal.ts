import {create} from 'zustand';

type Visible = "center" | "right" | "left" | "top" | "top_top";

interface ModalState {
  isOpen: boolean;
  openModal: ({
    type,
    visible,
    isActive,
  }: {
    type: string;
    visible?: Visible;
    isActive?: boolean;
  }) => void;
  closeModal: () => void;
  type: string | null;
  isActive: boolean;
  visible: Visible;
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
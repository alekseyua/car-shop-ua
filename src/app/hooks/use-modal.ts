import {create} from 'zustand';

interface ModalState {
    isOpen: boolean;
    openModal: (type: string) => void;
    closeModal: () => void;
    type: string | null;
    setType: (type: string) => void;
}

const useModal = create<ModalState>((set) => ({
    isOpen: false,
    type: null,
    openModal: (type: string) => set({type,isOpen: true}),
    closeModal: () => set({isOpen: false, type: null}),
    setType: (type) => set({type}),
}));

export default useModal;
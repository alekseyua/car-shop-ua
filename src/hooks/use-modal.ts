import {create} from 'zustand';

interface ModalState {
    isOpen: boolean;
    openModal: ({type, visible}: {type: string, visible?:  'center' | 'right'}) => void;
    closeModal: () => void;
    type: string | null;
    visible: 'center' | 'right';
    setType: (type: string) => void;
}

const useModal = create<ModalState>((set) => ({
    isOpen: false,
    type: null,
    visible: 'center',
    openModal: ({type, visible}) => set({type,isOpen: true, visible: visible? visible : 'center'}),
    closeModal: () => set({isOpen: false, type: null}),
    setType: (type) => set({type}),
}));

export default useModal;
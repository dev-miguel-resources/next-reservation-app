import { create } from "zustand";
import { LoginModalStore } from "./interfaces/loginModal.interface";

const useLoginModal = create<LoginModalStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;

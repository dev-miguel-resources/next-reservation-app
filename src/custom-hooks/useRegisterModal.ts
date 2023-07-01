import { create } from "zustand";
import RegisterModalStore from "./interfaces/registerModal.interface";

const useRegisterModal = create<RegisterModalStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;

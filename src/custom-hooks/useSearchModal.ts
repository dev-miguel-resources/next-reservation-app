import { create } from "zustand";
import { ISearchModalStore } from "./interfaces/searchModal.interface";

const useSearchModal = create<ISearchModalStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;

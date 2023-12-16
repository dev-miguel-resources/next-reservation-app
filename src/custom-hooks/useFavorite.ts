import axios from "axios";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { IUseFavorite } from "./interfaces/favorite.interface";

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favoriteIds || [];

		return list.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) {
				return loginModal.onOpen();
			}

			try {
				let request;

				if (hasFavorited) {
					request = () => axios.delete(`/api/favorites/${listingId}`);
				} else {
					request = () => axios.post(`/api/favorites/${listingId}`);
				}
				await request();
				router.refresh();
				toast.success("Proceso exitoso.");
			} catch (error) {
				toast.error("Algo ha ocurrido.");
			}
		},
		[currentUser, hasFavorited, listingId, loginModal, router],
	);

	return {
		hasFavorited,
		toggleFavorite,
	};
};

import EmptyState from "@atoms/emptyState/EmptyState";
import ClientProcessor from "@atoms/clientProcessor/ClientProcessor";
import FavoritesClient from "./FavoritesClient";

import getCurrentUser from "@molecules/serverActions/getCurrentUser";
import getFavoriteListings from "@molecules/serverActions/getFavoriteListings";

const ListingPage = async () => {

	const listings = await getFavoriteListings();
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<ClientProcessor>
				<EmptyState
					title="No se encontraron favoritos"
					subtitle="Parece que no tienes listado ningún favorito."
				/>
			</ClientProcessor>
		)
	}

	return (
		<ClientProcessor>
			<FavoritesClient
				listings={listings}
				currentUser={currentUser}
			/>
		</ClientProcessor>
	)
}

export default ListingPage;

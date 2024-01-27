import EmptyState from "@atoms/emptyState/EmptyState";
import ClientProcessor from "@atoms/clientProcessor/ClientProcessor";
import TripsClient from "./TripsClient";

import getCurrentUser from "@molecules/serverActions/getCurrentUser";
import getReservations from "@molecules/serverActions/getReservations";

const TripsPage = async () => {

	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientProcessor>
				<EmptyState
					title="No autorizado"
					subtitle="Por favor inicie sesión."
				/>
			</ClientProcessor>
		)
	}

	const reservations = await getReservations({ userId: currentUser.id });

	if (reservations.length === 0) {
		return (
			<ClientProcessor>
				<EmptyState
					title="No viajes encontrados"
					subtitle="Parece que no has reservado ningún viaje."
				/>
			</ClientProcessor>
		);
	}

	return (
		<ClientProcessor>
			<TripsClient
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientProcessor>
	)
}

export default TripsPage;

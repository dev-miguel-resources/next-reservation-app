import EmptyState from "@atoms/emptyState/EmptyState";
import ClientProcessor from "@atoms/clientProcessor/ClientProcessor";
//import TripsClient from "@molecules/trips/TripsClient";
import ReservationsClient from "./ReservationsClient";

import getReservations from "@molecules/serverActions/getReservations";
import getCurrentUser from "@molecules/serverActions/getCurrentUser";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientProcessor>
        <EmptyState title="No Autorizado." subtitle="Por favor inicie sesión." />
      </ClientProcessor>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientProcessor>
        <EmptyState
          title="No se han encontrado reservaciones"
          subtitle="Parece que no tienes reservas sobre tus propiedades."
        />
      </ClientProcessor>
    );
  }

  return (
    <ClientProcessor>
      <ReservationsClient reservations={reservations} currentUser={currentUser} />
    </ClientProcessor>
  );
};

export default ReservationsPage;

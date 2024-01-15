
import getCurrentUser from "@molecules/serverActions/getCurrentUser";
import getListingById from "@molecules/serverActions/getListingById";
import getReservations from "@molecules/serverActions/getReservations";

import ClientProcessor from "@atoms/clientProcessor/ClientProcessor";
import EmptyState from "@atoms/emptyState/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientProcessor>
        <EmptyState />
      </ClientProcessor>
    );
  }

  return (
    <ClientProcessor>
      <ListingClient
			listing={listing}
			reservations={reservations}
			currentUser={currentUser}
      />
    </ClientProcessor>
  );
}

export default ListingPage;

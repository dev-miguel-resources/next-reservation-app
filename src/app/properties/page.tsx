import EmptyState from "@atoms/emptyState/EmptyState";
import ClientProcessor from "@atoms/clientProcessor/ClientProcessor";
import PropertiesClient from "./PropertiesClient";

import getListings from "@molecules/serverActions/getListings";
import getCurrentUser from "@molecules/serverActions/getCurrentUser";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientProcessor>
        <EmptyState title="No autorizado" subtitle="Por favor inicie sesión" />
      </ClientProcessor>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientProcessor>
        <EmptyState title="No se encontraron propiedades" subtitle="Parece que no tienes propiedades." />
      </ClientProcessor>
    );
  }

  return (
	<ClientProcessor>
		<PropertiesClient
			listings={listings}
			currentUser={currentUser}
		/>
	</ClientProcessor>
  )
};

export default PropertiesPage;

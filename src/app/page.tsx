import Container from "@atoms/container/Container";
import ListingCard from "@atoms/listings/ListingCard";
import EmptyState from "@atoms/emptyState/EmptyState";

import getListings from "@/app/serverActions/getListings";
import { IListingsParams } from "@/app/serverActions/interfaces/listingsParams.interface";

import getCurrentUser from "@/app/serverActions/getCurrentUser";
import ClientProcessor from "@atoms/clientProcessor/ClientProcessor";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {

  const currentUser = await getCurrentUser();

  const searchParamsData: IListingsParams = {
	userId: currentUser?.id,
	guestCount: searchParams.guestCount,
	bathroomCount: searchParams.bathroomCount,
	category: searchParams.category,
	endDate: searchParams.endDate,
	locationValue: searchParams.locationValue,
	roomCount: searchParams.roomCount,
	startDate: searchParams.startDate
	};

	const listings = await getListings(searchParamsData);


  if (listings.length === 0) {
    return (
      <ClientProcessor>
        <EmptyState showReset />
      </ClientProcessor>
    );
  }

  return (
    <ClientProcessor>
      <Container>
        <div
          className="
            pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing: any) => (
            <ListingCard currentUser={currentUser} key={listing.id} data={listing} />
          ))}
        </div>
      </Container>
    </ClientProcessor>
  );
};

export default Home;

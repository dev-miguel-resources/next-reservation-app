/*import Container from "@molecules/container/Container";
import ClientProcessor from "@molecules/clientProcessor/ClientProcessor";
import ListingCard from "@molecules/listings/ListingCard";
import EmptyState from "@molecules/emptyState/EmptyState";

import getListings from "./serverActions/getListings";
import { IListingsParams } from "./serverActions/interfaces/listingsParams.interface";
import getCurrentUser from "./serverActions/getCurrentUser";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = ({ searchParams }: HomeProps) => {
  //const listings = await getListings(searchParams);
  // const currentUser = await getCurrentUser();
  // pendiente

  /*if (listings.length === 0) {
		return (
			<ClientProcessor>
				<EmptyState />
			</ClientProcessor>
		)
	}

  return <Container>Hello am Home!</Container>;}*/

const Home = () => {
  return (
	 <div>
		Hello am Home!
	 </div>
  )
}

export default Home



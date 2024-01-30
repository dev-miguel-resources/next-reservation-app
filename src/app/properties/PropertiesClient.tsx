"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

import Container from "@atoms/container/Container";
import Heading from "@atoms/heading/Heading";
import ListingCard from "@atoms/listings/ListingCard";

import { SafeListing, SafeUser } from "@molecules/types";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings, currentUser }) => {
  const [deletingId, setDeletingId] = useState("");
  const router = useRouter();

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listing/${id}`)
        .then(() => {
          toast.success("Alquiler eliminado");
          router.refresh();
        })
        .catch(error => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router],
  );

  return (
    <Container>
      <Heading title="Propiedades" subtitle="Lista de tus propiedades" />
      <div
        className="
			mt-10
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
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Eliminar propiedad"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;

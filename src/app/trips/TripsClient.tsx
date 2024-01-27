"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import Heading from "@atoms/heading/Heading";
import Container from "@atoms/container/Container";
import ListingCard from "@atoms/listings/ListingCard";

import { SafeReservation, SafeUser } from "@molecules/types";

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations, currentUser }) => {
  const [deletingId, setDeletingId] = useState("");
  const router = useRouter();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reserva cancelada");
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
      <Heading title="Viajes" subtitle="Donde has estado y hacia donde vas" />
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
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancelar reservación"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;

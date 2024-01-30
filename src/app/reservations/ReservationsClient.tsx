"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

import Container from "@atoms/container/Container";
import Heading from "@atoms/heading/Heading";
import ListingCard from "@atoms/listings/ListingCard";

import { SafeReservation, SafeUser } from "@molecules/types";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({ reservations, currentUser }) => {
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
        .catch(() => {
          toast.error("Algo ha ocurrido.");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router],
  );

  return (
    <Container>
      <Heading title="Reservaciones" subtitle="Reservas de sus propiedades" />
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
            actionLabel="Cancelar reserva"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";

import Container from "@atoms/container/Container";
import ListingHead from "@atoms/listings/ListingHead";
import ListingInfo from "@atoms/listings/ListingInfo";
import ListingReservation from "@atoms/listings/ListingReservation";

import useLoginModal from "@custom-hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@molecules/types";
import { categories } from "@atoms/categories/Categories/constants/categories";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, reservations = [], currentUser }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  useEffect(() => {}, []); // por completar

  const category = useMemo(() => {
    return categories.find(items => items.label === listing.category);
  }, [listing.category]);

  const disabledDates = () => {}; // por completar

  const onCreateReservation = () => {}; // por completar

  return (
    <Container>
      <div
        className="
					max-w-screen-lg
					mx-auto
				"
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="

						"
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div
              className="
								order-first
								mb-10
								md:order-last
								md:col-span-3
							"
            >
              <ListingReservation />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;

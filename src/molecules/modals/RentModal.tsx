"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Heading from "@molecules/heading/Heading";
import Input from "@molecules/inputs/Input";
import useRentModal from "@custom-hooks/useRentModal";
import { STEPS } from "./enum/rentSteps.enum";
import { categories } from "@molecules/categories/Categories/constants/categories";
import CategoryInput from "@molecules/inputs/CategoryInput";
import CountrySelect from "@molecules/inputs/CountrySelect";
import Counter from "@molecules/inputs/Counter";
import ImageUpload from "@molecules/inputs/ImageUpload";

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
	 handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const location = watch("location");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: unknown) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const actionLabel = useMemo(() => {
    // memorizar el valor del step
    // valor del step
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Siguiente";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    // memorizar el valor del step
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Atrás";
  }, [step]);

  const onBack = () => {
    setStep(value => value - 1);
  };

  const onNext = () => {
    setStep(value => value + 1);
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("@molecules/Map/Map"), {
        ssr: false,
      }),
    [],
  );

  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listing", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Cuál de estas describe mejor tu lugar?" subtitle="Selecciona una categoría" />
      <div
        className="
			grid
			grid-cols-1
			md:grid-cols-2
			gap-3
			max-h-[50vh]
			overflow-y-auto
		 "
      >
        {categories.map(item => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={category => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Dónde está ubicado tu lugar?" subtitle="Ayúdanos a encontrarte!" />
        <CountrySelect value={location} onChange={value => setCustomValue("location", value)} />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Comparte algunos conceptos básicos sobre tu lugar." subtitle="¿Qué comodidades tienes?" />
        <Counter
          onChange={value => setCustomValue("guestCount", value)}
          value={guestCount}
          title="Huéspedes"
          subtitle="¿Cuántos huéspedes permites?"
        />
        <hr />
        <Counter
          onChange={value => setCustomValue("roomCount", value)}
          value={roomCount}
          title="Habitaciones"
          subtitle="¿Cuántas habitaciones tienes?"
        />
        <hr />
        <Counter
          onChange={value => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Baños"
          subtitle="¿Cuántas baños tienes?"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Agrega una foto de tu lugar" subtitle="Muestra a los huéspedes como luce tu lugar" />
        <ImageUpload onChange={value => setCustomValue("imageSrc", value)} value={imageSrc} />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Cómo describirías tu lugar?" subtitle="Describe de manera breve y lo mejor posible!" />
        <Input id="title" label="title" disabled={isLoading} register={register} errors={errors} required />
        <hr />
        <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Ahora, define el valor" subtitle="Cuánto es el cargo por noche?" />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb tu casa!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;

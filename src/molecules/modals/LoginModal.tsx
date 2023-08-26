"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "@molecules/modals/Modal";
import Heading from "@molecules/heading/Heading";
import Input from "@molecules/inputs/Input";
import Button from "@molecules/button/Button";
import useLoginModal from "@custom-hooks/useLoginModal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // init form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then(callback => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Usuario  logueado");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bienvenido de vuelta" subtitle="Inicia sesión con tu cuenta!" />
      <Input id="email" label="Correo" disabled={isLoading} register={register} errors={errors} required />
      <Input
        id="password"
        label="Contraseña"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continúa con Google" icon={FcGoogle} onClick={() => {}} />
      <div
        className="
					text-neutral-500
					text-center
					mt-4
					font-light
				"
      >
        <div
          className="
						justify-center flex flex-row items-center gap-2
					"
        >
          <div
            onClick={loginModal.onClose}
            className="
							text-neutral-500
							cursor-pointer
							hover:underline
						"
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Iniciar Sesión"
      actionLabel="Continúa"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;

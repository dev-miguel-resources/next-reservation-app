"use client";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "@atoms/modals/Modal";
import Heading from "@atoms/heading/Heading";
import Input from "@atoms/inputs/Input";
import Button from "@atoms/buttons/Button";
import useLoginModal from "@custom-hooks/useLoginModal";
import useRegisterModal from "@custom-hooks/useRegisterModal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
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

  const onToogle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

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
      <Button outline label="Continúa con Google" icon={FcGoogle} onClick={() => signIn("google")} />
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
          <div>Primera vez ocupando Airbnb?</div>
          <div
            onClick={onToogle}
            className="
							text-neutral-500
							cursor-pointer
							hover:underline
						"
          >
            Crea una cuenta
          </div>
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

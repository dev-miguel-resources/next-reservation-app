"use client";
import { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import Avatar from "@atoms/avatar/Avatar";
import MenuItem from "@atoms/menuItem/MenuItem";
import useRegisterModal from "@custom-hooks/useRegisterModal";
import useLoginModal from "@custom-hooks/useLoginModal";
import { UserMenuProps } from "./interfaces/userMenuProps.interface";
import useRentModal from "@custom-hooks/useRentModal";

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const rentModal = useRentModal();

  const toogleOpen = useCallback(() => {
    setIsOpen(value => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
						hidden
						md:block
						text-sm
						font-semibold
						py-3
						px-4
						rounded-full
						hover:bg-neutral-100
						transition
						cursor-pointer
					"
        >
          Pon tu espacio en Airbnb
        </div>
        <div
          onClick={toogleOpen}
          className="
					p-4
					md:py-1
					md: px-2
					border-[1px]
					border-neutral-100
					flex
					flex-row
					items-center
					gap-3
					rounded-full
               cursor-pointer
					hover:shadow-md
					transition
				"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
					absolute
					rounded-xl
					shadow-md
					w-[40vw]
					md:w-3/4
					bg-white
					overflow-hidden
					right-0
					top-12
					text-sm
				"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="Mis viajes" onClick={() => {}} />
                <MenuItem label="Mis favoritos" onClick={() => {}} />
                <MenuItem label="Mis reservas" onClick={() => {}} />
                <MenuItem label="Mis propiedades" onClick={() => {}} />
                <MenuItem label="Airbnb tu casa" onClick={rentModal.onOpen} />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem onClick={registerModal.onOpen} label="Regístrate" />
                <MenuItem onClick={loginModal.onOpen} label="Iniciar Sesión" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

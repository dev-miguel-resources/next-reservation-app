"use client";
import Container from "@atoms/container/Container";
import Logo from "@atoms/logo/Logo";
import Search from "@atoms/search/Search";
import UserMenu from "@atoms/userMenu/UserMenu";
import Categories from "@atoms/categories/Categories/Categories";
import { NavbarProps } from "./interfaces/navbarProps.interface";

// Design Pattern Stateful/Stateless
// Stateless
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => (
  <div className="fixed w-full bg-white z-10 shadow-sm">
    <div className="py-4 border-b-[1px]">
      <Container>
        <div
          className="
							flex
							flex-row
							items-center
							justify-between
							gap-3
							md-gap-0
						"
        >
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
    <Categories />
  </div>
);

export default Navbar;

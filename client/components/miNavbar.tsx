"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Button,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React from "react";

import SvgLista from "./SvgLista";


export default function MiNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <Navbar isBlurred isBordered onMenuOpenChange={setIsMenuOpen}>
              <NavbarContent>
              <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <div className="flex items-center justify-center gap-2">
              <SvgLista />
              <p className="font-bold">todo-app</p>
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-20" justify="center">
          <NavbarItem>
            <Button className="font-bold" size="md" radius="lg" color="primary">Cerrar sesión</Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem>
            <Button className="font-bold" color="primary" size="md" radius="lg"  variant="shadow">
              Cerrar sesión
              <div></div>
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
}

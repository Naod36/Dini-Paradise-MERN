"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";
import { useState } from "react";
<<<<<<< HEAD

=======
import { useLocation } from "react-router-dom";
>>>>>>> f502a8653b903797caad2a904a1ef771c89443b5
export default function NavbarDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Gallery",
      link: "/gallery",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
<<<<<<< HEAD

=======
  const location = useLocation();

  const shouldHideButton = location.pathname === "/itemMenu";
>>>>>>> f502a8653b903797caad2a904a1ef771c89443b5
  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
<<<<<<< HEAD
          {/* <div className="flex items-center gap-4"> */}
          {/* <NavbarButton variant="secondary">Login</NavbarButton> */}
          <NavbarButton variant="primary">View Menu</NavbarButton>
          {/* </div> */}
=======
          {/* 4. Conditionally render the Desktop button */}
          {!shouldHideButton && (
            // NOTE: In RRD, you should ideally use <Link> for navigation,
            // but keeping 'href' if NavbarButton handles it internally
            <NavbarButton variant="primary" href="/itemMenu">
              View Menu
            </NavbarButton>
          )}
>>>>>>> f502a8653b903797caad2a904a1ef771c89443b5
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
                href="/itemMenu"
              >
                View Menu
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* Navbar */}
    </div>
  );
}

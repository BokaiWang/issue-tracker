"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const pathname = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      {links.map((link) => (
        <Link
          className={classNames("hover:text-zinc-800", "transition-colors", {
            "text-zinc-500": link.href !== pathname,
            "text-zinc-900": link.href === pathname,
          })}
          key={link.href}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;

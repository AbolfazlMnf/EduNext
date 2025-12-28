"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import AuthNav from "./authNav/authNav";
import logo from "../../assets/images/logo.png";
import Image from "next/image";
function Navbar() {
  const pathName = usePathname();

  const links = [
    {
      title: "home",
      link: "/",
    },
    {
      title: "courses",
      link: "/courses",
    },
    {
      title: "contact us",
      link: "/contactUs",
    },
    {
      title: "blogs",
      link: "/blogs",
    },
  ];
  return (
    <div className="flex items-center md:justify-between sticky top-0 z-50 gap-5 py-6  ">
      <div className="flex items-center gap-3 ">
        <h1 className="text-2xl font-bold ">EduNext</h1>
      </div>
      <div className="flex items-center justify-start gap-7 ">
        {links.map((items, index) => (
          <Link
            href={items.link}
            key={index}
            className={`  ${
              pathName == items.link
                ? "font-bold border-b-2 border-b-blue-400 text-md "
                : ""
            }   `}
          >
            {items.title}
          </Link>
        ))}
        <AuthNav />
      </div>
    </div>
  );
}

export default Navbar;

"use client"; // Add this directive at the top of the file

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Slide } from "react-awesome-reveal";
import Link from 'next/link';
import { UserAuth } from "@/context/authContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {user, logOut} = UserAuth();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = async () =>{
    try {
      toggleMenu();
      await logOut()
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={`tracking-wider w-full p-4 fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-blue-500" : "bg-blue-500"
      } text-white`}
    >
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold hover:scale-105 transition-transform">
          AppName
        </div>
        <button
          onClick={toggleMenu}
          className="lg:hidden relative flex items-center justify-center w-10 h-10"
        >
          <svg
            className={`ham hamRotate ham4 ${isOpen ? "active" : ""}`}
            viewBox="0 0 100 100"
            width="50"
            height="50"
          >
            <path
              className="line top black"
              d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
              stroke="black"
              fill="none"
            />
            <path
              className="line middle black"
              d="m 70,50 h -40"
              stroke="black"
              fill="none"
            />
            <path
              className="line bottom black"
              d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
              stroke="black"
              fill="none"
            />
          </svg>
        </button>
        <ul className="hidden lg:flex space-x-6">
          <li className="hover:scale-110 transition-transform">
            <Link href="/" className="text-white">
              Home
            </Link>
          </li>
          <li className="hover:scale-110 transition-transform">
            <Link href="/how-it-works" className="text-white">
              How it Works
            </Link>
          </li>
          {user?.displayName ?  (
          <li className="hover:scale-110 transition-transform">
            <div className="text-white" onClick={handleLogOut}>
              Logout
            </div>
          </li>): (
          <li className="hover:scale-110 transition-transform">
            <Link href="/login" className="text-white">
              Log In
            </Link>
          </li>)}

        </ul>
      </div>
      <div
        className={`${
          isOpen ? "max-h-screen pb-4" : "max-h-0"
        } overflow-hidden lg:hidden transition-all duration-500`}
      >
        <ul className="mt-4 space-y-2 text-white">
          <Slide direction="down" duration={300}>
            <li>
              <Link href="/" className="block px-4 py-2" onClick={toggleMenu}>
                Home
              </Link>
            </li>
          </Slide>
          <Slide direction="down" duration={300}>
            <li>
              <Link href="/how-it-works" className="block px-4 py-2" onClick={toggleMenu}>
                How it Works
              </Link>
            </li>
          </Slide>
          {user ? (
          <Slide direction="down" duration={300}>
            <li>
              <div onClick={handleLogOut} className="block px-4 py-2">
                LogOut
              </div>
            </li>
          </Slide>):(
          <Slide direction="down" duration={300}>
            <li>
              <Link href="/login" className="block px-4 py-2" onClick={toggleMenu}>
                Log In
              </Link>
            </li>
          </Slide>)}
        </ul>
      </div>
    </nav>
  );
};

export default Header;

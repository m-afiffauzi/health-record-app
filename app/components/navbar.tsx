"use client";
import Link from "next/link";
import Logout from "./logout";
import { useSession } from "next-auth/react";
import { BiHome, BiLogIn, BiUserCircle, BiGroup } from "react-icons/bi";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="navbar sticky top-0 left-0 right-0 bg-primary text-primary-content md:px-10 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-primary rounded-box w-40"
          >
            <li>
              <Link href={`/`} className="text-base">
                <BiHome /> Beranda
              </Link>
            </li>
            <li>
              <Link href={`/patient`} className="text-base">
                <BiGroup /> Pasien
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href={`/`} className="btn btn-ghost normal-case text-xl">
          Data Pasien
        </Link>
      </div>
      <div className="navbar-end">
        {session?.user?.name === undefined || null ? (
          <Link
            href={`/login`}
            className="btn btn-ghost rounded-box capitalize text-base"
          >
            <BiLogIn /> Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost rounded-box fill-white"
            >
              <div className="flex flex-row justify-center items-center gap-2 text-base">
                <BiUserCircle />
                <p className="capitalize">{session?.user?.name}</p>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content mt-3 z-[1] menu p-2 shadow bg-primary rounded-box w-40"
            >
              <li>
                <Logout />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

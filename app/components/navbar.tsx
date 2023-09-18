"use client";
import { useSession } from "next-auth/react";
import { BiHome, BiLogIn, BiUserCircle, BiGroup } from "react-icons/bi";
import Link from "next/link";
import Logout from "./logout";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="navbar flex items-center justify-center fixed top-0 left-0 right-0 bg-primary text-primary-content z-10">
      <div className="w-full flex justify-between sm:w-[640px] md:w-[750px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1440px] px-2">
        <div className="navbar-start w-auto">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex items-center justify-start">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="btn btn-ghost btn-circle drawer-button"
              >
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
              <Link
                href={`/`}
                className="btn btn-sm btn-ghost normal-case font-bold"
              >
                Data Pasien
              </Link>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content gap-2">
                {/* Sidebar content here */}
                <p className="text-xl font-bold ms-1">Menu</p>
                <li>
                  <Link
                    href={`/`}
                    className="btn btn-sm hover:bg-base-100 btn-primary capitalize justify-start"
                  >
                    <BiHome />
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/patient`}
                    className="btn btn-sm hover:bg-base-100 btn-primary capitalize justify-start"
                  >
                    <BiGroup />
                    Pasien
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="navbar-end w-auto">
          {session?.user?.name === undefined || null ? (
            <Link
              href={`/login`}
              className="btn btn-sm btn-ghost fill-white capitalize text-base"
            >
              <BiLogIn /> Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-sm btn-ghost fill-white">
                <div className="flex flex-row justify-center items-center gap-2 text-md">
                  <div className="avatar placeholder">
                    <div className="w-6 rounded-full">
                      <BiUserCircle className="text-2xl" />
                    </div>
                  </div>
                  <p className="capitalize">{session?.user?.name}</p>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content mt-4 z-[1] menu p-2 shadow-2xl border border-black/20 bg-base-200 rounded-xl w-32"
              >
                <li>
                  <Logout />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

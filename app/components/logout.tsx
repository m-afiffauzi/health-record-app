import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import toast from "react-hot-toast";

export default function Logout() {
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    signOut({ callbackUrl: "/" });
    toast.success("Logout berhasil");
  };
  return (
    <button
      id="logout"
      aria-label="logout"
      onClick={handleLogout}
      className="p-1 text-base"
    >
      <BiLogOut /> Logout
    </button>
  );
}

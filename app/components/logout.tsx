import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import toast from "react-hot-toast";

export default function Logout() {
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    signOut();
    toast.success("Logout berhasil");
  };
  return (
    <button onClick={handleLogout} className="p-1 text-base">
      <BiLogOut /> Logout
    </button>
  );
}

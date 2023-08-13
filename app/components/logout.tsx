import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";

export default function Logout() {
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    signOut();
    toast.success("Logout berhasil");
  };
  return (
    <button onClick={handleLogout} className="text-base">
      <BiLogOut /> Logout
    </button>
  );
}

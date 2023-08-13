import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function Logout() {
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    signOut();
    toast.success("Logout berhasil");
  };
  return <button onClick={handleLogout}>🚪 Logout</button>;
}

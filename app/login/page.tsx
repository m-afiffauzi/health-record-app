"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.name !== undefined || null) {
    router.push("/patient");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/patient",
    }).then((res) => {
      if (res?.error) {
        toast.error(res.error);
      }
      if (res?.error === null) {
        toast.success("Login berhasil");
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card flex justify-center items-center flex-shrink-0 w-full md:h-1/2 h-full max-w-sm lg:shadow-2xl bg-neutral-100">
        <h1 className="text-5xl text-center font-bold">Login</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="admin@admin.com"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

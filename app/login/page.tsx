"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/patient";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  if (session?.user?.name !== undefined || null) {
    redirect(callbackUrl);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
      console.log(res);
      if (res?.error) {
        setError(res.error);
      }
      if (res?.error === null) {
        toast.success("Login berhasil");
        redirect(callbackUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen md:px-10 px-2 py-20">
      <div className="card flex justify-center items-center flex-shrink-0 w-full md:h-2/3 h-full max-w-sm lg:shadow-2xl bg-neutral-100">
        <h1 className="text-5xl text-center font-bold mt-6">Login</h1>
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
            {error && (
              <div className="bg-error p-2 rounded-md">
                <span>{error}</span>
              </div>
            )}
            <div className="form-control mt-4">
              <button className="btn btn-primary">Login</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { BiInfoCircle } from "react-icons/bi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/patient";
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(callbackUrl);
    }
  }, [session, callbackUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl,
        redirect: false,
      });
      if (!res?.error) {
        toast.success("Login berhasil");
        router.push(callbackUrl);
        location.reload();
      } else {
        setError(res.error);
      }
      setLoading(false);
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
              <div className="bg-error py-2 px-4 rounded-md flex items-center gap-2">
                <div className="text-lg">
                  <BiInfoCircle />
                </div>
                <span className="pb-0.5">{error}</span>
              </div>
            )}
            <div className="form-control mt-4">
              <button
                className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

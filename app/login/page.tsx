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
        router.push(callbackUrl);
        location.reload();
        toast.success("Login berhasil");
      } else {
        setError(res.error);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center py-20">
      <div className="card flex justify-center items-center flex-shrink-0 w-full sm:w-[400px] md:h-2/3 h-full lg:shadow-2xl bg-neutral-100">
        <h1 className="text-3xl lg:text-5xl text-center font-bold mt-6">
          Login
        </h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="w-full flex flex-col items-center justify-center gap-1 bg-white rounded-lg">
              <p className="font-bold">Demo Account</p>
              <p>Email: admin@gmail.com</p>
              <p>Password: admin123</p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="admin@gmail.com"
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
                placeholder="********"
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
                id="login"
                aria-label="login"
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

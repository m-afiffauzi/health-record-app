import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import Medical from "../public/medical.jpg";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse lg:gap-20">
        <Image
          alt="Hero"
          src={Medical}
          className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg border border-lg border-primary"
          width={600}
          height={400}
        />
        <div className="text-center lg:text-start">
          <h1 className="text-4xl lg:text-5xl font-bold">Data Pasien</h1>
          <p className="py-6">
            Aplikasi untuk menyimpan data dan riwayat pasien.
          </p>
          {session ? (
            <Link href={"/patient"}>
              <button className="btn btn-primary">Daftar Pasien</button>
            </Link>
          ) : (
            <Link href={"/login"}>
              <button className="btn btn-primary py-2">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

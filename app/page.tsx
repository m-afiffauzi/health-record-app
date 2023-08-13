import Image from "next/image";
import BG from "@/public/doctor-tool.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="hero min-h-screen bg-[url('/medical.jpg')]">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center">
        <div className="max-w-md text-white">
          <h1 className="text-5xl font-bold">Data Pasien</h1>
          <p className="py-6">
            Aplikasi dimana petugas kesehatan dapat menyimpan dan melihat data
            pasien.
          </p>
          <Link className="btn btn-primary" href={`/patient`}>
            Daftar Pasien
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import AddPatient from "./addPatient";
import GetPatients from "./getPatients";

export default function Patient() {
  return (
    <div className="-z-10">
      <div className="flex justify-between mb-2">
        <Link className="btn btn-sm btn-neutral" href={`/`}>
          &#10094; Kembali
        </Link>
        <span className="btn btn-sm btn-neutral no-animation">
          Daftar Pasien
        </span>
      </div>
      <AddPatient />
      <div className="overflow-x-auto">
        <table className="table text-center">
          <thead>
            <tr className="text-primary text-lg">
              <th>#</th>
              <th>Nama</th>
              <th>NIK</th>
              <th>Tanggal Lahir</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <GetPatients />
        </table>
      </div>
    </div>
  );
}

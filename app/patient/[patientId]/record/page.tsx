"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import AddRecord from "./addRecord";
import GetRecords from "./getRecords";
import useSWR from "swr";
import toast from "react-hot-toast";

export default function Patient() {
  const params = useParams();
  const id = params.patientId;
  const { data, error } = useSWR(`/api/patients/${id}`);

  if (error) {
    toast(error.message);
    return error.message;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-2">
        <Link className="btn btn-sm btn-neutral" href={`/patient`}>
          &#10094; Kembali
        </Link>
        <span className="btn btn-sm btn-neutral no-animation">
          Riwayat Pasien : {data?.name}
        </span>
      </div>
      <div className="mb-2">
        <AddRecord id={id} />
      </div>
      <table className="table text-center">
        <thead>
          <tr className="text-primary text-lg">
            <th>#</th>
            <th>Berat</th>
            <th>Tinggi</th>
            <th>Tekanan Darah</th>
            <th>Kadar Gula Darah</th>
            <th>Catatan</th>
            <th>Tanggal Dibuat</th>
            <th>Tanggal Edit</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <GetRecords id={id} />
      </table>
    </div>
  );
}

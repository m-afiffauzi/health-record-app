"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { BiTime, BiHome, BiGroup } from "react-icons/bi";
import Link from "next/link";
import useSWR from "swr";
import toast from "react-hot-toast";
import { TRecord } from "@/app/libs/type";
import AddRecord from "./addRecord";
import EditRecord from "./editRecord";
import DeleteRecord from "./deleteRecord";
import Pagination from "@/app/components/pagination";

export default function Patient() {
  const params = useParams();
  const id = params.patientId;

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastRecordIndex = currentPage * recordsPerPage;
  const firstRecordIndex = lastRecordIndex - recordsPerPage;

  const { data: patient, error: patitentError } = useSWR(`/api/patients/${id}`);
  const { data, error } = useSWR(`/api/patients/${id}/records`);

  if (patitentError) {
    toast(error.patitentError);
    return error.patitentError;
  }

  if (error) {
    toast(error.message);
    return error.message;
  }

  const currentRecordData = data?.slice(firstRecordIndex, lastRecordIndex);

  return (
    <section className="-z-10">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm lg:text-lg breadcrumbs">
          <ul>
            <li>
              <Link href={`/`}>
                <BiHome />
                Beranda
              </Link>
            </li>
            <li>
              <Link href={`/patient`}>
                <BiGroup />
                Pasien
              </Link>
            </li>
            <li>
              <BiTime />
              Riwayat
            </li>
          </ul>
        </div>
        <span className="hidden sm:flex btn btn-xs lg:btn-sm btn-neutral pointer-events-none hover:bg-neutral no-animation">
          Nama Pasien : {patient?.name}
        </span>
      </div>
      <span className="flex sm:hidden mb-4 btn btn-xs lg:btn-sm btn-neutral pointer-events-none hover:bg-neutral no-animation">
        Nama Pasien : {patient?.name}
      </span>
      <div className="mb-2">
        <AddRecord id={id} />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-primary text-base lg:text-lg text-center">
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
          <tbody>
            {!data && (
              <tr className="hover text-2xl lg:text-center">
                <td colSpan={9}>
                  <span className="loading loading-dots loading-lg"></span>
                </td>
              </tr>
            )}
            {currentRecordData?.length === 0 && (
              <tr className="hover text-lg lg:text-center">
                <td colSpan={9}>Tidak ada riwayat</td>
              </tr>
            )}
            {currentRecordData &&
              currentRecordData?.map((record: TRecord, index: number) => {
                const createdDateParse = Date.parse(record.createdAt);
                const createdDate = new Date(createdDateParse);
                const createdDateFormat = createdDate.toLocaleDateString(
                  "id-ID",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                );
                const updatedDateParse = Date.parse(record.updatedAt);
                const updatedDate = new Date(updatedDateParse);
                const updatedDateFormat = updatedDate.toLocaleDateString(
                  "id-ID",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                );

                return (
                  <tr key={record.id} className="hover text-sm text-center">
                    <td>{index + firstRecordIndex + 1}</td>
                    <td>{record.weight} kg</td>
                    <td>{record.height} cm</td>
                    <td>{record.bloodPressure} mmHg</td>
                    <td>{record.bloodSugarLevel} mg/dL</td>
                    <td>{record.note ? record.note : "-"}</td>
                    <td>{createdDateFormat}</td>
                    <td>{updatedDateFormat}</td>
                    <td className="flex gap-2 justify-center">
                      <EditRecord record={record} />
                      <DeleteRecord record={record} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Pagination
        totalData={data?.length}
        dataPerPage={recordsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}

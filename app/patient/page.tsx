"use client";
import { useState } from "react";
import { BiListUl, BiHome, BiGroup } from "react-icons/bi";
import Link from "next/link";
import useSWR from "swr";
import toast from "react-hot-toast";
import { TPatient } from "../libs/type";
import AddPatient from "./addPatient";
import EditPatient from "./editPatient";
import DeletePatient from "./deletePatient";
import Pagination from "../components/pagination";

export default function Patient() {
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;
  const lastPatientIndex = currentPage * patientsPerPage;
  const firstPatientIndex = lastPatientIndex - patientsPerPage;
  const { data, error } = useSWR(`/api/patients`);

  if (error) {
    toast(error.message);
    return error.message;
  }

  const currentPatientData = data?.slice(firstPatientIndex, lastPatientIndex);

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
              <BiGroup />
              Pasien
            </li>
          </ul>
        </div>
        <span className="btn btn-xs lg:btn-sm btn-neutral cursor-auto hover:bg-neutral no-animation">
          Total Pasien : {!data ? 0 : data?.length}
        </span>
      </div>
      <AddPatient />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-primary text-sm lg:text-base text-center">
              <th>#</th>
              <th>Nama</th>
              <th>NIK</th>
              <th>Tanggal Lahir</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {!data && (
              <tr className="hover text-lg lg:text-2xl lg:text-center">
                <td colSpan={6}>
                  <span className="loading loading-dots loading-lg"></span>
                </td>
              </tr>
            )}
            {currentPatientData?.length === 0 && (
              <tr className="hover text-xs lg:text-sm lg:text-center">
                <td colSpan={6}>Tidak ada pasien</td>
              </tr>
            )}
            {currentPatientData?.map((patient: TPatient, index: number) => {
              return (
                <tr
                  key={patient.id}
                  className="hover text-xs lg:text-sm text-center"
                >
                  <td>{index + firstPatientIndex + 1}</td>
                  <td>{patient.name}</td>
                  <td>{patient.nik}</td>
                  <td>{patient.birthday}</td>
                  <td>{patient.address}</td>
                  <td className="flex gap-2 justify-center">
                    <div className="tooltip" data-tip="Riwayat Pasien">
                      <Link href={`./patient/${patient.id}/record`}>
                        <button
                          className="btn btn-sm btn-info text-xl"
                          id="patient-record"
                          aria-label="patient-record"
                        >
                          <BiListUl />
                        </button>
                      </Link>
                    </div>
                    <EditPatient patient={patient} />
                    <DeletePatient patient={patient} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        totalData={data?.length}
        dataPerPage={patientsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}

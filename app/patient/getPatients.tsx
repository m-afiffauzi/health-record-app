"use client";
import useSWR from "swr";
import Link from "next/link";
import EditPatient from "./editPatient";
import DeletePatient from "./deletePatient";
import toast from "react-hot-toast";
import { BiListUl } from "react-icons/bi";

export default function GetPatients() {
  const { data, error } = useSWR(`/api/patients`);

  if (error) {
    toast(error.message);
    return error.message;
  }

  if (!data) {
    return (
      <tbody>
        <tr className="hover text-sm">
          <td>
            <span className="loading loading-ball loading-sm"></span>
          </td>
          <td>
            <span className="loading loading-ball loading-sm"></span>
          </td>
          <td>
            <span className="loading loading-ball loading-sm"></span>
          </td>
          <td>
            <span className="loading loading-ball loading-sm"></span>
          </td>
          <td>
            <span className="loading loading-ball loading-sm"></span>
          </td>
          <td className="flex gap-1 justify-center">
            <span className="loading loading-ball loading-sm"></span>
          </td>
        </tr>
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody>
        <tr className="hover text-2xl text-center">
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((patient: any, index: number) => {
        return (
          <tr key={patient.id} className="hover text-sm -z-10">
            <td>{index + 1}</td>
            <td>{patient.name}</td>
            <td>{patient.nik}</td>
            <td>{patient.birthday}</td>
            <td>{patient.address}</td>
            <td className="flex gap-2 justify-center">
              <Link
                className="btn btn-sm btn-info text-xl"
                id={patient.id}
                href={`./patient/${patient.id}/record`}
              >
                <BiListUl />
              </Link>
              <EditPatient patient={patient} />
              <DeletePatient patient={patient} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

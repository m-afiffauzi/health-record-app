"use client";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import useSWR from "swr";
import toast from "react-hot-toast";

export default function DeleteRecord({ record }: any) {
  const { mutate } = useSWR(`/api/patients/${record.patientId}/records`);
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `/api/patients/${record.patientId}/records/${record.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        mutate();
        toast.success("Data berhasil dihapus");
        setIsOpen(!isOpen);
      }
    } catch (error) {
      toast.error("Terdapat masalah, coba beberapa saat lagi");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="tooltip" data-tip="Hapus Data">
        <button
          id="delete-record"
          aria-label="delete-record"
          className="btn btn-error min-h-8 h-8 text-xl"
          onClick={handleModal}
        >
          <BiTrash />
        </button>
      </div>
      <div className={isOpen ? `modal modal-open` : `modal`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hapus Data</h3>
          <h2 className="pt-2 text-lg">Yakin ingin menghapus data ini?</h2>
          <div className="modal-action justify-center">
            <button
              id="cancel-delete"
              aria-label="cancel-delete"
              type="button"
              className="btn btn-warning"
              onClick={handleModal}
            >
              Batal, Kembali
            </button>
            <button
              id="confirm-delete"
              aria-label="confirm-delete"
              type="button"
              onClick={handleDelete}
              className="btn btn-error"
            >
              Ya, Hapus Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

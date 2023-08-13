"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteRecord({ record }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    try {
      fetch(`/api/patients/${record.patientId}/records/${record.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Data berhasil dihapus");
      setIsOpen(!isOpen);
    } catch (error) {
      toast.error("Terdapat masalah, coba beberapa saat lagi");
      console.log(error);
    }
  };

  return (
    <div>
      <button className="btn btn-error min-h-8 h-8" onClick={handleModal}>
        Hapus
      </button>
      <div className={isOpen ? `modal modal-open` : `modal`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hapus Data</h3>
          <h2 className="pt-2 text-lg">Yakin ingin menghapus data ini?</h2>
          <div className="modal-action justify-center">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleModal}
            >
              Batal, Kembali
            </button>
            <button
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

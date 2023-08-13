"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeletePatient({ patient }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    try {
      fetch(`/api/patients/${patient.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Pasien berhasil dihapus");
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
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg">Hapus Pasien</h3>
          <h2 className="pt-2 text-lg">
            Anda yakin ingin menghapus pasien ini?
          </h2>
          <div className="modal-action justify-center gap-2">
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
              Ya, Hapus Pasien
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

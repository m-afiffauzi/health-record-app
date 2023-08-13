"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EditPatient({ patient }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(patient.name);
  const [nik, setNik] = useState(patient.nik);
  const [birthday, setBirthday] = useState(patient.birthday);
  const [address, setAddress] = useState(patient.address);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/patients/${patient.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          nik,
          birthday,
          address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        toast.success("Pasien berhasil diedit");
        setIsOpen(!isOpen);
      }
    } catch (error) {
      toast.error("Terdapat masalah, coba beberapa saat lagi");
      console.error(error);
    }
  };

  return (
    <div>
      <button className="btn btn-success min-h-8 h-8" onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? `modal modal-open` : `modal`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Pasien</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Nama</label>
              <input
                type="text"
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">NIK</label>
              <input
                type="string"
                inputMode="numeric"
                pattern="[0-9]*"
                className="input input-bordered"
                maxLength={16}
                minLength={16}
                value={nik}
                onChange={(e) => setNik(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Tanggal Lahir</label>
              <input
                type="text"
                className="input input-bordered"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Alamat</label>
              <input
                type="text"
                className="input input-bordered"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleModal}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-success">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

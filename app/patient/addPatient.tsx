"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiPlusCircle } from "react-icons/bi";

export default function AddPatient() {
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/patients`, {
        method: "POST",
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
        toast.success("Pasien berhasil ditambahkan");
        setIsOpen(!isOpen);
      }
    } catch (error) {
      toast.error("Terdapat masalah, coba beberapa saat lagi");
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary min-h-8 h-9 text-xl"
        onClick={handleModal}
      >
        <BiPlusCircle />
      </button>
      <div className={isOpen ? `modal modal-open` : `modal`}>
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg">Tambah Pasien</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Nama</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">NIK</label>
              <input
                type="string"
                inputMode="numeric"
                pattern="[0-9]*"
                className="input input-bordered"
                placeholder="1234567890123456"
                maxLength={16}
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Tanggal Lahir</label>
              <input
                type="string"
                className="input input-bordered"
                placeholder="17 Agustus 1945"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Alamat</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Butuh Kulon"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-warning text-white"
                onClick={handleModal}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

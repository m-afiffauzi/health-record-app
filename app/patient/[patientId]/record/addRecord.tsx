"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddRecord({ id }: any) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [bloodSugarLevel, setBloodSugarLevel] = useState("");
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/patients/${id}/records`, {
        method: "POST",
        body: JSON.stringify({
          weight: Number(weight),
          height: Number(height),
          bloodPressure: bloodPressure,
          bloodSugarLevel: bloodSugarLevel,
          note,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        toast.success("Data berhasil ditambahkan");
        setIsOpen(!isOpen);
      }
    } catch (error) {
      toast.error("Terdapat masalah, coba beberapa saat lagi");
      console.error(error);
    }
  };

  return (
    <div>
      <button className="btn btn-primary min-h-8 h-9" onClick={handleModal}>
        Tambah Data
      </button>
      <div className={isOpen ? `modal modal-open` : `modal`}>
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg">Tambah Data</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">
                <span className="label-text">Berat</span>
                <span className="label-text-alt">kg</span>
              </label>
              <input
                type="string"
                inputMode="numeric"
                pattern="[0-9]*"
                className="input input-bordered"
                maxLength={3}
                placeholder="50"
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                <span className="label-text">Tinggi</span>
                <span className="label-text-alt">cm</span>
              </label>
              <input
                type="string"
                inputMode="numeric"
                pattern="[0-9]*"
                className="input input-bordered"
                maxLength={3}
                placeholder="150"
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                <span className="label-text">Tekanan Darah</span>
                <span className="label-text-alt">mmHg</span>
              </label>
              <input
                type="string"
                className="input input-bordered"
                maxLength={7}
                placeholder="120/80"
                onChange={(e) => setBloodPressure(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                <span className="label-text">Kadar Gula Darah</span>
                <span className="label-text-alt">mg/dL</span>
              </label>
              <input
                type="string"
                className="input input-bordered"
                maxLength={7}
                placeholder="100"
                onChange={(e) => setBloodSugarLevel(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                <span className="label-text">Catatan</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Catatan"
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-secondary"
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

"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";

export default function EditRecord({ record }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [weight, setWeight] = useState(record.weight);
  const [height, setHeight] = useState(record.height);
  const [bloodPressure, setBloodPressure] = useState(record.bloodPressure);
  const [bloodSugarLevel, setBloodSugarLevel] = useState(
    record.bloodSugarLevel
  );
  const [note, setNote] = useState(record.note);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/patients/${record.patientId}/records/${record.id}`,
        {
          method: "PATCH",
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
        }
      );
      console.log(res);
      if (res.ok) {
        toast.success("Data berhasil diedit");
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
        className="btn btn-success min-h-8 h-8 text-xl"
        onClick={handleModal}
      >
        <BiEdit />
      </button>
      <div className={isOpen ? `modal modal-open` : `modal`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Data</h3>
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
                value={weight}
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
                value={height}
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
                value={bloodPressure}
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
                value={bloodSugarLevel}
                onChange={(e) => setBloodSugarLevel(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                <span className="label-text">Catatan</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                value={note}
                onChange={(e) => setNote(e.target.value)}
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

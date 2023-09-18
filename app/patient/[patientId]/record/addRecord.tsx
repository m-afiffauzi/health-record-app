"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiPlusCircle } from "react-icons/bi";
import { AddDataSchema, TAddDataSchema } from "../../../libs/type";
import useSWR from "swr";
import toast from "react-hot-toast";

export default function AddRecord({ id }: any) {
  const { mutate } = useSWR(`/api/patients/${id}/records`);
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<TAddDataSchema>({
    resolver: zodResolver(AddDataSchema),
  });

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async (data: TAddDataSchema) => {
    try {
      const res = await fetch(`/api/patients/${id}/records`, {
        method: "POST",
        body: JSON.stringify({
          weight: Number(data.weight),
          height: Number(data.height),
          bloodPressure: data.bloodPressure,
          bloodSugarLevel: data.bloodSugarLevel,
          note: data.note,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        mutate();
        toast.success("Data berhasil ditambahkan");
        setIsOpen(!isOpen);
        reset();
      }
    } catch (error) {
      toast.error("Terdapat masalah, coba beberapa saat lagi");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="tooltip tooltip-right" data-tip="Tambah Data">
        <button
          id="add-record"
          aria-label="add-record"
          className="btn btn-primary px-7 lg:px-9 min-h-8 h-9 text-xl"
          onClick={handleModal}
        >
          <BiPlusCircle />
        </button>
      </div>
      <div className={isOpen ? `modal modal-open` : `modal`}>
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg">Tambah Data</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label font-bold">
                <span className="label-text">Berat</span>
                <span className="label-text-alt">kg</span>
              </label>
              <input
                {...register("weight")}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="input input-bordered"
                maxLength={3}
                placeholder="50"
              />
              {errors?.weight && (
                <p className="text-red-600 text-start">{`${errors.weight.message}`}</p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                <span className="label-text">Tinggi</span>
                <span className="label-text-alt">cm</span>
              </label>
              <input
                {...register("height")}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="input input-bordered"
                maxLength={3}
                placeholder="150"
              />
              {errors?.height && (
                <p className="text-red-600 text-start">{`${errors.height.message}`}</p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                <span className="label-text">Tekanan Darah</span>
                <span className="label-text-alt">mmHg</span>
              </label>
              <input
                {...register("bloodPressure")}
                type="text"
                className="input input-bordered"
                maxLength={7}
                placeholder="120/80"
              />
              {errors?.bloodPressure && (
                <p className="text-red-600 text-start">{`${errors.bloodPressure.message}`}</p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                <span className="label-text">Kadar Gula Darah</span>
                <span className="label-text-alt">mg/dL</span>
              </label>
              <input
                {...register("bloodSugarLevel")}
                type="text"
                className="input input-bordered"
                maxLength={7}
                placeholder="100"
              />
              {errors?.bloodSugarLevel && (
                <p className="text-red-600 text-start">{`${errors.bloodSugarLevel.message}`}</p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                <span className="label-text">Catatan</span>
                <span className="label-text-alt">{count}/100</span>
              </label>
              <textarea
                {...register("note")}
                className="textarea textarea-bordered"
                maxLength={100}
                placeholder="Catatan"
                onChange={(e) => setCount(e.target.value.length)}
              />
              {errors?.note && (
                <p className="text-red-600 text-start">{`${errors.note.message}`}</p>
              )}
            </div>
            <div className="modal-action">
              <button
                id="cancel-add"
                aria-label="cancel-add"
                type="button"
                className="btn btn-warning text-white"
                onClick={handleModal}
              >
                Batal
              </button>
              <button
                id="save-record"
                aria-label="save-record"
                disabled={isSubmitting}
                type="submit"
                className="btn btn-primary"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

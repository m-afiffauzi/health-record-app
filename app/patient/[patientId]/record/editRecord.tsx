"use client";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function EditRecord({ record }: any) {
  const { mutate } = useSWR(`/api/patients/${record.patientId}/records`);
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    values: record,
    resetOptions: {
      keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
    },
  });

  const handleModal = () => {
    setIsOpen(!isOpen);
    reset();
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await fetch(
        `/api/patients/${record.patientId}/records/${record.id}`,
        {
          method: "PATCH",
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
        }
      );
      console.log(res);
      if (res.ok) {
        mutate();
        toast.success("Data berhasil diedit");
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
      <div className="tooltip" data-tip="Edit Data">
        <button
          id="edit-record"
          aria-label="edit-record"
          className="btn btn-success min-h-8 h-8 text-xl"
          onClick={handleModal}
        >
          <BiEdit />
        </button>
      </div>
      <div className={isOpen ? `modal modal-open` : `modal`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Data</h3>
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
                id="cancel-edit"
                aria-label="cancel-edit"
                type="button"
                className="btn btn-warning"
                onClick={handleModal}
              >
                Batal
              </button>
              <button
                id="save-edit"
                aria-label="save-edit"
                disabled={isSubmitting}
                type="submit"
                className="btn btn-success"
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

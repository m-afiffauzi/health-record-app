"use client";
import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import useSWR from "swr";
import toast from "react-hot-toast";

export default function EditPatient({ patient }: any) {
  const { mutate } = useSWR(`/api/patients`);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    values: patient,
    resetOptions: {
      keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await fetch(`/api/patients/${patient.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: data.name,
          nik: data.nik,
          birthday: data.birthday,
          address: data.address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        mutate();
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
      <div className="tooltip" data-tip="Edit Pasien">
        <button
          id="edit-patient"
          aria-label="edit-patient"
          className="btn btn-success min-h-8 h-8 text-xl"
          onClick={handleModal}
        >
          <BiEdit />
        </button>
      </div>
      <div className={isOpen ? `modal modal-open` : `modal`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Pasien</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label font-bold">Nama</label>
              <input
                {...register("name", {
                  required: "Tolong isi Nama",
                })}
                type="text"
                className="input input-bordered"
                placeholder="Nama"
              />
              {errors?.name && (
                <p className="text-red-600 text-start">{`${errors.name.message}`}</p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">NIK</label>
              <input
                {...register("nik", {
                  required: "Tolong isi NIK",
                  minLength: {
                    value: 16,
                    message: "NIK harus berisi 16 angka",
                  },
                })}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={16}
                className="input input-bordered"
                placeholder="3308012345678900 (16 digit angka)"
              />
              {errors?.nik && (
                <p className="text-red-600 text-start">{`${errors.nik.message}`}</p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Tanggal Lahir</label>
              <input
                {...register("birthday", {
                  required: "Tolong isi Tanggal Lahir",
                })}
                type="text"
                className="input input-bordered"
                placeholder="17 Agustus 1945"
              />
              {errors?.birthday && (
                <p className="text-red-600 text-start">{`${errors.birthday.message}`}</p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Alamat</label>
              <input
                {...register("address", {
                  required: "Tolong isi Alamat",
                })}
                type="text"
                className="input input-bordered"
                placeholder="Alamat"
              />
              {errors?.address && (
                <p className="text-red-600 text-start">{`${errors.address.message}`}</p>
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

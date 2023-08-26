"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiPlusCircle } from "react-icons/bi";
import { AddPatientSchema, TAddPatientSchema } from "../libs/type";
import useSWR from "swr";
import toast from "react-hot-toast";

export default function AddPatient() {
  const { mutate } = useSWR(`/api/patients`);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<TAddPatientSchema>({
    resolver: zodResolver(AddPatientSchema),
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async (data: TAddPatientSchema) => {
    try {
      const res = await fetch(`/api/patients`, {
        method: "POST",
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
        toast.success("Pasien berhasil ditambahkan");
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
      <div className="tooltip tooltip-right" data-tip="Tambah Pasien">
        <button
          className="btn btn-primary px-9 min-h-8 h-9 text-xl"
          onClick={handleModal}
        >
          <BiPlusCircle />
        </button>
      </div>
      <div className={isOpen ? `modal modal-open` : `modal`}>
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg">Tambah Pasien</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label font-bold">Nama</label>
              <input
                {...register("name")}
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
                {...register("nik")}
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
                {...register("birthday")}
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
                {...register("address")}
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
                type="button"
                className="btn btn-warning text-white"
                onClick={handleModal}
              >
                Batal
              </button>
              <button
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

import { z } from "zod";

export type TPatient = {
  id: string;
  name: string;
  nik: string;
  birthday: string;
  address: string;
};

export type TRecord = {
  id: string;
  weight: number;
  height: number;
  bloodPressure: string;
  bloodSugarLevel: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  patientId: number;
};

export type TPagination = {
  totalData: number;
  dataPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const AddPatientSchema = z.object({
  name: z.string().nonempty({
    message: "Isi Nama",
  }),
  nik: z.string().max(16, "NIK harus terdiri dari 16 digit angka").nonempty({
    message: "Isi NIK",
  }),
  birthday: z.string().nonempty({
    message: "Isi Tanggal Lahir",
  }),
  address: z.string().nonempty({
    message: "Isi Alamat",
  }),
});

export type TAddPatientSchema = z.infer<typeof AddPatientSchema>;

export const AddDataSchema = z.object({
  weight: z.string().max(3).nonempty({
    message: "Isi Berat Badan",
  }),
  height: z.string().max(3).nonempty({
    message: "Isi Tinggi Badan",
  }),
  bloodPressure: z.string().nonempty({
    message: "Isi Tekanan Darah",
  }),
  bloodSugarLevel: z.string().nonempty({
    message: "Isi Kadar Gula Darah",
  }),
  note: z.string().max(100, "Maksimum 200 karakter"),
});

export type TAddDataSchema = z.infer<typeof AddDataSchema>;

export const metadata = {
  title: "Daftar Pasien",
};

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full sm:w-[640px] md:w-[750px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1440px] min-h-screen px-2 py-20">
      {children}
    </div>
  );
}

export const metadata = {
  title: "Daftar Pasien",
};

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full sm:max-w-[640px] md:max-w-[750px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1440px] px-2 pt-20 pb-8 min-h-screen">
      {children}
    </div>
  );
}

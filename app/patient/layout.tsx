export const metadata = {
  title: "Daftar Pasien",
};

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="md:px-10 h-screen px-2 py-4">{children}</div>;
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>Copyright © {year} - Muhammad Afif Fauzi</p>
      </div>
    </footer>
  );
}

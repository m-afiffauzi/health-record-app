import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>
          Copyright © {year} -{" "}
          <Link
            href="https://m-afiffauzi.vercel.app/"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Muhammad Afif Fauzi Website"
            className="text-primary hover:underline"
          >
            Muhammad Afif Fauzi
          </Link>
        </p>
      </div>
    </footer>
  );
}

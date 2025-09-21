"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <div className="space-x-4">
        <Link href="/submission">Submission</Link>
        <Link href="/incidents">Incidents</Link>
      </div>
    </nav>
  );
}

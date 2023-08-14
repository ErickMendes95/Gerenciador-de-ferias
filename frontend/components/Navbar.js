"use client";
import Link from "next/link";

function Navbar() {
    return (
      <nav className="bg-white p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-gray-800 font-semibold text-lg">Home</h1>
          </Link>
          <Link href="/employee/cadastro">
            <h1 className="text-gray-800 font-semibold text-lg">Cadastro</h1>
          </Link>
        </div>
      </nav>
    );
  }

export default Navbar;

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import EmployeeCard from "../components/EmployeeCard";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployees() {
      const response = await axios.get("http://localhost:4000/employee");
      const sortedEmployees = response.data.sort((a, b) => a.id - b.id);
      setEmployees(sortedEmployees);
      setLoading(false);
    }
    fetchEmployees();
  }, []);

  const handleEmployeeClick = (employee) => {
    if (selectedEmployee === employee) {
      setSelectedEmployee(null);
    } else {
      setSelectedEmployee(employee);
    }
  };

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="bg-white border-gray-300 shadow p-6 rounded w-3/4">
        <h1 className="text-2xl font-semibold mb-4">Lista de Funcionários</h1>
        <div className="border bg-gray-200 rounded max-h-80 overflow-y-auto p-2">
          {loading ? (
            <div className="flex items-center justify-center">
              Carregando...
            </div>
          ) : (
            employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                isSelected={selectedEmployee?.id === employee.id}
                onClick={() => handleEmployeeClick(employee)}
              />
            ))
          )}
        </div>
        <div className="flex justify-between">
        <Link
            href={`/employee/cadastro`}
            passHref
          >
            <button
              className={`mt-4 bg-green-500 hover:bg-green-600 cursor-pointer
               text-white py-2 px-4 rounded-full justify-end`}
            >
              Cadastrar novo funcionário
            </button>
          </Link>
          <Link
            href={`/employee/${selectedEmployee?.id}/vacation`}
            passHref
            disabled={!selectedEmployee}
          >
            <button
              className={`mt-4 ${
                selectedEmployee
                  ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white py-2 px-4 rounded-full justify-end`}
              disabled={!selectedEmployee}
            >
              Gerenciar as Férias
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

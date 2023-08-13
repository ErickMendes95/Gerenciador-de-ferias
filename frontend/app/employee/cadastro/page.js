"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CadastroFuncionario() {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    role: "",
    hireDate: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    try {
      await axios.post("http://localhost:4000/employee", employeeData);

      toast.success("Funcionário cadastrado com sucesso!");
      setIsButtonDisabled(false);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      toast.error("Erro ao cadastrar funcionário. Tente novamente.");
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="bg-white border-gray-300 shadow p-6 rounded w-3/4">
        <h1 className="text-2xl font-semibold mb-4">Cadastro de Funcionário</h1>
        <form onSubmit={handleFormSubmit}>
          <label className="block mb-2 font-semibold">Nome:</label>
          <input
            className="border rounded p-1"
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleInputChange}
            required
          />
          <label className="block mt-2 mb-2 font-semibold">Cargo:</label>
          <input
            className="border rounded p-1"
            type="text"
            name="role"
            value={employeeData.role}
            onChange={handleInputChange}
            required
          />
          <label className="block mt-2 mb-2 font-semibold">
            Data de Contratação:
          </label>
          <input
            className="border rounded p-1"
            type="text"
            name="hireDate"
            value={employeeData.hireDate}
            onChange={handleInputChange}
            placeholder="MM/DD/YYYY"
            pattern="\d{2}/\d{2}/\d{4}"
            required
          />
          <div>
            <button
              type="submit"
              className={`mt-4 ${
                isButtonDisabled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 cursor-pointer"
              } text-white py-2 px-4 rounded-full`}
              disabled={isButtonDisabled}
            >
              Cadastrar Funcionário
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

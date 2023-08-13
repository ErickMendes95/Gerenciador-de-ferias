"use client";
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function EmployeeDetails() {
  const { id } = useParams();

  const [numVacations, setNumVacations] = useState(1);
  const [vacations, setVacations] = useState([{ startDate: "", endDate: "" }]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

  const handleNumVacationsChange = (e) => {
    const num = parseInt(e.target.value);
    setNumVacations(num);
    const newVacations = Array.from({ length: num }, () => ({
      startDate: "",
      endDate: "",
    }));
    setVacations(newVacations);
    setIsButtonDisabled(true);
  };

  const handleVacationChange = (index, field, value) => {
    const updatedVacations = [...vacations];
    updatedVacations[index][field] = value;
    setVacations(updatedVacations);
    setIsButtonDisabled(false);
  };

  const handleFormSubmit = async () => {
    const areAllDatesValid = vacations.every(
      (vacation) =>
        isValidDate(vacation.startDate) && isValidDate(vacation.endDate)
    );

    if (!areAllDatesValid) {
      alert("Preencha todas as datas no formato MM/DD/YYYY");
      return;
    }

    const dataToSend = vacations.map(({ startDate, endDate }) => ({
      startDate,
      endDate,
    }));

    try {
      await axios.post(`http://localhost:4000/vacation`, dataToSend, {
        headers: { employeeId: id },
      });

      setIsSuccessMessageVisible(true);

      setTimeout(() => {
        setIsSuccessMessageVisible(false);
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.log(error);
      throw new Error(`${error.message}, ${error.response.data}`);
    }
  };

  const isValidDate = (date) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(date);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="bg-white border-gray-300 shadow p-6 rounded w-3/4">
        <h1 className="text-2xl font-semibold mb-4">Cadastrar Férias</h1>
        <div className="form-container bg-white rounded p-4">
          <label className="block mb-2 font-semibold">
            Escolha a quantidade de férias:
          </label>
          <select
            className="border rounded p-1"
            value={numVacations}
            onChange={handleNumVacationsChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
          {vacations.map((vacation, index) => (
            <div key={index} className="mt-4">
              <label className="block mb-1 font-semibold">{`Férias ${
                index + 1
              }`}</label>
              <input
                className="border rounded p-1"
                type="text"
                placeholder="Start Date (MM/DD/YYYY)"
                value={vacation.startDate}
                onChange={(e) =>
                  handleVacationChange(index, "startDate", e.target.value)
                }
              />
              <input
                className="border rounded p-1 ml-2"
                type="text"
                placeholder="End Date (MM/DD/YYYY)"
                value={vacation.endDate}
                onChange={(e) =>
                  handleVacationChange(index, "endDate", e.target.value)
                }
              />
            </div>
          ))}
          <button
            className={`mt-4 ${
              isButtonDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 cursor-pointer"
            } text-white py-2 px-4 rounded-full`}
            disabled={isButtonDisabled}
            onClick={handleFormSubmit}
          >
            Cadastrar as Férias
          </button>
          {isSuccessMessageVisible && (
            <p className="mt-2 text-green-500">
              Férias cadastradas com sucesso!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

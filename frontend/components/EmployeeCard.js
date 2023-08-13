import React from 'react';

function EmployeeCard({ employee, isSelected, onClick }) {
  return (
    <div
      className={`bg-white border flex items-center justify-between p-2 mb-2 rounded cursor-pointer ${
        isSelected ? 'bg-blue-300' : ''
      }`}
      onClick={onClick}
    >
      <p className="font-semibold">{employee.name}</p>
      <p className="text-gray-600">{employee.role}</p>
    </div>
  );
}

export default EmployeeCard;

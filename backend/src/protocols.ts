export type Employee = {
  name: string;
  role: string;
  hireDate: Date;
};

export type ApplicationError = {
  name: string;
  message: string;
};

export type Vacation = {
  employeeId: number;
  startDate: Date;
  endDate: Date;
};

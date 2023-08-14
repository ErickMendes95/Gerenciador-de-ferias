export type Employee = {
  name: string;
  role: string;
  hireDate: Date;
  canTakeVacation?: boolean;
  lastCanTakeVacationUpdate?: Date;
};

export type ApplicationError = {
  name: string;
  message: string;
};

export type Vacation = {
  startDate: Date;
  endDate: Date;
};

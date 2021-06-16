export class Employee {
  _id!: string;
  name!: string;
  password!: string;
  email!: string;
  zone!: string;
  role!: string;
  image!: string;
  enrollDate!: Date;
  status!: string;
}

export class EmployeeResponse {
  success!: boolean;
  message!: string;
  payload!: Employee;
}

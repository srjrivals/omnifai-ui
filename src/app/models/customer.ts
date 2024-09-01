export class Customer {
  id!: number;
  firstName!: string;
  lastName!: string;
  company!: string;
  phoneNumber!: string;
  salary!: string;
  callsToday?: number;  // Add this field to store calls today
  callsThisWeek?: number;
}
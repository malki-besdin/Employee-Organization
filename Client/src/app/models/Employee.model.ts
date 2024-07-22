import { RoleToEmployee } from "./RoleToEmployee.model";
export class Employee {
    id!: number;
    idEmployee?:number;
    firstName?: string;
    lastName?: string;
    startWorksDate?: Date;
    dateOfBirth?: Date;
    sexFM?: number | undefined;
    roles?: RoleToEmployee[];
    status?: boolean|null;
}
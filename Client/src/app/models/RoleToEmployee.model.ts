import { Employee } from "./Employee.model";
import { Role } from "./Role.model";

export class RoleToEmployee {
    Id?: number;
    IdEmployee?: Employee;
    IdRole?: Role;
    DateOfEntry?: Date | null;
}
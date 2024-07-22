import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  public getEmployeeFromServer(): Observable<Employee[]> {
    console.log("get employees")
    return this.http.get<Employee[]>('https://localhost:7178/api/Employee');
  }

  public getEmployeeById(id: number): Observable<Employee> {
    console.log("get employees by id")
    return this.http.get<Employee>(`https://localhost:7178/api/Employee/${id}`);
  }
  public getEmployeeByIdEmployee(idEmployee: string): Observable<Employee> {
    return this.http.get<Employee>(`https://localhost:7178/api/Employee/${idEmployee}`);
  }
  public updateEmployee(employeeId: number, employee: Employee): Observable<Employee> {
    console.log("edit employee");
    return this.http.put<Employee>(`https://localhost:7178/api/Employee/${employeeId}`, employee);
  }
  public async deleteEmployee(employee: Employee): Promise<void> {
    console.log("delete " + employee.firstName);
    await this.http.delete<Observable<void>>(`https://localhost:7178/api/Employee/${employee.id}`).toPromise();
  }
  public postEmployee(e: Employee): Observable<Employee> {
    console.log("this post employee");
    return this.http.post<Employee>('https://localhost:7178/api/Employee', e);
  }

}


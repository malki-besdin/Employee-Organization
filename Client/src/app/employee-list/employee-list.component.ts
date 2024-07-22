import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/Employee.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCellDef, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GenderPipe } from "../gender.pipe";
import xlsx from 'xlsx';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  imports: [MatPaginatorModule, MatIconModule, CommonModule,
    MatButtonModule,
    MatTableModule, GenderPipe, MatInputModule]
})
export class EmployeeListComponent {
  public columnsToDisplay: string[] = ['Num.Employee', 'lastName', 'firstName', 'id', 'startWorksDate', 'editEmployee', 'deleteEmployee'];
  public dataSource = new MatTableDataSource<Employee>();
  public employeelist!: Employee[];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Employee | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private router: Router, private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.fetchEmployeeData();

  }
  toggleRow(element: Employee): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  isExpanded(element: Employee): boolean {
    return this.expandedElement === element;
  }
  fetchEmployeeData(): void {
    this._employeeService.getEmployeeFromServer().subscribe({
      next: (res: any) => { // Change 'any' to the actual type of your data
        if (Array.isArray(res.$values)) {
          this.dataSource.data = res.$values; // Update dataSource with extracted array
          this.dataSource.paginator = this.paginator; // Set paginator after updating data
          console.log('Employees data:', this.dataSource.data);
          console.log(this.employeelist);

        } else {
          console.error('Invalid data received:', res);
        }
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }
  public showDetails(e: Employee) {
    // if (sessionStorage.getItem("user.role")=user.role.principle) {
    this.router.navigate(['/employeeDetails', e.id]);
    // } else {
    alert("You are not allowed to watch the courses without registering on the website");
    // }
  }
  editEmployee(idEmployee: number) {
    this.router.navigate([`/editEmployee/${idEmployee}`]);
  }

  deleteEmployee(employee: Employee): void {
    this._employeeService.deleteEmployee(employee);
    alert("The employee :" + employee.firstName + " " + employee.lastName + " was successfully deleted.")
  }

  public addEmployee() {
    this.router.navigate(['/editEmployee', 0]);
  }
  exportToExcel(): void {
    const exportData = this.dataSource.data.map(item => ({
      'Num.Employee': item.id,
      'lastName': item.lastName,
      'firstName': item.firstName,
      'id': item.id,
      'startWorksDate': item.startWorksDate
    }));

    import('xlsx').then(async (xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(exportData);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Employee Data');
      xlsx.writeFile(workbook, 'employee_data.xlsx');
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
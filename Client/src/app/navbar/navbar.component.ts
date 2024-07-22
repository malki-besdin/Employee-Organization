import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GenderPipe } from '../gender.pipe';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/Employee.model';
import * as xlsx from 'xlsx'; // ייבוא ספריית xlsx
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatPaginatorModule, MatIconModule, CommonModule,
    MatButtonModule,
    MatTableModule, GenderPipe, MatInputModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  public columnsToDisplay: string[] = ['Num.Employee', 'lastName', 'firstName', 'id', 'startWorksDate', 'editEmployee', 'deleteEmployee'];
  public dataSource = new MatTableDataSource<Employee>();
  public employeelist!: Observable<Employee[]>;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Employee | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private router: Router, private _employeeService: EmployeeService) { }

  public addEmployee() {
    this.router.navigate(['/editEmployee', 0]);
  }

  async exportToExcel(): Promise<void> {
    console.log(this.dataSource);
    console.log(this.employeelist);

    this.employeelist = this._employeeService.getEmployeeFromServer();
    const exportData = this.dataSource.data.map(item => ({
      'Num.Employee': item.id,
      'lastName': item.lastName,
      'firstName': item.firstName,
      'id': item.id,
      'startWorksDate': item.startWorksDate
    }));
    console.log(exportData);
    const xlsx = await import('xlsx');
    const worksheet = xlsx.utils.json_to_sheet(exportData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Employee Data');
    xlsx.writeFile(workbook, 'employee_data.xlsx');
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
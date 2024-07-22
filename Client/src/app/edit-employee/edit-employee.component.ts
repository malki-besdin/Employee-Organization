import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/Employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode: boolean = false;
  id!: string;
  employeeId!: number;
  employee: Employee = {
    id: 0
  };
  isLinear = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private _employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        console.log(id);
        this.employeeId = parseInt(id, 10);
        this.getEmployeeById(this.id);
        this.initForm();
      }
    });
  }

  initForm(): void {
    this.employeeForm = this._formBuilder.group({
      firstName: [this.employee?.firstName, Validators.required],
      id: [this.employee?.lastName, Validators.required],
      lastName: [this.employee?.lastName, Validators.required],
      startWorksDate: [this.employee?.startWorksDate, Validators.required],
      dateOfBirth: [this.employee?.dateOfBirth, Validators.required],
      sexFM: [this.employee?.sexFM, Validators.required],
      roles: [this.employee?.roles, Validators.required],
    });

    if (this.isEditMode) {
      this.getEmployeeById(this.id!); // Fetch employee details for edit mode
    }
  }

  getEmployeeById(id: string): void {
    console.log("get employee by id Employee");
    this._employeeService.getEmployeeByIdEmployee(id).subscribe({
      next: (res: Employee) => {
        console.log("get employee by id Employee" + res + "----");
        this.employeeForm.patchValue(res);
      },
      error: (err) => {
        console.error('Error fetching employee:', err);
      }
    });
  }

  saveChanges(): void {
    console.log("saveChanges");
    const formData = this.employeeForm.value;
    if (this.isEditMode) {
      // Update existing employee
      this._employeeService.updateEmployee(this.employeeId!, formData).subscribe({
        next: (res) => {
          console.log('Employee updated successfully:', res);
        },
        error: (err) => {
          console.error('Error updating employee:', err);
        }
      });
    } else {
      // Add new employee
      this._employeeService.postEmployee(formData).subscribe({
        next: (res) => {
          console.log('New employee added successfully:', res);
        },
        error: (err) => {
          console.error('Error adding new employee:', err);
        }
      });
    }
  }
}
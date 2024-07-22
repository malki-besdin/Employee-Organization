import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { EmployeeListComponent } from '../../employee-list/employee-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCellDef, MatTableModule } from '@angular/material/table';
import { ICON_REGISTRY_PROVIDER, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditEmployeeComponent } from '../../edit-employee/edit-employee.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [ EditEmployeeComponent],
  exports: [EditEmployeeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatStepperModule,
    MatFormFieldModule,
    MatCellDef,
    MatInputModule,
    MatListModule,MatOptionModule,MatSelectModule
  ]
})
export class EmployeeModule { }
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeModule } from './modules/employee/employee.module';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, EmployeeModule, NavbarComponent]
})
export class AppComponent {
  title = 'EmployeeManagement';
}

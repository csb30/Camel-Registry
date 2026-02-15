import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RouterOutlet } from '@angular/router';
import { CamelListComponent } from './components/camel-list/camel-list.component';
import { CamelFormComponent } from './components/camel-form/camel-form.component';
import { Camel } from './models/camel.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [/*RouterOutlet,*/ CommonModule, CamelListComponent, CamelFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Camel Registry';
  selectedCamel: Camel | null = null;

  // Method to handle edit request from list
  onEditCamel(camel: Camel): void {
    this.selectedCamel = camel;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Method to handle successful form submission (create or update)
  onFormSubmit(listComponent: CamelListComponent): void {
    this.selectedCamel = null; // Clear selection
    listComponent.loadCamels(); // Refresh list
  }

  // Method to handle cancel edit
  onCancelEdit(): void {
    this.selectedCamel = null;
  }
}

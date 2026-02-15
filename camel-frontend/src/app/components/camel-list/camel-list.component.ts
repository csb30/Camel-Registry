import { Component, EventEmitter, OnInit, Output, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Camel } from '../../models/camel.model';
import { CamelService } from '../../services/camel.service';

@Component({
    selector: 'app-camel-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './camel-list.component.html',
    styles: [`
    .table-responsive {
      margin-top: 1rem;
    }
  `]
})
export class CamelListComponent implements OnInit {
    camels: Camel[] = [];
    isLoading: WritableSignal<boolean> = signal<boolean>(false);
    errorMessage: string | null = null;

    @Output() editCamel = new EventEmitter<Camel>();

    constructor(private camelService: CamelService) { }

    ngOnInit(): void {
        this.loadCamels();
    }

    loadCamels(): void {
        this.isLoading.set(true);
        this.errorMessage = null;
        this.camelService.getCamels().subscribe({
            next: (camels) => {
                this.camels = camels;
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load camels', err);
                this.errorMessage = 'Failed to load camels. Please try again later.';
                this.isLoading.set(false);
            }
        });
    }

    onEdit(camel: Camel): void {
        this.editCamel.emit(camel);
    }
}

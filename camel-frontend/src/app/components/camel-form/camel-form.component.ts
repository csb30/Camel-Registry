import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Camel } from '../../models/camel.model';
import { CamelService } from '../../services/camel.service';

@Component({
    selector: 'app-camel-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './camel-form.component.html',
    styles: []
})
export class CamelFormComponent implements OnChanges {
    @Input() camelToEdit: Camel | null = null;
    @Output() formSubmitSuccess = new EventEmitter<void>();
    @Output() cancelEdit = new EventEmitter<void>();

    camelForm: FormGroup;
    errorMessage: string | null = null;
    isSubmitting = false;

    constructor(private fb: FormBuilder, private camelService: CamelService) {
        this.camelForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            humpCount: [null, [Validators.required, Validators.min(1), Validators.max(2)]]
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['camelToEdit']) {
            if (this.camelToEdit) {
                this.camelForm.patchValue({
                    name: this.camelToEdit.name,
                    humpCount: this.camelToEdit.humpCount
                });
            } else {
                this.camelForm.reset();
            }
        }
    }

    onSubmit(): void {
        if (this.camelForm.invalid) {
            this.camelForm.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;
        this.errorMessage = null;
        const formValue = this.camelForm.value;

        if (this.camelToEdit) {
            const updatedCamel: Camel = {
                ...this.camelToEdit,
                ...formValue
            };

            this.camelService.updateCamel(updatedCamel.id, updatedCamel).subscribe({
                next: () => {
                    this.isSubmitting = false;
                    this.formSubmitSuccess.emit();
                    this.camelForm.reset();
                },
                error: (err) => {
                    this.isSubmitting = false;
                    this.errorMessage = 'Failed to update camel. Please try again.';
                    console.error(err);
                }
            });
        } else {
            // Create new camel

            const newCamel: Camel = {
                id: 0, // Placeholder
                ...formValue
            };

            this.camelService.createCamel(newCamel).subscribe({
                next: () => {
                    this.isSubmitting = false;
                    this.formSubmitSuccess.emit();
                    this.camelForm.reset();
                },
                error: (err) => {
                    this.isSubmitting = false;
                    this.errorMessage = 'Failed to create camel. Please try again.';
                    console.error(err);
                }
            });
        }
    }

    onCancel(): void {
        this.camelForm.reset();
        this.cancelEdit.emit();
    }

    // Getters for template
    get name() { return this.camelForm.get('name'); }
    get humpCount() { return this.camelForm.get('humpCount'); }
}

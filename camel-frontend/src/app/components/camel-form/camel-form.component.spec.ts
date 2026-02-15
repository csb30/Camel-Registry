import '@angular/compiler';
import { FormBuilder } from '@angular/forms';
import { CamelFormComponent } from './camel-form.component';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('CamelFormComponent', () => {
    let component: CamelFormComponent;
    let mockCamelService: any;

    beforeEach(() => {
        // Mock CamelService
        mockCamelService = {
            createCamel: vi.fn(),
            updateCamel: vi.fn()
        };

        // Setup default return values for observables
        mockCamelService.createCamel.mockReturnValue(of({ id: 1, name: 'Test', humpCount: 1, color: 'Brown' }));
        mockCamelService.updateCamel.mockReturnValue(of((undefined as any)));

        // Instantiate FormBuilder
        const fb = new FormBuilder();

        // Instantiate Component directly
        component = new CamelFormComponent(fb, mockCamelService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form should be invalid when name is empty', () => {
        const nameControl = component.camelForm.controls['name'];
        nameControl.setValue('');
        expect(nameControl.valid).toBeFalsy();
        expect(nameControl.errors?.['required']).toBeTruthy();
    });

    it('form should be invalid when name is shorter than 2 characters', () => {
        const nameControl = component.camelForm.controls['name'];
        nameControl.setValue('A');
        expect(nameControl.valid).toBeFalsy();
        expect(nameControl.errors?.['minlength']).toBeTruthy();
    });

    it('form should be valid when name is at least 2 characters', () => {
        const nameControl = component.camelForm.controls['name'];
        nameControl.setValue('Al');
        expect(nameControl.valid).toBeTruthy();
        expect(nameControl.errors).toBeNull();
    });

    it('form should be invalid when humpCount is less than 1', () => {
        const humpCountControl = component.camelForm.controls['humpCount'];
        humpCountControl.setValue(0);
        expect(humpCountControl.valid).toBeFalsy();
        expect(humpCountControl.errors?.['min']).toBeTruthy();
    });

    it('form should be invalid when humpCount is greater than 2', () => {
        const humpCountControl = component.camelForm.controls['humpCount'];
        humpCountControl.setValue(3);
        expect(humpCountControl.valid).toBeFalsy();
        expect(humpCountControl.errors?.['max']).toBeTruthy();
    });

    it('form should be valid when humpCount is 1 or 2', () => {
        const humpCountControl = component.camelForm.controls['humpCount'];

        humpCountControl.setValue(1);
        expect(humpCountControl.valid).toBeTruthy();
        expect(humpCountControl.errors).toBeNull();

        humpCountControl.setValue(2);
        expect(humpCountControl.valid).toBeTruthy();
        expect(humpCountControl.errors).toBeNull();
    });
});

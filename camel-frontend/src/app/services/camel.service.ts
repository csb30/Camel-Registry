import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Camel } from '../models/camel.model';

@Injectable({
    providedIn: 'root'
})
export class CamelService {
    private apiUrl = environment.apiUrl; // Use environment variable

    constructor(private http: HttpClient) { }

    getCamels(): Observable<Camel[]> {
        return this.http.get<Camel[]>(this.apiUrl);
    }

    getCamel(id: number): Observable<Camel> {
        return this.http.get<Camel>(`${this.apiUrl}/${id}`);
    }

    createCamel(camel: Camel): Observable<Camel> {
        return this.http.post<Camel>(this.apiUrl, camel);
    }

    updateCamel(id: number, camel: Camel): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, camel);
    }

    deleteCamel(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}

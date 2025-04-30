import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customer {
  id: string;
  name: string;
  email: string;
  birthday: Date
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly baseUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  create(client: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, client);
  }

  update(id: number, client: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/${id}`, client);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
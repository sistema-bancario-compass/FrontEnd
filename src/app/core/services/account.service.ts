import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export interface Account {
  id: string;
  type: string;
  customerId: string;
  balance: number;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly baseUrl = environment.baseUrl + '/accounts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl);
  }
  getById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/${id}`);
  }

  create(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, account);
  }

  update(id: number, account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.baseUrl}/${id}`, account);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

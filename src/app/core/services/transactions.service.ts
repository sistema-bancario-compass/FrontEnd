import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account.service';
import { environment } from '../../environment/environment';

export interface Transaction {
  id: string;
  source: string;
  date: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly baseUrl = environment.baseUrl + '/transactions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }
  getById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/${id}`);
  }

  create(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, transaction);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAccountsByClientId(clientId: number): Observable<Account[]> {
    return this.http.post<Account[]>(`${this.baseUrl}/accounts`, { clientId });
  }
}

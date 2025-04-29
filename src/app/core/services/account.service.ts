import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Account {
  id: number;
  type: string;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly baseUrl = 'http://localhost:3000/accounts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl);
  }
}
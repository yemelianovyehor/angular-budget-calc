import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { BudgetItem } from 'src/shared/models/budget-item.module';
import { UpdateEvent } from '../components/budget-item-list/budget-item-list.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class BudgetService {

  private apiUrl = 'http://localhost:5000/budget'

  constructor(private http: HttpClient) { }

  getBudget(): Observable<BudgetItem[]>{
    return this.http.get<BudgetItem[]>(this.apiUrl);
  }
  addBudgetItem(item: BudgetItem): Observable<BudgetItem>{
    return this.http.post<BudgetItem>(this.apiUrl, item, httpOptions);
  }

  deleteBudgetItem(item:BudgetItem): Observable<BudgetItem>{
    const url = `${this.apiUrl}/${item.id}`;
    return this.http.delete<BudgetItem>(url);
  }

  updateBudgetItem(oldItem: BudgetItem, newItem:BudgetItem): Observable<BudgetItem>{
    const url = `${this.apiUrl}/${oldItem.id}`;
    return this.http.put<BudgetItem>(url, newItem, httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CallLog } from '../models/call-log.model';

@Injectable({
  providedIn: 'root'
})
export class CallLogService {

  private baseUrl = 'http://localhost:8080/api/call-logs';

  constructor(private http: HttpClient) { }

  getCallsForToday(customerId): Observable<CallLog[]> {
    return this.http.get<CallLog[]>(`${this.baseUrl}/today/${customerId}`);
  }

  getCallsForThisWeek(customerId): Observable<CallLog[]> {
    return this.http.get<CallLog[]>(`${this.baseUrl}/this-week/${customerId}`);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CallSettings } from '../models/call-settings.model';

@Injectable({
  providedIn: 'root'
})
export class CallSettingsService {

  private apiUrl = 'http://localhost:8080/api/call-settings';  // Adjust the API URL as needed

  constructor(private http: HttpClient) { }

  getCallSettings(): Observable<CallSettings[]> {
    return this.http.get<CallSettings[]>(this.apiUrl);
  }

  updateCallSettings(settings: CallSettings): Observable<CallSettings> {
    return this.http.put<CallSettings>(`${this.apiUrl}/${settings.id}`, settings);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DeleteDashboardService {
  constructor(private http: HttpClient) {}

  apiUrl = "UserDashboard";

  sendPostRequest(dashboardId: string): Observable<Object> {
    return this.http.post(this.apiUrl, { DashboardID: dashboardId });
  }
}

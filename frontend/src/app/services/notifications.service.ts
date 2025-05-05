import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  URL="http://localhost:8080/"

  constructor(private http: HttpClient) { }

  getNotifications(userId: string) {
    return this.http.post(`${this.URL}getNotifications`, { userId });
  }

}

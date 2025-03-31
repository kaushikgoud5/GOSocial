import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  private tokenKey = 'token'; // Key for localStorage
  private userSubject = new BehaviorSubject<any>(null); // Stores decoded user info

  constructor() {
    this.loadUserFromToken(); // Load user details on service initialization
  }

  /**
   * Retrieves token from localStorage
   */
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Decodes JWT token and updates the user subject
   */
  private loadUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userSubject.next(decodedToken);
      } catch (error) {
        console.error('Invalid token:', error);
        this.clearUser();
      }
    }
  }

  /**
   * Returns user details as an observable
   */
  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  /**
   * Returns current user details (synchronously)
   */
  getCurrentUser(): any {
    return this.userSubject.value;
  }

  /**
   * Returns user ID from the token
   */
  getUserId(): string | null {
    return this.userSubject.value?.userId || null;
  }

  /**
   * Checks if the user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Stores a new token and updates user context
   */
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.loadUserFromToken();
  }

  /**
   * Clears token and user data
   */
  clearUser(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }
}

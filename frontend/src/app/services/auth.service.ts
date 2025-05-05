import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { BehaviorSubject,  Observable, of, throwError } from "rxjs"
import { tap, delay } from "rxjs/operators"

export interface User {
  id: number
  username: string
  email: string
  avatar: string
  
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  URL="http://localhost:8080/"
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser))
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.URL}login`, { email, password });
  }

  register(data:any): Observable<User> {
    console.log(data)
    return this.http.post<User>(`${this.URL}signup`, data);
  }

  logout(): void {
    localStorage.removeItem("token")
    this.currentUserSubject.next(null)
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value
  }

  getUsers() {
    return this.http.get(`${this.URL}getUsers`)
  }
}


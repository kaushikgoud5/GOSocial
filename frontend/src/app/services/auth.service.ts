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

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.URL}login`, { username, password });
    // if (email && password) {
    //   const user: User = {
    //     id: 1,
    //     username: "johndoe",
    //     email: email,
    //     avatar: "/placeholder.svg?height=100&width=100",
    //   }

    //   return of(user).pipe(
    //     delay(1000), // Simulate network delay
    //     tap((user) => {
    //       localStorage.setItem("user", JSON.stringify(user))
    //       this.currentUserSubject.next(user)
    //     }),
    //   )
    // }

    // return throwError(() => new Error("Invalid credentials"))
  }

  logout(): void {
    localStorage.removeItem("user")
    this.currentUserSubject.next(null)
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value
  }
}


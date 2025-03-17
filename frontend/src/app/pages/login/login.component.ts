import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import  { Router } from "@angular/router"
import  { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup
  isLoading = false
  errorMessage = ""

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  get email() {
    return this.loginForm.get("email")
  }
  get password() {
    return this.loginForm.get("password")
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return
    }

    this.isLoading = true
    this.errorMessage = ""

    const { email, password } = this.loginForm.value

    this.authService.login(email, password).subscribe({
      next: () => {
        console.log("lodas")
        this.router.navigate(["/feed"])
      },
      error: (error) => {
        this.errorMessage = error.message
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      },
    })
  }

  onClickSignup(){
    this.router.navigate(["/signup"])
  }
}


import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import  { Router } from "@angular/router"
import  { AuthService } from "../../services/auth.service"
import { PostService } from "../../services/post.service"

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
  isLoggeed = true

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private postSrevice:PostService
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      username: ["", [Validators.required, Validators.minLength(3)]],
    })
  }
  SwitchMode(){
    this.isLoggeed = !this.isLoggeed
  }
  get email() {
    return this.loginForm.get("email")
  }
  get password() {
    return this.loginForm.get("password")
  }
  get username() {
    return this.loginForm.get("username")
  }

  onSubmit(): void {
    // if (this.loginForm.invalid) {
    //   return
    // }

    this.isLoading = true
    this.errorMessage = ""
    if (this.isLoggeed){
      this.login()
    }else{
      this.register()
    }
   
  }
  login(){
    const { email, password } = this.loginForm.value

    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.postSrevice.setUser(data.avatar, data.username)
        localStorage.setItem("token", JSON.stringify(data))
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
  register(){
    console.log(this.loginForm.value)
    this.authService.register(this.loginForm.value).subscribe({
      next: () => {
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

}


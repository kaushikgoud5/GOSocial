import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import  { AuthService, User } from "../../services/auth.service"
import  { PostService, Post } from "../../services/post.service"

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null
  userPosts: Post[] = []
  isLoading = true
  isSaving = false
  profileForm: FormGroup

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private fb: FormBuilder,
  ) {
    this.currentUser = this.authService.currentUser

    this.profileForm = this.fb.group({
      username: [this.currentUser?.username || "", [Validators.required]],
      bio: ["", [Validators.maxLength(160)]],
    })
  }

  ngOnInit(): void {
    this.loadUserPosts()
  }

  loadUserPosts(): void {
    this.isLoading = true
    this.postService.getPosts().subscribe({
      next: (posts) => {
        if (this.currentUser) {
          this.userPosts = posts.filter((post) => post.userId === this.currentUser?.id)
        }
        this.isLoading = false
      },
      error: () => {
        this.isLoading = false
      },
    })
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      return
    }

    this.isSaving = true

    // In a real app, you would call a service method to update the profile
    setTimeout(() => {
      this.isSaving = false
      alert("Profile updated successfully!")
    }, 1000)
  }
}

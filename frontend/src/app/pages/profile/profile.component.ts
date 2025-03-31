import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import  { AuthService, User } from "../../services/auth.service"
import  { PostService, Post } from "../../services/post.service"
import { ContextService } from "../../services/context.service"
import { AvatarComponent } from "../../shared/avatar/avatar.component"

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,AvatarComponent],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null
  userPosts: Post[] = []
  isLoading = true
  isSaving = false
  profileForm: FormGroup
  path="C:\\Users\\Karthik Goud\\Desktop\\golang\\social-app\\backend\\uploads\\"

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private contextService: ContextService,
    private fb: FormBuilder,
  ) {
    this.profileForm = this.fb.group({
      username: [this.currentUser?.username || "", [Validators.required]],
      bio: ["", [Validators.maxLength(160)]],
    })
  }

  ngOnInit(): void {
    this.contextService.getUser().subscribe(user => {
      this.currentUser = user
    })
    this.loadUserPosts()

    console.log(this.userPosts)
  }

  loadUserPosts(): void {
    this.isLoading = true
    this.postService.getPost(this.currentUser?.id).subscribe(data=>{
      this.userPosts = data
      
      this.isLoading = false    
      console.log(data)
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

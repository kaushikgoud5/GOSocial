import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import  { PostService, Post } from "../../services/post.service"
import  { AuthService, User } from "../../services/auth.service"

@Component({
  selector: "app-feed",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"],
})
export class FeedComponent implements OnInit {
  posts: Post[] = []
  isLoading = true
  isPosting = false
  currentUser: User | null = null
  postForm: FormGroup

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.postForm = this.fb.group({
      content: ["", [Validators.required, Validators.maxLength(500)]],
    })
    this.currentUser = this.authService.currentUser
  }

  ngOnInit(): void {
    this.loadPosts()
  }

  loadPosts(): void {
    this.isLoading = true
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts
        this.isLoading = false
      },
      error: () => {
        this.isLoading = false
      },
    })
  }

  createPost(): void {
    if (this.postForm.invalid) {
      return
    }

    this.isPosting = true
    const { content } = this.postForm.value

    this.postService.addPost(content).subscribe({
      next: () => {
        this.postForm.reset()
        this.isPosting = false
      },
      error: () => {
        this.isPosting = false
      },
    })
  }

  likePost(postId: number): void {
    this.postService.likePost(postId)
  }
}


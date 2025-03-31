import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import  { PostService, Post } from "../../services/post.service"
import  { AuthService, User } from "../../services/auth.service"
import { AvatarComponent } from "../../shared/avatar/avatar.component"
import { ContextService } from "../../services/context.service"
@Component({
  selector: "app-feed",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,AvatarComponent ],
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"],
})
export class FeedComponent implements OnInit {
  posts: Post[] = []
  user:any
  isLoading = true
  isPosting = false
  currentUser: User | null = null
  postForm: FormGroup
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private contextService: ContextService,
    private fb: FormBuilder,
  ) {
    this.postForm = this.fb.group({
      content: ["", [Validators.required, Validators.maxLength(500)]],
      image: [null]
    })
    this.currentUser = this.authService.currentUser
  }

  ngOnInit(): void {
    // this.loadPosts()
    this.contextService.getUser().subscribe(user => {
      this.user = user;
      this.postService.getPost(user.id).subscribe(data=>{
        this.posts = data
        
        this.isLoading = false    
        console.log(data)
      })
      console.log(user)
    });
    this.postService.setUser(this.currentUser?.avatar, this.currentUser?.username)
    console.log(this.currentUser?.id)
    
  }

  // loadPosts(): void {
  //   this.isLoading = true
  //   this.postService.getPosts().subscribe({
  //     next: (posts) => {
  //       this.posts = posts
  //       this.isLoading = false
  //     },
  //     error: () => {
  //       this.isLoading = false
  //     },
  //   })
  // }

  createPost(): void {
    if (this.postForm.invalid) {
      return
    }

    this.isPosting = true
    const formData = new FormData();
    formData.append('caption', this.postForm.value.content);
    formData.append('userId', this.user.id);
    formData.append('username', this.user.username);
    formData.append('image', this.selectedFile as Blob);
    formData.append('likes', '0');
    formData.append('comments', '0');
    formData.append('createdAt', new Date().toISOString());
    console.log(formData)
    this.postService.addPost(formData).subscribe({
      next: () => {
        this.postForm.reset()
        this.selectedFile = null;
        this.imagePreview = '';
        this.isPosting = false
      },
      error: () => {
        this.isPosting = false
      },
    })
  }
  clearImage() {
    this.selectedFile = null;
    this.imagePreview = '';
  }
  likePost(postId: any): void {
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      // Generate a preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // likePost(postId: any): void {
  //   this.postService.likePost(postId)
  // }
}


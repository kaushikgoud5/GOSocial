import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { delay } from "rxjs/operators"
import { ContextService } from "./context.service"

export interface Post {
  id?: number
  userId: string  
  username: string
  caption: string
  imageURL?: string
  likes: number
  comments: number
  createdAt: Date
}

@Injectable({
  providedIn: "root",
})
export class PostService {
  URL="http://localhost:8080/"

  private userData = new BehaviorSubject<{ photoURL?: string; displayName?: string }>({});
  
  // Observable to be used by components
  user$ = this.userData.asObservable();

  // Method to update user data
  setUser(photoURL?: string, displayName?: string) {
    this.userData.next({ photoURL, displayName });
  }
  // private mockPosts: Post[] = [
  //   {
  //     id: 1,
  //     userId: 2,
  //     username: "janedoe",
  //     caption: "Just finished a great book! 📚",
  //     image: "/placeholder.svg?height=400&width=600",
  //     likes: 24,
  //     comments: 3,
  //     createdAt: new Date(Date.now() - 3600000),
  //   },
  //   {
  //     id: 2,
  //     userId: 3,
  //     username: "mikesmith",
  //     caption: "Beautiful day for hiking! 🏔️",
  //     image: "/placeholder.svg?height=400&width=600",
  //     likes: 42,
  //     comments: 7,
  //     createdAt: new Date(Date.now() - 7200000),
  //   },
  //   {
  //     id: 3,
  //     userId: 1,
  //     username: "johndoe",
  //     caption: "Working on a new project. Can't wait to share it with everyone!",
  //     likes: 15,
  //     comments: 2,
  //     createdAt: new Date(Date.now() - 10800000),
  //   },
  // ]

  constructor(private http: HttpClient,private context:ContextService) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.URL}getPosts`);
  }

  addPost(data:any): Observable<Post> {    
    return this.http.post<Post>(`${this.URL}addPost`, data);
  }
  getPost(userId: any): Observable<Post[]> {
    const data = {
      userId: userId
    }
    return this.http.post<Post[]>(`${this.URL}getPostsByUserID`,data)
  }
  getUserId(): string | null {
    return this.context.getUserId();
  }
  getUserName(): string | null {
    return this.context.getCurrentUser().username;
  }
  // likePost(postId: number): void {
  //   const post = this.mockPosts.find((p) => p.id === postId)
  //   if (post) {
  //     post.likes++
  //   }
  // }
}


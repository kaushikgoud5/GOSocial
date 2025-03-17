import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"
import { delay } from "rxjs/operators"

export interface Post {
  id: number
  userId: number
  username: string
  userAvatar: string
  content: string
  image?: string
  likes: number
  comments: number
  createdAt: Date
}

@Injectable({
  providedIn: "root",
})
export class PostService {
  private mockPosts: Post[] = [
    {
      id: 1,
      userId: 2,
      username: "janedoe",
      userAvatar: "/placeholder.svg?height=50&width=50",
      content: "Just finished a great book! 📚",
      image: "/placeholder.svg?height=400&width=600",
      likes: 24,
      comments: 3,
      createdAt: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      userId: 3,
      username: "mikesmith",
      userAvatar: "/placeholder.svg?height=50&width=50",
      content: "Beautiful day for hiking! 🏔️",
      image: "/placeholder.svg?height=400&width=600",
      likes: 42,
      comments: 7,
      createdAt: new Date(Date.now() - 7200000),
    },
    {
      id: 3,
      userId: 1,
      username: "johndoe",
      userAvatar: "/placeholder.svg?height=50&width=50",
      content: "Working on a new project. Can't wait to share it with everyone!",
      likes: 15,
      comments: 2,
      createdAt: new Date(Date.now() - 10800000),
    },
  ]

  constructor() {}

  getPosts(): Observable<Post[]> {
    return of(this.mockPosts).pipe(delay(1000))
  }

  addPost(content: string, image?: string): Observable<Post> {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const newPost: Post = {
      id: this.mockPosts.length + 1,
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      content,
      image,
      likes: 0,
      comments: 0,
      createdAt: new Date(),
    }

    this.mockPosts.unshift(newPost)
    return of(newPost).pipe(delay(1000))
  }

  likePost(postId: number): void {
    const post = this.mockPosts.find((p) => p.id === postId)
    if (post) {
      post.likes++
    }
  }
}


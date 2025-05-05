import { Component } from "@angular/core"
import { RouterLink, Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { AuthService, User } from "../../services/auth.service"
import { FormsModule } from "@angular/forms"
import { PostService } from "../../services/post.service"
import { ContextService } from "../../services/context.service"

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  allUsers: any[] = [];           // Cache of all users
  searchResults: any[] = [];      // Filtered results
  searchQuery: string = '';       // Search input
  showResults: boolean = false;   // Toggle dropdown
  userId: string = '';          // Current user ID

  constructor(
    private authService: AuthService,
    private router: Router,
    private postService :PostService,
    private contextService: ContextService
  ) {}

  ngOnInit(): void {
    this.contextService.getUser().subscribe(user => {
      this.userId = user.id; // Get the current user's ID
    }
    );
  }

  searchUsers(): void {
    if (this.searchQuery.trim() === '') {
      this.clearSearch();
      return;
    }

    if (this.allUsers.length === 0) {
      // Fetch once and cache
      this.authService.getUsers().subscribe((results: any) => {
        this.allUsers = results;
        this.filterUsers();
      });
    } else {
      this.filterUsers();
    }
  }

  filterUsers(): void {
    this.searchResults = this.allUsers.filter(user =>
      user["Username"].toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.showResults = this.searchResults.length > 0;
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.showResults = false;
  }

  followUser(user: any, event: Event): void {
    event.stopPropagation(); 
    const data ={
      
        "fromUserId": this.userId,
        "toUserId": user.UserId,
        "createdAt": Date.now().toString(),
        "updatedAt": Date.now().toString(),
        "status": 0
      
    }
    this.postService.sendRequest(data).subscribe((response: any) => {
      console.log(response); // Handle the response as needed
    }
    );
    this.clearSearch(); // Clear search results after following a user
    }

  viewUserProfile(user: any): void {
    console.log('View profile', user);
    this.router.navigate(['/profile', user.UserId]); 
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}


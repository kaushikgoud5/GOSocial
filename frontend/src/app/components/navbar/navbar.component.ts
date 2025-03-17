import { Component } from "@angular/core"
import { RouterLink, Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  logout(): void {
    this.authService.logout()
    this.router.navigate([""])
  }
}


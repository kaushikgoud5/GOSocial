import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
      path: "",
      loadComponent: () => import("./pages/login/login.component").then((m) => m.LoginComponent),
      canActivate: [() => !localStorage.getItem("user")],
    },
    {
      path: "feed",
      loadComponent: () => import("./pages/feed/feed.component").then((m) => m.FeedComponent),
    },
    {
      path: "profile",
      loadComponent: () => import("./pages/profile/profile.component").then((m) => m.ProfileComponent),
      canActivate: [authGuard],
    },
    {
      path: "**",
      redirectTo: "",
    },
  ]

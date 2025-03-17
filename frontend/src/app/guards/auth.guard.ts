import { inject } from "@angular/core"
import { Router } from "@angular/router"

export const authGuard = () => {
  const router = inject(Router)

  if (localStorage.getItem("user")) {
    return true
  }

  router.navigate([""])
  return false
}


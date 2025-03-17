package routes

import (
	"kaushikgoud5/github/social-app/handlers"
	"kaushikgoud5/github/social-app/middleware"
	"net/http"
)

func SetupRoutes() {

	http.HandleFunc("/login", middleware.CORSMiddleware(handlers.Login))
	http.HandleFunc("/signup", middleware.CORSMiddleware(handlers.Signup))
	http.Handle("/protected", middleware.AuthMiddleWare(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Protected"))
	}))
}

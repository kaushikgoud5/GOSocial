package routes

import (
	"kaushikgoud5/github/social-app/handlers"
	"kaushikgoud5/github/social-app/middleware"
	"net/http"
)

func SetupRoutes() {

	http.HandleFunc("/login", middleware.CORSMiddleware(handlers.Login))
	http.HandleFunc("/signup", middleware.CORSMiddleware(handlers.Signup))
	http.HandleFunc("/addPost", middleware.CORSMiddleware(handlers.AddPost))
	http.HandleFunc("/getPosts", middleware.CORSMiddleware(handlers.GetPosts))
	http.HandleFunc("/getUsers", middleware.CORSMiddleware(handlers.GetUsers))
	http.HandleFunc("/getPostsByUserID", middleware.CORSMiddleware(handlers.GetPostsByUserID))
	http.HandleFunc("/socializeRequest", middleware.CORSMiddleware(handlers.SocializeRequest))
	http.HandleFunc("/getNotifications", middleware.CORSMiddleware(handlers.GetNotifications))
	http.Handle("/protected", middleware.AuthMiddleWare(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Protected"))
	}))
}

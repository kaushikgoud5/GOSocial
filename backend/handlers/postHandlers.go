package handlers

import (
	"encoding/json"
	"fmt"
	"kaushikgoud5/github/social-app/database"
	"kaushikgoud5/github/social-app/models"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddPost(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	file, fileHeader, err := r.FormFile("image")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()
	imageURL, err := database.UploadImage(file, fileHeader)
	caption := r.FormValue("caption")
	userId := r.FormValue("userId")
	username := r.FormValue("username")
	objectID, err := primitive.ObjectIDFromHex(userId)
	post := models.Post{
		ID:              primitive.NewObjectID(),
		UserId:          objectID,
		Username:        username,
		Caption:         caption,
		ImageURL:        imageURL,
		Likes:           0,
		Comments:        0,
		PostedTimestamp: time.Now().String(),
	}
	fmt.Println(post)
	err = database.AddPost(post)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	response := map[string]interface{}{
		"message": "Post created successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
func GetPosts(w http.ResponseWriter, r *http.Request) {
	database.GetPosts()
	w.Write([]byte("Get Posts"))
}

func GetPostsByUserID(w http.ResponseWriter, r *http.Request) {
	response := r.Body
	defer response.Close()
	var post models.Post
	if err := json.NewDecoder(response).Decode(&post); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Println(post.UserId.Hex())
	if !database.FindUserById(post.UserId.Hex()) {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}
	posts, _ := database.GetPostsByUserID(post.UserId.Hex())
	fmt.Println(posts)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

package handlers

import (
	"encoding/json"
	"fmt"
	"kaushikgoud5/github/social-app/database"
	"kaushikgoud5/github/social-app/models"
	"net/http"
)

func GetNotifications(w http.ResponseWriter, r *http.Request) {
	response := r.Body
	defer response.Close()
	var notify models.Notification
	if err := json.NewDecoder(response).Decode(&notify); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Println(notify.UserID)
	if !database.FindUserById(notify.UserID) {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}
	notifications, _ := database.GetUserNotifications(notify.UserID)
	fmt.Println(notifications)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(notifications)
}

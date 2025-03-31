package handlers

import (
	"encoding/json"
	"fmt"
	"kaushikgoud5/github/social-app/database"
	"kaushikgoud5/github/social-app/models"
	"kaushikgoud5/github/social-app/utils"
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {
	response := r.Body
	defer response.Close()
	var user models.User
	if err := json.NewDecoder(response).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	existingUser, err := database.FindUserByName(user.Email)
	fmt.Println(existingUser.Password)
	fmt.Println(user)
	if !database.CheckPasswordHash(user.Password, existingUser.Password) {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}
	token, err := utils.GenerateToken(existingUser.Username, existingUser.ID.Hex())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"token": token})
	fmt.Println("Login successful")
}
func Signup(w http.ResponseWriter, r *http.Request) {
	response := r.Body
	defer response.Close()
	var newUser models.User
	if err := json.NewDecoder(response).Decode(&newUser); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	hashedPassword, _ := database.HashPassword(newUser.Password)
	newUser.Password = hashedPassword
	err := database.CreateUser(newUser)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write([]byte("Signup successful"))
}

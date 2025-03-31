package database

import (
	"context"
	"fmt"
	"kaushikgoud5/github/social-app/config"
	"kaushikgoud5/github/social-app/models"

	"golang.org/x/crypto/bcrypt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// Global collection reference
var userCollection *mongo.Collection

// ✅ Explicit function to set UserCollection after DB is initialized
func SetUserCollection() {
	if config.UserCollection == nil {
		panic("❌ ERROR: UserCollection is still nil. Make sure InitDB() is called first.")
	}
	userCollection = config.UserCollection
	fmt.Println("✅ User collection assigned successfully!")
}

// 🔹 Hash password securely
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// 🔹 Compare hashed password
func CheckPasswordHash(password, hash string) bool {
	if len(hash) < 60 { // Prevent comparing if hash is too short
		fmt.Println("Invalid hash length:", hash)
		return false
	}
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// 🔹 Find user by username
func FindUserByName(email string) (*models.User, error) {
	var user models.User
	err := userCollection.FindOne(context.Background(), bson.M{"email": email}).Decode(&user)
	return &user, err
}

// 🔹 Create a new user in MongoDB
func CreateUser(user models.User) error {
	_, err := userCollection.InsertOne(context.TODO(), user)
	return err
}

package database

import (
	"context"
	"fmt"
	"kaushikgoud5/github/social-app/config"
	"kaushikgoud5/github/social-app/models"
	"kaushikgoud5/github/social-app/models/enums"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)

var socializeRequestCollection *mongo.Collection

func SetSocializeRequestCollection() {
	socializeRequestCollection = config.SocializeRequestsCollection
	if socializeRequestCollection == nil {
		panic("❌ ERROR: SocializeRequest is still nil. Make sure InitDB() is called first.")
	}
	fmt.Println("✅ SocializeRequest collection assigned successfully!")
}

func SendSocializeRequest(request models.SocialRequest) error {
	request.Status = enums.PENDING
	request.CreatedAt = time.Now().UTC().Format("2006-01-02 15:04:05")
	request.UpdatedAt = time.Now().UTC().Format("2006-01-02 15:04:05")
	_, err := socializeRequestCollection.InsertOne(context.Background(), request)
	if err != nil {
		fmt.Println("Error inserting socialize request:", err)
		return nil
	}
	return nil
}

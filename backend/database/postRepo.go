package database

import (
	"context"
	"fmt"
	"kaushikgoud5/github/social-app/config"
	"kaushikgoud5/github/social-app/models"
	"mime/multipart"

	"github.com/cloudinary/cloudinary-go/api/uploader"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var postCollection *mongo.Collection

func SetPostCollection() {
	if config.PostsCollection == nil {
		panic("❌ ERROR: Post is still nil. Make sure InitDB() is called first.")
	}
	postCollection = config.PostsCollection
	fmt.Println("✅ User collection assigned successfully!")
}

func AddPost(post models.Post) error {
	_, err := postCollection.InsertOne(context.Background(), post)
	return err
}

func GetPosts() {

}

func GetPostsByUserID(userID string) ([]models.Post, error) {
	var posts []models.Post
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, fmt.Errorf("invalid user ID format")
	}
	fmt.Print("Object ID: ")
	fmt.Println(objectID)
	cursor, err := postCollection.Find(context.Background(), bson.M{"userId": objectID})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var post models.Post
		if err := cursor.Decode(&post); err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return posts, nil
}

func FindUserById(id string) bool {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return false
	}

	var user models.User
	err = userCollection.FindOne(context.Background(), bson.M{"_id": objectID}).Decode(&user)
	return err == nil
}

func UploadImage(file multipart.File, fileHeader *multipart.FileHeader) (string, error) {
	ctx := context.Background()
	uploadResult, err := config.CLD.Upload.Upload(
		ctx,
		file,
		uploader.UploadParams{
			PublicID: fileHeader.Filename,
			Folder:   "my_images",
		},
	)
	if err != nil {
		return "", fmt.Errorf("failed to upload image: %v", err)
	}
	fmt.Println("Image uploaded successfully:", uploadResult)
	return uploadResult.SecureURL, nil
}

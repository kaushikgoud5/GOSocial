package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/cloudinary/cloudinary-go"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database
var UserCollection *mongo.Collection
var PostsCollection *mongo.Collection
var CLD *cloudinary.Cloudinary
var SocializeRequestsCollection *mongo.Collection
var NotificationCollection *mongo.Collection

func InitDB() {
	var err error
	CLD, err = cloudinary.NewFromParams(
		os.Getenv("CLOUDINARY_CLOUD_NAME"),
		os.Getenv("CLOUDINARY_API_KEY"),
		os.Getenv("CLOUDINARY_API_SECRET"),
	)
	if err != nil {
		log.Fatalf("Failed to initialize Cloudinary: %v", err)
	}
	fmt.Println("Initializing MongoDB connection...")
	err = godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	mongoURI := os.Getenv("MONGO_URI")
	mongoDB := os.Getenv("MONGO_DB")

	if mongoURI == "" {
		log.Fatal("MONGO_URI is not set in .env file")
	}
	if mongoDB == "" {
		log.Fatal("MONGO_DB is not set in .env file")
	}

	clientOptions := options.Client().ApplyURI(mongoURI)

	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal("Error creating MongoDB client:", err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal("MongoDB connection failed:", err)
	}

	fmt.Println("✅ Connected to MongoDB!")
	DB = client.Database(mongoDB)

	UserCollection = DB.Collection("users")
	PostsCollection = DB.Collection("posts")
	SocializeRequestsCollection = DB.Collection("socialize_requests")
	NotificationCollection = DB.Collection("notifications")
	fmt.Println("✅ Collections initialized successfully!")
}

// GetCollection returns a specific MongoDB collection
func GetCollection(name string) *mongo.Collection {
	if DB == nil {
		log.Fatal("❌ Database connection is not initialized")
	}
	return DB.Collection(name)
}

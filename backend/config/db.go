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
	fmt.Println("🔹 Initializing MongoDB connection...")
	// Load environment variables
	err = godotenv.Load()
	if err != nil {
		log.Fatal("❌ Error loading .env file")
	}

	// Fetch MongoDB URI and DB name
	mongoURI := os.Getenv("MONGO_URI")
	mongoDB := os.Getenv("MONGO_DB")

	// ✅ Validate environment variables
	if mongoURI == "" {
		log.Fatal("❌ MONGO_URI is not set in .env file")
	}
	if mongoDB == "" {
		log.Fatal("❌ MONGO_DB is not set in .env file")
	}

	fmt.Println("🔹 MongoDB URI:", mongoURI)
	fmt.Println("🔹 MongoDB Name:", mongoDB)

	// Set up MongoDB client options
	clientOptions := options.Client().ApplyURI(mongoURI)

	// Create MongoDB client
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal("❌ Error creating MongoDB client:", err)
	}

	// Establish MongoDB connection
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal("❌ MongoDB connection failed:", err)
	}

	// ✅ Ping MongoDB to check connection
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("❌ MongoDB ping failed:", err)
	}

	fmt.Println("✅ Connected to MongoDB!")

	// Select the database
	DB = client.Database(mongoDB)

	// ✅ Initialize collections
	UserCollection = DB.Collection("users")
	PostsCollection = DB.Collection("posts")
	if UserCollection == nil {
		log.Fatal("❌ User collection is still nil!")
	} else {
		fmt.Println("✅ Users collection initialized successfully!")
	}
}

// GetCollection returns a specific MongoDB collection
func GetCollection(name string) *mongo.Collection {
	if DB == nil {
		log.Fatal("❌ Database connection is not initialized")
	}
	return DB.Collection(name)
}

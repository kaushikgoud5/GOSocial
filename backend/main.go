package main

import (
	"fmt"
	"kaushikgoud5/github/social-app/config"
	"kaushikgoud5/github/social-app/database"
	"kaushikgoud5/github/social-app/events"
	"kaushikgoud5/github/social-app/routes"
	"log"
	"net/http"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config.InitDB()
	fmt.Println("MongoDB initialized successfully!")

	database.SetSocializeRequestCollection()
	database.SetUserCollection()
	database.SetPostCollection()
	database.SetNotificationCollection()

	events.InitProducer(config.Load().KafkaBroker)
	go events.StartSocializeRequestConsumer(config.Load().KafkaBroker)

	routes.SetupRoutes()

	log.Fatal(http.ListenAndServe(":8080", nil))

}

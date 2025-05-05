package events

import (
	"context"
	"encoding/json"
	"fmt"
	"kaushikgoud5/github/social-app/database"
	"log"

	"github.com/segmentio/kafka-go"
)

func StartSocializeRequestConsumer(brokerAddress string) {
	reader := kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{brokerAddress},
		Topic:   "socialize-requests",
		GroupID: "socialize-request-group",
	})

	for {
		m, err := reader.ReadMessage(context.Background())
		if err != nil {
			log.Printf("Error reading message: %v", err)
			continue
		}

		var event SocializeRequestCreatedEvent
		err = json.Unmarshal(m.Value, &event)
		if err != nil {
			log.Printf("Error unmarshaling event: %v", err)
			continue
		}

		fmt.Printf("Received Socialize Request Event: %+v\n", event)

		err = database.CreateNotification(event.ToUserID.Hex(), fmt.Sprintf("%s sent you a friend request!", event.FromUserID.Hex()))
		if err != nil {
			log.Printf("Error saving notification: %v", err)
		}
	}
}

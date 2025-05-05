package events

import (
	"context"
	"encoding/json"
	"log"

	"github.com/segmentio/kafka-go"
)

var writer *kafka.Writer

func InitProducer(brokerAddress string) {
	writer = &kafka.Writer{
		Addr:     kafka.TCP(brokerAddress),
		Topic:    "socialize-requests",
		Balancer: &kafka.LeastBytes{},
	}
}

func PublishSocializeRequestCreated(event SocializeRequestCreatedEvent) {
	payload, _ := json.Marshal(event)
	err := writer.WriteMessages(context.Background(), kafka.Message{Value: payload})
	if err != nil {
		log.Printf("Error publishing SocializeRequestCreatedEvent: %v", err)
	}
}

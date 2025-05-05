package events

import "go.mongodb.org/mongo-driver/bson/primitive"

type SocializeRequestCreatedEvent struct {
	RequestID  primitive.ObjectID `json:"request_id"`
	FromUserID primitive.ObjectID `json:"from_user_id"`
	ToUserID   primitive.ObjectID `json:"to_user_id"`
	Message    string             `json:"message"`
	CreatedAt  string             `json:"created_at"`
}

type FriendRequestRespondedEvent struct {
	RequestID string `json:"request_id"`
	Status    string `json:"status"`
}

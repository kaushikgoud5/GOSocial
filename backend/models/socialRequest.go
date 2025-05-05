package models

import (
	"kaushikgoud5/github/social-app/models/enums"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SocialRequest struct {
	ID         string               `json:"id" bson:"_id,omitempty"`
	FromUserId primitive.ObjectID   `json:"fromUserId" bson:"fromUserID,omitempty"`
	ToUserId   primitive.ObjectID   `json:"toUserId" bson:"toUserID,omitempty"`
	CreatedAt  string               `json:"createdAt" bson:"createdAt,omitempty"`
	UpdatedAt  string               `json:"updatedAt" bson:"updatedAt,omitempty"`
	Status     enums.SocalizeStatus `json:"status" bson:"status"`
	// Status can be "pending", "accepted", "rejected", "cancelled"
}

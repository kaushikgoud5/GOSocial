package models

import "time"

type Notification struct {
	ID          string    `json:"id" bson:"_id,omitempty"`
	UserID      string    `json:"userId" bson:"userId,omitempty"`
	Type        string    `json:"type" bson:"type"`
	Message     string    `json:"message" bson:"message"`
	IsRead      bool      `json:"isRead" bson:"isRead"`
	CreatedAt   time.Time `json:"createdAt" bson:"createdAt"`
	RelatedLink string    `json:"relatedLink" bson:"relatedLink"`
}

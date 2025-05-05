package database

import (
	"context"
	"kaushikgoud5/github/social-app/config"
	"kaushikgoud5/github/social-app/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var notificationCollection *mongo.Collection

func SetNotificationCollection() {
	notificationCollection = config.NotificationCollection
	if notificationCollection == nil {
		panic(" ERROR: Notification is still nil. Make sure InitDB() is called first.")
	}
}
func CreateNotification(userID string, message string) error {
	notification := models.Notification{
		UserID:    userID,
		Message:   message,
		IsRead:    false,
		CreatedAt: time.Now().UTC(),
	}
	_, err := notificationCollection.InsertOne(context.Background(), notification)
	return err
}
func GetUserNotifications(userId string) ([]models.Notification, error) {
	filter := bson.M{"userId": userId, "isRead": false}
	cursor, err := notificationCollection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	var notifications []models.Notification
	if err := cursor.All(context.Background(), &notifications); err != nil {
		return nil, err
	}
	return notifications, nil
}

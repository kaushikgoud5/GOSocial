package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Comments struct {
	ID          primitive.ObjectID `bson:"_id"`
	PostId      primitive.ObjectID `bson:"postId"`
	UserId      primitive.ObjectID `bson:"userId"`
	Comment     string             `bson:"comment"`
	CommentedAt string             `bson:"commentedAt"`
}

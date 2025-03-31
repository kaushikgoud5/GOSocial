package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Post struct {
	ID              primitive.ObjectID `bson:"_id,omitempty"json:"id"`
	UserId          primitive.ObjectID `bson:"userId"	json:"userId"`
	Caption         string             `bson:"caption" json:"caption"`
	ImageURL        string             `bson:"imageURL" json:"imageURL"`
	PostedTimestamp string             `bson:"postedTimestamp" json:"postedTimestamp"`
	Likes           int                `bson:"likes" json:"likes"`
	Comments        int                `bson:"comments" json:"comments"`
	Username        string             `bson:"username" json:"username"`
}

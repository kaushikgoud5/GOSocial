package handlers

import (
	"encoding/json"
	"fmt"
	"kaushikgoud5/github/social-app/database"
	"kaushikgoud5/github/social-app/events"
	"kaushikgoud5/github/social-app/models"
	"net/http"
)

func SocializeRequest(w http.ResponseWriter, r *http.Request) {
	response := r.Body
	defer response.Close()
	var socaializeRequest models.SocialRequest
	err := json.NewDecoder(response).Decode(&socaializeRequest)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Println(socaializeRequest)
	err = database.SendSocializeRequest(socaializeRequest)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	event := events.SocializeRequestCreatedEvent{
		FromUserID: socaializeRequest.FromUserId,
		ToUserID:   socaializeRequest.ToUserId,
		Message:    "Sended A Request",
		CreatedAt:  socaializeRequest.CreatedAt,
	}
	events.PublishSocializeRequestCreated(event)

}

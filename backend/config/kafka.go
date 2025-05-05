package config

import "os"

type Config struct {
	KafkaBroker string
}

func Load() Config {
	return Config{
		KafkaBroker: os.Getenv("KAFKA_BROKER"),
	}
}

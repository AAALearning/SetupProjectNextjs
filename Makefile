build:
	docker compose build

up:
	docker compose up

down:
	docker compose down

# Delete volumn too
down-v:
	docker compose down -v

# Detach mode
up-d:
	docker compose up -d

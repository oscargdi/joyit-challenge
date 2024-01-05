DOCKER_IMAGE_TAG = $(shell git log -1 --pretty=format:"%H")

.PHONY: build
build:
	@echo "Building..."
	docker build -t $(DOCKER_IMAGE_TAG) .

.PHONY: run
run:
	@echo "Running..."
	docker run -it --rm -p 8080:3000 $(DOCKER_IMAGE_TAG)

.PHONY: up
up:
	@echo "Running..."
	docker-compose up --build

.PHONY: down
down:
	@echo "Stopping..."
	docker-compose down --remove-orphans

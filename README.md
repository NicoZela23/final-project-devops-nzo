# FlavorFlex DevOps Project

## Overview

FlavorFlex is a simple React application designed to be a recipe hub based on the needs on recipes of the users. This project includes a CI/CD pipeline using GitHub Actions to build a Docker image and deploy it to Docker Hub.

## Table of Contents

- [Prerequisites](#prerequisites)

- [Installation and running the project locally](#Local)

- [Running the project using docker](#Docker)

- [Get the application using Docker Hub](#Docker-Hub)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (version 20.15.0)
- [Docker](https://www.docker.com/get-started)
- [Docker Hub Account](https://hub.docker.com/)
- [Git](https://git-scm.com/)

## Local

1. Clone the repository:

`bash
   git clone https://github.com/NicoZela23/final-project-devops-nzo.git
   cd final-project-devops-nzo
   `

2. Install the dependencies and start the server

`bash
   npm install
   npm run dev
   `

## Docker

1. Clone the repository:

`bash
   git clone https://github.com/NicoZela23/final-project-devops-nzo.git
   cd final-project-devops-nzo
   `

2. Build the project with Docker and check if it is available in your images

`bash
   docker build -t final-project-devops-nzo:local .
   docker images
   `

3. Run the Docker Container Locally

`bash
	docker run -d -p 8080:80 final-project-devops-nzo:local
   `

4. Test the Running Application
   [Application Link](http://localhost:8080)

## Docker-Hub

1. Login into Docker (new users)

`bash
	docker login
   `

and Enter your Docker Hub username and password when prompted.

2. Pull the project from Docker Hub

`bash
	docker pull nicozela23/final-project-devops-nzo
   `

3. Run the Docker Container

`bash
	docker run -d -p 8080:80 final-project-devops-nzo:local
   `

4. Check the running containers

`bash
	docker ps
   `

5. Test the Running Application
   [Application Link](http://localhost:8080)

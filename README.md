# Todo

# 📝 Todo App with Jenkins CI/CD

A simple Todo application built with HTML, CSS, and JavaScript. The main focus of this project is the automated deployment. 🚀

## 📌 Project Overview

This repository contains the frontend code for the app along with the configuration files (`Dockerfile`, `docker-compose.yml`).

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Containerization:** Docker, Docker Compose v2
* **CI/CD:** Jenkins
* **Hosting:** AWS EC2 ☁️

## 🔄 Pipeline Workflow

The deployment is handled by a Jenkins pipeline. When it runs, it automatically goes through the following stages:

1. **Clone Code:** Pulls the latest code from this repository.
2. **Build:** Builds the Docker image using the provided `Dockerfile`.
3. **Test:** Runs basic checks to make sure the build is stable.
4. **Push to Docker Hub:** Pushes the newly built image to a Docker Hub repository.
5. **Deploy:** Uses Docker Compose to pull the image and spin up the container directly on the EC2 instance. 🚀

## ⚙️ Setup Requirements

If you are setting this up yourself, you will need an AWS EC2 instance with the following:

* Jenkins installed and running.
* Docker and Docker Compose v2 installed.
* The Jenkins user added to the Docker group (so Jenkins can run Docker commands).
* Port 80 (or your target port) opened in the EC2 Security Group to allow HTTP web traffic.
* Docker Hub credentials saved in Jenkins.

## 🌐 How to Access

Once the pipeline succeeds, the app is automatically deployed. You can view the live Todo app by going to your EC2 instance public IP:

```text
http://<your-ec2-public-ip>
```

✨ The application is automatically deployed through the Jenkins CI/CD pipeline.


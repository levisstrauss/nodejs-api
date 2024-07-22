# Patient Monitoring API

This project is a backend API for monitoring patients, built with TypeScript and Docker, and hosted on AWS EC2. The API provides endpoints to manage patient data, monitor their status, and store information securely.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Docker Setup](#docker-setup)
- [AWS EC2 Deployment](#aws-ec2-deployment)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **CRUD Operations**: Create, read, update, and delete patient records.
- **TypeScript**: Written in TypeScript for better type safety and developer experience.
- **Express**: Uses Express.js as the web framework.
- **Docker**: Containerized with Docker for easy deployment.
- **MySQL**: MySQL database integration.
- **RESTful API**: Follows REST principles for API design.

## Requirements

- [Node.js](https://nodejs.org/) >= 12.x
- [Docker](https://www.docker.com/)
- [AWS Account](https://aws.amazon.com/)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/patient-monitoring-api.git
    cd patient-monitoring-api
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the root directory and add your environment variables (see [Environment Variables](#environment-variables) section).

4. **Build the Project**

    ```bash
    npm run build
    ```

5. **Run the Project**

    ```bash
    npm start
    ```

## Usage

To use the API, you can send HTTP requests to the endpoints described in the [API Endpoints](#api-endpoints) section.

## API Endpoints

- **GET /patients**: Retrieve all patient records.
- **GET /patient/:id**: Retrieve a specific patient record by ID.
- **POST /patient**: Create a new patient record.
- **PUT /patient/:id**: Update an existing patient record by ID.
- **DELETE /patient/:id**: Delete a patient record by ID.

## Docker Setup

1. **Build Docker Image**

    ```bash
    docker build -t patient-monitoring-api .
    ```

2. **Run Docker Container**

    ```bash
    docker-compose up -d
    ```

## AWS EC2 Deployment

1. **Launch an EC2 Instance**
    - Choose an Amazon Machine Image (AMI) (e.g., Amazon Linux 2).
    - Choose an instance type (e.g., t2.micro for free tier).
    - Configure security group to allow inbound traffic on necessary ports (e.g., 3000 for the API and 3306 for MySQL).

2. **SSH into the Instance**

    ```bash
    ssh -i your-key-pair.pem ec2-user@your-ec2-public-ip
    ```

3. **Install Docker and Docker Compose**

    ```bash
    sudo yum update -y
    sudo amazon-linux-extras install docker
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    exit
    ```

    Reconnect to apply the usermod changes.

    ```bash
    ssh -i your-key-pair.pem ec2-user@your-ec2-public-ip
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    ```

4. **Clone the Repository on EC2**

    ```bash
    git clone https://github.com/your-username/patient-monitoring-api.git
    cd patient-monitoring-api
    ```

5. **Run Docker Compose**

    ```bash
    docker-compose up -d --build
    ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=3306
PORT=3000

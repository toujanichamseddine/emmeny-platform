# Emmeny Platform

An initial backend scaffold for a multilingual insurance marketplace serving customers and operators in Tunisia.

## Architecture

See [docs/architecture.md](docs/architecture.md) for the architecture decisions, system diagrams, service boundaries, security considerations, and phased delivery plan. No attachment was present in the workspace when this scaffold was created; revise the proposal against the product and compliance requirements once it is available.

## Services

| Service | Responsibility | Local port |
| --- | --- | --- |
| identity-service | Customer and operator profile metadata | 8081 |
| insurance-service | Insurers and insurance offers | 8082 |
| policy-service | Policy lifecycle and document references | 8083 |
| claims-service | Accident reports and claim status | 8084 |
| assistance-service | Towing and appointment requests | 8085 |
| payment-service | Payment intents and provider references | 8086 |

Each service owns a separate MongoDB database. Document models are initial examples, not finalized insurer or regulatory schemas.

## Run Locally

Requirements: Java 21 or newer, Maven 3.9+, and Docker Compose.

Compile all services:

```sh
mvn test
```

Run the services and local MongoDB:

```sh
docker compose up --build
```

Health endpoints are available at `http://localhost:8081/actuator/health` through `http://localhost:8086/actuator/health`.

The Compose setup is for local development only. Its MongoDB has no authentication and must not be exposed or used with production data. The services currently expose health/management endpoints but do not yet implement customer APIs, authentication, insurer integrations, payments, or document upload.
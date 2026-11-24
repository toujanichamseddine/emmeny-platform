# Emmeny Platform

An initial backend scaffold for a multilingual insurance marketplace serving customers and operators in Tunisia.

## Architecture

See [docs/architecture.md](docs/architecture.md) for the architecture decisions, system diagrams, service boundaries, security considerations, and phased delivery plan. No attachment was present in the workspace when this scaffold was created; revise the proposal against the product and compliance requirements once it is available.

## Customer Web App

The responsive React/TypeScript customer web app is in `apps/customer-web`. It currently demonstrates offer comparison with sample data and French, English, and Arabic UI text.

```sh
cd apps/customer-web
npm install
npm run dev -- --host 0.0.0.0
```

Create a production bundle with `npm run build`. Offer prices and insurers in this first UI are illustrative only; the app is not yet connected to backend APIs.

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

## Offer API and Demo Data

The insurance service exposes `GET http://localhost:8082/api/offers?productType=MOTOR&marketCountry=TN` and the same endpoint with `productType=TRAVEL`. The response is read from the `emmeny_insurance` MongoDB database and contains active offers sorted by numeric premium.

Docker Compose enables the insurance service's `demo` profile, which inserts five clearly named demo offers only when their IDs are absent. The seed is idempotent and is not enabled by default outside Compose. These records and prices are fictional and must not be used as real insurance offers.

The web app proxies `/api` to `http://localhost:8082` during Vite development, so start its Vite server after the Docker Compose services are healthy.

## Account Pages

Offer comparison is public and does not require an account. Registration may choose an individual, professional, or company workspace: individual accounts include vehicle details, professional and company accounts include company metadata and company navigation.  Sign-in and registration are available from the public header; signing in unlocks personal account and policy/document navigation.

The identity service supports customer registration at `POST /api/identity/accounts`, email/password login at `POST /api/identity/sessions`, session restore at `GET /api/identity/sessions/current`, and logout at `POST /api/identity/sessions/logout`. Passwords are BCrypt-hashed; sessions use random opaque values in an HttpOnly, SameSite=Lax cookie, with only SHA-256 token hashes stored in MongoDB and an eight-hour expiry. The customer web app restores and revokes that session. Google, Facebook, e-Houwiya, phone OTP login, account recovery, profile updates, suspension, and deletion are not yet integrated. Add login rate limiting, MFA, and production security review before using real customer data.

Compile all services:

The personal-space vehicle form saves make, model, model year, odometer kilometres, and ownership status through the authenticated `PUT /api/identity/accounts/current/vehicle` endpoint. A signed-in session is required.

```sh
mvn test
```

Run the services and local MongoDB:

```sh
docker compose up --build
```

Health endpoints are available at `http://localhost:8081/actuator/health` through `http://localhost:8086/actuator/health`.

The Compose setup is for local development only. Its MongoDB has no authentication and must not be exposed or used with production data. The services currently expose health/management endpoints; insurer integrations, payments, and document upload are not implemented.
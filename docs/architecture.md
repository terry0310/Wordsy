# Architecture Document for Wordsy

## 1. Overview
This document outlines the high-level architecture for Wordsy, an AI-powered language learning app. It covers the backend and frontend components, their interactions, and third-party services used.

## 2. System Architecture
```mermaid
flowchart LR
  subgraph Client[Frontend (App: iOS/Android)]
    A[Mobile App (React Native / Flutter)]
    B[Authentication (OAuth2/JWT)]
    C[AI Functionality Interface (Sentence Generation, Grammar Checks, etc.)]
    D[Quota and Limit Display]
  end

  subgraph Backend[Backend Services (Node.js / NestJS)]
    GW[AI Gateway]
    AUTH[OAuth2 Authentication]
    QUOTA[Quota Control (Token Bucket)]
    REDACT[Data Redaction]
    CACHE[Cache & Context]
    BATCH[Batch Processing (Queue)]
    SRS[SRS Scheduling (Ebbinghaus)]
    LOGS[Logging & Monitoring]
    DB[(MongoDB)]
    OBJ[(S3 / Cloud Storage)]
    GEM[Google Gemini API]
  end

  A --> GW
  GW --> AUTH
  GW --> QUOTA
  GW --> REDACT
  GW --> CACHE
  GW --> GEM
  GEM --> GW
  GW --> LOGS
  BATCH --> GEM
  CACHE --> GEM
  GW --> DB
  GW --> OBJ
  QUOTA --> DB
  QUOTA --> LOGS

  ```

## 3. Backend Services

API Gateway: Manages requests to Google Gemini API and internal services.

Authentication: OAuth2 and JWT are used to secure user accounts and API calls.

Database: MongoDB stores user data, flashcards, and task history.

Cloud Storage: An AWS S3-compatible service is used for storing files and generated data.

AI Integration: Google Gemini API handles AI tasks such as sentence generation, grammar checks, and synonyms.

## 4. Communication Flow

The user interacts with the app to trigger AI tasks (e.g., generate a sentence).

The request is sent to the API Gateway, which checks for quotas and authorization.

If AI data is not cached or already available, the system queries the Google Gemini API.

The generated data is cached and stored for future use, and the response is sent back to the user.

## 5. Data Security & Compliance

All sensitive user data is encrypted.

SSL/TLS is used to secure data in transit.

Privacy regulations are adhered to, ensuring that user data is managed responsibly.
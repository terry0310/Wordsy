# 2. System Architecture
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

# Event Storming

## Purpose

This document models the complete business lifecycle of Sahayak using business events.

The objective is to understand how the business behaves before designing APIs, databases, services, or distributed architecture.

Every event represents an immutable business fact that has already occurred.

---

# Event Naming Convention

Events must:

- Be written in past tense.
- Represent completed business facts.
- Be independent of implementation.
- Never describe APIs, databases, or technologies.

Examples

User Registered

Job Created

Worker Assigned

---

# Business Domains

The platform consists of the following business domains:

1. Authentication
2. User Management
3. Job Management
4. Matching Engine
5. Communication
6. Job Execution
7. Feedback & Reputation
8. Administration

---

# Workflow

## Authentication

```mermaid
flowchart TD

    A[Actor: User]
    --> B[Command: Register]

    B --> C[Event: OTP Requested]
    C --> D[Policy: Send OTP]
    D --> E[Event: OTP Sent]

    E --> F[Command: Verify OTP]
    F --> G[Event: OTP Verified]

    G --> H[Policy: Create Account]
    H --> I[Event: User Registered]

    I --> J[Command: Login]
    J --> K[Event: User Authenticated]

    K --> L[Policy: Create Session]
    L --> M[Event: Session Established]

    M --> N[Command: Logout]
    N --> O[Event: Session Terminated]
```

---

## Job Management

```mermaid
flowchart TD

    A[Actor: Customer]
    --> B[Command: Create Job]

    B --> C[Event: Job Created]

    C --> D[Policy: Validate Job]

    D --> E[Event: Job Validated]

    E --> F[Policy: Publish Job]

    F --> G[Event: Job Published]

    G --> H[Policy: Start Matching]
```

---

## Matching Engine

```mermaid
flowchart TD

    A[Policy: Start Matching]

    --> B[Event: Matching Started]

    B --> C[Policy: Discover Candidate Workers]

    C --> D[Event: Candidate Workers Discovered]

    D --> E[Policy: Rank Candidates]

    E --> F[Event: Workers Ranked]

    F --> G[Policy: Notify Workers]

    G --> H[Event: Notification Sent]

    H --> I[Command: Accept Job]

    I --> J[Event: Worker Accepted]

    J --> K[Policy: Assign Worker]

    K --> L[Event: Worker Assigned]
```

---

## Communication

```mermaid
flowchart TD

    A[Policy: Enable Conversation]

    --> B[Event: Conversation Created]

    B --> C[Command: Send Message]

    C --> D[Event: Message Sent]

    D --> E[Policy: Deliver Message]

    E --> F[Event: Message Delivered]

    F --> G[Event: Message Read]
```

---

## Job Execution

```mermaid
flowchart TD

    A[Event: Worker Assigned]

    --> B[Policy: Enable Navigation]

    B --> C[Event: Worker Started Navigation]

    C --> D[Event: Worker Arrived]

    D --> E[Command: Start Job]

    E --> F[Event: Job Started]

    F --> G[Event: Work In Progress]

    G --> H[Command: Complete Job]

    H --> I[Event: Job Completed]

    I --> J[Policy: Request Verification]
```

---

## Feedback

```mermaid
flowchart TD

    A[Event: Job Completed]

    --> B[Policy: Request Ratings]

    B --> C[Command: Rate Worker]

    C --> D[Event: Worker Rated]

    D --> E[Command: Rate Customer]

    E --> F[Event: Customer Rated]

    F --> G[Policy: Update Reputation]

    G --> H[Event: Reputation Updated]

    H --> I[Event: Job Closed]
```

---

## Failure Workflow - No Worker Found

```mermaid
flowchart TD

    A[Customer]

    --> B[Command: Create Job]

    B --> C[Event: Job Created]

    C --> D[Event: Matching Started]

    D --> E[Event: No Candidate Found]

    E --> F[Policy: Notify Customer]

    F --> G[Event: Retry Scheduled]
```

---

## Failure Workflow - Worker Timeout

```mermaid
flowchart TD

    A[Event: Worker Notified]

    --> B[Policy: Start Acceptance Timer]

    B --> C[Event: Acceptance Window Expired]

    C --> D[Policy: Select Next Candidate]

    D --> E[Event: Worker Notified]
```

---

## Failure Workflow - Customer Cancels

```mermaid
flowchart TD

    A[Command: Cancel Job]

    --> B[Event: Job Cancelled]

    B --> C[Policy: Notify Worker]

    C --> D[Event: Conversation Closed]

    D --> E[Event: Matching Stopped]

    E --> F[Policy: Release Resources]
```

---

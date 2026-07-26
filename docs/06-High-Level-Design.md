# High Level Design

## Purpose

This document describes the high-level architecture of the Sahayak platform.

It identifies the major system components, their responsibilities, communication patterns, and interactions required to support a scalable, reliable, and real-time service marketplace.

The objective of this document is to provide an architectural blueprint that guides implementation while remaining independent of low-level implementation details.

---

## System Overview

Sahayak follows a modular service-oriented architecture.

The platform separates authentication, user management, job management, matching, communication, and notifications into logical components with clearly defined responsibilities.

This separation improves maintainability, scalability, and enables each component to evolve independently.

---

## Design Principles

The architecture follows the following principles.

- Separation of Concerns
- Modular Design
- API-First Development
- Event-Driven Communication where appropriate
- Stateless Application Layer
- Single Source of Truth
- Scalability by Design
- Security by Default

---

## Architecture Overview

---

## Major Components

The platform consists of the following logical modules.

- Authentication Module
- User Management Module
- Job Management Module
- Matching Engine
- Chat Module
- Notification Module
- Rating & Feedback Module
- Admin Module

---

## Component Responsibilities

| Component      | Responsibility             |
| -------------- | -------------------------- |
| Authentication | Login, Registration, OTP   |
| User           | Profile, Skills, Ratings   |
| Job            | Job Lifecycle              |
| Matching       | Worker Discovery & Ranking |
| Chat           | Messaging                  |
| Notification   | Push Notifications         |
| Rating         | Reviews                    |
| Admin          | Monitoring & Moderation    |

---

## Component Interactions

The Sahayak platform consists of multiple logical modules that collaborate to complete a user's request.

- The **Authentication Module** verifies user identity before allowing access to protected platform features.
- The **User Management Module** manages customer and worker profiles, skills, availability, ratings, and service areas.
- The **Job Management Module** is responsible for creating, updating, cancelling, and tracking service requests.
- After a job is successfully created, the **Matching Engine** identifies suitable workers using location, semantic skill similarity, availability, experience, and reputation.
- The **Notification Module** informs candidate workers about new job opportunities and notifies customers about important job status updates.
- Once a worker is assigned, the **Chat Module** enables real-time communication between the customer and the assigned worker.
- During and after job completion, the **Rating & Feedback Module** collects feedback from both parties and updates reputation scores.
- The **Admin Module** monitors platform activity, manages users, moderates jobs, and provides operational insights.

Each module has a clearly defined responsibility and communicates only through well-defined interfaces, reducing coupling and improving maintainability.

---

## Data Flow

The typical lifecycle of a service request is as follows:

1. A customer creates a new service request.
2. The Job Management Module validates and stores the request.
3. The Matching Engine discovers nearby eligible workers and ranks them using intelligent matching criteria.
4. The Notification Module sends job invitations to selected workers.
5. A worker accepts the request within the acceptance window.
6. The Matching Engine assigns the job to the selected worker.
7. A conversation is created, allowing both parties to communicate in real time.
8. The worker performs the requested service while the job status is continuously updated.
9. Upon completion, both customer and worker submit ratings and feedback.
10. Reputation scores are updated, and the job is marked as completed.

This event-driven workflow ensures clear separation of responsibilities while supporting future scalability and real-time user interactions.

---

## External Services

Sahayak integrates with the following external services to provide mapping, messaging, media storage, and AI-powered recommendations.

| Service                            | Purpose                                                                                                         |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| OpenStreetMap                      | Interactive map visualization                                                                                   |
| Nominatim                          | Geocoding and reverse geocoding                                                                                 |
| OSRM (Open Source Routing Machine) | Route planning and distance calculations                                                                        |
| Firebase Cloud Messaging (FCM)     | Push notifications for job updates and reminders                                                                |
| Cloud Object Storage               | Storage of profile images and other uploaded media                                                              |
| AI Embedding Service               | Generates semantic embeddings for worker skills and customer job descriptions to improve recommendation quality |

External integrations are abstracted behind dedicated service interfaces, allowing providers to be replaced or extended without affecting the core business logic.

---

## Scalability Strategy

The application is initially deployed as a modular monolith.

As demand increases, modules with higher workloads such as Matching, Notifications, and Chat can be extracted into independent services without significant architectural changes.

The application remains stateless, allowing multiple application instances behind a load balancer.

---

## Design Decisions

| Decision                   | Reason                 |
| -------------------------- | ---------------------- |
| Modular Monolith           | Faster development     |
| PostgreSQL                 | Strong consistency     |
| Redis                      | Low latency cache      |
| WebSocket                  | Real-time chat         |
| Event-driven Notifications | Loose coupling         |
| Embedding Matching         | Better recommendations |

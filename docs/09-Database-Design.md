# Database Design

## Purpose

This document describes the logical database design for the Sahayak platform.

The objective is to model the business entities, their relationships, constraints, and storage strategy required to support a scalable, consistent, and maintainable service marketplace.

This document focuses on logical data modeling and intentionally remains independent of implementation-specific SQL definitions.

---

## Database Selection

Sahayak uses PostgreSQL as its primary relational database.

The platform requires strong consistency for critical business operations such as job assignment, worker availability, authentication, and ratings.

PostgreSQL provides transactional guarantees, relational integrity, indexing capabilities, geospatial extensions, and vector search support that align with the platform requirements.

Redis is used as a complementary in-memory data store for caching and real-time workloads and is not considered the primary source of truth.

---

## Design Principles

The database design follows the following principles.

- Single Source of Truth
- Strong Consistency for Critical Data
- Normalized Data Model
- Soft Delete instead of Hard Delete
- Auditability
- Extensible Schema
- Referential Integrity
- Performance-Oriented Indexing

---

## Core Business Entities

The platform consists of the following primary business entities.

| Entity           | Description                                |
| ---------------- | ------------------------------------------ |
| User             | Represents every registered platform user. |
| Worker Profile   | Worker-specific professional information.  |
| Customer Profile | Customer-specific information.             |
| Job              | Service request created by customers.      |
| Service Category | Supported service categories.              |
| Worker Skill     | Skills associated with workers.            |
| Conversation     | Chat session between customer and worker.  |
| Message          | Individual chat messages.                  |
| Notification     | Platform notifications.                    |
| Rating           | Rating submitted after job completion.     |
| Review           | Optional textual feedback.                 |

---

## Entity Relationships

## Entity Relationships

| Parent Entity    | Relationship | Child Entity     |
| ---------------- | ------------ | ---------------- |
| User             | 1 : 1        | Worker Profile   |
| User             | 1 : 1        | Customer Profile |
| Customer Profile | 1 : N        | Job              |
| Worker Profile   | 1 : N        | Job              |
| Job              | 1 : 1        | Conversation     |
| Conversation     | 1 : N        | Message          |
| Job              | 1 : N        | Notification     |
| Job              | 1 : N        | Rating           |
| Worker Profile   | M : N        | Service Category |

---

## Entity Definitions

### User

Represents an authenticated platform user.

Responsibilities

- Authentication
- Authorization
- Account Status
- Profile Ownership

---

### Worker Profile

Represents professional information of a worker.

Responsibilities

- Skills
- Experience
- Availability
- Service Area
- Reputation
- Current Status

---

### Customer Profile

Represents customer-specific information.

Responsibilities

- Personal Details
- Address Information
- Job History

---

### Job

Represents a customer service request.

Responsibilities

- Request Details
- Current Status
- Assigned Worker
- Timeline
- Service Location

---

### Conversation

Represents communication associated with a job.

Responsibilities

- Customer
- Worker
- Message History

---

### Message

Represents an individual chat message.

Responsibilities

- Sender
- Receiver
- Delivery Status
- Timestamp

---

### Notification

Represents platform-generated notifications.

Responsibilities

- Recipient
- Notification Type
- Delivery Status
- Read Status

---

### Rating

Represents customer or worker feedback after job completion.

Responsibilities

- Rating Score
- Reviewer
- Reviewee
- Related Job

---

---

## Constraints

The platform enforces the following business constraints.

- One mobile number can belong to only one user.
- One job can be assigned to only one worker.
- One worker can actively work on only one job.
- Ratings may only be submitted once by each participant.
- Every conversation belongs to exactly one job.
- Every message belongs to one conversation.
- Every job must belong to one customer.

---

## Indexing Strategy

The following data requires efficient lookup.

| Entity         | Indexed Fields | Reason              |
| -------------- | -------------- | ------------------- |
| User           | Mobile Number  | Authentication      |
| Worker Profile | Availability   | Matching            |
| Worker Profile | Service Area   | Candidate Discovery |
| Worker Profile | Rating         | Ranking             |
| Job            | Status         | Active Jobs         |
| Job            | Created Time   | History             |
| Conversation   | Job            | Chat Lookup         |
| Notification   | Recipient      | User Notifications  |

---

## Data Lifecycle

Different business entities have different retention policies.

| Entity        | Lifecycle                         |
| ------------- | --------------------------------- |
| User          | Retained until account deletion.  |
| Job           | Permanently retained for history. |
| Messages      | Retained for future reference.    |
| Notifications | Archived after expiration.        |
| Ratings       | Permanently retained.             |
| Reviews       | Permanently retained.             |

---

## Future Considerations

The database design allows future expansion including:

- Payment Information
- Subscription Plans
- AI Recommendation History
- Worker Verification Records
- Audit Logs
- Service Scheduling
- Multi-city Operations

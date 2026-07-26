# System Correctness Design

## Purpose

This document describes how Sahayak maintains data consistency while supporting multiple users performing operations concurrently.

The objective is to ensure that critical business rules remain correct even when multiple requests are processed simultaneously.

---

## Concurrency Challenges

The platform processes multiple user requests simultaneously.

Several operations involve shared resources and therefore require special handling to prevent inconsistent system state.

Examples include:

- Multiple workers accepting the same job.
- Customer cancelling a job while a worker accepts it.
- Duplicate notification delivery.
- Duplicate rating submissions.
- Multiple profile updates.

---

## Consistency Requirements

The platform guarantees the following business rules.

- One job can be assigned to only one worker.
- One worker can actively work on only one job.
- A completed job cannot be accepted again.
- Ratings can only be submitted once per participant.
- Duplicate notifications must not create duplicate business actions.
- Profile updates must preserve the latest valid state.

---

## Critical Workflows

| Workflow           | Requires Strong Consistency |
| ------------------ | --------------------------- |
| Worker Accepts Job | Yes                         |
| Job Assignment     | Yes                         |
| Job Cancellation   | Yes                         |
| Rating Submission  | Yes                         |
| Chat Messages      | Eventually Consistent       |
| Notifications      | Eventually Consistent       |

---

## Race Conditions

### Race Condition 1

```
Worker A

↓

Accept Job

↓

Job

↑

Accept Job

↓

Worker B
```

> Problem

Two workers accept simultaneously.

> Expected

Only one succeeds.

### Race Condition 2

```
Customer

↓

Cancel Job

↓

Job

↑

Worker Accept
```

> Expected

Either Cancel wins

**or**

Accept wins Never both.

### Race Condition 3

```
Retry Notification

↓

Worker clicks twice

↓

Duplicate Accept
```

> Expected

Only one acceptance.

---

## Synchronization Strategy

Critical operations involving shared resources shall execute atomically.

The platform ensures that concurrent requests affecting the same business entity cannot violate consistency guarantees.

Non-critical operations such as notifications and analytics may execute independently.

---

## Idempotency

The platform treats retry requests safely.

Repeated execution of the same business operation shall not produce duplicate side effects.

Examples include:

- Accept Job
- Submit Rating
- Complete Job
- Cancel Job

---

## Transaction Boundaries

| Operation         | Transaction Required |
| ----------------- | -------------------- |
| Accept Job        | Yes                  |
| Assign Worker     | Yes                  |
| Complete Job      | Yes                  |
| Rating            | Yes                  |
| Send Notification | No                   |
| Analytics         | No                   |

---

## Failure Scenarios

| Scenario         | Expected Behaviour  |
| ---------------- | ------------------- |
| Duplicate Accept | Reject duplicate    |
| Worker Offline   | Retry matching      |
| Customer Cancels | Stop assignment     |
| Server Restart   | Resume pending work |
| Duplicate Rating | Ignore duplicate    |

---

## Design Decisions

| Decision                 | Reason                 |
| ------------------------ | ---------------------- |
| Single Worker Assignment | Prevent duplicate work |
| Atomic Assignment        | Maintain consistency   |
| Idempotent Operations    | Safe retries           |
| Eventual Notifications   | Better scalability     |
| Strong Job Consistency   | Correctness over speed |

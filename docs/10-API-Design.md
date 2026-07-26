# API Design

## Purpose

This document defines the REST API contract for the Sahayak platform.

The APIs expose business capabilities to client applications while remaining independent of internal implementation details.

The objective is to provide a consistent, secure, and predictable interface for all platform interactions.

---

## API Design Principles

The APIs follow the following design principles.

- RESTful resource-oriented design.
- Stateless request handling.
- Consistent request and response formats.
- Standard HTTP status codes.
- Secure access to protected resources.
- Backward compatibility through API versioning.

---

## Authentication

Protected endpoints require authentication.

Public endpoints include:

- Register
- Login
- Request OTP
- Verify OTP

All other endpoints require a valid authenticated session.

---

## Resource Overview

## Resource Overview

The platform exposes the following primary resources.

- Users
- Profiles
- Jobs
- Workers
- Conversations
- Messages
- Notifications
- Ratings
- Reviews

---

## Authentication APIs

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| POST   | `/auth/register`    | Register new user      |
| POST   | `/auth/request-otp` | Request OTP            |
| POST   | `/auth/verify-otp`  | Verify OTP             |
| POST   | `/auth/login`       | Authenticate user      |
| POST   | `/auth/logout`      | Logout current session |

---

## User APIs

| Method | Endpoint                 | Description                |
| ------ | ------------------------ | -------------------------- |
| GET    | `/users/me`              | View own profile           |
| PATCH  | `/users/me`              | Update profile             |
| PATCH  | `/users/me/skills`       | Update worker skills       |
| PATCH  | `/users/me/availability` | Update worker availability |
| PATCH  | `/users/me/service-area` | Update service area        |

---

## Job APIs

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | `/jobs`         | Create service request |
| GET    | `/jobs`         | View jobs              |
| GET    | `/jobs/{id}`    | View job details       |
| PATCH  | `/jobs/{id}`    | Update job             |
| DELETE | `/jobs/{id}`    | Cancel job             |
| GET    | `/jobs/history` | Job history            |

---

## Matching APIs

| Method | Endpoint                | Description                              |
| ------ | ----------------------- | ---------------------------------------- |
| GET    | `/jobs/{id}/candidates` | View recommended workers _(Admin/Debug)_ |
| POST   | `/jobs/{id}/accept`     | Accept job                               |
| POST   | `/jobs/{id}/reject`     | Reject job                               |
| GET    | `/workers/jobs`         | View assigned jobs                       |

---

## Chat APIs

| Method | Endpoint                       | Description        |
| ------ | ------------------------------ | ------------------ |
| GET    | `/conversations`               | View conversations |
| GET    | `/conversations/{id}`          | View messages      |
| POST   | `/conversations/{id}/messages` | Send message       |

---

## Notification APIs

| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| GET    | `/notifications`           | View notifications        |
| PATCH  | `/notifications/{id}/read` | Mark notification as read |

---

## Rating APIs

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| POST   | `/jobs/{id}/ratings`    | Submit rating       |
| GET    | `/workers/{id}/ratings` | View worker ratings |

---

## Admin APIs

| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| GET    | `/admin/users`             | View users               |
| GET    | `/admin/jobs`              | View jobs                |
| PATCH  | `/admin/users/{id}/status` | Suspend or activate user |
| GET    | `/admin/analytics`         | Platform statistics      |

---

## Common Response Format

```
{
  "success": true,
  "message": "Job created successfully.",
  "data": { },
  "timestamp": "2026-07-25T10:30:00Z"
}
```

For Errors:

```
{
  "success": false,
  "message": "Job not found.",
  "error": {
    "code": "JOB_NOT_FOUND"
  },
  "timestamp": "2026-07-25T10:30:00Z"
}
```

---

## Error Handling

| Status | Meaning                 |
| ------ | ----------------------- |
| 200    | Success                 |
| 201    | Resource Created        |
| 400    | Validation Error        |
| 401    | Authentication Required |
| 403    | Permission Denied       |
| 404    | Resource Not Found      |
| 409    | Conflict                |
| 429    | Too Many Requests       |
| 500    | Internal Server Error   |

---

## Pagination

Collections support pagination.

Example:

```
GET /jobs?page=1&limit=20
```

Optional query parameters may include:

- page
- limit
- search
- sort
- order

## Versioning

All endpoints are versioned.

Example:

```
/api/v1/jobs
/api/v1/users
/api/v1/auth
```

Future versions can introduce new functionality without breaking existing clients.

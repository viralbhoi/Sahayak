# Capacity Planning

## Purpose

This document estimates the expected workload of the Sahayak platform.

The objective of capacity planning is to derive realistic workload estimates based on business assumptions before making architectural decisions regarding infrastructure, databases, caching, asynchronous processing, networking, and deployment.

These estimates represent the expected load for the MVP deployment and will evolve as the platform grows.

---

# Assumptions

The following assumptions are used throughout this document.

- MVP launches in **Ahmedabad, Gujarat**.
- Users primarily access the platform using mobile devices.
- One worker can actively handle only one job at a time.
- A customer creates one service request approximately every 30 days.
- Average service duration is approximately 60 minutes.
- Average conversation contains 20 chat messages.
- Average chat message size is approximately **1 KB**.
- Average notification size is approximately **2 KB**.
- Images and other media are stored separately using object storage.

---

# User Estimation

## Step 1 — Target City

| Metric               |  Estimate |
| -------------------- | --------: |
| City                 | Ahmedabad |
| Estimated Population | 9,000,000 |

---

## Step 2 — Addressable Market

### Assumptions

| Assumption               | Value |
| ------------------------ | ----: |
| Adult Population         |   65% |
| Smartphone Users         |   80% |
| Active Internet Users    |   40% |
| Likely Marketplace Users |   20% |

### Calculation

```
9,000,000
× 65%
× 80%
× 40%
× 20%

≈ 374,000 Potential Customers
```

---

## Step 3 — MVP Adoption

Assume that during the MVP phase, approximately **10%** of the addressable market registers on the platform.

| Metric               | Estimate |
| -------------------- | -------: |
| Registered Customers |   37,000 |

Assume one worker exists for every **10 customers**.

| Metric                 | Estimate |
| ---------------------- | -------: |
| Registered Workers     |    3,700 |
| Total Registered Users |   40,700 |

---

## Step 4 — Active Users

### Assumptions

| Metric                |      Value |
| --------------------- | ---------: |
| Daily Active Users    |        20% |
| Peak Concurrent Users | 25% of DAU |

### Calculation

```
Daily Active Users

40,700 × 20%

≈ 8,140

Peak Concurrent Users

8,140 × 25%

≈ 2,035
```

Rounded Values

| Metric                | Estimate |
| --------------------- | -------: |
| Daily Active Users    |    8,000 |
| Peak Concurrent Users |    2,000 |

---

# Traffic Estimation

## Job Requests

### Assumptions

- Each registered customer creates one service request every 30 days.

### Calculation

```
37,000 / 30

≈ 1,233 Jobs Per Day
```

Peak Hour (20%)

```
≈ 247 Jobs / Hour
```

Peak Traffic

| Metric                 | Estimate |
| ---------------------- | -------: |
| Jobs Per Day           |    1,233 |
| Jobs Per Hour (Peak)   |      247 |
| Jobs Per Minute (Peak) |        5 |
| Jobs Per Second (Peak) |       <1 |

---

## Chat Messages

### Assumptions

- Every completed job generates approximately **20 messages**.

### Calculation

```
1,233 Jobs

×

20 Messages

≈ 24,660 Messages / Day
```

| Metric                   | Estimate |
| ------------------------ | -------: |
| Messages Per Day         |   24,660 |
| Peak Messages Per Minute |      100 |
| Peak Messages Per Second |        2 |

---

## Notifications

### Assumptions

Each job generates approximately six notifications.

- Job Created
- Worker Notified
- Worker Accepted
- Job Started
- Job Completed
- Rating Reminder

### Calculation

```
1,233

×

6

≈ 7,398 Notifications / Day
```

| Metric                        | Estimate |
| ----------------------------- | -------: |
| Notifications Per Day         |    7,400 |
| Peak Notifications Per Minute |       30 |
| Peak Notifications Per Second |        1 |

---

# Storage Estimation

## Estimated Annual Growth

| Entity        | Annual Records |
| ------------- | -------------: |
| Users         |         36,500 |
| Jobs          |        450,000 |
| Messages      |      9,000,000 |
| Notifications |      2,700,000 |
| Ratings       |        450,000 |

> **Note:** Images, documents, and attachments are stored separately in object storage and are not included in these estimates.

---

# Network Estimation

## Chat Traffic

| Metric               | Estimate |
| -------------------- | -------: |
| Average Message Size |     1 KB |
| Daily Messages       |   24,660 |
| Daily Traffic        |   ~25 MB |

---

## Notification Traffic

| Metric                    | Estimate |
| ------------------------- | -------: |
| Average Notification Size |     2 KB |
| Daily Notifications       |    7,400 |
| Daily Traffic             |   ~15 MB |

---

# Growth Projection

| Stage  | Registered Users |
| ------ | ---------------: |
| MVP    |           40,700 |
| Year 1 |          250,000 |
| Year 3 |        1,000,000 |
| Year 5 |        5,000,000 |

---

# Capacity Summary

| Metric                | Estimate |
| --------------------- | -------: |
| Registered Users      |   40,700 |
| Daily Active Users    |    8,000 |
| Peak Concurrent Users |    2,000 |
| Jobs Per Day          |    1,233 |
| Peak Jobs Per Minute  |        5 |
| Messages Per Day      |   24,660 |
| Notifications Per Day |    7,400 |

---

# Architectural Observations

The current workload indicates that:

- A relational database is sufficient for the MVP.
- Horizontal scaling is not immediately required but should be supported through stateless application design.
- Chat and notification workloads justify asynchronous event processing.
- The matching engine should meet the latency targets defined in the Non-Functional Requirements.
- Data growth remains manageable but archival strategies should be considered as the platform expands.
- Capacity estimates should be reviewed periodically as user adoption increases.

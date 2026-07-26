# Non Functional Requirements

## Performance

- API response time (P95) shall be less than 200 ms.
- Job creation request shall return within 300 ms.
- Worker matching shall complete within 2 seconds.
- Notification delivery latency shall remain below 2 seconds.
- Chat messages shall be delivered within 100 ms.

---

## Scalability

The platform shall support:

- 100,000 concurrent users.
- 25,000 concurrent WebSocket connections.
- 1,000 job requests per minute.
- Horizontal scaling without application code changes.

---

## Availability

- Platform availability shall be at least 99.9%.
- Planned maintenance shall minimize downtime.
- Critical services shall recover automatically after temporary failures.

---

## Reliability

- A job shall never be assigned to more than one worker.
- Duplicate job requests shall not create duplicate assignments.
- No confirmed chat messages shall be lost.
- Critical business events shall remain durable despite temporary failures.

---

## Consistency

The following operations require strong consistency:

- Job assignment
- User authentication
- Rating submission

The following operations may use eventual consistency:

- Analytics
- Recommendation updates
- Search indexing

---

## Security

- Only authenticated users may access protected resources.
- Users shall only access resources they own or are authorized to access.
- Sensitive information shall be encrypted during transmission.
- Personally identifiable information (PII) shall be protected.

---

## Usability

- Users shall receive clear feedback after every important action.
- Error messages shall be meaningful.
- Interfaces shall remain usable on mobile devices.

---

## Maintainability

- The system shall support modular development.
- New services shall be added without major changes to existing modules.
- APIs shall remain backward compatible where possible.

---

## Observability

- Critical system events shall be logged.
- System health shall be continuously monitored.
- Failures shall be traceable.
- Metrics shall be available for key platform operations.

---

## Disaster Recovery

- Temporary service failures shall not result in permanent data loss.
- Failed background operations shall be retried.
- The platform shall recover gracefully from partial service outages.


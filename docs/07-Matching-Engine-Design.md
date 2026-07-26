# Matching Engine Design

## Purpose

The Matching Engine is responsible for intelligently connecting customer service requests with the most suitable workers.

Instead of relying solely on exact keyword matching, the engine considers semantic similarity, geographical proximity, worker availability, reputation, experience, and fairness to produce high-quality recommendations.

The objective is to maximize recommendation quality while maintaining low latency and ensuring fair job distribution among workers.

---

## Design Goals

The Matching Engine is designed to satisfy the following goals.

- Deliver recommendations within the performance targets defined in the Non-Functional Requirements.
- Match workers based on semantic understanding rather than exact keywords.
- Prioritize nearby workers to reduce travel time.
- Ensure workers are currently available.
- Prevent the same workers from receiving every opportunity.
- Support future horizontal scaling.
- Produce deterministic and explainable rankings.

---

## Matching Workflow

## Candidate Discovery

The matching process begins by identifying workers who are potential candidates for the requested service.

Candidate discovery reduces the search space before expensive ranking operations are performed.

Candidate discovery considers:

- Worker availability
- Worker service area
- Worker status
- Active assignments

Workers who do not satisfy these basic conditions are excluded before semantic matching begins.

---

## Candidate Filtering

After candidate discovery, additional filters are applied.

Workers are excluded if:

- They are currently unavailable.
- They are already handling another active job.
- They do not operate within the customer's service area.
- They have been temporarily suspended.

---

## Semantic Skill Matching

The Matching Engine compares the customer's service request with worker capabilities using semantic similarity instead of exact keyword matching.

This enables the platform to understand intent.

Example :

Customer Request

"Bathroom pipe leaking"

Worker Skills

"Plumbing"

Although the words differ, the engine recognizes the semantic relationship and considers the worker a strong candidate.

Semantic matching significantly improves recommendation quality compared to traditional keyword-based search.

---

## Worker Ranking Strategy

Each candidate worker receives a ranking score based on multiple business factors.

The ranking considers:

- Semantic relevance
- Distance from customer
- Worker rating
- Experience
- Availability
- Historical reliability
- Fairness score

Workers with higher overall scores are prioritized for recommendation.

```
Final Score

=

0.40 × Semantic Similarity
+
0.20 × Distance Score
+
0.15 × Rating
+
0.10 × Experience
+
0.10 × Fairness
+
0.05 × Response Reliability
```

---

## Fairness Strategy

The platform aims to provide fair work opportunities.

To prevent a small number of workers from receiving every request, ranking considers recent job assignments.

Workers who have recently completed multiple jobs may receive a temporary reduction in priority, allowing equally qualified workers to receive opportunities.

Fairness adjustments never override minimum quality requirements.

---

## Assignment Strategy

Job opportunities are offered to candidate workers according to their ranking.

If multiple workers express interest, the platform assigns the worker with the highest priority who accepts within the defined acceptance window.

Once a worker is assigned, the job is no longer available to other candidates.

---

## Retry Strategy

If no worker accepts the request, the Matching Engine automatically retries the process.

Each retry may:

- Expand the search radius.
- Consider additional workers.
- Recalculate candidate rankings.
- Notify another group of eligible workers.

The retry process continues until a suitable worker is assigned or the request is terminated according to platform policies.

---

## Performance Optimizations

To maintain low response times, the Matching Engine minimizes unnecessary computations.

The design focuses on:

- Reducing candidate search space early.
- Performing inexpensive filtering before complex ranking.
- Limiting ranking to eligible candidates.
- Supporting asynchronous background processing where appropriate.
- Reusing previously computed information whenever possible.

---

## Future Improvements

Future versions of the Matching Engine may include:

- Machine learning based ranking
- Personalized worker recommendations
- Dynamic search radius
- Traffic-aware travel estimation
- Worker specialization models
- Customer preference learning
- Demand-aware ranking adjustments

import type { Topic } from '../../types';

export const reliabilityTopics: Topic[] = [
  {
    id: 'cap-theorem',
    title: 'CAP Theorem',
    category: 'reliability',
    difficulty: 2,
    summary:
      'The CAP theorem states that a distributed system can provide at most two of three guarantees: Consistency, Availability, and Partition Tolerance.',
    explanation: `## What is the CAP Theorem?

The CAP theorem, proposed by Eric Brewer, states that a distributed data store can simultaneously provide at most two out of three guarantees:

- **Consistency (C)**: Every read receives the most recent write or an error. All nodes see the same data at the same time.
- **Availability (A)**: Every request receives a non-error response, even if it may not contain the most recent data.
- **Partition Tolerance (P)**: The system continues to operate despite network partitions (communication failures between nodes).

## Why You Must Choose

In a distributed system, network partitions are inevitable. When a partition occurs, you must choose between consistency (reject requests that might return stale data) or availability (serve potentially stale data to keep the system responsive).

## CP vs AP Systems

- **CP systems** (HBase, MongoDB with majority read concern, etcd): Sacrifice availability during partitions to maintain consistency. Used for systems where stale data is dangerous.
- **AP systems** (Cassandra, DynamoDB, CouchDB): Sacrifice strict consistency during partitions to remain available. Use eventual consistency to reconcile data later.

## Beyond CAP

The CAP theorem is a useful framework but oversimplifies reality. The PACELC theorem extends it: even when there is no Partition, you still trade Latency for Consistency. Modern systems offer tunable consistency levels, letting you choose per-operation.`,
    keyPoints: [
      'Distributed systems can guarantee at most two of: Consistency, Availability, Partition Tolerance',
      'Network partitions are inevitable, so the real choice is between C and A during partitions',
      'CP systems prioritize consistency (reject requests during partitions)',
      'AP systems prioritize availability (serve potentially stale data during partitions)',
      'PACELC extends CAP: even without partitions, you trade Latency for Consistency',
      'Many modern databases offer tunable consistency on a per-query basis',
    ],
    realWorld: [
      'DynamoDB is an AP system — it guarantees availability with eventual consistency by default',
      'Google Spanner achieves effective CP behavior using GPS-synchronized TrueTime clocks',
      'Cassandra lets you tune consistency per query — ONE for AP behavior, QUORUM for CP behavior',
    ],
    interviewTips: [
      'Explain why partition tolerance is not optional in distributed systems — the real trade-off is C vs A',
      'Give concrete examples of when you would choose CP vs AP for a given use case',
      'Mention PACELC as a more nuanced framework that includes the latency trade-off',
    ],
    relatedTopics: ['acid-properties', 'replication', 'consistent-hashing'],
  },
  {
    id: 'failover-strategies',
    title: 'Failover Strategies',
    category: 'reliability',
    difficulty: 2,
    summary:
      'Failover strategies define how a system switches to a backup component when the primary fails, minimizing downtime and data loss.',
    explanation: `## What is Failover?

Failover is the process of automatically or manually switching to a redundant system when the primary system fails. The goal is to minimize downtime (Recovery Time Objective — RTO) and data loss (Recovery Point Objective — RPO).

## Active-Passive (Hot Standby)

A standby server replicates data from the primary but does not serve traffic. When the primary fails, the standby is promoted to active.

- **Hot standby**: Standby is running and replicating in real-time. Fast failover but standby resources are idle.
- **Warm standby**: Standby is running but may not be fully current. Moderate failover time.
- **Cold standby**: Standby is powered off. Must be started and data restored. Slowest failover but cheapest.

## Active-Active

Multiple servers handle traffic simultaneously. If one fails, the others absorb its traffic. No promotion delay, but requires data synchronization across all active nodes.

## Failover Process

1. **Detection**: Health checks or heartbeats detect the failure.
2. **Decision**: The system (or operator) decides to trigger failover.
3. **Promotion**: The standby takes over (DNS update, IP failover, or load balancer redirect).
4. **Recovery**: The failed node is repaired and rejoins as the new standby.

## Challenges

Split-brain occurs when both nodes believe they are the primary after a network partition. Fencing mechanisms (STONITH — Shoot The Other Node In The Head) ensure only one node acts as primary.`,
    keyPoints: [
      'Active-passive uses a standby that is promoted when the primary fails',
      'Active-active has multiple servers handling traffic simultaneously for zero-downtime failover',
      'Hot standby provides fastest failover; cold standby is cheapest but slowest',
      'Split-brain must be prevented with fencing mechanisms when both nodes think they are primary',
      'RTO (Recovery Time Objective) and RPO (Recovery Point Objective) define acceptable downtime and data loss',
    ],
    realWorld: [
      'AWS RDS Multi-AZ deploys a hot standby in a different availability zone with automatic failover',
      'Redis Sentinel monitors Redis instances and automatically promotes a replica on primary failure',
      'DNS failover services like Route 53 redirect traffic to healthy endpoints within seconds',
    ],
    interviewTips: [
      'Explain the difference between active-passive and active-active with trade-offs for each',
      'Discuss RTO and RPO and how they drive failover strategy selection',
      'Mention split-brain as a critical challenge and how consensus algorithms (Raft, Paxos) solve it',
    ],
    relatedTopics: ['redundancy', 'health-checks-monitoring', 'disaster-recovery'],
  },
  {
    id: 'circuit-breaker',
    title: 'Circuit Breaker Pattern',
    category: 'reliability',
    difficulty: 2,
    summary:
      'The circuit breaker pattern prevents cascading failures by detecting failing services and temporarily stopping requests to them, allowing time for recovery.',
    explanation: `## The Problem

In a distributed system, when a downstream service fails or responds slowly, upstream services continue sending requests. This can exhaust connection pools, increase latency, and cascade failures throughout the system.

## How Circuit Breakers Work

Inspired by electrical circuit breakers, the pattern has three states:

- **Closed** (normal): Requests flow through. Failures are counted. If failures exceed a threshold, the circuit opens.
- **Open**: All requests fail immediately without calling the downstream service. This gives the failing service time to recover.
- **Half-Open**: After a timeout, a limited number of test requests are allowed through. If they succeed, the circuit closes. If they fail, it stays open.

## Implementation

\`\`\`
function callService(request) {
  if (circuitBreaker.isOpen()) {
    return fallbackResponse();  // Fail fast
  }
  try {
    const response = await downstreamService.call(request);
    circuitBreaker.recordSuccess();
    return response;
  } catch (error) {
    circuitBreaker.recordFailure();
    return fallbackResponse();
  }
}
\`\`\`

## Fallback Strategies

When the circuit is open, the system can return cached data, a default response, a degraded experience, or an error message. The right fallback depends on the use case.

## Configuration

Key parameters: failure threshold (e.g., 5 failures in 10 seconds), open duration (e.g., 30 seconds), and half-open request limit (e.g., 3 test requests). These must be tuned based on the service's expected behavior.`,
    keyPoints: [
      'Three states: Closed (normal), Open (failing fast), Half-Open (testing recovery)',
      'Prevents cascading failures by stopping requests to a failing downstream service',
      'Fail-fast behavior reduces latency and frees up resources during outages',
      'Fallback strategies provide degraded but functional responses when the circuit is open',
      'Must be combined with retries (with backoff) and timeouts for comprehensive resilience',
    ],
    realWorld: [
      'Netflix Hystrix popularized the circuit breaker pattern for microservice resilience',
      'Resilience4j is the modern Java library implementing circuit breaker, retry, and bulkhead patterns',
      'Envoy service mesh implements circuit breaking at the infrastructure level transparently',
    ],
    interviewTips: [
      'Draw the state diagram: Closed -> Open -> Half-Open -> Closed and explain transitions',
      'Discuss fallback strategies and how to design graceful degradation',
      'Mention that circuit breakers should be combined with retries, timeouts, and bulkheads',
    ],
    relatedTopics: ['failover-strategies', 'health-checks-monitoring', 'microservices-vs-monolith'],
  },
  {
    id: 'health-checks-monitoring',
    title: 'Health Checks & Monitoring',
    category: 'reliability',
    difficulty: 1,
    summary:
      'Health checks verify that services are running correctly, while monitoring systems collect metrics and alerts to detect and diagnose issues before they impact users.',
    explanation: `## Health Checks

Health checks are endpoints or probes that report whether a service is functioning correctly.

### Types of Health Checks

- **Liveness**: Is the process running? If not, restart it. (e.g., Kubernetes liveness probe)
- **Readiness**: Is the service ready to accept traffic? If not, remove it from the load balancer. (e.g., database connection established, cache warmed)
- **Deep health checks**: Verify dependencies — database connectivity, cache availability, downstream service reachability.

\`\`\`
GET /health -> { "status": "healthy", "db": "ok", "cache": "ok" }
\`\`\`

## Monitoring

Monitoring systems collect, store, and visualize metrics about system behavior. The three pillars of observability are:

- **Metrics**: Numeric measurements over time (CPU usage, request rate, error rate, latency percentiles).
- **Logs**: Timestamped records of discrete events (errors, request details, audit trails).
- **Traces**: End-to-end request paths through distributed services, showing latency at each hop.

## Alerting

Monitoring without alerting is just dashboards. Alerts notify teams when metrics cross thresholds. Good alerting avoids alert fatigue by being specific, actionable, and severity-appropriate.

## Key Metrics

The RED method for services: **R**ate, **E**rrors, **D**uration. The USE method for resources: **U**tilization, **S**aturation, **E**rrors.`,
    keyPoints: [
      'Liveness checks confirm a process is running; readiness checks confirm it can serve traffic',
      'Deep health checks verify dependencies like databases and downstream services',
      'Three pillars of observability: metrics, logs, and distributed traces',
      'RED method (Rate, Errors, Duration) monitors service health',
      'USE method (Utilization, Saturation, Errors) monitors resource health',
      'Alerting must be actionable and avoid alert fatigue with proper thresholds',
    ],
    realWorld: [
      'Kubernetes uses liveness and readiness probes to automatically restart or remove unhealthy pods',
      'Datadog and Grafana provide unified dashboards combining metrics, logs, and traces',
      'PagerDuty routes alerts to on-call engineers based on severity and escalation policies',
    ],
    interviewTips: [
      'Explain the difference between liveness and readiness probes with concrete examples',
      'Describe the three pillars of observability and why all three are needed',
      'Discuss SLIs, SLOs, and SLAs — how monitoring metrics tie to service level objectives',
    ],
    relatedTopics: ['circuit-breaker', 'auto-scaling', 'failover-strategies'],
  },
  {
    id: 'redundancy',
    title: 'Redundancy',
    category: 'reliability',
    difficulty: 1,
    summary:
      'Redundancy duplicates critical components across a system so that if one fails, others continue operating, eliminating single points of failure.',
    explanation: `## What is Redundancy?

Redundancy means having backup components that can take over when a primary component fails. The goal is to eliminate single points of failure (SPOFs) and achieve high availability.

## Types of Redundancy

### Active Redundancy

Multiple components run simultaneously and share the load. If one fails, the others absorb its traffic with zero interruption. Example: multiple web servers behind a load balancer.

### Passive Redundancy

Backup components are on standby and activated only when the primary fails. Example: a hot standby database that is promoted on primary failure.

### Geographic Redundancy

Components are distributed across different geographic locations (data centers, regions). Protects against localized failures like power outages, natural disasters, or network issues.

## Redundancy at Every Layer

A truly reliable system needs redundancy at every layer of the stack:

- **Network**: Multiple ISPs, redundant network paths.
- **Compute**: Multiple server instances across availability zones.
- **Storage**: Data replicated across disks, servers, and regions.
- **Load balancers**: Paired load balancers with failover.
- **Power**: Backup generators and UPS systems.

## The Cost of Redundancy

Redundancy increases cost (more hardware, more operational complexity) and can introduce consistency challenges (keeping replicas in sync). The right level of redundancy depends on your availability requirements and budget.`,
    keyPoints: [
      'Eliminates single points of failure by duplicating critical components',
      'Active redundancy shares load in real-time; passive redundancy waits on standby',
      'Geographic redundancy protects against regional outages and disasters',
      'Every layer needs redundancy: network, compute, storage, and infrastructure',
      'Redundancy increases cost and operational complexity — level it to your SLA requirements',
    ],
    realWorld: [
      'AWS availability zones provide redundancy within a region — each AZ is an independent data center',
      'Google replicates data across at least three locations by default for durability',
      'Financial exchanges maintain fully redundant systems in geographically separate data centers',
    ],
    interviewTips: [
      'Identify single points of failure in a given architecture and propose redundancy solutions',
      'Discuss the relationship between redundancy levels and the target number of nines (99.9%, 99.99%)',
      'Explain why redundancy alone is not enough — you also need failover automation and testing',
    ],
    relatedTopics: ['failover-strategies', 'disaster-recovery', 'replication'],
  },
  {
    id: 'disaster-recovery',
    title: 'Disaster Recovery',
    category: 'reliability',
    difficulty: 3,
    summary:
      'Disaster recovery planning ensures a system can recover from catastrophic failures like data center outages, data corruption, or regional disasters with defined RTO and RPO targets.',
    explanation: `## What is Disaster Recovery?

Disaster recovery (DR) is the strategy and processes for restoring a system after a catastrophic event — data center fire, regional outage, ransomware attack, or accidental data deletion. DR goes beyond simple failover to address total loss scenarios.

## Key Metrics

- **RTO (Recovery Time Objective)**: Maximum acceptable downtime. How quickly must the system be restored?
- **RPO (Recovery Point Objective)**: Maximum acceptable data loss. How much data can you afford to lose (measured in time)?

Lower RTO and RPO targets require more expensive DR solutions.

## DR Strategies (Cost vs. Recovery Speed)

1. **Backup & Restore**: Regular backups stored offsite. Cheapest but slowest recovery (hours to days). RPO depends on backup frequency.
2. **Pilot Light**: Core infrastructure (database replicas) runs in the DR region. Other components are launched on demand. Moderate cost and recovery time.
3. **Warm Standby**: Scaled-down version of the full environment runs in the DR region. Faster recovery (minutes) but more expensive.
4. **Multi-Site Active-Active**: Full infrastructure runs in multiple regions simultaneously. Near-zero RTO/RPO but most expensive.

## Testing

A DR plan that has never been tested is just a document. Regular DR drills (game days, chaos engineering) validate that recovery procedures actually work under pressure.`,
    keyPoints: [
      'RTO defines maximum acceptable downtime; RPO defines maximum acceptable data loss',
      'Four strategies from cheapest to fastest: Backup/Restore, Pilot Light, Warm Standby, Active-Active',
      'Multi-region active-active provides near-zero downtime but is the most expensive',
      'Regular DR drills and chaos engineering validate that recovery procedures work',
      'Data backups must be tested for restorability — untested backups are not backups',
    ],
    realWorld: [
      'Netflix uses Chaos Monkey and Chaos Engineering to continuously test failure resilience',
      'AWS recommends multi-AZ for high availability and multi-region for disaster recovery',
      'GitHub suffered a 2018 database incident and recovered using their tested backup and restore procedures',
    ],
    interviewTips: [
      'Frame DR strategy selection around RTO/RPO requirements and budget constraints',
      'Emphasize that untested DR plans are unreliable — regular testing is essential',
      'Discuss the trade-off between DR cost and acceptable downtime for different business criticality levels',
    ],
    relatedTopics: ['failover-strategies', 'redundancy', 'replication'],
  },
];

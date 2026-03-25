import type { Topic } from '../../types';

export const scalingTopics: Topic[] = [
  {
    id: 'horizontal-vs-vertical-scaling',
    title: 'Horizontal vs Vertical Scaling',
    category: 'scaling',
    difficulty: 1,
    summary:
      'Vertical scaling adds more power to existing machines, while horizontal scaling adds more machines. Most large-scale systems rely on horizontal scaling for cost-effectiveness and resilience.',
    explanation: `## Vertical Scaling (Scale Up)

Vertical scaling means upgrading the hardware of an existing server — more CPU, RAM, faster disks, or better network. It is the simplest approach and requires no application changes.

**Pros**: Simple to implement, no distributed system complexity, works for most applications initially.
**Cons**: Hardware limits create a ceiling, single point of failure, costs increase non-linearly.

## Horizontal Scaling (Scale Out)

Horizontal scaling means adding more machines to distribute the workload. Each machine handles a portion of the traffic or data.

**Pros**: Near-infinite scalability, better fault tolerance, cost-effective with commodity hardware.
**Cons**: Requires distributed system design, introduces complexity (data consistency, load balancing, network latency).

## When to Use Each

Start with vertical scaling for simplicity. When you hit hardware limits, face availability requirements, or need geographic distribution, transition to horizontal scaling.

## Stateless vs Stateful Services

Stateless services (web servers, API servers) are easy to scale horizontally — just add more instances behind a load balancer. Stateful services (databases, caches) require replication, sharding, or distributed consensus, making horizontal scaling much harder.`,
    keyPoints: [
      'Vertical scaling adds resources to one machine; horizontal scaling adds more machines',
      'Vertical scaling is simpler but has hardware ceilings and creates single points of failure',
      'Horizontal scaling offers near-infinite growth but requires distributed system design',
      'Stateless services are easy to scale horizontally; stateful services are harder',
      'Most production systems use a combination of both approaches',
      'Start simple with vertical scaling; move to horizontal when limits are reached',
    ],
    realWorld: [
      'Stack Overflow famously runs on a small number of powerful vertically-scaled servers',
      'Netflix horizontally scales thousands of microservice instances across AWS regions',
      'Database scaling often starts vertical (bigger instance) before moving to read replicas and sharding',
    ],
    interviewTips: [
      'Always discuss the trade-offs — simplicity vs. scalability, cost curves, failure modes',
      'Mention that stateless services are trivially horizontally scalable behind a load balancer',
      'Explain why databases are the hardest component to scale horizontally',
    ],
    relatedTopics: ['load-balancing', 'auto-scaling', 'sharding'],
  },
  {
    id: 'load-balancing',
    title: 'Load Balancing',
    category: 'scaling',
    difficulty: 1,
    summary:
      'Load balancers distribute incoming traffic across multiple servers to ensure no single server is overwhelmed, improving availability, throughput, and response times.',
    explanation: `## What is Load Balancing?

A load balancer sits between clients and a pool of backend servers, distributing incoming requests to ensure even utilization and high availability.

## Load Balancing Algorithms

- **Round Robin**: Requests are distributed sequentially across servers. Simple and effective when servers are homogeneous.
- **Weighted Round Robin**: Servers with more capacity receive proportionally more requests.
- **Least Connections**: Routes to the server with the fewest active connections. Good when request durations vary.
- **IP Hash**: Routes based on client IP, ensuring session affinity (sticky sessions).
- **Random**: Picks a server at random. Surprisingly effective at scale.

## Types of Load Balancers

### Layer 4 (Transport)

Operates at the TCP/UDP level. Fast and efficient — routes based on IP addresses and ports without inspecting request content.

### Layer 7 (Application)

Operates at the HTTP level. Can route based on URL path, headers, cookies, or request body. More flexible but adds processing overhead.

## Health Checks

Load balancers periodically check backend server health. Unhealthy servers are removed from the pool until they recover, ensuring clients never receive errors from failed instances.`,
    keyPoints: [
      'Distributes traffic across multiple servers for availability and performance',
      'Common algorithms: Round Robin, Least Connections, IP Hash, Weighted',
      'Layer 4 balances at TCP level (fast); Layer 7 balances at HTTP level (flexible)',
      'Health checks automatically remove unhealthy servers from the rotation',
      'Can be hardware appliances, software (NGINX, HAProxy), or cloud services (AWS ALB)',
    ],
    realWorld: [
      'AWS Application Load Balancer routes HTTP requests based on URL path and headers',
      'NGINX is used as a reverse proxy and load balancer by over 30% of all websites',
      'Google uses Maglev, a custom software load balancer handling millions of requests per second',
    ],
    interviewTips: [
      'Explain Layer 4 vs Layer 7 load balancing and when to use each',
      'Discuss how to handle sticky sessions when stateful behavior is needed',
      'Mention that the load balancer itself must not become a single point of failure — use pairs or DNS failover',
    ],
    relatedTopics: ['horizontal-vs-vertical-scaling', 'auto-scaling', 'health-checks-monitoring'],
  },
  {
    id: 'auto-scaling',
    title: 'Auto-Scaling',
    category: 'scaling',
    difficulty: 2,
    summary:
      'Auto-scaling automatically adjusts the number of compute instances based on real-time demand, optimizing cost during low traffic and performance during spikes.',
    explanation: `## What is Auto-Scaling?

Auto-scaling dynamically adjusts the number of running instances based on monitored metrics. When traffic increases, new instances are launched. When traffic decreases, instances are terminated. This ensures you have the right capacity at any given time.

## Scaling Policies

### Reactive (Target Tracking)

Set a target metric (e.g., average CPU at 60%) and the auto-scaler adds or removes instances to maintain that target. Simple and effective for most workloads.

### Step Scaling

Define thresholds that trigger specific actions. For example: if CPU > 70%, add 2 instances; if CPU > 90%, add 5 instances. Provides more control than target tracking.

### Scheduled Scaling

Pre-schedule capacity changes based on known traffic patterns. For example, scale up every Monday at 9 AM and scale down Friday at 6 PM.

### Predictive Scaling

Uses machine learning to forecast traffic and pre-scale before demand arrives. Avoids the lag of reactive scaling during predictable traffic surges.

## Key Considerations

- **Cool-down periods**: Prevent rapid scale-up/scale-down oscillation.
- **Instance warm-up time**: New instances need time to start and become healthy.
- **Minimum/maximum limits**: Set bounds to control costs and prevent runaway scaling.
- **Stateless design**: Auto-scaling works best with stateless services that can start and stop without data loss.`,
    keyPoints: [
      'Automatically adjusts instance count based on metrics like CPU, memory, or request rate',
      'Target tracking is the simplest policy — set a metric target and let the scaler adjust',
      'Scheduled scaling handles predictable traffic patterns (business hours, events)',
      'Predictive scaling uses ML to pre-scale before anticipated demand spikes',
      'Cool-down periods and warm-up times prevent oscillation and premature scaling',
      'Works best with stateless services that can be added or removed without data loss',
    ],
    realWorld: [
      'Netflix auto-scales thousands of EC2 instances based on streaming demand throughout the day',
      'Uber scales ride-matching services dynamically during surge pricing events',
      'AWS Auto Scaling Groups manage EC2 instance fleets with health checks and scaling policies',
    ],
    interviewTips: [
      'Discuss scaling metrics — CPU is common but application-level metrics (queue depth, latency) are often better',
      'Explain cool-down periods and why they prevent thrashing (rapid scale up/down cycles)',
      'Mention that auto-scaling has lag — predictive scaling or over-provisioning helps for sudden spikes',
    ],
    relatedTopics: ['horizontal-vs-vertical-scaling', 'load-balancing', 'health-checks-monitoring'],
  },
  {
    id: 'database-partitioning',
    title: 'Database Partitioning',
    category: 'scaling',
    difficulty: 2,
    summary:
      'Database partitioning divides a large table into smaller, more manageable pieces. Horizontal partitioning splits by rows, vertical partitioning splits by columns.',
    explanation: `## What is Partitioning?

Partitioning divides a large database table into smaller segments that can be accessed and managed independently. Unlike sharding (which spreads data across servers), partitioning typically happens within a single database instance.

## Horizontal Partitioning

Splits a table by rows based on a partition key. Each partition holds a subset of rows.

\`\`\`sql
-- Range partitioning by date
CREATE TABLE orders (
  id SERIAL,
  created_at DATE,
  amount DECIMAL
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2024 PARTITION OF orders
  FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
CREATE TABLE orders_2025 PARTITION OF orders
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
\`\`\`

## Vertical Partitioning

Splits a table by columns, storing frequently accessed columns separately from rarely accessed ones. Reduces I/O by reading only the columns needed.

## Partitioning Strategies

- **Range**: Partition by value ranges (dates, IDs). Good for time-series data.
- **List**: Partition by explicit values (country, status). Good for categorical data.
- **Hash**: Partition by hash of the key. Even distribution but no range query optimization.

## Benefits

Partitioning improves query performance (partition pruning), simplifies data management (drop old partitions), and enables parallel query execution across partitions.`,
    keyPoints: [
      'Horizontal partitioning splits rows; vertical partitioning splits columns',
      'Range partitioning is ideal for time-series data — old partitions can be dropped easily',
      'Hash partitioning provides even distribution but does not optimize range queries',
      'Partition pruning skips irrelevant partitions, dramatically improving query performance',
      'Partitioning is within a single database; sharding distributes across multiple servers',
      'PostgreSQL, MySQL, and most modern databases support native table partitioning',
    ],
    realWorld: [
      'Uber partitions ride data by date range for fast queries on recent trips and easy archival of old data',
      'Time-series databases like TimescaleDB automatically partition data into time-based chunks',
      'E-commerce platforms partition order tables by date to keep recent orders fast and archive old ones',
    ],
    interviewTips: [
      'Clearly distinguish partitioning (single server) from sharding (multiple servers)',
      'Explain partition pruning and how it improves query performance',
      'Discuss choosing a partition key — it should align with your most common query patterns',
    ],
    relatedTopics: ['sharding', 'database-indexing', 'sql-vs-nosql'],
  },
  {
    id: 'read-replicas',
    title: 'Read Replicas',
    category: 'scaling',
    difficulty: 2,
    summary:
      'Read replicas are copies of a primary database that serve read queries, distributing read traffic and improving query performance without affecting write operations.',
    explanation: `## What are Read Replicas?

Read replicas are secondary database instances that receive replicated data from a primary (leader) database. All writes go to the primary, and reads are distributed across replicas. This is the simplest way to scale read-heavy workloads.

## How They Work

1. The application writes to the primary database.
2. Changes are replicated (usually asynchronously) to one or more read replicas.
3. Read queries are routed to replicas, reducing load on the primary.
4. The primary handles only writes and critical reads requiring strong consistency.

## Replication Lag

Since replication is typically asynchronous, replicas may be slightly behind the primary. This replication lag means reads from replicas may return stale data.

**Mitigation strategies**:
- Read from the primary for recently-written data (read-your-writes consistency).
- Use synchronous replication for critical replicas (higher latency, stronger consistency).
- Monitor replication lag and route time-sensitive queries to low-lag replicas.

## Scaling Pattern

Read replicas are often the first scaling step before considering sharding. They are easy to set up, require minimal application changes, and most cloud databases support them natively.`,
    keyPoints: [
      'Read replicas offload read traffic from the primary database to secondary copies',
      'All writes go to the primary; replicas serve only read queries',
      'Asynchronous replication introduces lag — replicas may serve slightly stale data',
      'Read-your-writes consistency ensures users see their own recent writes',
      'Read replicas are the simplest database scaling strategy before sharding',
    ],
    realWorld: [
      'Amazon RDS supports up to 15 read replicas per primary instance with automatic replication',
      'Pinterest uses MySQL read replicas to handle billions of daily pin reads',
      'Basecamp uses read replicas to distribute query load across their Rails application',
    ],
    interviewTips: [
      'Explain how read replicas differ from sharding — replicas duplicate data, shards partition it',
      'Discuss replication lag and strategies to handle consistency requirements',
      'Mention that read replicas can also serve as failover candidates if the primary goes down',
    ],
    relatedTopics: ['replication', 'load-balancing', 'horizontal-vs-vertical-scaling'],
  },
  {
    id: 'connection-pooling',
    title: 'Connection Pooling',
    category: 'scaling',
    difficulty: 2,
    summary:
      'Connection pooling maintains a pool of reusable database connections, avoiding the overhead of creating new connections for every request and improving throughput.',
    explanation: `## The Problem

Opening a database connection involves TCP handshake, authentication, and session setup — taking 20-100ms or more. If every request opens and closes a connection, the overhead significantly impacts performance and limits throughput.

## How Connection Pooling Works

A connection pool maintains a set of pre-established database connections. When the application needs a connection, it borrows one from the pool. When done, it returns the connection to the pool instead of closing it.

\`\`\`
Application Request
    -> Borrow connection from pool
    -> Execute query
    -> Return connection to pool
    (Connection stays open for the next request)
\`\`\`

## Pool Configuration

Key settings that must be tuned:

- **Minimum pool size**: Connections kept open even during idle periods.
- **Maximum pool size**: Upper limit to prevent overwhelming the database.
- **Connection timeout**: How long to wait for an available connection before failing.
- **Idle timeout**: How long an unused connection stays in the pool before being closed.
- **Max lifetime**: Maximum age of a connection before it is recycled.

## External Connection Poolers

For high-scale applications, external poolers like PgBouncer (PostgreSQL) or ProxySQL (MySQL) sit between the application and database. They manage connections across multiple application instances and can pool thousands of application connections into a smaller number of database connections.`,
    keyPoints: [
      'Eliminates the overhead of creating a new database connection for every request',
      'Pool maintains reusable connections that are borrowed and returned by the application',
      'Max pool size must be tuned — too small causes queuing, too large overwhelms the database',
      'External poolers (PgBouncer, ProxySQL) manage connections across multiple app instances',
      'Connection lifetime and idle timeout settings prevent stale or leaked connections',
    ],
    realWorld: [
      'PgBouncer is widely used in production PostgreSQL deployments to handle thousands of concurrent connections',
      'HikariCP is the default connection pool in Spring Boot with sub-microsecond connection borrow times',
      'Heroku and Supabase use PgBouncer to multiplex many application connections to fewer database connections',
    ],
    interviewTips: [
      'Explain why connection creation is expensive — TCP handshake, TLS, authentication, session setup',
      'Discuss pool sizing — too many connections can exhaust database resources (memory, file descriptors)',
      'Mention the connection pool exhaustion problem and how to diagnose it (timeouts, slow queries holding connections)',
    ],
    relatedTopics: ['read-replicas', 'horizontal-vs-vertical-scaling', 'database-indexing'],
  },
];

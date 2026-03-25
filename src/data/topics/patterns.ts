import type { Topic } from '../../types';

export const patternsTopics: Topic[] = [
  {
    id: 'microservices-vs-monolith',
    title: 'Microservices vs Monolith',
    category: 'patterns',
    difficulty: 1,
    summary:
      'A monolith is a single deployable unit containing all functionality, while microservices decompose the system into small, independently deployable services communicating over the network.',
    explanation: `## Monolithic Architecture

A monolith packages all application functionality into a single codebase and deployment unit. The entire application is built, tested, and deployed together.

**Pros**: Simple to develop, test, and deploy initially. No network latency between components. Easier debugging and tracing.
**Cons**: Becomes harder to maintain as it grows. Changes risk breaking unrelated features. Scaling requires scaling the entire application.

## Microservices Architecture

Microservices decompose the application into small, focused services that communicate over the network (HTTP, gRPC, messaging). Each service owns its data and can be developed, deployed, and scaled independently.

**Pros**: Independent deployment and scaling. Technology diversity (each service picks its own stack). Team autonomy — small teams own individual services.
**Cons**: Distributed system complexity (network failures, data consistency). Operational overhead (monitoring, tracing, deployment pipelines). Harder to debug cross-service issues.

## The Monolith-First Approach

Many experts recommend starting with a monolith and extracting microservices as the system and team grow. Premature decomposition into microservices creates unnecessary complexity without clear service boundaries.

## When to Choose Microservices

Microservices make sense when you have multiple teams needing independent deployment, different scaling requirements per component, or clear domain boundaries that map to services.`,
    keyPoints: [
      'Monoliths are simpler to build and operate initially but become harder to scale and maintain',
      'Microservices enable independent deployment, scaling, and technology choices per service',
      'Microservices introduce distributed system complexity: network calls, data consistency, debugging',
      'Start with a monolith and extract microservices when clear boundaries and team scale justify it',
      'Each microservice should own its data — no shared databases between services',
    ],
    realWorld: [
      'Amazon evolved from a monolith to microservices as their teams and services grew',
      'Netflix is a canonical example of microservices at scale with hundreds of services',
      'Shopify maintained a modular monolith (Rails) at massive scale, proving monoliths can work',
    ],
    interviewTips: [
      'Avoid saying microservices are always better — discuss trade-offs and when each fits',
      'Mention the monolith-first approach recommended by Martin Fowler and others',
      'Discuss the operational requirements: service mesh, distributed tracing, CI/CD per service',
    ],
    relatedTopics: ['api-gateway', 'saga-pattern', 'circuit-breaker'],
  },
  {
    id: 'api-gateway',
    title: 'API Gateway',
    category: 'patterns',
    difficulty: 2,
    summary:
      'An API gateway is a single entry point for all client requests that routes, composes, and manages API calls to backend services, handling cross-cutting concerns.',
    explanation: `## What is an API Gateway?

An API gateway sits between clients and backend services as a reverse proxy. It provides a unified entry point that handles routing, authentication, rate limiting, and other cross-cutting concerns.

## Key Responsibilities

- **Request routing**: Directs requests to the appropriate backend service based on URL path, headers, or method.
- **Authentication & Authorization**: Validates tokens and enforces access policies before requests reach services.
- **Rate limiting**: Throttles requests to protect backend services from overload.
- **Request/Response transformation**: Translates between client-facing and service-facing API formats.
- **Load balancing**: Distributes requests across service instances.
- **Caching**: Caches responses to reduce backend load and improve latency.

## API Composition

The gateway can aggregate responses from multiple services into a single response, reducing the number of round trips the client needs.

\`\`\`
Client -> GET /product/42
Gateway:
  -> Product Service: get product details
  -> Inventory Service: get stock level
  -> Review Service: get reviews
  -> Combines and returns unified response
\`\`\`

## Backend for Frontend (BFF)

A specialized pattern where each client type (web, mobile, IoT) has its own gateway tailored to its needs. Mobile clients might receive smaller payloads, while web clients get richer data.

## Trade-offs

The gateway is a critical component — if it goes down, all services become unreachable. It must be highly available and performant, and it can become a development bottleneck if a single team manages all routing changes.`,
    keyPoints: [
      'Single entry point that handles routing, auth, rate limiting, and cross-cutting concerns',
      'API composition aggregates data from multiple services into one client response',
      'Backend for Frontend (BFF) provides client-specific gateways for web, mobile, etc.',
      'The gateway itself must be highly available — it is a critical point of failure',
      'Offloads cross-cutting concerns from individual services to a centralized layer',
    ],
    realWorld: [
      'Netflix Zuul / Spring Cloud Gateway routes billions of API requests to backend services',
      'AWS API Gateway provides managed API routing with Lambda integration and rate limiting',
      'Kong is a widely-used open-source API gateway built on NGINX with a plugin ecosystem',
    ],
    interviewTips: [
      'Explain how an API gateway simplifies client-service communication in a microservices architecture',
      'Discuss the BFF pattern and why mobile and web clients might need different gateways',
      'Mention the risk of the gateway becoming a bottleneck or single point of failure',
    ],
    relatedTopics: ['microservices-vs-monolith', 'load-balancing', 'rate-limiting'],
  },
  {
    id: 'saga-pattern',
    title: 'Saga Pattern',
    category: 'patterns',
    difficulty: 3,
    summary:
      'The saga pattern manages distributed transactions across microservices using a sequence of local transactions with compensating actions for rollback.',
    explanation: `## The Problem

In a microservices architecture, each service owns its database. Traditional ACID transactions cannot span multiple services. How do you maintain data consistency for operations that touch multiple services?

## What is a Saga?

A saga is a sequence of local transactions where each step publishes an event or message that triggers the next step. If any step fails, compensating transactions are executed to undo the preceding steps.

## Example: Order Placement

\`\`\`
1. Order Service:  Create order (PENDING)
2. Payment Service: Charge payment
3. Inventory Service: Reserve items
4. Shipping Service: Schedule delivery
5. Order Service:  Update order (CONFIRMED)

If step 3 fails:
  Compensate step 2: Refund payment
  Compensate step 1: Cancel order
\`\`\`

## Orchestration vs Choreography

### Orchestration

A central orchestrator (saga coordinator) directs the flow. It tells each service what to do and handles failures. Easier to understand but creates a central point of control.

### Choreography

Each service listens for events and decides what to do next. No central coordinator — services react independently. More decoupled but harder to trace and debug.

## Challenges

- Compensating transactions must be carefully designed — they undo work but may not restore the exact original state.
- Sagas provide eventual consistency, not immediate consistency.
- Debugging long-running sagas across services requires good observability.`,
    keyPoints: [
      'Manages distributed transactions across services without a global ACID transaction',
      'Each step is a local transaction with a compensating action for rollback',
      'Orchestration uses a central coordinator; choreography uses event-driven reactions',
      'Compensating transactions undo work but may not perfectly restore the original state',
      'Provides eventual consistency — not immediate consistency across services',
    ],
    realWorld: [
      'Uber uses sagas to coordinate ride booking across matching, payment, and notification services',
      'E-commerce order processing commonly implements sagas across order, payment, and inventory services',
      'Temporal and Cadence are workflow engines that simplify saga orchestration in production',
    ],
    interviewTips: [
      'Walk through a concrete saga example with compensating transactions for each step',
      'Compare orchestration vs choreography with trade-offs for each approach',
      'Discuss why sagas are needed — distributed transactions (2PC) do not scale well in microservices',
    ],
    relatedTopics: ['microservices-vs-monolith', 'event-sourcing', 'message-queues'],
  },
  {
    id: 'bloom-filters',
    title: 'Bloom Filters',
    category: 'patterns',
    difficulty: 3,
    summary:
      'A Bloom filter is a space-efficient probabilistic data structure that tests set membership. It can definitively say an element is NOT in the set, but may have false positives.',
    explanation: `## What is a Bloom Filter?

A Bloom filter is a probabilistic data structure that answers the question "Is this element in the set?" with two possible answers:

- **Definitely not in the set** (no false negatives).
- **Probably in the set** (possible false positives).

## How It Works

1. Start with a bit array of size m, all set to 0.
2. Use k independent hash functions.
3. **Insert**: Hash the element with all k functions. Set the resulting bit positions to 1.
4. **Lookup**: Hash the query with all k functions. If ALL corresponding bits are 1, the element is "probably present." If ANY bit is 0, the element is "definitely absent."

\`\`\`
Bit Array: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

Insert "cat" (hash positions: 1, 4, 7):
           [0, 1, 0, 0, 1, 0, 0, 1, 0, 0]

Insert "dog" (hash positions: 2, 4, 9):
           [0, 1, 1, 0, 1, 0, 0, 1, 0, 1]

Lookup "cat": positions 1,4,7 all = 1 -> Probably present
Lookup "fox": positions 3,5,8 -> bit 3 = 0 -> Definitely absent
\`\`\`

## Trade-offs

Bloom filters use significantly less memory than storing the actual set. The false positive rate can be tuned by adjusting the bit array size and number of hash functions. Elements cannot be deleted (use Counting Bloom Filters for deletion support).

## Applications

Bloom filters are used wherever you need fast, memory-efficient membership checks and can tolerate occasional false positives: spam detection, cache key existence, duplicate URL detection, and database read optimization.`,
    keyPoints: [
      'Answers "Is this in the set?" with no false negatives but possible false positives',
      'Uses a bit array and multiple hash functions for compact membership testing',
      'Much more memory-efficient than storing the actual set of elements',
      'False positive rate is tunable by adjusting bit array size and hash function count',
      'Standard Bloom filters do not support deletion — use counting variants for that',
    ],
    realWorld: [
      'Google Chrome uses a Bloom filter to check URLs against a list of known malicious sites',
      'Cassandra and HBase use Bloom filters to avoid reading SSTables that do not contain a key',
      'Medium uses Bloom filters to avoid recommending articles a user has already read',
    ],
    interviewTips: [
      'Explain the bit array and hashing mechanism step by step with a small example',
      'Emphasize: false positives possible, false negatives impossible',
      'Discuss how Bloom filters optimize database reads by filtering unnecessary disk lookups',
    ],
    relatedTopics: ['lsm-trees', 'caching-strategies', 'consistent-hashing'],
  },
  {
    id: 'leader-election',
    title: 'Leader Election',
    category: 'patterns',
    difficulty: 3,
    summary:
      'Leader election is a coordination pattern where distributed nodes choose a single leader to coordinate actions, using algorithms like Raft, Paxos, or Bully.',
    explanation: `## Why Leader Election?

In distributed systems, many tasks require a single coordinator: writing to a primary database, scheduling jobs, or making decisions that must be consistent. Leader election ensures exactly one node acts as the leader at any time.

## How It Works

1. Multiple nodes participate in an election process.
2. One node is chosen as the leader through a consensus algorithm.
3. The leader coordinates actions (writes, scheduling, assignments).
4. If the leader fails (detected via heartbeats), a new election occurs.

## Consensus Algorithms

### Raft

Designed for understandability. Nodes are Followers, Candidates, or Leaders. Elections use randomized timeouts to avoid split votes. Leaders maintain authority via heartbeats.

### Paxos

Theoretically elegant but complex to implement. Guarantees safety (agreement on a single value) even during network partitions. Used in Google's Chubby lock service.

### Bully Algorithm

The node with the highest ID claims leadership. Simple but makes assumptions about node reliability and network behavior.

## Challenges

- **Split brain**: Network partitions can cause two nodes to believe they are the leader. Quorum-based approaches prevent this.
- **Lease-based leadership**: The leader holds a time-limited lease that must be renewed. If the leader fails to renew, another node can claim leadership.
- **Stale leaders**: A leader that has been replaced may not know it yet and could issue conflicting commands (fencing tokens solve this).`,
    keyPoints: [
      'Ensures exactly one node acts as coordinator in a distributed system',
      'Raft is the most widely used consensus algorithm due to its understandability',
      'Leaders are detected as failed via missed heartbeats, triggering a new election',
      'Split brain must be prevented using quorum-based voting (majority agreement)',
      'Lease-based leadership uses time-limited leases to bound stale leader duration',
    ],
    realWorld: [
      'Apache ZooKeeper provides leader election as a primitive for distributed coordination',
      'etcd (used by Kubernetes) implements Raft consensus for leader election and configuration storage',
      'Redis Sentinel uses a leader election protocol to choose which Sentinel triggers failover',
    ],
    interviewTips: [
      'Explain why a single leader is needed and the problems of not having one (split brain)',
      'Describe the Raft algorithm at a high level: terms, elections, heartbeats, log replication',
      'Discuss fencing tokens and why they prevent stale leaders from causing inconsistencies',
    ],
    relatedTopics: ['cap-theorem', 'failover-strategies', 'consistent-hashing'],
  },
  {
    id: 'consistent-hashing',
    title: 'Consistent Hashing',
    category: 'patterns',
    difficulty: 3,
    summary:
      'Consistent hashing distributes data across nodes in a way that minimizes redistribution when nodes are added or removed, essential for scalable distributed systems.',
    explanation: `## The Problem with Simple Hashing

With simple hash-based distribution (\`server = hash(key) % N\`), adding or removing a server changes N, causing almost all keys to be remapped. This triggers massive data migration.

## How Consistent Hashing Works

1. Map both servers and keys onto a circular hash ring (0 to 2^32).
2. Each key is assigned to the next server clockwise on the ring.
3. When a server is added, only keys between the new server and its predecessor need to move.
4. When a server is removed, only its keys move to the next server clockwise.

## Virtual Nodes

With few physical servers, the distribution can be uneven. Virtual nodes solve this by mapping each physical server to multiple positions on the ring. This spreads the load more evenly and reduces variance.

\`\`\`
Physical Server A -> Virtual: A1, A2, A3, A4
Physical Server B -> Virtual: B1, B2, B3, B4
Physical Server C -> Virtual: C1, C2, C3, C4
\`\`\`

## Benefits

- **Minimal redistribution**: Only K/N keys move when a node is added or removed (K = total keys, N = total nodes).
- **Horizontal scalability**: Nodes can be added incrementally without rehashing all data.
- **Even distribution**: Virtual nodes ensure balanced load across physical servers.

## Jump Hash and Rendezvous Hashing

Alternatives to ring-based consistent hashing include Jump Hash (faster, even distribution but only supports appending servers) and Rendezvous Hashing (highest random weight — simpler implementation).`,
    keyPoints: [
      'Maps servers and keys onto a hash ring to minimize redistribution on topology changes',
      'Adding or removing a server moves only K/N keys instead of rehashing everything',
      'Virtual nodes improve load balance by giving each server multiple ring positions',
      'Essential for distributed caches, databases, and load balancers',
      'Jump Hash and Rendezvous Hashing are simpler alternatives for specific use cases',
    ],
    realWorld: [
      'Amazon DynamoDB uses consistent hashing to distribute data across storage nodes',
      'Akamai CDN uses consistent hashing to map content to edge cache servers',
      'Apache Cassandra uses consistent hashing with virtual nodes for data partitioning across the cluster',
    ],
    interviewTips: [
      'Draw the hash ring and walk through adding/removing a node showing which keys move',
      'Explain virtual nodes and why they are necessary for even distribution',
      'Compare consistent hashing with simple mod-N hashing and quantify the redistribution difference',
    ],
    relatedTopics: ['sharding', 'load-balancing', 'leader-election'],
  },
  {
    id: 'gossip-protocol',
    title: 'Gossip Protocol',
    category: 'patterns',
    difficulty: 3,
    summary:
      'Gossip protocols spread information through a cluster by having each node periodically share state with random peers, achieving eventual consistency without a central coordinator.',
    explanation: `## What is a Gossip Protocol?

A gossip protocol (epidemic protocol) is a decentralized communication mechanism where nodes periodically exchange state information with randomly selected peers. Like how rumors spread in a social network, information eventually reaches all nodes.

## How It Works

1. Each node maintains local state (membership list, health status, data versions).
2. Periodically (e.g., every second), each node selects a random peer.
3. The two nodes exchange state information, merging updates.
4. Information propagates exponentially — reaching all N nodes in O(log N) rounds.

## Key Properties

- **Decentralized**: No single coordinator or leader required.
- **Fault tolerant**: Works even when nodes fail — information routes around failures.
- **Scalable**: Communication overhead grows logarithmically with cluster size.
- **Eventually consistent**: All nodes converge to the same state, but not instantly.

## Applications

### Failure Detection

Nodes gossip heartbeat counters. If a node's counter stops incrementing, it is suspected of failure. Multiple nodes must agree before declaring a node dead, reducing false positives.

### Membership Management

New nodes announce themselves via gossip. Departing or failed nodes are eventually removed from all membership lists across the cluster.

### Data Dissemination

State changes (configuration updates, data versions) are spread via gossip. Anti-entropy processes repair inconsistencies by comparing and synchronizing state between peers.`,
    keyPoints: [
      'Nodes periodically exchange state with random peers — no central coordinator needed',
      'Information propagates to all N nodes in O(log N) communication rounds',
      'Decentralized and fault-tolerant — works even when nodes fail',
      'Used for failure detection, membership management, and state dissemination',
      'Provides eventual consistency — all nodes converge but not instantaneously',
    ],
    realWorld: [
      'Apache Cassandra uses gossip protocol for cluster membership and failure detection',
      'HashiCorp Consul and Serf use SWIM (a gossip-based protocol) for membership and health checking',
      'Amazon DynamoDB uses gossip to propagate membership changes across storage nodes',
    ],
    interviewTips: [
      'Explain the random peer selection process and why information spreads in O(log N) rounds',
      'Discuss how gossip-based failure detection works with suspicion and confirmation phases',
      'Compare gossip protocols with centralized approaches — trade-offs in consistency and overhead',
    ],
    relatedTopics: ['leader-election', 'cap-theorem', 'consistent-hashing'],
  },
];

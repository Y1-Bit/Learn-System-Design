import type { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  // ─── NETWORKING ────────────────────────────────────────────────────────
  {
    id: 'q-rest-1',
    topicId: 'rest-api',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Which HTTP method is idempotent by design in a RESTful API?',
    options: ['POST', 'PUT', 'PATCH', 'CONNECT'],
    correctAnswer: 'PUT',
    explanation:
      'PUT is idempotent because sending the same request multiple times produces the same result. POST creates a new resource each time, so it is not idempotent.',
  },
  {
    id: 'q-rest-2',
    topicId: 'rest-api',
    type: 'true-false',
    difficulty: 1,
    question: 'REST APIs must always use JSON as their data format.',
    correctAnswer: false,
    explanation:
      'REST is format-agnostic. While JSON is the most popular format, REST APIs can also use XML, Protocol Buffers, plain text, or any other media type.',
  },
  {
    id: 'q-graphql-1',
    topicId: 'graphql',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'What problem does GraphQL primarily solve compared to REST?',
    options: [
      'Eliminating the need for a database',
      'Over-fetching and under-fetching of data',
      'Removing the need for authentication',
      'Automatic horizontal scaling',
    ],
    correctAnswer: 'Over-fetching and under-fetching of data',
    explanation:
      'GraphQL lets clients request exactly the fields they need, avoiding over-fetching (getting too much data) and under-fetching (needing multiple round trips).',
  },
  {
    id: 'q-grpc-1',
    topicId: 'grpc',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Which serialization format does gRPC use by default?',
    options: ['JSON', 'XML', 'Protocol Buffers', 'MessagePack'],
    correctAnswer: 'Protocol Buffers',
    explanation:
      'gRPC uses Protocol Buffers (protobuf) as its default serialization format, which is a compact binary format that is faster to serialize and smaller than JSON.',
  },
  {
    id: 'q-websockets-1',
    topicId: 'websockets',
    type: 'true-false',
    difficulty: 1,
    question: 'WebSocket connections start with an HTTP handshake before upgrading to the WebSocket protocol.',
    correctAnswer: true,
    explanation:
      'WebSocket connections begin with an HTTP Upgrade request. Once the server agrees, the connection is upgraded from HTTP to a persistent, full-duplex WebSocket connection.',
  },
  {
    id: 'q-dns-1',
    topicId: 'dns',
    type: 'matching',
    difficulty: 2,
    question: 'Match each DNS record type with its purpose.',
    pairs: [
      { left: 'A', right: 'Maps domain to IPv4 address' },
      { left: 'CNAME', right: 'Alias for another domain name' },
      { left: 'MX', right: 'Mail server for the domain' },
      { left: 'TXT', right: 'Arbitrary text, often for verification' },
    ],
    explanation:
      'DNS uses different record types: A records point to IP addresses, CNAME records alias one domain to another, MX records direct email, and TXT records store text metadata.',
  },
  {
    id: 'q-cdn-1',
    topicId: 'cdn',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'What is the primary benefit of using a CDN?',
    options: [
      'Encrypting data at rest',
      'Reducing latency by serving content from edge locations closer to users',
      'Replacing the origin server entirely',
      'Automatically scaling the database',
    ],
    correctAnswer: 'Reducing latency by serving content from edge locations closer to users',
    explanation:
      'CDNs cache content at geographically distributed edge servers so users receive responses from a nearby location, significantly reducing latency.',
  },

  // ─── STORAGE ───────────────────────────────────────────────────────────
  {
    id: 'q-sql-nosql-1',
    topicId: 'sql-vs-nosql',
    type: 'matching',
    difficulty: 1,
    question: 'Match each database characteristic with the correct database type.',
    pairs: [
      { left: 'Fixed schema with tables', right: 'SQL' },
      { left: 'Flexible document model', right: 'NoSQL' },
      { left: 'Strong ACID guarantees by default', right: 'SQL' },
      { left: 'Horizontal scaling is easier', right: 'NoSQL' },
    ],
    explanation:
      'SQL databases enforce schemas and provide strong ACID transactions. NoSQL databases offer flexible schemas and are designed for horizontal scalability.',
  },
  {
    id: 'q-acid-1',
    topicId: 'acid-properties',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'In ACID, what does the "I" (Isolation) guarantee?',
    options: [
      'Data is always encrypted',
      'Concurrent transactions do not interfere with each other',
      'Data is replicated across nodes',
      'Transactions complete within a time limit',
    ],
    correctAnswer: 'Concurrent transactions do not interfere with each other',
    explanation:
      'Isolation ensures that concurrent transactions execute as if they were run sequentially, preventing dirty reads and other anomalies.',
  },
  {
    id: 'q-indexing-1',
    topicId: 'database-indexing',
    type: 'true-false',
    difficulty: 1,
    question: 'Adding more indexes always improves database performance.',
    correctAnswer: false,
    explanation:
      'Indexes speed up reads but slow down writes because the index must be updated on every insert, update, or delete. Over-indexing can degrade write performance.',
  },
  {
    id: 'q-replication-1',
    topicId: 'replication',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'In leader-follower replication, what is replication lag?',
    options: [
      'The time to create a new replica',
      'The delay between a write on the leader and its appearance on a follower',
      'The number of followers behind the leader',
      'The speed of the network between data centers',
    ],
    correctAnswer: 'The delay between a write on the leader and its appearance on a follower',
    explanation:
      'Replication lag is the time it takes for a write committed on the leader to be replicated and visible on a follower. High lag can cause stale reads.',
  },
  {
    id: 'q-sharding-1',
    topicId: 'sharding',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'What is a major challenge when sharding a database?',
    options: [
      'Reduced storage capacity',
      'Cross-shard joins become difficult or impossible',
      'All queries become faster automatically',
      'Sharding eliminates the need for indexes',
    ],
    correctAnswer: 'Cross-shard joins become difficult or impossible',
    explanation:
      'When data is split across shards, queries that need data from multiple shards (cross-shard joins) become complex and expensive.',
  },

  // ─── CACHING ───────────────────────────────────────────────────────────
  {
    id: 'q-caching-strat-1',
    topicId: 'caching-strategies',
    type: 'matching',
    difficulty: 2,
    question: 'Match each caching strategy with its description.',
    pairs: [
      { left: 'Cache-aside', right: 'App checks cache first, loads from DB on miss' },
      { left: 'Write-through', right: 'Writes go to cache and DB simultaneously' },
      { left: 'Write-behind', right: 'Writes go to cache first, DB updated asynchronously' },
      { left: 'Read-through', right: 'Cache itself loads from DB on a miss' },
    ],
    explanation:
      'Each strategy has different trade-offs for consistency, latency, and complexity. Cache-aside is the most common pattern.',
  },
  {
    id: 'q-cache-inv-1',
    topicId: 'cache-invalidation',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Why is cache invalidation considered one of the hardest problems in computer science?',
    options: [
      'Caches are too fast',
      'Knowing exactly when cached data becomes stale is inherently difficult',
      'All caches use the same algorithm',
      'Invalidation requires restarting the server',
    ],
    correctAnswer: 'Knowing exactly when cached data becomes stale is inherently difficult',
    explanation:
      'Cache invalidation is hard because determining the precise moment data changes (and which cached entries are affected) requires careful coordination between the data source and all caches.',
  },
  {
    id: 'q-redis-1',
    topicId: 'redis-memcached',
    type: 'true-false',
    difficulty: 1,
    question: 'Redis supports data structures like sorted sets and lists, while Memcached only supports simple key-value strings.',
    correctAnswer: true,
    explanation:
      'Redis is a data structure server supporting strings, hashes, lists, sets, and sorted sets. Memcached is a simpler key-value cache limited to string values.',
  },
  {
    id: 'q-eviction-1',
    topicId: 'cache-eviction-policies',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Which cache eviction policy removes the item that has not been accessed for the longest time?',
    options: ['FIFO', 'LRU', 'LFU', 'Random'],
    correctAnswer: 'LRU',
    explanation:
      'LRU (Least Recently Used) evicts the entry that has not been accessed for the longest period. LFU evicts the least frequently used entry.',
  },

  // ─── SCALING ───────────────────────────────────────────────────────────
  {
    id: 'q-hv-scaling-1',
    topicId: 'horizontal-vs-vertical-scaling',
    type: 'matching',
    difficulty: 1,
    question: 'Match the scaling approach with its description.',
    pairs: [
      { left: 'Vertical scaling', right: 'Adding more CPU/RAM to a single machine' },
      { left: 'Horizontal scaling', right: 'Adding more machines to the pool' },
    ],
    explanation:
      'Vertical scaling (scale up) increases the power of one machine. Horizontal scaling (scale out) adds more machines. Horizontal scaling is generally preferred for distributed systems.',
  },
  {
    id: 'q-lb-1',
    topicId: 'load-balancing',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Which load balancing algorithm sends each request to the server with the fewest active connections?',
    options: ['Round Robin', 'Least Connections', 'IP Hash', 'Random'],
    correctAnswer: 'Least Connections',
    explanation:
      'Least Connections routes traffic to the server currently handling the fewest connections, which is useful when request processing times vary.',
  },
  {
    id: 'q-autoscale-1',
    topicId: 'auto-scaling',
    type: 'true-false',
    difficulty: 2,
    question: 'Auto-scaling can only scale out (add instances), not scale in (remove instances).',
    correctAnswer: false,
    explanation:
      'Auto-scaling works in both directions. It adds instances when demand increases and removes them when demand decreases to save costs.',
  },
  {
    id: 'q-connpool-1',
    topicId: 'connection-pooling',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'What is the main benefit of connection pooling for database connections?',
    options: [
      'It encrypts all connections',
      'It reuses existing connections instead of creating new ones for each request',
      'It automatically shards the database',
      'It compresses query results',
    ],
    correctAnswer: 'It reuses existing connections instead of creating new ones for each request',
    explanation:
      'Creating a new database connection is expensive (TCP handshake, authentication). Connection pooling maintains a set of reusable connections, reducing overhead.',
  },

  // ─── RELIABILITY ───────────────────────────────────────────────────────
  {
    id: 'q-cap-1',
    topicId: 'cap-theorem',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'According to the CAP theorem, during a network partition you must choose between:',
    options: [
      'Consistency and Availability',
      'Consistency and Performance',
      'Availability and Durability',
      'Latency and Throughput',
    ],
    correctAnswer: 'Consistency and Availability',
    explanation:
      'The CAP theorem states that during a network partition (P), a distributed system can guarantee either Consistency (C) or Availability (A), but not both.',
  },
  {
    id: 'q-failover-1',
    topicId: 'failover-strategies',
    type: 'matching',
    difficulty: 2,
    question: 'Match each failover strategy with its description.',
    pairs: [
      { left: 'Active-passive', right: 'Standby takes over when the primary fails' },
      { left: 'Active-active', right: 'Multiple nodes handle traffic simultaneously' },
    ],
    explanation:
      'Active-passive keeps a hot standby ready. Active-active distributes load across all nodes, providing both redundancy and higher throughput.',
  },
  {
    id: 'q-circuit-1',
    topicId: 'circuit-breaker',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'What are the three states of a circuit breaker pattern?',
    options: [
      'Open, Closed, Half-Open',
      'Start, Stop, Pause',
      'Active, Passive, Standby',
      'Primary, Secondary, Tertiary',
    ],
    correctAnswer: 'Open, Closed, Half-Open',
    explanation:
      'Closed means requests flow normally. Open means requests are blocked after repeated failures. Half-Open allows a limited number of test requests to check if the service has recovered.',
  },
  {
    id: 'q-healthcheck-1',
    topicId: 'health-checks-monitoring',
    type: 'true-false',
    difficulty: 1,
    question: 'A health check endpoint should verify only that the HTTP server is running, not its dependencies.',
    correctAnswer: false,
    explanation:
      'Good health checks often include shallow checks (is the server up?) and deep checks (can it reach the database, cache, etc.) to give a complete picture of service health.',
  },

  // ─── MESSAGING ─────────────────────────────────────────────────────────
  {
    id: 'q-mq-1',
    topicId: 'message-queues',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'What is the primary benefit of using a message queue between services?',
    options: [
      'It makes services synchronous',
      'It decouples producers and consumers, allowing asynchronous processing',
      'It eliminates the need for a database',
      'It encrypts all data in transit',
    ],
    correctAnswer: 'It decouples producers and consumers, allowing asynchronous processing',
    explanation:
      'Message queues allow the producer to send a message and continue without waiting for the consumer, decoupling the services and improving resilience.',
  },
  {
    id: 'q-pubsub-1',
    topicId: 'pub-sub',
    type: 'true-false',
    difficulty: 1,
    question: 'In pub-sub, a message published to a topic is received by only one subscriber.',
    correctAnswer: false,
    explanation:
      'In pub-sub, all subscribers to a topic receive a copy of every message. This is different from a point-to-point queue where each message is consumed by a single consumer.',
  },
  {
    id: 'q-kafka-1',
    topicId: 'apache-kafka',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'How does Kafka achieve high throughput for message processing?',
    options: [
      'By deleting messages immediately after consumption',
      'By using sequential I/O with an append-only commit log and consumer groups',
      'By storing messages only in memory',
      'By limiting topics to a single partition',
    ],
    correctAnswer: 'By using sequential I/O with an append-only commit log and consumer groups',
    explanation:
      'Kafka writes messages sequentially to an append-only log on disk, which is very fast. Consumer groups allow parallel consumption across partitions.',
  },
  {
    id: 'q-cqrs-1',
    topicId: 'cqrs',
    type: 'true-false',
    difficulty: 3,
    question: 'CQRS requires that reads and writes use different databases.',
    correctAnswer: false,
    explanation:
      'CQRS separates the read and write models conceptually. While using different databases is common, it is not required. You can use separate models over the same database.',
  },

  // ─── SECURITY ──────────────────────────────────────────────────────────
  {
    id: 'q-auth-1',
    topicId: 'authentication-oauth-jwt',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'What is the main advantage of using JWTs for authentication?',
    options: [
      'They are encrypted by default',
      'They are stateless and do not require server-side session storage',
      'They never expire',
      'They can only be used with OAuth',
    ],
    correctAnswer: 'They are stateless and do not require server-side session storage',
    explanation:
      'JWTs contain all necessary claims within the token itself, allowing the server to verify authenticity without looking up a session store.',
  },
  {
    id: 'q-rbac-1',
    topicId: 'authorization-rbac',
    type: 'matching',
    difficulty: 2,
    question: 'Match each access control model with its description.',
    pairs: [
      { left: 'RBAC', right: 'Permissions assigned to roles, users get roles' },
      { left: 'ABAC', right: 'Permissions based on attributes (user, resource, context)' },
      { left: 'ACL', right: 'Explicit list of who can access each resource' },
    ],
    explanation:
      'RBAC groups permissions into roles. ABAC evaluates policies against attributes. ACL maintains per-resource access lists.',
  },
  {
    id: 'q-ratelimit-1',
    topicId: 'rate-limiting',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Which rate limiting algorithm allows short bursts while maintaining an average rate?',
    options: ['Fixed Window', 'Token Bucket', 'IP Blocklist', 'Round Robin'],
    correctAnswer: 'Token Bucket',
    explanation:
      'The token bucket algorithm adds tokens at a steady rate. Bursts are allowed as long as tokens are available, smoothing out traffic over time.',
  },
  {
    id: 'q-encryption-1',
    topicId: 'encryption',
    type: 'true-false',
    difficulty: 1,
    question: 'HTTPS encrypts data in transit between the client and server.',
    correctAnswer: true,
    explanation:
      'HTTPS uses TLS to encrypt all data exchanged between the client and server, preventing eavesdropping and man-in-the-middle attacks.',
  },

  // ─── PATTERNS ──────────────────────────────────────────────────────────
  {
    id: 'q-micro-mono-1',
    topicId: 'microservices-vs-monolith',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'What is a key trade-off when moving from a monolith to microservices?',
    options: [
      'Microservices eliminate all bugs',
      'You gain independent deployability but increase operational complexity',
      'Monoliths cannot scale at all',
      'Microservices require a single shared database',
    ],
    correctAnswer: 'You gain independent deployability but increase operational complexity',
    explanation:
      'Microservices enable independent deployment and scaling of services, but introduce complexity in networking, data consistency, monitoring, and debugging.',
  },
  {
    id: 'q-api-gw-1',
    topicId: 'api-gateway',
    type: 'true-false',
    difficulty: 2,
    question: 'An API gateway typically handles cross-cutting concerns like authentication, rate limiting, and request routing.',
    correctAnswer: true,
    explanation:
      'API gateways act as a single entry point for clients, centralizing concerns like auth, rate limiting, logging, and routing to downstream services.',
  },
  {
    id: 'q-saga-1',
    topicId: 'saga-pattern',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'In the saga pattern, how are failures handled?',
    options: [
      'The entire database is rolled back',
      'Compensating transactions undo the effects of completed steps',
      'Failures are ignored',
      'A two-phase commit locks all services',
    ],
    correctAnswer: 'Compensating transactions undo the effects of completed steps',
    explanation:
      'Sagas break a distributed transaction into local transactions. If one fails, compensating transactions are executed in reverse order to undo previously completed steps.',
  },
  {
    id: 'q-bloom-1',
    topicId: 'bloom-filters',
    type: 'true-false',
    difficulty: 3,
    question: 'A Bloom filter can produce false positives but never false negatives.',
    correctAnswer: true,
    explanation:
      'Bloom filters are probabilistic data structures. They may incorrectly report an element is present (false positive) but will never miss an element that was added (no false negatives).',
  },
  {
    id: 'q-consistent-hash-1',
    topicId: 'consistent-hashing',
    type: 'multiple-choice',
    difficulty: 2,
    question: 'Why is consistent hashing preferred over simple modular hashing for distributed caches?',
    options: [
      'It uses less memory',
      'When a node is added or removed, only a small fraction of keys need to be remapped',
      'It guarantees perfect load distribution',
      'It does not require a hash function',
    ],
    correctAnswer: 'When a node is added or removed, only a small fraction of keys need to be remapped',
    explanation:
      'With modular hashing, adding or removing a node remaps almost all keys. Consistent hashing arranges nodes on a ring so only keys near the changed node are affected.',
  },
  {
    id: 'q-gossip-1',
    topicId: 'gossip-protocol',
    type: 'multiple-choice',
    difficulty: 3,
    question: 'How does the gossip protocol propagate information across a cluster?',
    options: [
      'A central coordinator broadcasts to all nodes',
      'Each node periodically shares state with a random subset of peers',
      'Nodes poll a shared database for updates',
      'Only the leader node sends updates',
    ],
    correctAnswer: 'Each node periodically shares state with a random subset of peers',
    explanation:
      'In gossip protocols, each node periodically picks random peers and exchanges state information. This eventually propagates data to all nodes in an epidemic-like fashion.',
  },
];

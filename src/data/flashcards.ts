import type { Flashcard } from '../types';

export const flashcards: Flashcard[] = [
  // ─── NETWORKING ────────────────────────────────────────────────────────

  // rest-api
  {
    id: 'fc-rest-1',
    topicId: 'rest-api',
    front: 'What does REST stand for and what are its key constraints?',
    back: 'Representational State Transfer. Key constraints include statelessness, client-server separation, cacheability, uniform interface, and layered system. Each request must contain all information needed to process it.',
    difficulty: 1,
  },
  {
    id: 'fc-rest-2',
    topicId: 'rest-api',
    front: 'What is the difference between PUT and PATCH in REST?',
    back: 'PUT replaces the entire resource with the provided representation and is idempotent. PATCH applies a partial update to the resource. PUT requires sending the full object, while PATCH only sends the fields to change.',
    difficulty: 1,
  },

  // graphql
  {
    id: 'fc-graphql-1',
    topicId: 'graphql',
    front: 'What is the N+1 query problem in GraphQL and how is it solved?',
    back: 'The N+1 problem occurs when resolving a list of N items each triggers a separate database query for related data. It is commonly solved with DataLoader, which batches and deduplicates requests within a single tick of the event loop.',
    difficulty: 2,
  },
  {
    id: 'fc-graphql-2',
    topicId: 'graphql',
    front: 'What are the three root operation types in GraphQL?',
    back: 'Query (read data), Mutation (write/modify data), and Subscription (real-time updates via a persistent connection). Every GraphQL schema must define at least a Query type.',
    difficulty: 1,
  },

  // grpc
  {
    id: 'fc-grpc-1',
    topicId: 'grpc',
    front: 'What are the four types of gRPC service methods?',
    back: 'Unary (single request, single response), Server streaming (single request, stream of responses), Client streaming (stream of requests, single response), and Bidirectional streaming (both sides send streams). All are defined in a .proto file.',
    difficulty: 2,
  },
  {
    id: 'fc-grpc-2',
    topicId: 'grpc',
    front: 'Why is gRPC faster than REST for service-to-service communication?',
    back: 'gRPC uses HTTP/2 (multiplexing, header compression) and Protocol Buffers (compact binary serialization). This results in smaller payloads and lower latency compared to JSON over HTTP/1.1.',
    difficulty: 2,
  },

  // websockets
  {
    id: 'fc-ws-1',
    topicId: 'websockets',
    front: 'When should you use WebSockets instead of HTTP polling?',
    back: 'Use WebSockets when you need real-time, bidirectional communication with low latency, such as chat apps, live dashboards, or multiplayer games. HTTP polling wastes bandwidth with repeated requests and introduces latency between polls.',
    difficulty: 1,
  },
  {
    id: 'fc-ws-2',
    topicId: 'websockets',
    front: 'What challenges arise when scaling WebSocket servers horizontally?',
    back: 'WebSocket connections are stateful and sticky, so a user is bound to one server. Scaling requires a pub-sub layer (e.g., Redis) to broadcast messages across servers and sticky sessions or connection-aware routing at the load balancer.',
    difficulty: 3,
  },

  // dns
  {
    id: 'fc-dns-1',
    topicId: 'dns',
    front: 'What is the DNS resolution path from browser to IP address?',
    back: 'Browser cache, OS cache, recursive resolver (ISP), root nameserver, TLD nameserver (.com, .org), then the authoritative nameserver for the domain. Each level may cache results based on TTL.',
    difficulty: 1,
  },
  {
    id: 'fc-dns-2',
    topicId: 'dns',
    front: 'What is DNS-based load balancing and what are its limitations?',
    back: 'DNS load balancing returns different IP addresses for the same domain (round-robin DNS). Limitations include DNS caching preventing quick failover, no health checking, and uneven distribution since clients cache resolved addresses for the TTL duration.',
    difficulty: 2,
  },

  // cdn
  {
    id: 'fc-cdn-1',
    topicId: 'cdn',
    front: 'What is the difference between a push CDN and a pull CDN?',
    back: 'Push CDNs require you to upload content to edge servers proactively. Pull CDNs fetch content from the origin on the first request and cache it. Pull is simpler to set up; push gives more control over what is cached and when.',
    difficulty: 2,
  },
  {
    id: 'fc-cdn-2',
    topicId: 'cdn',
    front: 'How does a CDN determine which edge server should handle a request?',
    back: 'CDNs typically use Anycast routing or DNS-based routing to direct users to the nearest or least-loaded edge server. The edge server either serves from cache or fetches from the origin server on a cache miss.',
    difficulty: 2,
  },

  // http-https-tls
  {
    id: 'fc-http-1',
    topicId: 'http-https-tls',
    front: 'What happens during a TLS handshake?',
    back: 'The client sends a Client Hello with supported cipher suites. The server responds with its certificate and chosen cipher suite. The client verifies the certificate, they agree on a session key via asymmetric encryption, then switch to symmetric encryption for the session.',
    difficulty: 2,
  },
  {
    id: 'fc-http-2',
    topicId: 'http-https-tls',
    front: 'What are the key improvements in HTTP/2 over HTTP/1.1?',
    back: 'HTTP/2 introduces multiplexing (multiple requests over one connection), header compression (HPACK), server push, and binary framing. These reduce latency and head-of-line blocking at the application layer.',
    difficulty: 2,
  },

  // ─── STORAGE ───────────────────────────────────────────────────────────

  // sql-vs-nosql
  {
    id: 'fc-sqlnosql-1',
    topicId: 'sql-vs-nosql',
    front: 'When would you choose a NoSQL database over SQL?',
    back: 'Choose NoSQL when you need flexible schemas, horizontal scalability, high write throughput, or when your data model fits documents, key-value, or graph structures better than relational tables. Examples: MongoDB for documents, Cassandra for time-series.',
    difficulty: 1,
  },
  {
    id: 'fc-sqlnosql-2',
    topicId: 'sql-vs-nosql',
    front: 'What are the main types of NoSQL databases?',
    back: 'Document stores (MongoDB), key-value stores (Redis, DynamoDB), wide-column stores (Cassandra, HBase), and graph databases (Neo4j). Each is optimized for different access patterns and data models.',
    difficulty: 1,
  },

  // acid-properties
  {
    id: 'fc-acid-1',
    topicId: 'acid-properties',
    front: 'What are the four ACID properties?',
    back: 'Atomicity (all or nothing), Consistency (data remains valid), Isolation (concurrent transactions do not interfere), Durability (committed data survives crashes). Together they guarantee reliable transaction processing.',
    difficulty: 1,
  },
  {
    id: 'fc-acid-2',
    topicId: 'acid-properties',
    front: 'What is the difference between ACID and BASE?',
    back: 'ACID emphasizes consistency and reliability. BASE (Basically Available, Soft state, Eventually consistent) favors availability and partition tolerance, accepting temporary inconsistency. Many NoSQL databases follow BASE semantics.',
    difficulty: 2,
  },

  // database-indexing
  {
    id: 'fc-idx-1',
    topicId: 'database-indexing',
    front: 'What is a B-tree index and why is it the default in most SQL databases?',
    back: 'A B-tree is a balanced tree data structure that keeps data sorted and allows searches, inserts, and deletes in O(log n). It works well for range queries and equality lookups, making it a versatile default choice.',
    difficulty: 2,
  },
  {
    id: 'fc-idx-2',
    topicId: 'database-indexing',
    front: 'What is a covering index?',
    back: 'A covering index includes all columns needed by a query, so the database can satisfy the query entirely from the index without reading the actual table rows. This avoids expensive disk lookups and significantly speeds up reads.',
    difficulty: 3,
  },

  // replication
  {
    id: 'fc-repl-1',
    topicId: 'replication',
    front: 'What is the difference between synchronous and asynchronous replication?',
    back: 'Synchronous replication waits for the follower to confirm the write before acknowledging to the client, ensuring consistency but adding latency. Asynchronous replication acknowledges immediately, offering lower latency but risking data loss if the leader fails.',
    difficulty: 2,
  },
  {
    id: 'fc-repl-2',
    topicId: 'replication',
    front: 'What is multi-leader replication and when is it used?',
    back: 'Multi-leader replication allows writes on multiple nodes, useful for multi-datacenter setups or offline-capable apps. The main challenge is handling write conflicts, which can be resolved via last-write-wins, merge logic, or custom conflict resolution.',
    difficulty: 3,
  },

  // sharding
  {
    id: 'fc-shard-1',
    topicId: 'sharding',
    front: 'What is a shard key and why does its choice matter?',
    back: 'A shard key determines how data is distributed across shards. A poor choice causes hotspots (uneven load). A good shard key distributes data evenly, supports common query patterns, and avoids cross-shard operations.',
    difficulty: 2,
  },
  {
    id: 'fc-shard-2',
    topicId: 'sharding',
    front: 'What are the common sharding strategies?',
    back: 'Range-based (shard by value ranges), hash-based (shard by hash of key), and directory-based (lookup table maps keys to shards). Hash-based provides even distribution; range-based supports range queries efficiently.',
    difficulty: 2,
  },

  // lsm-trees
  {
    id: 'fc-lsm-1',
    topicId: 'lsm-trees',
    front: 'How does an LSM-tree optimize write performance?',
    back: 'LSM-trees buffer writes in an in-memory structure (memtable), then flush to sorted on-disk files (SSTables) when full. This converts random writes into sequential writes, which are much faster on disk. Reads merge data from the memtable and SSTables.',
    difficulty: 3,
  },
  {
    id: 'fc-lsm-2',
    topicId: 'lsm-trees',
    front: 'What is compaction in the context of LSM-trees?',
    back: 'Compaction merges multiple SSTables into fewer, larger ones, removing deleted and overwritten entries. This reclaims space and keeps read performance acceptable by reducing the number of files that must be checked during a read.',
    difficulty: 3,
  },

  // object-storage
  {
    id: 'fc-objstore-1',
    topicId: 'object-storage',
    front: 'How does object storage differ from block and file storage?',
    back: 'Object storage stores data as discrete objects with metadata and a unique ID, accessed via HTTP APIs. Block storage provides raw disk volumes. File storage uses hierarchical directories. Object storage excels at massive scale and unstructured data like images and backups.',
    difficulty: 1,
  },
  {
    id: 'fc-objstore-2',
    topicId: 'object-storage',
    front: 'What are common use cases for object storage (e.g., S3)?',
    back: 'Static asset hosting, backups and archives, data lake storage, user-uploaded media, and log storage. Object storage is highly durable, cost-effective for large volumes, and integrates with CDNs for content delivery.',
    difficulty: 1,
  },

  // ─── CACHING ───────────────────────────────────────────────────────────

  // caching-strategies
  {
    id: 'fc-cachestrat-1',
    topicId: 'caching-strategies',
    front: 'What is the cache-aside (lazy loading) pattern?',
    back: 'The application checks the cache first. On a cache miss, it reads from the database, stores the result in the cache, then returns it. This is the most common caching pattern and keeps the cache populated with only requested data.',
    difficulty: 1,
  },
  {
    id: 'fc-cachestrat-2',
    topicId: 'caching-strategies',
    front: 'What is write-through caching and when is it useful?',
    back: 'In write-through caching, every write goes to both the cache and the database synchronously. This ensures consistency between cache and database but adds write latency. Useful when read-after-write consistency is critical.',
    difficulty: 2,
  },

  // cache-invalidation
  {
    id: 'fc-cacheinv-1',
    topicId: 'cache-invalidation',
    front: 'What are the main cache invalidation strategies?',
    back: 'TTL-based (entries expire after a set time), event-driven (invalidate on data change), and version-based (use version keys to invalidate). Each trades off consistency against complexity and performance.',
    difficulty: 2,
  },
  {
    id: 'fc-cacheinv-2',
    topicId: 'cache-invalidation',
    front: 'What is the thundering herd problem in caching?',
    back: 'When a popular cache entry expires, many concurrent requests simultaneously miss the cache and hit the database, causing a spike in load. Solutions include staggered TTLs, cache locks (only one request refreshes), or pre-warming.',
    difficulty: 3,
  },

  // redis-memcached
  {
    id: 'fc-redis-1',
    topicId: 'redis-memcached',
    front: 'When would you choose Redis over Memcached?',
    back: 'Choose Redis when you need rich data structures (lists, sets, sorted sets, hashes), persistence, pub-sub, Lua scripting, or replication. Choose Memcached for simple key-value caching with multi-threaded performance and simplicity.',
    difficulty: 1,
  },
  {
    id: 'fc-redis-2',
    topicId: 'redis-memcached',
    front: 'How does Redis achieve persistence?',
    back: 'Redis offers RDB snapshots (periodic point-in-time snapshots) and AOF (Append Only File, logging every write). You can use both for durability: AOF for minimal data loss and RDB for fast restarts.',
    difficulty: 2,
  },

  // cdn-caching
  {
    id: 'fc-cdncache-1',
    topicId: 'cdn-caching',
    front: 'What HTTP headers control CDN caching behavior?',
    back: 'Cache-Control (max-age, s-maxage, no-cache, no-store), ETag (content fingerprint for conditional requests), Vary (cache separate versions by header values like Accept-Encoding), and Expires (legacy absolute expiration).',
    difficulty: 2,
  },
  {
    id: 'fc-cdncache-2',
    topicId: 'cdn-caching',
    front: 'What is cache busting and why is it needed with CDNs?',
    back: 'Cache busting forces CDN edge servers to fetch a new version of a resource by changing its URL (e.g., appending a hash to the filename). Without it, users may see stale content until the TTL expires.',
    difficulty: 1,
  },

  // cache-eviction-policies
  {
    id: 'fc-evict-1',
    topicId: 'cache-eviction-policies',
    front: 'Compare LRU and LFU eviction policies.',
    back: 'LRU (Least Recently Used) evicts the entry not accessed for the longest time, good for temporal locality. LFU (Least Frequently Used) evicts the entry with the fewest accesses, good when some items are consistently popular. LRU is simpler to implement.',
    difficulty: 2,
  },
  {
    id: 'fc-evict-2',
    topicId: 'cache-eviction-policies',
    front: 'What is the FIFO eviction policy and when might it be appropriate?',
    back: 'FIFO (First In, First Out) evicts the oldest entry regardless of access pattern. It is simple to implement but does not account for popularity or recency. It works well when all items have similar access frequency and short relevance windows.',
    difficulty: 1,
  },

  // ─── SCALING ───────────────────────────────────────────────────────────

  // horizontal-vs-vertical-scaling
  {
    id: 'fc-hvscale-1',
    topicId: 'horizontal-vs-vertical-scaling',
    front: 'What are the limits of vertical scaling?',
    back: 'Vertical scaling is limited by the maximum hardware available for a single machine (CPU, RAM, disk). It also creates a single point of failure and requires downtime for upgrades. At some point, horizontal scaling becomes necessary.',
    difficulty: 1,
  },
  {
    id: 'fc-hvscale-2',
    topicId: 'horizontal-vs-vertical-scaling',
    front: 'What challenges does horizontal scaling introduce?',
    back: 'Horizontal scaling requires handling data partitioning, distributed coordination, network latency, load balancing, stateless application design, and consistency across nodes. It is more complex to implement but offers near-unlimited scalability.',
    difficulty: 2,
  },

  // load-balancing
  {
    id: 'fc-lb-1',
    topicId: 'load-balancing',
    front: 'What is the difference between Layer 4 and Layer 7 load balancing?',
    back: 'Layer 4 (transport) routes based on IP and port without inspecting content, which is faster. Layer 7 (application) inspects HTTP headers, URLs, and cookies for smarter routing decisions like path-based routing or session affinity.',
    difficulty: 2,
  },
  {
    id: 'fc-lb-2',
    topicId: 'load-balancing',
    front: 'What is sticky session (session affinity) in load balancing?',
    back: 'Sticky sessions ensure requests from the same client always go to the same backend server, typically using cookies or IP hashing. This is needed for stateful applications but reduces the load balancer effectiveness and complicates failover.',
    difficulty: 2,
  },

  // auto-scaling
  {
    id: 'fc-autoscale-1',
    topicId: 'auto-scaling',
    front: 'What metrics are commonly used to trigger auto-scaling?',
    back: 'CPU utilization, memory usage, request count or rate, queue depth, custom application metrics, and response latency. Good auto-scaling policies combine multiple metrics with appropriate cooldown periods to avoid oscillation.',
    difficulty: 2,
  },
  {
    id: 'fc-autoscale-2',
    topicId: 'auto-scaling',
    front: 'What is the difference between reactive and predictive auto-scaling?',
    back: 'Reactive auto-scaling responds to current metric thresholds (e.g., CPU above 70%). Predictive auto-scaling uses historical data and machine learning to anticipate traffic patterns and scale proactively before demand spikes.',
    difficulty: 3,
  },

  // database-partitioning
  {
    id: 'fc-dbpart-1',
    topicId: 'database-partitioning',
    front: 'What is the difference between horizontal and vertical database partitioning?',
    back: 'Horizontal partitioning (sharding) splits rows across tables or databases. Vertical partitioning splits columns, putting frequently accessed columns in one partition and rarely used ones in another. Both improve performance for specific access patterns.',
    difficulty: 1,
  },
  {
    id: 'fc-dbpart-2',
    topicId: 'database-partitioning',
    front: 'What is partition pruning and why is it important?',
    back: 'Partition pruning is when the query optimizer skips irrelevant partitions based on the query predicates, scanning only the partitions that contain matching data. This dramatically reduces I/O and query time for large partitioned tables.',
    difficulty: 3,
  },

  // read-replicas
  {
    id: 'fc-readrep-1',
    topicId: 'read-replicas',
    front: 'How do read replicas help with scaling?',
    back: 'Read replicas offload read queries from the primary database, distributing read traffic across multiple copies. This is effective when the workload is read-heavy. Writes still go to the primary and are asynchronously replicated.',
    difficulty: 1,
  },
  {
    id: 'fc-readrep-2',
    topicId: 'read-replicas',
    front: 'What consistency issues can arise with read replicas?',
    back: 'Since replication is typically asynchronous, replicas may serve stale data (replication lag). This means a user who just wrote data might not immediately see their changes when reading from a replica. Solutions include read-your-writes consistency.',
    difficulty: 2,
  },

  // connection-pooling
  {
    id: 'fc-connpool-1',
    topicId: 'connection-pooling',
    front: 'What is connection pooling and why is it necessary?',
    back: 'Connection pooling maintains a set of reusable database connections. Creating a new connection is expensive (TCP handshake, TLS, authentication). Pooling avoids this overhead by reusing idle connections, improving throughput and reducing latency.',
    difficulty: 1,
  },
  {
    id: 'fc-connpool-2',
    topicId: 'connection-pooling',
    front: 'What problems can occur if a connection pool is misconfigured?',
    back: 'A pool too small causes request queuing and timeouts. A pool too large exhausts database connection limits and wastes memory. Leaked connections (not returned to pool) shrink available connections over time. Proper sizing and timeout configuration are critical.',
    difficulty: 2,
  },

  // ─── RELIABILITY ───────────────────────────────────────────────────────

  // cap-theorem
  {
    id: 'fc-cap-1',
    topicId: 'cap-theorem',
    front: 'What does the CAP theorem state?',
    back: 'A distributed system can provide at most two of three guarantees: Consistency (all nodes see the same data), Availability (every request gets a response), and Partition tolerance (system works despite network splits). Since partitions are inevitable, you choose between CP and AP.',
    difficulty: 2,
  },
  {
    id: 'fc-cap-2',
    topicId: 'cap-theorem',
    front: 'Give examples of CP and AP systems.',
    back: 'CP systems (consistency over availability): ZooKeeper, HBase, MongoDB (with majority reads). AP systems (availability over consistency): Cassandra, DynamoDB, CouchDB. In practice, most systems allow tunable consistency levels.',
    difficulty: 2,
  },

  // failover-strategies
  {
    id: 'fc-failover-1',
    topicId: 'failover-strategies',
    front: 'What is the difference between cold, warm, and hot standby?',
    back: 'Cold standby: backup is off, takes minutes to start. Warm standby: backup is running but not serving traffic, takes seconds to switch. Hot standby: backup is actively receiving replicated data and can take over almost instantly.',
    difficulty: 2,
  },
  {
    id: 'fc-failover-2',
    topicId: 'failover-strategies',
    front: 'What is split-brain in the context of failover?',
    back: 'Split-brain occurs when both the primary and standby believe they are the active node, leading to conflicting writes and data divergence. It is caused by network partitions and prevented using quorum-based leader election or fencing mechanisms.',
    difficulty: 3,
  },

  // circuit-breaker
  {
    id: 'fc-cb-1',
    topicId: 'circuit-breaker',
    front: 'How does the circuit breaker pattern prevent cascading failures?',
    back: 'When a downstream service fails repeatedly, the circuit breaker opens and immediately returns an error or fallback without attempting the call. This prevents threads from blocking on a failing service, protecting the caller and allowing the downstream time to recover.',
    difficulty: 2,
  },
  {
    id: 'fc-cb-2',
    topicId: 'circuit-breaker',
    front: 'What is the half-open state in a circuit breaker?',
    back: 'After being open for a timeout period, the circuit breaker transitions to half-open, allowing a limited number of test requests through. If they succeed, the circuit closes (normal operation resumes). If they fail, it opens again.',
    difficulty: 2,
  },

  // health-checks-monitoring
  {
    id: 'fc-health-1',
    topicId: 'health-checks-monitoring',
    front: 'What is the difference between liveness and readiness probes?',
    back: 'A liveness probe checks if a process is alive and should be restarted if not. A readiness probe checks if a service is ready to accept traffic. A service can be alive but not ready (e.g., still loading data). Both are used in Kubernetes.',
    difficulty: 2,
  },
  {
    id: 'fc-health-2',
    topicId: 'health-checks-monitoring',
    front: 'What are the four golden signals of monitoring?',
    back: 'Latency (time to serve a request), Traffic (demand on the system), Errors (rate of failed requests), and Saturation (how full the system is). Monitoring these gives a comprehensive view of system health.',
    difficulty: 2,
  },

  // redundancy
  {
    id: 'fc-redund-1',
    topicId: 'redundancy',
    front: 'What is the difference between active and passive redundancy?',
    back: 'Active redundancy runs multiple components simultaneously (all handle traffic). Passive redundancy keeps backups on standby that activate only when the primary fails. Active provides better performance; passive is simpler and cheaper.',
    difficulty: 1,
  },
  {
    id: 'fc-redund-2',
    topicId: 'redundancy',
    front: 'What does "no single point of failure" mean in system design?',
    back: 'It means every critical component has at least one backup so that no single component failure brings down the entire system. This requires redundancy at every layer: servers, databases, network paths, load balancers, and even data centers.',
    difficulty: 1,
  },

  // disaster-recovery
  {
    id: 'fc-dr-1',
    topicId: 'disaster-recovery',
    front: 'What are RPO and RTO in disaster recovery?',
    back: 'RPO (Recovery Point Objective) is the maximum acceptable data loss measured in time. RTO (Recovery Time Objective) is the maximum acceptable downtime. A lower RPO requires more frequent backups; a lower RTO requires faster failover mechanisms.',
    difficulty: 2,
  },
  {
    id: 'fc-dr-2',
    topicId: 'disaster-recovery',
    front: 'What are the common disaster recovery strategies in order of cost?',
    back: 'Backup and restore (cheapest, slowest), pilot light (minimal standby resources), warm standby (scaled-down replica), and multi-site active-active (most expensive, fastest recovery). Choose based on RPO/RTO requirements and budget.',
    difficulty: 2,
  },

  // ─── MESSAGING ─────────────────────────────────────────────────────────

  // message-queues
  {
    id: 'fc-mq-1',
    topicId: 'message-queues',
    front: 'What guarantees do message queues typically provide?',
    back: 'At-least-once delivery (message is delivered but may be duplicated), at-most-once (no duplicates but messages may be lost), or exactly-once (hardest to achieve). Most queues default to at-least-once, requiring idempotent consumers.',
    difficulty: 2,
  },
  {
    id: 'fc-mq-2',
    topicId: 'message-queues',
    front: 'What is a dead letter queue?',
    back: 'A dead letter queue (DLQ) stores messages that cannot be processed after a configured number of retries. It prevents poison messages from blocking the main queue and allows developers to inspect and debug failed messages.',
    difficulty: 2,
  },

  // pub-sub
  {
    id: 'fc-pubsub-1',
    topicId: 'pub-sub',
    front: 'How does pub-sub differ from a point-to-point message queue?',
    back: 'In pub-sub, messages are broadcast to all subscribers of a topic. In point-to-point, each message is consumed by exactly one consumer. Pub-sub enables fan-out patterns; queues enable work distribution.',
    difficulty: 1,
  },
  {
    id: 'fc-pubsub-2',
    topicId: 'pub-sub',
    front: 'What are common use cases for pub-sub?',
    back: 'Event notifications, real-time analytics, broadcasting updates to multiple services, log aggregation, and triggering workflows. Pub-sub decouples publishers from subscribers, making it easy to add new consumers without modifying producers.',
    difficulty: 1,
  },

  // apache-kafka
  {
    id: 'fc-kafka-1',
    topicId: 'apache-kafka',
    front: 'What is a Kafka consumer group and why is it important?',
    back: 'A consumer group is a set of consumers that cooperatively consume from a topic. Each partition is assigned to exactly one consumer in the group, enabling parallel processing. Adding consumers up to the partition count increases throughput.',
    difficulty: 2,
  },
  {
    id: 'fc-kafka-2',
    topicId: 'apache-kafka',
    front: 'How does Kafka ensure message ordering?',
    back: 'Kafka guarantees ordering within a single partition. Messages with the same key go to the same partition via consistent hashing. Global ordering across all partitions is not guaranteed and would require a single partition, which limits throughput.',
    difficulty: 3,
  },

  // event-sourcing
  {
    id: 'fc-eventsrc-1',
    topicId: 'event-sourcing',
    front: 'What is event sourcing and how does it differ from traditional CRUD?',
    back: 'Event sourcing stores every state change as an immutable event rather than overwriting the current state. The current state is derived by replaying events. This provides a complete audit trail and enables temporal queries, but increases storage and complexity.',
    difficulty: 3,
  },
  {
    id: 'fc-eventsrc-2',
    topicId: 'event-sourcing',
    front: 'What is a snapshot in event sourcing?',
    back: 'A snapshot is a periodic capture of the aggregate state so you do not have to replay all events from the beginning. When rebuilding state, you start from the latest snapshot and replay only subsequent events, improving performance.',
    difficulty: 3,
  },

  // cqrs
  {
    id: 'fc-cqrs-1',
    topicId: 'cqrs',
    front: 'What is CQRS and when should you use it?',
    back: 'Command Query Responsibility Segregation separates the write model (commands) from the read model (queries). Use it when read and write workloads have very different scaling needs or when you need optimized read models like materialized views.',
    difficulty: 2,
  },
  {
    id: 'fc-cqrs-2',
    topicId: 'cqrs',
    front: 'What is eventual consistency in the context of CQRS?',
    back: 'When CQRS uses separate read and write stores, updates to the write store are asynchronously propagated to the read store. During this gap, reads may return stale data. The system eventually becomes consistent once propagation completes.',
    difficulty: 3,
  },

  // ─── SECURITY ──────────────────────────────────────────────────────────

  // authentication-oauth-jwt
  {
    id: 'fc-authjwt-1',
    topicId: 'authentication-oauth-jwt',
    front: 'What are the three parts of a JWT?',
    back: 'Header (algorithm and token type), Payload (claims like user ID, expiration, roles), and Signature (verifies the token was not tampered with). They are Base64URL-encoded and separated by dots. The payload is not encrypted by default.',
    difficulty: 1,
  },
  {
    id: 'fc-authjwt-2',
    topicId: 'authentication-oauth-jwt',
    front: 'What is the OAuth 2.0 authorization code flow?',
    back: 'The client redirects the user to the auth server. The user authenticates and grants consent. The auth server redirects back with an authorization code. The client exchanges this code for an access token via a server-to-server call, keeping tokens off the browser.',
    difficulty: 2,
  },
  {
    id: 'fc-authjwt-3',
    topicId: 'authentication-oauth-jwt',
    front: 'What is a refresh token and why is it used?',
    back: 'A refresh token is a long-lived credential used to obtain new access tokens without re-authenticating. Access tokens are short-lived for security. When they expire, the refresh token gets a new one, balancing security and user experience.',
    difficulty: 2,
  },

  // authorization-rbac
  {
    id: 'fc-rbac-1',
    topicId: 'authorization-rbac',
    front: 'What is RBAC and how does it work?',
    back: 'Role-Based Access Control assigns permissions to roles rather than individual users. Users are assigned one or more roles, inheriting the associated permissions. This simplifies management when many users need the same access patterns.',
    difficulty: 1,
  },
  {
    id: 'fc-rbac-2',
    topicId: 'authorization-rbac',
    front: 'What is the principle of least privilege?',
    back: 'Every user and service should have only the minimum permissions necessary to perform their function. This limits the blast radius of compromised accounts and reduces the risk of accidental or intentional misuse of privileges.',
    difficulty: 1,
  },

  // rate-limiting
  {
    id: 'fc-ratelimit-1',
    topicId: 'rate-limiting',
    front: 'What are the common rate limiting algorithms?',
    back: 'Token bucket (allows bursts), leaky bucket (smooths output), fixed window (simple count per time window), sliding window log (precise but memory-heavy), and sliding window counter (approximation balancing accuracy and memory).',
    difficulty: 2,
  },
  {
    id: 'fc-ratelimit-2',
    topicId: 'rate-limiting',
    front: 'Where should rate limiting be implemented in a system?',
    back: 'At the API gateway or load balancer (global rate limiting), at the application level (per-user or per-endpoint), or at the database level (query rate limits). Multiple layers provide defense in depth against different types of abuse.',
    difficulty: 2,
  },

  // encryption
  {
    id: 'fc-encrypt-1',
    topicId: 'encryption',
    front: 'What is the difference between encryption at rest and in transit?',
    back: 'Encryption at rest protects stored data (e.g., AES-256 on disk). Encryption in transit protects data moving between systems (e.g., TLS for HTTPS). Both are needed: at rest guards against physical theft, in transit guards against eavesdropping.',
    difficulty: 1,
  },
  {
    id: 'fc-encrypt-2',
    topicId: 'encryption',
    front: 'What is the difference between symmetric and asymmetric encryption?',
    back: 'Symmetric encryption uses the same key for encrypt and decrypt (fast, e.g., AES). Asymmetric uses a key pair: public key to encrypt, private key to decrypt (slower, e.g., RSA). TLS uses asymmetric for key exchange, then symmetric for data transfer.',
    difficulty: 2,
  },

  // api-security
  {
    id: 'fc-apisec-1',
    topicId: 'api-security',
    front: 'What are common API security best practices?',
    back: 'Use HTTPS everywhere, authenticate and authorize every request, validate and sanitize all inputs, implement rate limiting, use API keys or OAuth tokens, log all access for auditing, and apply the principle of least privilege to API scopes.',
    difficulty: 1,
  },
  {
    id: 'fc-apisec-2',
    topicId: 'api-security',
    front: 'What is an API key and how does it differ from an OAuth token?',
    back: 'An API key is a static string identifying the calling application, not the user. OAuth tokens represent delegated user authorization with scopes and expiration. API keys are simpler but less secure and cannot represent user-level permissions.',
    difficulty: 2,
  },

  // ─── PATTERNS ──────────────────────────────────────────────────────────

  // microservices-vs-monolith
  {
    id: 'fc-micromono-1',
    topicId: 'microservices-vs-monolith',
    front: 'What is the strangler fig pattern for migrating from monolith to microservices?',
    back: 'Gradually replace monolith functionality by routing specific requests to new microservices while keeping the monolith running. Over time, more features are extracted until the monolith can be retired. This avoids a risky big-bang rewrite.',
    difficulty: 2,
  },
  {
    id: 'fc-micromono-2',
    topicId: 'microservices-vs-monolith',
    front: 'What is the "distributed monolith" anti-pattern?',
    back: 'A distributed monolith has microservice architecture but tightly coupled services that must be deployed together, share databases, or have synchronous dependencies. It has the complexity of microservices without the benefits of independent deployment.',
    difficulty: 3,
  },

  // api-gateway
  {
    id: 'fc-apigw-1',
    topicId: 'api-gateway',
    front: 'What are the main responsibilities of an API gateway?',
    back: 'Request routing, authentication and authorization, rate limiting, request/response transformation, load balancing, caching, logging and monitoring, and API versioning. It serves as a single entry point for all client requests.',
    difficulty: 1,
  },
  {
    id: 'fc-apigw-2',
    topicId: 'api-gateway',
    front: 'What is the Backend for Frontend (BFF) pattern?',
    back: 'BFF creates a separate API gateway (or backend) tailored for each client type (web, mobile, IoT). Each BFF aggregates and transforms data specifically for its client, avoiding a one-size-fits-all API that over-serves some clients.',
    difficulty: 2,
  },

  // saga-pattern
  {
    id: 'fc-saga-1',
    topicId: 'saga-pattern',
    front: 'What are the two saga implementation approaches?',
    back: 'Choreography: each service listens for events and reacts (decentralized, simple but hard to track). Orchestration: a central coordinator directs each step (easier to manage but introduces a single point of coordination). Choose based on complexity.',
    difficulty: 2,
  },
  {
    id: 'fc-saga-2',
    topicId: 'saga-pattern',
    front: 'What is a compensating transaction in the saga pattern?',
    back: 'A compensating transaction undoes the effect of a previously committed step when a later step fails. For example, if payment succeeds but shipping fails, the compensating transaction refunds the payment. Each step needs a corresponding compensation.',
    difficulty: 3,
  },

  // bloom-filters
  {
    id: 'fc-bloom-1',
    topicId: 'bloom-filters',
    front: 'How does a Bloom filter work?',
    back: 'A Bloom filter uses multiple hash functions to set bits in a bit array when an element is added. To check membership, it hashes the element and checks if all corresponding bits are set. If any bit is 0, the element is definitely not present.',
    difficulty: 2,
  },
  {
    id: 'fc-bloom-2',
    topicId: 'bloom-filters',
    front: 'What are practical uses of Bloom filters in system design?',
    back: 'Reducing unnecessary disk reads (check if a key exists before querying a database), spam filtering, web crawler URL deduplication, and CDN cache lookups. They save memory compared to storing full sets at the cost of some false positives.',
    difficulty: 2,
  },

  // leader-election
  {
    id: 'fc-leader-1',
    topicId: 'leader-election',
    front: 'Why is leader election needed in distributed systems?',
    back: 'Leader election ensures exactly one node coordinates tasks like writes, scheduling, or resource allocation. Without a leader, concurrent coordination can lead to conflicts. Algorithms like Raft and Paxos provide consensus for choosing a leader.',
    difficulty: 2,
  },
  {
    id: 'fc-leader-2',
    topicId: 'leader-election',
    front: 'What is a fencing token in leader election?',
    back: 'A fencing token is a monotonically increasing number issued with each new leader lease. Resources check this token before accepting writes, rejecting requests from stale leaders. This prevents split-brain scenarios where two nodes both think they are the leader.',
    difficulty: 3,
  },

  // consistent-hashing
  {
    id: 'fc-conshash-1',
    topicId: 'consistent-hashing',
    front: 'How does consistent hashing work?',
    back: 'Nodes and keys are mapped onto a hash ring. Each key is assigned to the next node clockwise on the ring. When a node is added or removed, only keys between it and its predecessor are affected, minimizing remapping. Virtual nodes improve balance.',
    difficulty: 2,
  },
  {
    id: 'fc-conshash-2',
    topicId: 'consistent-hashing',
    front: 'What are virtual nodes in consistent hashing?',
    back: 'Virtual nodes map each physical node to multiple positions on the hash ring. This improves load distribution because a single powerful node can own more ring segments. It also smooths out the impact of adding or removing physical nodes.',
    difficulty: 3,
  },

  // gossip-protocol
  {
    id: 'fc-gossip-1',
    topicId: 'gossip-protocol',
    front: 'What are the strengths and weaknesses of gossip protocols?',
    back: 'Strengths: decentralized (no single point of failure), scalable, fault-tolerant, and simple to implement. Weaknesses: eventual consistency only, non-deterministic convergence time, and bandwidth overhead from redundant message exchanges.',
    difficulty: 2,
  },
  {
    id: 'fc-gossip-2',
    topicId: 'gossip-protocol',
    front: 'Where are gossip protocols used in real systems?',
    back: 'Cassandra uses gossip for cluster membership and failure detection. Consul and Serf use it for service discovery. DynamoDB uses it for partition mapping. The protocol efficiently disseminates state across large clusters without centralized coordination.',
    difficulty: 3,
  },
];

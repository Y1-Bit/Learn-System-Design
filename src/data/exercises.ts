import type { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: 'url-shortener',
    title: 'Design a URL Shortener',
    description:
      'Build a service like bit.ly that maps long URLs to short aliases. Explore database choices, encoding schemes, and caching strategies.',
    difficulty: 1,
    steps: [
      {
        prompt: 'Which database type is best suited for storing URL mappings at scale?',
        options: [
          {
            label: 'A NoSQL key-value store like DynamoDB',
            correct: true,
            explanation:
              'Key-value stores excel at simple lookups by short-code key, offering high throughput and easy horizontal scaling.',
          },
          {
            label: 'A graph database like Neo4j',
            correct: false,
            explanation:
              'Graph databases are optimized for relationship traversal, which is unnecessary for simple key-to-value URL mappings.',
          },
          {
            label: 'A single SQLite file on the application server',
            correct: false,
            explanation:
              'SQLite cannot handle concurrent writes from multiple servers and does not scale horizontally.',
          },
        ],
        hint: 'Think about the access pattern: you mostly read/write individual records by a unique key.',
      },
      {
        prompt: 'How should the short URL code be generated?',
        options: [
          {
            label: 'Base62-encode an auto-incrementing ID or a unique hash',
            correct: true,
            explanation:
              'Base62 encoding produces short, URL-safe strings and avoids collisions when backed by a unique counter or hash.',
          },
          {
            label: 'Use the full MD5 hash of the long URL',
            correct: false,
            explanation:
              'MD5 produces a 32-character hex string, which is far too long for a short URL service.',
          },
          {
            label: 'Let the user always choose their own alias',
            correct: false,
            explanation:
              'Relying solely on user-chosen aliases leads to conflicts and does not provide an automatic shortening flow.',
          },
        ],
        hint: 'You want the code to be short, unique, and URL-safe.',
      },
      {
        prompt: 'What is the optimal read path when a user visits a short URL?',
        options: [
          {
            label: 'Check the cache first, then fall back to the database',
            correct: true,
            explanation:
              'A cache-aside strategy minimizes database load because popular URLs are served directly from memory.',
          },
          {
            label: 'Always query the database to guarantee freshness',
            correct: false,
            explanation:
              'URL mappings rarely change, so skipping the cache wastes database capacity on redundant reads.',
          },
          {
            label: 'Store all mappings in application memory on every server',
            correct: false,
            explanation:
              'In-process memory cannot hold billions of mappings and leads to inconsistency across servers.',
          },
        ],
      },
      {
        prompt: 'Which caching strategy works best for a read-heavy URL shortener?',
        options: [
          {
            label: 'A distributed cache like Redis with an LRU eviction policy',
            correct: true,
            explanation:
              'Redis provides sub-millisecond lookups across servers, and LRU keeps frequently accessed URLs hot.',
          },
          {
            label: 'Write-through caching to a local file on each server',
            correct: false,
            explanation:
              'Local file caches are slow compared to in-memory stores and create consistency issues across servers.',
          },
          {
            label: 'No caching; modern databases are fast enough',
            correct: false,
            explanation:
              'At millions of redirects per second, even fast databases benefit from a caching layer to reduce latency and cost.',
          },
        ],
        hint: 'Consider which URLs are accessed most often and how to keep them readily available.',
      },
      {
        prompt: 'How do you scale the service to handle millions of writes per day?',
        options: [
          {
            label: 'Use a pre-generated pool of unique IDs to avoid write contention',
            correct: true,
            explanation:
              'Pre-generating ID ranges lets multiple servers create short codes independently without coordination bottlenecks.',
          },
          {
            label: 'Use a single auto-increment counter protected by a global lock',
            correct: false,
            explanation:
              'A global lock becomes a bottleneck and single point of failure at high write throughput.',
          },
          {
            label: 'Shard by the first letter of the long URL',
            correct: false,
            explanation:
              'URL prefixes are unevenly distributed (e.g., many start with "https://www"), causing hot shards.',
          },
        ],
      },
      {
        prompt: 'How should you track click analytics for each short URL?',
        options: [
          {
            label: 'Write click events to a message queue and process them asynchronously',
            correct: true,
            explanation:
              'Async processing decouples analytics from the redirect path, keeping redirects fast and analytics reliable.',
          },
          {
            label: 'Increment a counter in the same database transaction as the redirect lookup',
            correct: false,
            explanation:
              'Synchronous counter updates add write latency to every redirect and create contention on hot rows.',
          },
          {
            label: 'Log clicks to a local file and aggregate them once a day',
            correct: false,
            explanation:
              'Daily batch processing loses data if a server fails and prevents near-real-time analytics.',
          },
        ],
        hint: 'You do not want analytics collection to slow down the redirect response.',
      },
    ],
  },
  {
    id: 'chat-application',
    title: 'Design a Chat Application',
    description:
      'Design a real-time messaging platform similar to Slack or WhatsApp. Address protocol choices, message delivery guarantees, and group conversations.',
    difficulty: 2,
    steps: [
      {
        prompt: 'Which protocol is most appropriate for real-time message delivery?',
        options: [
          {
            label: 'WebSockets for persistent, bidirectional connections',
            correct: true,
            explanation:
              'WebSockets maintain an open connection so the server can push messages instantly without client polling.',
          },
          {
            label: 'HTTP short polling every 500 ms',
            correct: false,
            explanation:
              'Short polling wastes bandwidth and adds latency compared to a persistent connection.',
          },
          {
            label: 'SMTP email protocol',
            correct: false,
            explanation:
              'SMTP is designed for store-and-forward email, not low-latency interactive chat.',
          },
        ],
        hint: 'Real-time means the server should push messages to clients immediately.',
      },
      {
        prompt: 'How should chat messages be stored for history retrieval?',
        options: [
          {
            label: 'In a partitioned database ordered by conversation ID and timestamp',
            correct: true,
            explanation:
              'Partitioning by conversation and sorting by time enables efficient range queries for message history.',
          },
          {
            label: 'Only in the in-memory WebSocket session',
            correct: false,
            explanation:
              'In-memory storage is lost when the server restarts and cannot serve offline users.',
          },
          {
            label: 'As flat files, one per user',
            correct: false,
            explanation:
              'Flat files make concurrent access and group message storage extremely difficult.',
          },
        ],
      },
      {
        prompt: 'How do you guarantee message delivery when a recipient is offline?',
        options: [
          {
            label: 'Store undelivered messages in a persistent queue and deliver on reconnect',
            correct: true,
            explanation:
              'A persistent queue ensures no messages are lost and they can be pushed as soon as the user comes back online.',
          },
          {
            label: 'Drop messages if the recipient is offline',
            correct: false,
            explanation:
              'Dropping messages is unacceptable for a chat application where delivery reliability is expected.',
          },
          {
            label: 'Require the sender to retry until the recipient is online',
            correct: false,
            explanation:
              'Pushing retry responsibility to clients creates a poor user experience and wastes bandwidth.',
          },
        ],
        hint: 'Think about what happens between the time a message is sent and when the recipient opens the app.',
      },
      {
        prompt: 'What is an efficient way to fan out messages in a group chat with many members?',
        options: [
          {
            label: 'Write the message once and fan out delivery notifications to each member via their connection',
            correct: true,
            explanation:
              'Storing one copy and notifying each member avoids data duplication while still delivering promptly.',
          },
          {
            label: 'Create a separate copy of the message for every group member in the database',
            correct: false,
            explanation:
              'Duplicating messages per member wastes storage and complicates updates like edits or deletes.',
          },
          {
            label: 'Have each client poll the group channel every second',
            correct: false,
            explanation:
              'Polling at scale generates enormous unnecessary traffic, especially for large groups.',
          },
        ],
      },
      {
        prompt: 'How should you implement user presence (online/offline status)?',
        options: [
          {
            label: 'Use heartbeats with a TTL-based expiry in a fast cache like Redis',
            correct: true,
            explanation:
              'Periodic heartbeats with automatic expiry accurately reflect connection state without manual cleanup.',
          },
          {
            label: 'Query the WebSocket server synchronously for every status check',
            correct: false,
            explanation:
              'Synchronous queries to the connection layer do not scale and add latency to presence lookups.',
          },
          {
            label: 'Only update presence when the user sends a message',
            correct: false,
            explanation:
              'This misses users who are online but idle, giving an inaccurate presence view.',
          },
        ],
      },
      {
        prompt: 'How do you scale WebSocket connections across multiple servers?',
        options: [
          {
            label: 'Use a pub/sub backbone like Redis Pub/Sub so any server can route a message to the right connection',
            correct: true,
            explanation:
              'A pub/sub layer decouples message routing from connection ownership, allowing horizontal scaling.',
          },
          {
            label: 'Ensure every pair of users always connects to the same server',
            correct: false,
            explanation:
              'Sticky routing is impractical when users chat with many different people across many servers.',
          },
          {
            label: 'Broadcast every message to every server',
            correct: false,
            explanation:
              'Full broadcast creates O(N) traffic per message and does not scale beyond a few servers.',
          },
        ],
        hint: 'Consider how Server A delivers a message to a user connected to Server B.',
      },
    ],
  },
  {
    id: 'news-feed',
    title: 'Design a News Feed',
    description:
      'Create a social media feed like Facebook or Twitter that aggregates posts from followed users. Balance between push and pull models for feed generation.',
    difficulty: 2,
    steps: [
      {
        prompt: 'What data model best supports a social feed with follow relationships?',
        options: [
          {
            label: 'Separate tables for users, posts, and a follow-graph adjacency list',
            correct: true,
            explanation:
              'Normalized tables with a follow graph allow flexible queries and clean separation of concerns.',
          },
          {
            label: 'A single denormalized document per user containing all their followers and posts',
            correct: false,
            explanation:
              'Embedding everything in one document leads to massive documents and painful updates.',
          },
          {
            label: 'Store each post as a flat file named by user ID',
            correct: false,
            explanation:
              'Flat files make aggregation across multiple followed users extremely slow.',
          },
        ],
        hint: 'Think about the entities involved: users, posts, and follow relationships.',
      },
      {
        prompt: 'Should you use a push model (fan-out on write) or pull model (fan-out on read)?',
        options: [
          {
            label: 'A hybrid: push for normal users, pull for celebrity accounts with millions of followers',
            correct: true,
            explanation:
              'Hybrid avoids the write amplification of pushing to millions of followers while keeping feed reads fast for most users.',
          },
          {
            label: 'Always push: pre-compute every follower feed on each post',
            correct: false,
            explanation:
              'Pure push is prohibitively expensive for users with millions of followers.',
          },
          {
            label: 'Always pull: assemble the feed on every page load',
            correct: false,
            explanation:
              'Pure pull requires querying many followed users on each request, making feed loads slow.',
          },
        ],
      },
      {
        prompt: 'How should posts in the feed be ranked?',
        options: [
          {
            label: 'A scoring function combining recency, engagement signals, and user affinity',
            correct: true,
            explanation:
              'A weighted scoring function balances freshness with relevance, surfacing the most interesting content.',
          },
          {
            label: 'Strictly reverse-chronological order',
            correct: false,
            explanation:
              'Pure chronological feeds bury high-quality older posts and hurt engagement.',
          },
          {
            label: 'Random shuffle on every load',
            correct: false,
            explanation:
              'Random ordering provides no relevance and creates a confusing user experience.',
          },
        ],
        hint: 'Modern feeds mix time-based signals with engagement metrics.',
      },
      {
        prompt: 'Where should pre-computed feed results be cached?',
        options: [
          {
            label: 'In a distributed cache (e.g., Redis) keyed by user ID',
            correct: true,
            explanation:
              'A per-user cache in Redis allows fast feed retrieval without recomputing on every request.',
          },
          {
            label: 'In the CDN edge alongside static assets',
            correct: false,
            explanation:
              'Feeds are personalized per user and change frequently, making CDN caching impractical.',
          },
          {
            label: 'In a client-side cookie',
            correct: false,
            explanation:
              'Cookies have strict size limits and are sent with every request, making them unsuitable for feed data.',
          },
        ],
      },
      {
        prompt: 'What pagination strategy works best for an infinite-scroll feed?',
        options: [
          {
            label: 'Cursor-based pagination using the last seen post ID or timestamp',
            correct: true,
            explanation:
              'Cursor-based pagination is stable even when new posts are inserted, preventing duplicates or gaps.',
          },
          {
            label: 'Offset-based pagination (page 1, page 2, etc.)',
            correct: false,
            explanation:
              'Offset pagination shifts when new posts arrive, causing users to see duplicates or miss items.',
          },
          {
            label: 'Load the entire feed at once and paginate client-side',
            correct: false,
            explanation:
              'Loading thousands of posts at once wastes bandwidth and slows initial page load.',
          },
        ],
      },
      {
        prompt: 'How do you scale feed generation as the user base grows to hundreds of millions?',
        options: [
          {
            label: 'Shard feed storage by user ID and use async workers for fan-out',
            correct: true,
            explanation:
              'Sharding distributes load evenly while async workers decouple post creation from feed delivery.',
          },
          {
            label: 'Vertically scale a single feed-generation server',
            correct: false,
            explanation:
              'A single server cannot handle hundreds of millions of users regardless of hardware.',
          },
          {
            label: 'Recompute all feeds in a nightly batch job',
            correct: false,
            explanation:
              'Nightly batches make the feed stale and cannot deliver near-real-time content.',
          },
        ],
        hint: 'Think about partitioning the data and decoupling write processing.',
      },
    ],
  },
  {
    id: 'rate-limiter',
    title: 'Design a Rate Limiter',
    description:
      'Build a distributed rate-limiting service that protects APIs from abuse. Explore algorithms, storage backends, and edge-case handling.',
    difficulty: 2,
    steps: [
      {
        prompt: 'Which rate-limiting algorithm provides a smooth request distribution?',
        options: [
          {
            label: 'Token bucket algorithm',
            correct: true,
            explanation:
              'Token bucket allows short bursts while enforcing an average rate, giving a smooth and flexible limit.',
          },
          {
            label: 'Allow all requests and throttle only after a hard daily cap',
            correct: false,
            explanation:
              'A daily cap allows massive bursts early in the day and then blocks all traffic for the rest.',
          },
          {
            label: 'Random rejection of 10% of all requests',
            correct: false,
            explanation:
              'Random rejection penalizes well-behaved clients and does not enforce any meaningful rate.',
          },
        ],
        hint: 'Consider an algorithm that refills capacity over time.',
      },
      {
        prompt: 'What is the best storage backend for tracking per-user request counts in a distributed system?',
        options: [
          {
            label: 'Redis, using atomic increment operations with TTL-based expiry',
            correct: true,
            explanation:
              'Redis atomic operations are fast, consistent, and TTLs automatically clean up expired windows.',
          },
          {
            label: 'A relational database with a counters table',
            correct: false,
            explanation:
              'Relational databases add unnecessary latency for simple counter operations at high throughput.',
          },
          {
            label: 'Local in-memory counters on each application server',
            correct: false,
            explanation:
              'Local counters are not shared across servers, so a user can bypass limits by hitting different instances.',
          },
        ],
      },
      {
        prompt: 'How do you ensure consistent rate limiting across multiple data centers?',
        options: [
          {
            label: 'Use a centralized Redis cluster with replication, accepting slight inconsistency for performance',
            correct: true,
            explanation:
              'A centralized store with async replication provides near-accurate limits without sacrificing latency.',
          },
          {
            label: 'Enforce strict global consistency with two-phase commit on every request',
            correct: false,
            explanation:
              'Two-phase commit adds unacceptable latency to every API call at the rate-limiter layer.',
          },
          {
            label: 'Run completely independent rate limiters per data center with no coordination',
            correct: false,
            explanation:
              'Independent limiters let users multiply their effective limit by hitting different data centers.',
          },
        ],
        hint: 'There is a trade-off between strict consistency and low latency.',
      },
      {
        prompt: 'What HTTP headers should a rate limiter return to clients?',
        options: [
          {
            label: 'X-RateLimit-Limit, X-RateLimit-Remaining, and Retry-After',
            correct: true,
            explanation:
              'These headers tell clients their quota, remaining capacity, and when to retry after being throttled.',
          },
          {
            label: 'Only a 429 status code with no additional information',
            correct: false,
            explanation:
              'Without headers, clients cannot adapt their behavior or know when to retry.',
          },
          {
            label: 'A custom encrypted token the client must decode',
            correct: false,
            explanation:
              'Custom encrypted tokens add complexity and prevent standard HTTP client libraries from working correctly.',
          },
        ],
      },
      {
        prompt: 'How should the rate limiter handle requests when Redis is temporarily unavailable?',
        options: [
          {
            label: 'Fail open: allow requests through and log the incident for monitoring',
            correct: true,
            explanation:
              'Failing open preserves availability; a brief gap in rate limiting is better than blocking all traffic.',
          },
          {
            label: 'Fail closed: reject all requests until Redis recovers',
            correct: false,
            explanation:
              'Failing closed turns a cache outage into a full service outage, which is usually worse than over-allowing.',
          },
          {
            label: 'Switch to an in-memory counter on each server permanently',
            correct: false,
            explanation:
              'Permanently switching to local counters breaks distributed enforcement once Redis recovers.',
          },
        ],
        hint: 'Consider which failure mode hurts the business less.',
      },
      {
        prompt: 'How do you scale the rate limiter for millions of unique API keys?',
        options: [
          {
            label: 'Shard the Redis keyspace by hashing the API key across multiple Redis nodes',
            correct: true,
            explanation:
              'Hash-based sharding distributes keys evenly, allowing near-linear horizontal scaling of the counter store.',
          },
          {
            label: 'Store all keys on a single large Redis instance',
            correct: false,
            explanation:
              'A single instance has memory and throughput limits that cannot serve millions of keys at peak load.',
          },
          {
            label: 'Rate-limit only at the CDN edge with no backend coordination',
            correct: false,
            explanation:
              'CDN-only limiting misses API traffic that bypasses the CDN and cannot enforce per-key policies.',
          },
        ],
      },
    ],
  },
  {
    id: 'key-value-store',
    title: 'Design a Distributed Key-Value Store',
    description:
      'Build a fault-tolerant, distributed key-value store similar to DynamoDB or Cassandra. Tackle partitioning, replication, and consistency trade-offs.',
    difficulty: 3,
    steps: [
      {
        prompt: 'How should data be partitioned across nodes?',
        options: [
          {
            label: 'Consistent hashing with virtual nodes',
            correct: true,
            explanation:
              'Consistent hashing with vnodes distributes data evenly and minimizes rebalancing when nodes join or leave.',
          },
          {
            label: 'Range-based partitioning by alphabetical key order',
            correct: false,
            explanation:
              'Alphabetical ranges create hot spots if certain key prefixes are much more popular than others.',
          },
          {
            label: 'Random assignment to any available node',
            correct: false,
            explanation:
              'Random placement makes it impossible to locate a key without querying every node.',
          },
        ],
        hint: 'You need a scheme that balances load and handles node additions gracefully.',
      },
      {
        prompt: 'What replication strategy ensures data durability without excessive overhead?',
        options: [
          {
            label: 'Replicate each key to N successor nodes on the hash ring',
            correct: true,
            explanation:
              'Replicating to N successors provides redundancy while keeping the replication topology simple and predictable.',
          },
          {
            label: 'Store every key on every node in the cluster',
            correct: false,
            explanation:
              'Full replication does not scale because every write must go to every node.',
          },
          {
            label: 'Keep a single copy and rely on disk RAID for durability',
            correct: false,
            explanation:
              'RAID protects against disk failure on one machine but not against node or rack failures.',
          },
        ],
      },
      {
        prompt: 'Which consistency model is appropriate for a highly available key-value store?',
        options: [
          {
            label: 'Eventual consistency with tunable quorum reads and writes (W + R > N)',
            correct: true,
            explanation:
              'Tunable quorums let operators choose the consistency-availability trade-off per use case.',
          },
          {
            label: 'Strong consistency via a global lock on every key',
            correct: false,
            explanation:
              'Global locks destroy availability and throughput in a distributed system.',
          },
          {
            label: 'No consistency guarantee at all',
            correct: false,
            explanation:
              'Without any consistency model, applications cannot reason about the data they read.',
          },
        ],
        hint: 'Think about the CAP theorem and how quorums help balance the trade-off.',
      },
      {
        prompt: 'How should conflicting writes to the same key be resolved?',
        options: [
          {
            label: 'Use vector clocks to detect conflicts and let the application resolve them',
            correct: true,
            explanation:
              'Vector clocks track causal history so the system can detect true conflicts and defer resolution to application logic.',
          },
          {
            label: 'Last-write-wins based on wall-clock timestamps',
            correct: false,
            explanation:
              'Wall clocks are unreliable across distributed nodes and can silently lose valid writes.',
          },
          {
            label: 'Reject the second write and return an error',
            correct: false,
            explanation:
              'Rejecting concurrent writes reduces availability, which defeats the purpose of an AP system.',
          },
        ],
      },
      {
        prompt: 'How does the system detect and recover from node failures?',
        options: [
          {
            label: 'Gossip protocol for failure detection and hinted handoff for temporary recovery',
            correct: true,
            explanation:
              'Gossip detects failures without a central coordinator, and hinted handoff stores writes until the failed node returns.',
          },
          {
            label: 'A single master node that health-checks all others',
            correct: false,
            explanation:
              'A single master is a single point of failure and does not scale to large clusters.',
          },
          {
            label: 'Clients detect failures by retrying and picking another node',
            correct: false,
            explanation:
              'Client-side detection is slow, inconsistent, and pushes complexity to every consumer.',
          },
        ],
        hint: 'Consider decentralized failure detection mechanisms.',
      },
      {
        prompt: 'What API operations should the store expose?',
        options: [
          {
            label: 'get(key), put(key, value), and delete(key) with optional consistency parameters',
            correct: true,
            explanation:
              'A minimal CRUD API with tunable consistency gives developers control while keeping the interface simple.',
          },
          {
            label: 'Full SQL query support including JOINs and transactions',
            correct: false,
            explanation:
              'SQL features like JOINs conflict with the partitioned, eventually consistent nature of a KV store.',
          },
          {
            label: 'Only a batch-import endpoint for bulk loading data',
            correct: false,
            explanation:
              'A batch-only API cannot serve real-time application workloads that need individual key access.',
          },
        ],
      },
    ],
  },
  {
    id: 'notification-system',
    title: 'Design a Notification System',
    description:
      'Build a multi-channel notification platform that delivers push, email, and SMS alerts. Handle prioritization, templating, and delivery retries.',
    difficulty: 2,
    steps: [
      {
        prompt: 'How should different notification types (transactional vs. marketing) be handled?',
        options: [
          {
            label: 'Separate queues with different priorities and processing pipelines',
            correct: true,
            explanation:
              'Separate queues ensure that time-sensitive transactional alerts are never delayed by bulk marketing sends.',
          },
          {
            label: 'A single FIFO queue for all notification types',
            correct: false,
            explanation:
              'A single queue means a large marketing blast can delay critical transactional notifications.',
          },
          {
            label: 'Process marketing notifications only during off-peak hours',
            correct: false,
            explanation:
              'Time-based scheduling alone does not prevent queue contention if volumes spike unexpectedly.',
          },
        ],
        hint: 'Transactional notifications like password resets must not be delayed.',
      },
      {
        prompt: 'How should the system route notifications to the right channel (push, email, SMS)?',
        options: [
          {
            label: 'A routing service that checks user preferences and notification type to select channels',
            correct: true,
            explanation:
              'Centralized routing respects user preferences and allows per-event channel logic in one place.',
          },
          {
            label: 'Always send on all channels simultaneously',
            correct: false,
            explanation:
              'Sending on every channel for every event spams users and increases costs unnecessarily.',
          },
          {
            label: 'Let the calling service decide the channel in the request',
            correct: false,
            explanation:
              'Spreading routing logic across calling services leads to inconsistency and ignores user preferences.',
          },
        ],
      },
      {
        prompt: 'How should notification priority be managed?',
        options: [
          {
            label: 'Assign priority levels and use separate queues with weighted consumers',
            correct: true,
            explanation:
              'Priority queues with weighted consumption ensure high-priority messages are processed first.',
          },
          {
            label: 'Process all notifications in insertion order regardless of priority',
            correct: false,
            explanation:
              'FIFO processing means a flood of low-priority alerts can delay critical ones.',
          },
          {
            label: 'Drop low-priority notifications when the system is busy',
            correct: false,
            explanation:
              'Silently dropping messages loses data and violates delivery expectations.',
          },
        ],
      },
      {
        prompt: 'What is the best approach for notification content templating?',
        options: [
          {
            label: 'Store templates in a template service and render them with event-specific variables at send time',
            correct: true,
            explanation:
              'Centralized templates with variable substitution keep content consistent and easy to update.',
          },
          {
            label: 'Have each calling service build the full message body before sending',
            correct: false,
            explanation:
              'Distributed message construction leads to inconsistent formatting and duplicated effort.',
          },
          {
            label: 'Hard-code all message text in the notification worker code',
            correct: false,
            explanation:
              'Hard-coded text requires code deployments for every copy change.',
          },
        ],
        hint: 'Think about how marketing and product teams update notification text.',
      },
      {
        prompt: 'How should failed notification deliveries be retried?',
        options: [
          {
            label: 'Exponential backoff with a maximum retry count and a dead-letter queue for permanent failures',
            correct: true,
            explanation:
              'Exponential backoff avoids overwhelming providers, and a DLQ captures messages that cannot be delivered for investigation.',
          },
          {
            label: 'Retry immediately and indefinitely until success',
            correct: false,
            explanation:
              'Immediate infinite retries can overwhelm downstream providers and waste resources.',
          },
          {
            label: 'Never retry; mark as failed and move on',
            correct: false,
            explanation:
              'Many delivery failures are transient, so not retrying loses messages unnecessarily.',
          },
        ],
      },
      {
        prompt: 'How do you scale the notification system for billions of events per day?',
        options: [
          {
            label: 'Partition message queues by channel and scale consumer groups independently',
            correct: true,
            explanation:
              'Per-channel partitioning lets you scale each delivery path (push, email, SMS) based on its own throughput needs.',
          },
          {
            label: 'Run a single monolithic worker that handles all channels',
            correct: false,
            explanation:
              'A monolith cannot scale individual channels and becomes a bottleneck.',
          },
          {
            label: 'Batch all notifications and send them once per hour',
            correct: false,
            explanation:
              'Hourly batching is unacceptable for time-sensitive transactional notifications.',
          },
        ],
        hint: 'Each delivery channel has different throughput characteristics.',
      },
    ],
  },
  {
    id: 'file-storage',
    title: 'Design a File Storage Service',
    description:
      'Create a cloud file storage system like Google Drive or Dropbox. Handle large file uploads, deduplication, and content distribution.',
    difficulty: 2,
    steps: [
      {
        prompt: 'What is the best approach for uploading large files?',
        options: [
          {
            label: 'Generate a pre-signed URL so the client uploads directly to object storage',
            correct: true,
            explanation:
              'Pre-signed URLs offload bandwidth from application servers and let clients upload directly to scalable storage.',
          },
          {
            label: 'Stream the entire file through the application server to the database',
            correct: false,
            explanation:
              'Proxying through the app server wastes compute and memory, creating a bottleneck for large files.',
          },
          {
            label: 'Encode the file as Base64 in a JSON POST body',
            correct: false,
            explanation:
              'Base64 encoding increases file size by 33% and is impractical for large uploads.',
          },
        ],
        hint: 'Consider how to avoid making your application servers a bottleneck.',
      },
      {
        prompt: 'How should large files be handled to support resumable uploads?',
        options: [
          {
            label: 'Split files into fixed-size chunks and upload each independently with a manifest',
            correct: true,
            explanation:
              'Chunked uploads allow resuming from the last successful chunk instead of restarting the entire file.',
          },
          {
            label: 'Upload the file as a single blob and retry the whole upload on failure',
            correct: false,
            explanation:
              'Restarting a multi-gigabyte upload from scratch wastes time and bandwidth.',
          },
          {
            label: 'Compress the file to make it small enough for a single request',
            correct: false,
            explanation:
              'Compression cannot guarantee the file fits in one request and does not solve resume capability.',
          },
        ],
      },
      {
        prompt: 'How should file metadata (name, owner, permissions) be stored?',
        options: [
          {
            label: 'In a relational database separate from the file content in object storage',
            correct: true,
            explanation:
              'Separating metadata from content lets you query and index metadata efficiently while storing blobs cheaply.',
          },
          {
            label: 'Embedded inside the file itself as a header',
            correct: false,
            explanation:
              'Embedding metadata in files makes listing and searching extremely slow since every file must be read.',
          },
          {
            label: 'In the filename on the object storage system',
            correct: false,
            explanation:
              'Filenames have length limits and cannot represent complex metadata like permissions and sharing rules.',
          },
        ],
        hint: 'Think about how you would list all files for a user or search by name.',
      },
      {
        prompt: 'How can you avoid storing duplicate copies of the same file?',
        options: [
          {
            label: 'Content-addressable storage using a hash (e.g., SHA-256) of the file contents as the storage key',
            correct: true,
            explanation:
              'Hashing file content means identical files share one storage object, saving significant space.',
          },
          {
            label: 'Compare filenames to detect duplicates',
            correct: false,
            explanation:
              'Different files can share the same name, and identical files can have different names.',
          },
          {
            label: 'Store every upload as a new object regardless of content',
            correct: false,
            explanation:
              'This wastes storage when many users upload the same popular files.',
          },
        ],
      },
      {
        prompt: 'How should files be served to users globally with low latency?',
        options: [
          {
            label: 'Use a CDN to cache frequently accessed files at edge locations close to users',
            correct: true,
            explanation:
              'CDN edge caching reduces latency by serving files from the nearest point of presence.',
          },
          {
            label: 'Replicate all files to every data center worldwide',
            correct: false,
            explanation:
              'Full replication of all files to all regions is prohibitively expensive for petabytes of data.',
          },
          {
            label: 'Serve all downloads from a single origin data center',
            correct: false,
            explanation:
              'A single origin adds high latency for users far from that region.',
          },
        ],
        hint: 'Think about how popular files can be brought closer to the user.',
      },
      {
        prompt: 'How do you scale the storage system for millions of concurrent users?',
        options: [
          {
            label: 'Shard metadata by user ID and use object storage that scales automatically',
            correct: true,
            explanation:
              'User-based sharding distributes metadata load, and object stores like S3 handle blob scaling natively.',
          },
          {
            label: 'Use a single NFS mount shared by all application servers',
            correct: false,
            explanation:
              'NFS becomes a bottleneck and single point of failure under heavy concurrent access.',
          },
          {
            label: 'Limit each user to 100 MB to reduce total storage needs',
            correct: false,
            explanation:
              'Artificial storage limits hurt the product without solving the architectural scaling problem.',
          },
        ],
      },
    ],
  },
  {
    id: 'search-autocomplete',
    title: 'Design Search Autocomplete',
    description:
      'Build a real-time search suggestion system like Google Autocomplete. Explore trie data structures, ranking algorithms, and low-latency serving.',
    difficulty: 2,
    steps: [
      {
        prompt: 'How should search query data be collected for building suggestions?',
        options: [
          {
            label: 'Log anonymized search queries to an analytics pipeline and aggregate frequencies',
            correct: true,
            explanation:
              'Aggregated query logs reveal the most popular searches while preserving user privacy.',
          },
          {
            label: 'Manually curate a fixed list of suggested terms',
            correct: false,
            explanation:
              'Manual curation cannot keep up with the volume and variety of real user queries.',
          },
          {
            label: 'Use only the current user session history for suggestions',
            correct: false,
            explanation:
              'Session-only data ignores global popularity trends and provides poor suggestions for new queries.',
          },
        ],
        hint: 'Think about what data source best reflects what users actually search for.',
      },
      {
        prompt: 'What data structure is most efficient for prefix-based autocomplete lookups?',
        options: [
          {
            label: 'A trie (prefix tree) with frequency scores at each node',
            correct: true,
            explanation:
              'Tries enable O(L) prefix lookups where L is the prefix length, and scores help rank suggestions.',
          },
          {
            label: 'A sorted array with binary search',
            correct: false,
            explanation:
              'Binary search finds one match but retrieving all prefix matches requires scanning, which is slower than a trie.',
          },
          {
            label: 'A hash map keyed by full query strings',
            correct: false,
            explanation:
              'Hash maps require exact key matches and do not support partial prefix lookups.',
          },
        ],
      },
      {
        prompt: 'How should autocomplete suggestions be ranked?',
        options: [
          {
            label: 'By a weighted score combining search frequency, recency, and personalization signals',
            correct: true,
            explanation:
              'A multi-factor score surfaces the most relevant suggestions by blending popularity with context.',
          },
          {
            label: 'Alphabetically by the suggestion text',
            correct: false,
            explanation:
              'Alphabetical order ignores popularity and relevance, showing obscure terms before common ones.',
          },
          {
            label: 'By the length of the suggestion string (shortest first)',
            correct: false,
            explanation:
              'Shorter strings are not necessarily more relevant or popular.',
          },
        ],
        hint: 'Users expect the most popular and relevant completions at the top.',
      },
      {
        prompt: 'How should autocomplete results be cached for low latency?',
        options: [
          {
            label: 'Cache the top results for common prefixes in a distributed cache like Redis',
            correct: true,
            explanation:
              'Pre-caching popular prefixes avoids trie lookups for the vast majority of requests.',
          },
          {
            label: 'Cache results only in the browser with a long TTL',
            correct: false,
            explanation:
              'Browser-only caching misses new users and cannot share cached results across clients.',
          },
          {
            label: 'Do not cache; recompute suggestions on every keystroke',
            correct: false,
            explanation:
              'Recomputing on every keystroke wastes server resources and adds unnecessary latency.',
          },
        ],
      },
      {
        prompt: 'How should the trie be updated as new search data arrives?',
        options: [
          {
            label: 'Rebuild the trie periodically from aggregated data and swap it in atomically',
            correct: true,
            explanation:
              'Periodic rebuilds with atomic swaps keep the trie consistent and avoid complex real-time mutation logic.',
          },
          {
            label: 'Update the trie in real-time on every single search query',
            correct: false,
            explanation:
              'Real-time updates on every query create write contention and can introduce noisy or low-quality suggestions.',
          },
          {
            label: 'Never update; build the trie once at launch',
            correct: false,
            explanation:
              'A static trie becomes stale quickly and misses trending queries.',
          },
        ],
        hint: 'Balance freshness with stability and performance.',
      },
      {
        prompt: 'How do you scale autocomplete to handle millions of queries per second?',
        options: [
          {
            label: 'Replicate the trie across multiple read-only servers behind a load balancer',
            correct: true,
            explanation:
              'Read replicas serve prefix lookups in parallel, and the trie is small enough to fit in memory on each server.',
          },
          {
            label: 'Shard the trie by prefix so each server handles a range of letters',
            correct: false,
            explanation:
              'Prefix sharding creates hot spots because some letters are far more common than others.',
          },
          {
            label: 'Run a single powerful server with a large amount of RAM',
            correct: false,
            explanation:
              'A single server is a single point of failure and has limited request throughput.',
          },
        ],
      },
    ],
  },
  {
    id: 'video-streaming',
    title: 'Design a Video Streaming Platform',
    description:
      'Build a video platform like YouTube or Netflix that handles upload processing and playback. Address adaptive bitrate streaming, CDN delivery, and content recommendations.',
    difficulty: 3,
    steps: [
      {
        prompt: 'How should uploaded videos be processed before playback?',
        options: [
          {
            label: 'Transcode into multiple resolutions and codecs using a distributed processing pipeline',
            correct: true,
            explanation:
              'Multiple renditions ensure playback across devices, and distributed workers handle processing at scale.',
          },
          {
            label: 'Store the original file and transcode on-the-fly per viewer request',
            correct: false,
            explanation:
              'On-the-fly transcoding is too CPU-intensive to serve each viewer individually.',
          },
          {
            label: 'Only accept videos in a single standard format and reject others',
            correct: false,
            explanation:
              'Restricting formats hurts the upload experience and limits the content creators can share.',
          },
        ],
        hint: 'Consider the variety of devices and network conditions viewers use.',
      },
      {
        prompt: 'How should adaptive bitrate streaming work?',
        options: [
          {
            label: 'Segment videos into small chunks at multiple quality levels and let the player switch dynamically (HLS/DASH)',
            correct: true,
            explanation:
              'Chunked adaptive streaming lets the player match quality to current bandwidth in real time.',
          },
          {
            label: 'Stream a single fixed bitrate chosen at the start based on a speed test',
            correct: false,
            explanation:
              'Network conditions change during playback, so a fixed bitrate leads to buffering or wasted bandwidth.',
          },
          {
            label: 'Download the entire video file before playback begins',
            correct: false,
            explanation:
              'Full download adds long wait times and wastes bandwidth if the viewer stops early.',
          },
        ],
      },
      {
        prompt: 'How should video content be distributed globally?',
        options: [
          {
            label: 'Use a multi-tier CDN: popular content at edge, long-tail at regional caches, origin as fallback',
            correct: true,
            explanation:
              'A tiered CDN balances cost and performance by caching strategically based on content popularity.',
          },
          {
            label: 'Serve all videos from a single origin data center',
            correct: false,
            explanation:
              'A single origin cannot handle global traffic and adds high latency for distant users.',
          },
          {
            label: 'Replicate every video to every edge location worldwide',
            correct: false,
            explanation:
              'Replicating all content everywhere is prohibitively expensive given the volume of video data.',
          },
        ],
        hint: 'Not all videos are equally popular; consider a tiered approach.',
      },
      {
        prompt: 'How should the recommendation engine work?',
        options: [
          {
            label: 'Combine collaborative filtering (user behavior) with content-based signals (metadata, tags)',
            correct: true,
            explanation:
              'A hybrid approach leverages both user patterns and content attributes for more accurate recommendations.',
          },
          {
            label: 'Show only the most globally popular videos to everyone',
            correct: false,
            explanation:
              'Global popularity ignores individual preferences and creates a poor personalization experience.',
          },
          {
            label: 'Randomly select videos from the catalog',
            correct: false,
            explanation:
              'Random selection provides no relevance and does not improve with user interaction.',
          },
        ],
      },
      {
        prompt: 'How should live streaming differ from video-on-demand (VOD) in the architecture?',
        options: [
          {
            label: 'Live uses real-time ingest with ultra-low-latency edge push, while VOD uses pre-processed segments from storage',
            correct: true,
            explanation:
              'Live requires a real-time pipeline from ingest to edge, whereas VOD can serve pre-encoded content from storage.',
          },
          {
            label: 'Use the same pipeline for both; just set the video length to "infinite" for live',
            correct: false,
            explanation:
              'Live streaming has fundamentally different latency requirements and cannot reuse a batch processing pipeline.',
          },
          {
            label: 'Record live streams fully before making them available',
            correct: false,
            explanation:
              'Recording first defeats the purpose of live streaming, which requires real-time delivery.',
          },
        ],
        hint: 'Live and VOD have very different latency and processing requirements.',
      },
      {
        prompt: 'How do you scale the platform to millions of concurrent viewers?',
        options: [
          {
            label: 'Scale CDN capacity, use origin shielding, and auto-scale transcoding workers independently',
            correct: true,
            explanation:
              'Independent scaling of CDN, origin, and transcoding lets each tier handle its own load pattern.',
          },
          {
            label: 'Add more origin servers and bypass the CDN',
            correct: false,
            explanation:
              'Bypassing the CDN forces origin servers to handle all traffic, which is far more expensive and slower.',
          },
          {
            label: 'Limit concurrent viewers per video to reduce load',
            correct: false,
            explanation:
              'Viewer caps hurt the user experience and limit the platform business model.',
          },
        ],
      },
    ],
  },
  {
    id: 'ride-sharing',
    title: 'Design a Ride-Sharing Platform',
    description:
      'Build a service like Uber or Lyft that matches riders with nearby drivers in real time. Handle geospatial queries, dynamic pricing, and trip lifecycle management.',
    difficulty: 3,
    steps: [
      {
        prompt: 'How should driver locations be stored and queried efficiently?',
        options: [
          {
            label: 'Use a geospatial index (e.g., geohash grid or quadtree) in a fast data store',
            correct: true,
            explanation:
              'Geospatial indexes enable efficient "find nearby" queries that are critical for real-time driver matching.',
          },
          {
            label: 'Store latitude/longitude in a relational table and use distance calculations in SQL',
            correct: false,
            explanation:
              'SQL distance calculations without spatial indexes are too slow for millions of location updates per minute.',
          },
          {
            label: 'Have each client calculate distances to all drivers locally',
            correct: false,
            explanation:
              'Clients cannot access all driver locations, and computing distances to millions of drivers is infeasible.',
          },
        ],
        hint: 'The system receives millions of location updates per minute from active drivers.',
      },
      {
        prompt: 'How should the system match a rider with the best available driver?',
        options: [
          {
            label: 'Query nearby available drivers, rank by ETA and rating, then offer to the top candidate with a timeout',
            correct: true,
            explanation:
              'Ranking nearby drivers by ETA and quality, with a timeout for acceptance, balances speed and match quality.',
          },
          {
            label: 'Assign the geographically closest driver without considering ETA or availability',
            correct: false,
            explanation:
              'The closest driver may be stuck in traffic or already completing another trip.',
          },
          {
            label: 'Broadcast the ride request to all drivers in the city',
            correct: false,
            explanation:
              'City-wide broadcast creates a stampede of responses and does not work in large markets.',
          },
        ],
      },
      {
        prompt: 'How should ETA (estimated time of arrival) be calculated?',
        options: [
          {
            label: 'Use a routing engine with real-time traffic data and historical travel time models',
            correct: true,
            explanation:
              'Combining real-time traffic with historical patterns produces accurate ETAs even during unusual conditions.',
          },
          {
            label: 'Calculate straight-line distance divided by average speed',
            correct: false,
            explanation:
              'Straight-line distance ignores roads, turns, and traffic, making estimates wildly inaccurate.',
          },
          {
            label: 'Use a fixed ETA of 5 minutes for all requests',
            correct: false,
            explanation:
              'A fixed estimate is misleading and erodes user trust.',
          },
        ],
        hint: 'Road networks and traffic conditions vary significantly by time and location.',
      },
      {
        prompt: 'How should dynamic (surge) pricing be implemented?',
        options: [
          {
            label: 'Use a real-time supply/demand ratio per geographic zone to compute a multiplier',
            correct: true,
            explanation:
              'Zone-level supply/demand pricing incentivizes drivers to move to high-demand areas and balances the marketplace.',
          },
          {
            label: 'Set fixed prices based on distance with no demand adjustments',
            correct: false,
            explanation:
              'Fixed pricing cannot balance supply and demand during peak times, leading to long wait times.',
          },
          {
            label: 'Let drivers set their own prices',
            correct: false,
            explanation:
              'Driver-set pricing creates unpredictable costs for riders and race-to-bottom or gouging behavior.',
          },
        ],
      },
      {
        prompt: 'How should the trip lifecycle (request, match, pickup, ride, dropoff) be managed?',
        options: [
          {
            label: 'A state machine that transitions through well-defined states with event-driven updates',
            correct: true,
            explanation:
              'A state machine ensures every trip follows valid transitions and makes the system behavior predictable and auditable.',
          },
          {
            label: 'A single boolean "is_active" flag on the trip record',
            correct: false,
            explanation:
              'A single flag cannot represent the multiple stages of a trip or enable stage-specific logic.',
          },
          {
            label: 'Let the client app manage trip state and sync it to the server periodically',
            correct: false,
            explanation:
              'Client-managed state is unreliable and can be lost if the app crashes or loses connectivity.',
          },
        ],
        hint: 'Think about how to model a process with multiple ordered stages.',
      },
      {
        prompt: 'How do you scale the platform for a city with millions of active riders and drivers?',
        options: [
          {
            label: 'Partition the system by geographic region, with independent dispatch services per region',
            correct: true,
            explanation:
              'Geographic partitioning aligns with the local nature of rides and allows each region to scale independently.',
          },
          {
            label: 'Run a single global dispatch service for all cities',
            correct: false,
            explanation:
              'A global service adds cross-continent latency and becomes a bottleneck for local operations.',
          },
          {
            label: 'Process all ride requests in a single FIFO queue',
            correct: false,
            explanation:
              'A single queue serializes matching, which is too slow for millions of concurrent ride requests.',
          },
        ],
      },
    ],
  },
];

import type { Topic } from '../../types';

export const cachingTopics: Topic[] = [
  {
    id: 'caching-strategies',
    title: 'Caching Strategies',
    category: 'caching',
    difficulty: 1,
    summary:
      'Caching strategies define how and when data is loaded into a cache. Common patterns include cache-aside, write-through, write-behind, and read-through.',
    explanation: `## Why Cache?

Caching stores frequently accessed data in a fast storage layer (usually memory) to reduce latency and load on the primary data store. Choosing the right caching strategy depends on your read/write patterns and consistency requirements.

## Common Strategies

### Cache-Aside (Lazy Loading)

The application checks the cache first. On a miss, it reads from the database, stores the result in the cache, and returns it. The application manages all cache interactions.

\`\`\`
1. App checks cache for key
2. Cache miss -> App reads from DB
3. App writes result to cache
4. Return data to client
\`\`\`

### Read-Through

Similar to cache-aside, but the cache itself handles fetching from the database on a miss. The application only talks to the cache.

### Write-Through

Every write goes to the cache AND the database synchronously. Ensures the cache is always up-to-date, but adds write latency.

### Write-Behind (Write-Back)

Writes go to the cache immediately, and the cache asynchronously writes to the database later. Improves write performance but risks data loss if the cache fails before flushing.

## Choosing a Strategy

Cache-aside is the most common for read-heavy workloads. Write-through works when consistency is critical. Write-behind suits write-heavy workloads where slight data loss is acceptable.`,
    keyPoints: [
      'Cache-aside: application manages cache reads and database fallback on misses',
      'Read-through: cache itself fetches from the database on a miss',
      'Write-through: writes go to cache and database synchronously for strong consistency',
      'Write-behind: writes go to cache first, flushed to database asynchronously',
      'Cache-aside is the most widely used strategy for read-heavy workloads',
    ],
    realWorld: [
      'Facebook uses cache-aside with Memcached to serve billions of social graph lookups per second',
      'Amazon DynamoDB Accelerator (DAX) provides read-through caching for DynamoDB tables',
      'Gaming leaderboards often use write-behind caching to batch score updates to the database',
    ],
    interviewTips: [
      'Draw diagrams showing the data flow for each caching strategy',
      'Explain the consistency vs. performance trade-off between write-through and write-behind',
      'Discuss cache warming — pre-populating the cache to avoid cold-start misses',
    ],
    relatedTopics: ['cache-invalidation', 'redis-memcached', 'cache-eviction-policies'],
  },
  {
    id: 'cache-invalidation',
    title: 'Cache Invalidation',
    category: 'caching',
    difficulty: 2,
    summary:
      'Cache invalidation is the process of removing or updating stale data in a cache, often described as one of the two hardest problems in computer science.',
    explanation: `## The Problem

When the underlying data changes, cached copies become stale. Serving stale data can cause bugs, inconsistencies, and poor user experiences. Cache invalidation ensures the cache reflects current data — but doing it correctly is notoriously difficult.

## Invalidation Strategies

### Time-Based (TTL)

Set a Time-To-Live on each cache entry. After the TTL expires, the entry is evicted or refreshed. Simple but allows stale data within the TTL window.

### Event-Based

Invalidate cache entries when the underlying data changes. This can be triggered by database change events, application-level hooks, or message queues.

### Version-Based

Attach a version number or hash to cached data. When the data changes, the version changes, and old cache entries become orphaned. Common with static assets (e.g., \`bundle.a1b2c3.js\`).

## Common Pitfalls

- **Thundering herd**: Many requests hit the database simultaneously when a popular cache entry expires. Mitigated by cache stampede protection (locking, probabilistic early expiration).
- **Inconsistency windows**: Between the data change and invalidation, clients see stale data.
- **Over-invalidation**: Invalidating too aggressively causes excessive cache misses and defeats the purpose of caching.

## Best Practices

Use short TTLs for frequently changing data and longer TTLs for stable data. Combine TTL with event-based invalidation for the best balance of freshness and performance.`,
    keyPoints: [
      'TTL-based invalidation is simple but allows stale data within the expiration window',
      'Event-based invalidation reacts to data changes for near-real-time freshness',
      'Version-based invalidation is common for static assets using content hashes in filenames',
      'Thundering herd occurs when many requests hit the DB after a popular key expires',
      'Combining TTL with event-based invalidation balances freshness and performance',
    ],
    realWorld: [
      'Wikipedia uses HTTP cache headers with short TTLs and purges caches when articles are edited',
      'Instagram invalidates cached user profiles immediately when users update their information',
      'Webpack uses content hashes in filenames for version-based cache busting of static assets',
    ],
    interviewTips: [
      'Mention the famous quote: "The two hardest problems in CS are cache invalidation and naming things"',
      'Explain the thundering herd problem and how to prevent it with locking or staggered TTLs',
      'Discuss the trade-off between cache freshness and hit rate',
    ],
    relatedTopics: ['caching-strategies', 'cdn-caching', 'cache-eviction-policies'],
  },
  {
    id: 'redis-memcached',
    title: 'Redis & Memcached',
    category: 'caching',
    difficulty: 2,
    summary:
      'Redis and Memcached are in-memory data stores used for caching. Redis offers rich data structures and persistence, while Memcached is simpler and optimized for pure caching.',
    explanation: `## In-Memory Data Stores

Both Redis and Memcached store data in RAM for sub-millisecond access times. They are the two most popular choices for application-level caching in distributed systems.

## Redis

Redis (Remote Dictionary Server) is an in-memory data structure store that supports strings, hashes, lists, sets, sorted sets, bitmaps, streams, and more.

- **Persistence**: Supports RDB snapshots and AOF (Append-Only File) for durability.
- **Replication**: Leader-follower replication with automatic failover via Redis Sentinel or Redis Cluster.
- **Pub/Sub**: Built-in publish/subscribe messaging.
- **Lua scripting**: Execute atomic operations on the server side.
- **Data structures**: Rich types enable use cases beyond simple caching (rate limiting, leaderboards, queues).

## Memcached

Memcached is a simpler, multi-threaded in-memory key-value store focused purely on caching.

- **Simplicity**: Only supports string key-value pairs with a simple protocol.
- **Multi-threaded**: Can utilize multiple CPU cores out of the box (Redis is primarily single-threaded).
- **No persistence**: Data is lost on restart — it is purely a cache.

## When to Choose Which

Use Redis when you need data structures, persistence, pub/sub, or Lua scripting. Use Memcached when you need a simple, high-throughput cache with multi-threaded performance and do not need persistence.`,
    keyPoints: [
      'Both provide sub-millisecond latency by storing data entirely in memory',
      'Redis supports rich data structures: strings, hashes, lists, sets, sorted sets, streams',
      'Redis offers optional persistence (RDB/AOF) and replication; Memcached does not',
      'Memcached is simpler and multi-threaded, making it efficient for pure caching workloads',
      'Redis enables advanced use cases like rate limiting, leaderboards, and distributed locks',
    ],
    realWorld: [
      'Twitter uses Redis for timeline caching and rate limiting across billions of requests',
      'Facebook developed Memcached into a massive distributed caching layer serving trillions of requests',
      'GitHub uses Redis for background job queues (Resque/Sidekiq) and real-time feature flags',
    ],
    interviewTips: [
      'Compare Redis and Memcached — data structures, persistence, threading model',
      'Explain Redis persistence modes (RDB vs AOF) and their trade-offs',
      'Discuss Redis Cluster for horizontal scaling and how hash slots distribute keys',
    ],
    relatedTopics: ['caching-strategies', 'cache-eviction-policies', 'pub-sub'],
  },
  {
    id: 'cdn-caching',
    title: 'CDN Caching',
    category: 'caching',
    difficulty: 1,
    summary:
      'CDN caching stores content at geographically distributed edge servers, reducing latency by serving requests from locations close to end users.',
    explanation: `## How CDN Caching Works

A CDN caches content at edge servers distributed around the world. When a user requests a resource, the CDN serves it from the nearest edge if cached, or fetches it from the origin server, caches it, and then serves it.

## Cache Control Headers

HTTP headers control CDN caching behavior:

\`\`\`
Cache-Control: public, max-age=86400     # Cache for 24 hours
Cache-Control: private, no-cache         # Don't cache in CDN
Cache-Control: s-maxage=3600             # CDN-specific max age
Vary: Accept-Encoding                    # Cache different versions
\`\`\`

- **max-age**: How long the browser should cache the resource.
- **s-maxage**: Overrides max-age specifically for shared caches (CDNs).
- **no-cache**: Always revalidate with the origin before serving.
- **Vary**: Cache different versions based on request headers.

## Cache Hit Ratio

A high cache hit ratio means most requests are served from edge cache without hitting the origin. Strategies to improve hit ratio include longer TTLs, cache warming, and normalizing query parameters.

## Edge Computing

Modern CDNs go beyond caching static assets. Edge computing platforms (Cloudflare Workers, AWS Lambda@Edge) run code at edge locations, enabling dynamic content generation, A/B testing, and personalization close to users.`,
    keyPoints: [
      'CDN edge servers cache content close to users to minimize latency',
      'Cache-Control and s-maxage headers control CDN caching behavior',
      'Cache hit ratio is the key metric — higher ratio means less origin load',
      'Vary header enables caching multiple versions of a resource based on request headers',
      'Modern CDNs support edge computing for dynamic content at the edge',
    ],
    realWorld: [
      'Cloudflare caches static assets at 300+ locations and uses Workers for edge logic',
      'YouTube serves cached video segments from edge servers near viewers',
      'Shopify uses CDN caching to ensure storefront pages load in under a second globally',
    ],
    interviewTips: [
      'Explain the difference between Cache-Control max-age and s-maxage',
      'Discuss strategies to improve cache hit ratio — TTL tuning, normalization, warming',
      'Mention edge computing as the evolution of CDN caching beyond static assets',
    ],
    relatedTopics: ['cdn', 'cache-invalidation', 'caching-strategies'],
  },
  {
    id: 'cache-eviction-policies',
    title: 'Cache Eviction Policies',
    category: 'caching',
    difficulty: 2,
    summary:
      'Cache eviction policies determine which entries to remove when the cache is full. Common policies include LRU, LFU, FIFO, and random eviction.',
    explanation: `## Why Eviction Matters

Caches have limited memory. When the cache is full and a new entry needs to be stored, an eviction policy decides which existing entry to remove. The right policy maximizes the cache hit ratio for your workload.

## Common Policies

### LRU (Least Recently Used)

Evicts the entry that has not been accessed for the longest time. Assumes recently accessed data is likely to be accessed again. This is the most commonly used policy.

### LFU (Least Frequently Used)

Evicts the entry with the fewest access counts. Good for workloads with stable popularity patterns, but can be slow to adapt when access patterns change.

### FIFO (First In, First Out)

Evicts the oldest entry regardless of access pattern. Simple to implement but ignores usage frequency and recency.

### Random

Evicts a random entry. Surprisingly effective in some workloads and extremely cheap to implement with no bookkeeping overhead.

### TTL-Based

Entries are evicted when their time-to-live expires, regardless of cache capacity. Often combined with other policies.

## Advanced Policies

**W-TinyLFU** (used by Caffeine, a Java caching library) combines a frequency sketch with an LRU window to adapt to changing access patterns. It outperforms pure LRU and LFU in most real-world workloads.`,
    keyPoints: [
      'LRU evicts the least recently accessed item — the most widely used policy',
      'LFU evicts the least frequently accessed item — good for stable popularity patterns',
      'FIFO evicts the oldest item — simple but ignores access patterns',
      'Random eviction is surprisingly effective and has zero bookkeeping overhead',
      'W-TinyLFU combines frequency and recency for near-optimal hit rates',
    ],
    realWorld: [
      'Redis supports multiple eviction policies including LRU, LFU, random, and TTL-based',
      'CPU caches typically use pseudo-LRU policies to manage L1/L2/L3 cache lines',
      'Caffeine (Java caching library) uses W-TinyLFU and benchmarks as the highest hit-rate cache',
    ],
    interviewTips: [
      'Explain LRU implementation using a hash map + doubly linked list for O(1) operations',
      'Compare LRU vs LFU and explain when each performs better',
      'Mention that Redis maxmemory-policy setting lets you choose the eviction strategy',
    ],
    relatedTopics: ['redis-memcached', 'caching-strategies', 'cache-invalidation'],
  },
];

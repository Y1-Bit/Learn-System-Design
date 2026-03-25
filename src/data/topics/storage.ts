import type { Topic } from '../../types';

export const storageTopics: Topic[] = [
  {
    id: 'sql-vs-nosql',
    title: 'SQL vs NoSQL Databases',
    category: 'storage',
    difficulty: 1,
    summary:
      'SQL databases use structured schemas and relational tables, while NoSQL databases offer flexible schemas and various data models optimized for specific access patterns.',
    explanation: `## SQL Databases

SQL (relational) databases store data in tables with rows and columns. They enforce a predefined schema, support ACID transactions, and use SQL as a query language. Examples include PostgreSQL, MySQL, and SQL Server.

## NoSQL Databases

NoSQL databases encompass several categories, each optimized for different use cases:

- **Document stores** (MongoDB, CouchDB): Store JSON-like documents with flexible schemas.
- **Key-value stores** (Redis, DynamoDB): Simple key-to-value lookups with extremely low latency.
- **Column-family stores** (Cassandra, HBase): Optimized for write-heavy workloads with wide rows.
- **Graph databases** (Neo4j, Amazon Neptune): Model relationships as first-class citizens.

## When to Choose Which

Choose SQL when you need complex joins, strong consistency, and ACID transactions — for example, financial systems or inventory management. Choose NoSQL when you need horizontal scalability, flexible schemas, or your access patterns favor denormalized data — for example, real-time analytics or content management.

## The Reality

Many modern systems use both (polyglot persistence). A single application might use PostgreSQL for transactional data, Redis for caching, and Elasticsearch for search. The choice depends on your data model, access patterns, consistency requirements, and scale.`,
    keyPoints: [
      'SQL databases enforce schemas and excel at complex queries with joins',
      'NoSQL databases offer flexible schemas and horizontal scalability',
      'NoSQL has four main categories: document, key-value, column-family, and graph',
      'SQL provides ACID guarantees; many NoSQL databases offer eventual consistency',
      'Polyglot persistence — using multiple database types — is common in modern systems',
      'Choose based on data model, access patterns, consistency needs, and scale requirements',
    ],
    realWorld: [
      'Airbnb uses PostgreSQL for booking data requiring ACID guarantees and Elasticsearch for search',
      'Amazon DynamoDB powers the shopping cart with single-digit millisecond key-value lookups',
      'Facebook uses MySQL for user data and TAO (graph-based cache) for the social graph',
    ],
    interviewTips: [
      'Avoid saying one is always better — explain trade-offs based on specific requirements',
      'Discuss CAP theorem implications when comparing SQL and NoSQL choices',
      'Mention polyglot persistence as a practical approach in real systems',
    ],
    relatedTopics: ['acid-properties', 'database-indexing', 'sharding'],
  },
  {
    id: 'acid-properties',
    title: 'ACID Properties',
    category: 'storage',
    difficulty: 1,
    summary:
      'ACID (Atomicity, Consistency, Isolation, Durability) is a set of properties that guarantee reliable database transactions even in the face of errors and failures.',
    explanation: `## What is ACID?

ACID is a set of four properties that ensure database transactions are processed reliably. These guarantees are fundamental to systems where data integrity is critical, such as banking and e-commerce.

## The Four Properties

- **Atomicity**: A transaction is all-or-nothing. If any part fails, the entire transaction is rolled back. For example, transferring money either debits AND credits or does neither.
- **Consistency**: A transaction brings the database from one valid state to another. All constraints, cascades, and triggers are satisfied before the transaction commits.
- **Isolation**: Concurrent transactions execute as if they were sequential. Each transaction sees a consistent snapshot of the data regardless of other in-progress transactions.
- **Durability**: Once a transaction is committed, its changes survive power failures and crashes. Data is written to non-volatile storage (typically a write-ahead log).

## Isolation Levels

SQL databases offer different isolation levels trading correctness for performance:

1. **Read Uncommitted**: Fastest but allows dirty reads.
2. **Read Committed**: Prevents dirty reads.
3. **Repeatable Read**: Prevents non-repeatable reads.
4. **Serializable**: Strictest — transactions behave as if executed one at a time.

## ACID vs BASE

NoSQL databases often follow BASE (Basically Available, Soft state, Eventually consistent) instead of ACID, prioritizing availability and partition tolerance over strict consistency.`,
    keyPoints: [
      'Atomicity ensures transactions are all-or-nothing — partial failures are rolled back',
      'Consistency ensures the database moves between valid states respecting all constraints',
      'Isolation ensures concurrent transactions do not interfere with each other',
      'Durability ensures committed data survives system crashes via write-ahead logs',
      'Isolation levels trade correctness for performance (Read Uncommitted to Serializable)',
      'BASE is the alternative model used by many NoSQL databases',
    ],
    realWorld: [
      'Banks rely on ACID to guarantee that money transfers are atomic — debit and credit happen together or not at all',
      'PostgreSQL supports full ACID compliance with MVCC for high-performance isolation',
      'E-commerce checkout systems use ACID transactions to prevent overselling inventory',
    ],
    interviewTips: [
      'Be ready to explain each letter of ACID with a concrete example like a bank transfer',
      'Discuss isolation levels and the anomalies each prevents (dirty reads, phantom reads)',
      'Compare ACID vs BASE and when you would accept eventual consistency',
    ],
    relatedTopics: ['sql-vs-nosql', 'replication', 'cap-theorem'],
  },
  {
    id: 'database-indexing',
    title: 'Database Indexing',
    category: 'storage',
    difficulty: 2,
    summary:
      'Database indexes are data structures that speed up read queries by providing efficient lookup paths, at the cost of additional storage and slower writes.',
    explanation: `## What is Indexing?

A database index is an auxiliary data structure that allows the database engine to find rows quickly without scanning the entire table. Think of it like a book's index — instead of reading every page, you look up the topic and jump to the right page.

## How Indexes Work

Most relational databases use **B-tree** (or B+ tree) indexes by default. These balanced tree structures allow lookups, range scans, and ordered retrieval in O(log n) time.

\`\`\`sql
-- Create an index on the email column
CREATE INDEX idx_users_email ON users(email);

-- This query now uses the index instead of a full table scan
SELECT * FROM users WHERE email = 'user@example.com';
\`\`\`

## Types of Indexes

- **Primary index**: Automatically created on the primary key; determines physical row ordering (clustered).
- **Secondary index**: Created on non-primary columns; stores pointers to the actual rows.
- **Composite index**: Covers multiple columns — column order matters for query optimization.
- **Covering index**: Contains all columns needed by a query, avoiding table lookups entirely.

## Trade-offs

Indexes speed up reads but slow down writes because every INSERT, UPDATE, or DELETE must also update the index. Over-indexing wastes storage and degrades write performance. The key is to index columns used in WHERE clauses, JOIN conditions, and ORDER BY statements.`,
    keyPoints: [
      'Indexes provide O(log n) lookups instead of O(n) full table scans',
      'B-tree indexes are the default in most relational databases',
      'Composite indexes cover multiple columns — column order follows the leftmost prefix rule',
      'Indexes speed up reads but slow down writes and consume additional storage',
      'Covering indexes include all query columns, eliminating table lookups entirely',
    ],
    realWorld: [
      'Amazon product search uses carefully tuned indexes to return results in milliseconds across billions of products',
      'PostgreSQL EXPLAIN ANALYZE helps developers identify missing indexes causing slow queries',
      'Stack Overflow optimized their SQL Server indexes to handle millions of queries per day on a single server',
    ],
    interviewTips: [
      'Explain how a B-tree index works and why it provides O(log n) lookups',
      'Discuss the write performance trade-off and when NOT to add an index',
      'Mention composite index column ordering and the leftmost prefix rule',
    ],
    relatedTopics: ['sql-vs-nosql', 'lsm-trees', 'read-replicas'],
  },
  {
    id: 'replication',
    title: 'Database Replication',
    category: 'storage',
    difficulty: 2,
    summary:
      'Database replication copies data across multiple servers to improve availability, fault tolerance, and read performance through leader-follower or multi-leader setups.',
    explanation: `## What is Replication?

Database replication is the process of maintaining copies of data on multiple database servers. If one server fails, others can continue serving requests. Replication also distributes read traffic across multiple nodes.

## Replication Strategies

### Leader-Follower (Primary-Replica)

One leader handles all writes. Followers replicate the leader's data and serve read queries. This is the most common pattern.

- **Synchronous**: The leader waits for at least one follower to confirm the write. Stronger consistency but higher latency.
- **Asynchronous**: The leader confirms the write immediately and followers replicate later. Lower latency but risk of data loss on leader failure.

### Multi-Leader

Multiple nodes accept writes and replicate to each other. Useful for multi-datacenter setups but introduces write conflict resolution challenges.

### Leaderless

All nodes accept reads and writes (e.g., Cassandra, DynamoDB). Uses quorum reads/writes (R + W > N) to ensure consistency.

## Replication Lag

Asynchronous replication introduces lag — followers may serve stale data temporarily. Strategies like read-your-writes consistency and monotonic reads help mitigate user-visible staleness.`,
    keyPoints: [
      'Leader-follower replication routes all writes through a single leader node',
      'Synchronous replication ensures consistency; asynchronous reduces latency but risks lag',
      'Multi-leader replication supports multi-datacenter writes but requires conflict resolution',
      'Leaderless replication uses quorum (R + W > N) for tunable consistency',
      'Replication lag can cause stale reads — mitigated by read-your-writes guarantees',
    ],
    realWorld: [
      'Amazon RDS supports read replicas that can be promoted to primary on leader failure',
      'Cassandra uses leaderless replication with tunable consistency for global distribution',
      'MySQL group replication enables automatic failover among a cluster of replicas',
    ],
    interviewTips: [
      'Compare leader-follower, multi-leader, and leaderless replication with clear trade-offs',
      'Explain replication lag and how read-your-writes consistency addresses it',
      'Discuss what happens during leader failure — failover process and potential data loss',
    ],
    relatedTopics: ['sharding', 'cap-theorem', 'read-replicas'],
  },
  {
    id: 'sharding',
    title: 'Database Sharding',
    category: 'storage',
    difficulty: 3,
    summary:
      'Sharding horizontally partitions data across multiple database instances, enabling systems to scale beyond the capacity of a single machine.',
    explanation: `## What is Sharding?

Sharding (horizontal partitioning) splits a large dataset across multiple database instances called shards. Each shard holds a subset of the data, and together they form the complete dataset. This allows systems to handle more data and traffic than a single server can manage.

## Sharding Strategies

- **Range-based**: Data is partitioned by value ranges (e.g., users A-M on shard 1, N-Z on shard 2). Simple but prone to hotspots if data is not evenly distributed.
- **Hash-based**: A hash function maps the shard key to a shard number. Provides more even distribution but makes range queries across shards difficult.
- **Directory-based**: A lookup table maps each key to its shard. Flexible but the directory becomes a single point of failure.

## Challenges

- **Cross-shard queries**: JOINs across shards are expensive or impossible, requiring denormalization.
- **Rebalancing**: Adding or removing shards requires redistributing data, which is complex and disruptive.
- **Distributed transactions**: ACID transactions across shards are difficult and often replaced by saga patterns.
- **Hotspots**: Uneven data distribution can overload specific shards (e.g., a celebrity user).

## Consistent Hashing

Consistent hashing minimizes data movement when shards are added or removed. Instead of rehashing all keys, only keys in the affected range are redistributed.`,
    keyPoints: [
      'Sharding splits data across multiple database instances for horizontal scalability',
      'Range-based sharding is simple but can create hotspots; hash-based provides even distribution',
      'Cross-shard queries and distributed transactions are major challenges',
      'Consistent hashing minimizes data movement when adding or removing shards',
      'Rebalancing shards is complex and requires careful planning',
      'Shard key selection is critical — a bad key leads to hotspots and uneven load',
    ],
    realWorld: [
      'Instagram shards PostgreSQL by user ID to handle billions of photos across thousands of shards',
      'MongoDB supports automatic sharding with configurable shard keys',
      'Discord shards messages by channel ID to handle trillions of messages',
    ],
    interviewTips: [
      'Discuss shard key selection and why it is the most important decision in sharding',
      'Explain consistent hashing and how it helps with shard rebalancing',
      'Mention that sharding should be a last resort — try read replicas and caching first',
    ],
    relatedTopics: ['consistent-hashing', 'replication', 'database-partitioning'],
  },
  {
    id: 'lsm-trees',
    title: 'LSM Trees',
    category: 'storage',
    difficulty: 3,
    summary:
      'Log-Structured Merge Trees are write-optimized data structures used in databases like Cassandra and LevelDB, buffering writes in memory before flushing to sorted disk files.',
    explanation: `## What are LSM Trees?

A Log-Structured Merge Tree (LSM Tree) is a data structure that provides high write throughput by buffering writes in memory and periodically flushing them to disk in sorted order. This is the storage engine behind databases like Cassandra, LevelDB, RocksDB, and HBase.

## How LSM Trees Work

1. **MemTable**: Writes go to an in-memory sorted structure (typically a red-black tree or skip list).
2. **WAL (Write-Ahead Log)**: Each write is also appended to a log on disk for durability.
3. **Flush**: When the MemTable reaches a size threshold, it is written to disk as an immutable Sorted String Table (SSTable).
4. **Compaction**: Background processes merge multiple SSTables to remove duplicates, apply deletes (tombstones), and maintain sorted order.

## Read Path

Reads check the MemTable first, then search SSTables from newest to oldest. Bloom filters are used to quickly skip SSTables that definitely do not contain the target key, reducing disk reads.

## LSM vs B-Tree

LSM Trees optimize for writes (sequential I/O, batched flushes) while B-Trees optimize for reads (in-place updates). LSM Trees have write amplification from compaction; B-Trees have write amplification from random I/O and page splits.`,
    keyPoints: [
      'Writes are buffered in an in-memory MemTable then flushed to immutable SSTables on disk',
      'Write-Ahead Log ensures durability before the MemTable is flushed',
      'Compaction merges SSTables to reclaim space and maintain sorted order',
      'Bloom filters accelerate reads by skipping SSTables that do not contain the key',
      'LSM Trees optimize for write throughput; B-Trees optimize for read performance',
    ],
    realWorld: [
      'Apache Cassandra uses LSM Trees as its storage engine for high write throughput',
      'RocksDB (developed by Facebook) is a widely-used LSM-based embedded database',
      'LevelDB (developed by Google) powers the storage layer of many distributed systems',
    ],
    interviewTips: [
      'Explain the write path: MemTable -> WAL -> SSTable flush -> compaction',
      'Compare LSM Trees vs B-Trees and when each is the better choice',
      'Discuss write amplification caused by compaction and strategies to minimize it',
    ],
    relatedTopics: ['database-indexing', 'sql-vs-nosql', 'bloom-filters'],
  },
  {
    id: 'object-storage',
    title: 'Object Storage',
    category: 'storage',
    difficulty: 1,
    summary:
      'Object storage manages data as discrete objects with metadata and unique identifiers, ideal for storing unstructured data like images, videos, and backups at massive scale.',
    explanation: `## What is Object Storage?

Object storage is a data architecture that manages data as objects rather than files in a hierarchy or blocks on a disk. Each object contains the data itself, metadata (key-value pairs), and a globally unique identifier. Objects are stored in flat namespaces called buckets.

## How It Differs from Other Storage

- **Block storage** (EBS, SAN): Raw storage volumes attached to servers. Low latency, supports file systems.
- **File storage** (NFS, EFS): Hierarchical directory structure. Good for shared file access.
- **Object storage** (S3, GCS, Azure Blob): Flat namespace, accessed via HTTP APIs. Optimized for scale and durability.

## Key Characteristics

- **Scalability**: Designed to handle petabytes of data with near-infinite scalability.
- **Durability**: Data is replicated across multiple availability zones (e.g., S3 offers 99.999999999% durability).
- **HTTP API access**: Objects are accessed via simple PUT/GET requests, making integration easy.
- **Metadata-rich**: Custom metadata enables powerful search and organization without a directory structure.

## Use Cases

Object storage is ideal for static assets (images, videos), backups, data lakes, and any scenario requiring massive, durable, cost-effective storage. It is not suitable for frequently updated data or low-latency database workloads.`,
    keyPoints: [
      'Stores data as objects in flat namespaces (buckets) rather than file hierarchies',
      'Each object has data, metadata, and a unique identifier',
      'Accessed via HTTP APIs (PUT/GET) — simple to integrate with any application',
      'Extremely durable — services like S3 replicate across availability zones',
      'Ideal for unstructured data: images, videos, backups, and data lakes',
      'Not suitable for low-latency or frequently-updated transactional workloads',
    ],
    realWorld: [
      'Amazon S3 stores trillions of objects and handles millions of requests per second',
      'Netflix stores all movie and show assets in object storage before CDN distribution',
      'Dropbox migrated from S3 to their own object storage system (Magic Pocket) at scale',
    ],
    interviewTips: [
      'Compare block, file, and object storage with clear use cases for each',
      'Discuss S3 durability guarantees and how replication across AZs achieves them',
      'Mention presigned URLs for secure temporary access to private objects',
    ],
    relatedTopics: ['cdn', 'replication', 'sql-vs-nosql'],
  },
];

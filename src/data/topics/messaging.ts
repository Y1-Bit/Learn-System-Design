import type { Topic } from '../../types';

export const messagingTopics: Topic[] = [
  {
    id: 'message-queues',
    title: 'Message Queues',
    category: 'messaging',
    difficulty: 1,
    summary:
      'Message queues decouple producers and consumers by storing messages in a queue, enabling asynchronous processing, load leveling, and fault tolerance.',
    explanation: `## What is a Message Queue?

A message queue is a communication mechanism where producers send messages to a queue, and consumers read messages from it. The queue stores messages until they are processed, decoupling the sender from the receiver.

## How It Works

1. **Producer** sends a message to the queue.
2. The **queue** stores the message durably until a consumer is ready.
3. A **consumer** picks up the message, processes it, and acknowledges completion.
4. The queue removes acknowledged messages.

## Key Concepts

- **Point-to-point**: Each message is consumed by exactly one consumer. Multiple consumers can compete for messages (competing consumers pattern).
- **Acknowledgment**: Consumers confirm successful processing. Unacknowledged messages are redelivered.
- **Dead Letter Queue (DLQ)**: Messages that fail processing after multiple retries are moved to a DLQ for investigation.
- **Ordering**: Some queues guarantee FIFO ordering; others provide best-effort ordering for higher throughput.

## Benefits

- **Decoupling**: Producers and consumers can be developed, deployed, and scaled independently.
- **Load leveling**: The queue absorbs traffic spikes, letting consumers process at their own pace.
- **Fault tolerance**: If a consumer crashes, unprocessed messages remain in the queue for retry.
- **Asynchronous processing**: Producers do not wait for consumers, improving response times.`,
    keyPoints: [
      'Decouples producers and consumers for independent scaling and deployment',
      'Messages are stored durably until acknowledged by a consumer',
      'Dead letter queues capture messages that fail processing for investigation',
      'Load leveling absorbs traffic spikes without overwhelming consumers',
      'Competing consumers pattern enables horizontal scaling of message processing',
    ],
    realWorld: [
      'Amazon SQS handles trillions of messages per year for decoupled AWS services',
      'RabbitMQ is widely used for task distribution across worker processes in web applications',
      'Uber uses message queues to decouple trip matching from payment processing',
    ],
    interviewTips: [
      'Explain the difference between message queues (point-to-point) and pub/sub (broadcast)',
      'Discuss at-least-once vs. at-most-once vs. exactly-once delivery guarantees',
      'Mention idempotency — consumers should handle duplicate messages gracefully',
    ],
    relatedTopics: ['pub-sub', 'apache-kafka', 'event-sourcing'],
  },
  {
    id: 'pub-sub',
    title: 'Publish-Subscribe (Pub/Sub)',
    category: 'messaging',
    difficulty: 1,
    summary:
      'Pub/Sub is a messaging pattern where publishers send messages to topics and all subscribers to that topic receive a copy, enabling one-to-many communication.',
    explanation: `## What is Pub/Sub?

Publish-Subscribe (Pub/Sub) is a messaging pattern where messages are published to a topic and delivered to all subscribers of that topic. Unlike message queues (point-to-point), pub/sub enables one-to-many communication.

## How It Works

1. **Publishers** send messages to a named topic (they do not know who subscribes).
2. The **message broker** routes copies of each message to all active subscribers.
3. **Subscribers** receive and process messages independently.

## Pub/Sub vs Message Queues

| Feature | Message Queue | Pub/Sub |
|---------|--------------|---------|
| Delivery | One consumer per message | All subscribers get a copy |
| Use case | Task distribution | Event broadcasting |
| Example | Process an order | Notify inventory, shipping, analytics |

## Fan-Out Pattern

Pub/Sub naturally implements fan-out: a single event (e.g., "order placed") triggers multiple independent actions (update inventory, send confirmation email, update analytics). Each subscriber handles one concern.

## Durability and Delivery

- **Ephemeral**: Messages are lost if no subscriber is connected (e.g., Redis Pub/Sub).
- **Durable**: Messages are persisted and delivered even to offline subscribers when they reconnect (e.g., Google Cloud Pub/Sub, Kafka consumer groups).

Durable pub/sub systems are essential for reliable event-driven architectures.`,
    keyPoints: [
      'Publishers send messages to topics; all subscribers receive a copy',
      'Enables one-to-many communication and event-driven fan-out',
      'Publishers and subscribers are decoupled — neither knows about the other',
      'Durable pub/sub persists messages for offline subscribers; ephemeral does not',
      'Fan-out pattern triggers multiple independent actions from a single event',
    ],
    realWorld: [
      'Google Cloud Pub/Sub handles real-time event streaming for analytics and data pipelines',
      'Slack uses pub/sub internally to deliver messages to all connected devices for a channel',
      'YouTube uses pub/sub to fan out new video notifications to millions of subscribers',
    ],
    interviewTips: [
      'Clearly distinguish pub/sub from message queues — one-to-many vs. point-to-point',
      'Discuss durable vs. ephemeral subscriptions and when each is appropriate',
      'Explain how pub/sub enables event-driven architectures and the fan-out pattern',
    ],
    relatedTopics: ['message-queues', 'apache-kafka', 'event-sourcing'],
  },
  {
    id: 'apache-kafka',
    title: 'Apache Kafka',
    category: 'messaging',
    difficulty: 3,
    summary:
      'Apache Kafka is a distributed event streaming platform that handles high-throughput, durable message publishing and consumption with partition-based parallelism.',
    explanation: `## What is Kafka?

Apache Kafka is a distributed event streaming platform originally built at LinkedIn. It combines the durability of message queues with the broadcast capability of pub/sub, designed for high-throughput, fault-tolerant data streaming.

## Core Concepts

- **Topics**: Named streams of records. Messages are published to topics.
- **Partitions**: Each topic is split into partitions for parallelism. Messages within a partition are strictly ordered.
- **Producers**: Write messages to topic partitions (partitioned by key for ordering guarantees).
- **Consumers**: Read messages from partitions. Consumer groups enable parallel processing.
- **Brokers**: Kafka servers that store and serve data. Data is replicated across brokers for fault tolerance.

## How Consumer Groups Work

\`\`\`
Topic: orders (3 partitions)
Consumer Group A: [C1 reads P0, C2 reads P1, C3 reads P2]
Consumer Group B: [C4 reads P0+P1+P2]
\`\`\`

Each partition is consumed by exactly one consumer in a group. Adding consumers up to the partition count increases parallelism.

## Why Kafka is Different

Unlike traditional message queues, Kafka retains messages for a configurable period (not just until consumed). This enables replay, reprocessing, and multiple consumer groups reading the same data independently. Kafka acts as a durable, distributed commit log.`,
    keyPoints: [
      'Topics are divided into partitions for parallel processing and ordering guarantees',
      'Consumer groups enable both queue-like (one consumer per partition) and broadcast semantics',
      'Messages are retained for a configurable period, enabling replay and reprocessing',
      'Data is replicated across brokers for fault tolerance and high availability',
      'Kafka acts as a distributed commit log — not just a message queue',
      'Throughput scales linearly by adding partitions and brokers',
    ],
    realWorld: [
      'LinkedIn processes over 7 trillion messages per day through Kafka for activity tracking and analytics',
      'Uber uses Kafka to stream trip events in real-time across hundreds of microservices',
      'Netflix uses Kafka for real-time monitoring, event processing, and data pipeline ingestion',
    ],
    interviewTips: [
      'Explain partitions as the unit of parallelism and why partition count limits consumer scaling',
      'Discuss how Kafka differs from traditional queues — retention, replay, consumer groups',
      'Mention offset management and how consumers track their position in the partition log',
    ],
    relatedTopics: ['message-queues', 'pub-sub', 'event-sourcing'],
  },
  {
    id: 'event-sourcing',
    title: 'Event Sourcing',
    category: 'messaging',
    difficulty: 3,
    summary:
      'Event sourcing stores state changes as an immutable sequence of events rather than overwriting current state, providing a complete audit trail and enabling temporal queries.',
    explanation: `## What is Event Sourcing?

Instead of storing the current state of an entity, event sourcing stores every state change as an immutable event. The current state is derived by replaying events from the beginning (or from a snapshot).

## Traditional vs Event Sourcing

\`\`\`
Traditional: UPDATE accounts SET balance = 150 WHERE id = 1;
(Previous balance is lost)

Event Sourcing:
  Event 1: AccountCreated { id: 1, balance: 0 }
  Event 2: MoneyDeposited { id: 1, amount: 200 }
  Event 3: MoneyWithdrawn { id: 1, amount: 50 }
  Current state: balance = 0 + 200 - 50 = 150
\`\`\`

## Benefits

- **Complete audit trail**: Every change is recorded and immutable.
- **Temporal queries**: "What was the account balance on January 15th?"
- **Replay and reprocessing**: Fix bugs and recompute state by replaying events with corrected logic.
- **Event-driven integration**: Events naturally feed into downstream systems, analytics, and projections.

## Challenges

- **Complexity**: More complex than CRUD for simple use cases.
- **Event schema evolution**: Changing event formats requires careful versioning.
- **Eventual consistency**: Read models (projections) may lag behind the event store.
- **Storage growth**: The event log grows indefinitely — snapshots help but add complexity.

## Snapshots

To avoid replaying all events from the beginning, periodic snapshots capture the current state. Reconstruction starts from the latest snapshot and replays only subsequent events.`,
    keyPoints: [
      'Stores every state change as an immutable event rather than overwriting current state',
      'Current state is derived by replaying the event sequence (or from a snapshot)',
      'Provides a complete audit trail and enables temporal queries',
      'Events naturally feed downstream systems and analytics pipelines',
      'Snapshots avoid replaying the full event history for performance',
      'Event schema evolution and eventual consistency are key challenges',
    ],
    realWorld: [
      'Banking systems use event sourcing to maintain complete transaction histories for compliance',
      'EventStoreDB is a purpose-built database designed specifically for event sourcing',
      'Walmart uses event sourcing for their inventory system to track every stock movement',
    ],
    interviewTips: [
      'Compare event sourcing with traditional CRUD and explain when the added complexity is justified',
      'Discuss how snapshots solve the performance problem of replaying large event histories',
      'Mention that event sourcing pairs naturally with CQRS for optimized read and write models',
    ],
    relatedTopics: ['cqrs', 'apache-kafka', 'message-queues'],
  },
  {
    id: 'cqrs',
    title: 'CQRS (Command Query Responsibility Segregation)',
    category: 'messaging',
    difficulty: 3,
    summary:
      'CQRS separates read and write operations into different models, allowing each to be optimized independently for performance, scalability, and complexity.',
    explanation: `## What is CQRS?

CQRS (Command Query Responsibility Segregation) separates the write model (commands) from the read model (queries) of an application. Instead of using the same data model for both reads and writes, each side has its own optimized model.

## How It Works

- **Command side**: Handles writes (create, update, delete). Validates business rules and persists state changes.
- **Query side**: Handles reads. Uses denormalized views optimized for specific query patterns.
- **Synchronization**: Changes from the command side are propagated to the query side, often asynchronously via events.

## Why Separate Reads and Writes?

In many systems, read and write patterns are fundamentally different:

- Reads are often 10-100x more frequent than writes.
- Read queries may need data from multiple aggregate boundaries (requiring joins).
- Write operations need strong consistency and validation.
- Read operations can often tolerate slight staleness for better performance.

## CQRS + Event Sourcing

CQRS pairs naturally with event sourcing: the command side stores events, and the query side builds read-optimized projections from those events. This combination provides a complete audit trail, temporal queries, and highly optimized read models.

## When to Use CQRS

CQRS adds complexity and is not needed for simple CRUD applications. Use it when read and write patterns differ significantly, when you need multiple read representations, or when combined with event sourcing for complex domains.`,
    keyPoints: [
      'Separates write model (commands) from read model (queries) for independent optimization',
      'Read models are denormalized and optimized for specific query patterns',
      'Synchronization between models is typically asynchronous, introducing eventual consistency',
      'Pairs naturally with event sourcing — events feed into read model projections',
      'Adds complexity — only justified when read/write patterns differ significantly',
    ],
    realWorld: [
      'Microsoft Azure promotes CQRS as a key pattern in their cloud architecture guidelines',
      'E-commerce product catalogs often use CQRS — writes are infrequent but reads must be fast and varied',
      'Social media feeds use CQRS: writes go to the post store, reads come from pre-built feed projections',
    ],
    interviewTips: [
      'Explain CQRS with a concrete example — e-commerce where product writes and search reads differ',
      'Discuss the eventual consistency trade-off between the command and query sides',
      'Mention that CQRS without event sourcing is valid — they are complementary but independent patterns',
    ],
    relatedTopics: ['event-sourcing', 'message-queues', 'microservices-vs-monolith'],
  },
];

import type { Topic } from '../../types';

export const networkingTopics: Topic[] = [
  {
    id: 'rest-api',
    title: 'REST APIs',
    category: 'networking',
    difficulty: 1,
    summary:
      'REST (Representational State Transfer) is an architectural style for designing networked applications using standard HTTP methods and stateless communication.',
    explanation: `## What is REST?

REST is an architectural style that defines a set of constraints for creating web services. RESTful APIs use HTTP methods to perform CRUD operations on resources identified by URIs.

## Core Principles

- **Statelessness**: Each request contains all information needed to process it. The server does not store client session state between requests.
- **Uniform Interface**: Resources are identified by URIs and manipulated through standard HTTP methods (GET, POST, PUT, DELETE, PATCH).
- **Client-Server Separation**: The client and server evolve independently. The client only needs to know resource URIs and supported actions.
- **Cacheability**: Responses must define themselves as cacheable or non-cacheable to prevent stale data and improve performance.

## HTTP Methods

\`\`\`
GET    /users       -> List all users
GET    /users/42    -> Get user 42
POST   /users       -> Create a new user
PUT    /users/42    -> Replace user 42
PATCH  /users/42    -> Partially update user 42
DELETE /users/42    -> Delete user 42
\`\`\`

## Status Codes

REST APIs use standard HTTP status codes: 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), and 500 (Internal Server Error). Well-designed APIs return meaningful status codes and error bodies to help clients handle failures gracefully.`,
    keyPoints: [
      'Uses standard HTTP methods (GET, POST, PUT, DELETE) for CRUD operations',
      'Stateless communication — each request is self-contained',
      'Resources are identified by URIs and represented in JSON or XML',
      'Supports caching through HTTP headers like ETag and Cache-Control',
      'Follows a uniform interface that decouples client and server',
    ],
    realWorld: [
      'Twitter API exposes tweets, users, and timelines as REST resources',
      'Stripe uses a RESTful API for payment processing with clear resource URIs',
      'GitHub REST API allows developers to manage repos, issues, and pull requests',
    ],
    interviewTips: [
      'Be ready to compare REST vs GraphQL vs gRPC and explain when each is appropriate',
      'Discuss idempotency — GET, PUT, DELETE are idempotent while POST is not',
      'Mention HATEOAS as an advanced REST concept, but note it is rarely fully implemented',
    ],
    relatedTopics: ['graphql', 'grpc', 'http-https-tls'],
  },
  {
    id: 'graphql',
    title: 'GraphQL',
    category: 'networking',
    difficulty: 2,
    summary:
      'GraphQL is a query language for APIs that lets clients request exactly the data they need, reducing over-fetching and under-fetching problems common with REST.',
    explanation: `## What is GraphQL?

GraphQL is a query language and runtime for APIs developed by Facebook in 2012 and open-sourced in 2015. Unlike REST, where the server defines the shape of each response, GraphQL lets the client specify the exact fields it needs.

## How It Works

Clients send a query describing the desired data structure, and the server returns JSON matching that exact shape. A single endpoint handles all queries, mutations, and subscriptions.

\`\`\`graphql
query {
  user(id: "42") {
    name
    email
    posts(limit: 5) {
      title
      createdAt
    }
  }
}
\`\`\`

## Key Concepts

- **Queries**: Read operations that fetch data from the server.
- **Mutations**: Write operations that create, update, or delete data.
- **Subscriptions**: Real-time updates pushed from the server via WebSockets.
- **Schema & Types**: A strongly-typed schema defines all available data and operations, enabling introspection and tooling.

## Trade-offs

GraphQL excels when clients have diverse data needs (mobile vs. web) or when you want to avoid multiple round trips. However, it introduces complexity in caching (no HTTP-level caching by default), authorization at the field level, and the N+1 query problem on the backend.`,
    keyPoints: [
      'Single endpoint serves all queries — no need for multiple REST routes',
      'Clients request exactly the fields they need, eliminating over-fetching',
      'Strongly-typed schema enables introspection, validation, and auto-generated docs',
      'Supports real-time data via subscriptions over WebSockets',
      'N+1 query problem must be mitigated with techniques like DataLoader',
    ],
    realWorld: [
      'Facebook built GraphQL to power their mobile news feed with minimal data transfer',
      'Shopify exposes a GraphQL API for storefront and admin data access',
      'GitHub offers a GraphQL API alongside REST for more flexible data querying',
    ],
    interviewTips: [
      'Explain the over-fetching and under-fetching problems that GraphQL solves',
      'Discuss caching challenges — GraphQL responses are harder to cache than REST at the HTTP layer',
      'Mention DataLoader or batching as the standard solution to the N+1 problem',
    ],
    relatedTopics: ['rest-api', 'websockets', 'api-gateway'],
  },
  {
    id: 'grpc',
    title: 'gRPC',
    category: 'networking',
    difficulty: 2,
    summary:
      'gRPC is a high-performance, open-source RPC framework that uses Protocol Buffers for serialization and HTTP/2 for transport, ideal for microservice communication.',
    explanation: `## What is gRPC?

gRPC (gRPC Remote Procedure Calls) is an open-source framework developed by Google for efficient service-to-service communication. It uses Protocol Buffers (protobuf) as its interface definition language and serialization format.

## How It Works

You define services and messages in a \`.proto\` file, then generate client and server code in your target language. gRPC handles serialization, transport, and connection management.

\`\`\`protobuf
service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
  rpc ListUsers (ListRequest) returns (stream UserResponse);
}

message UserRequest {
  string id = 1;
}
\`\`\`

## Key Features

- **HTTP/2 Transport**: Multiplexed streams, header compression, and bidirectional communication over a single connection.
- **Streaming**: Supports unary, server-streaming, client-streaming, and bidirectional streaming patterns.
- **Code Generation**: Generates type-safe client and server stubs in many languages from a single proto definition.

## When to Use gRPC

gRPC shines for internal microservice communication where low latency and high throughput matter. It is less suited for browser clients (limited browser HTTP/2 support for gRPC) and human-readable debugging since protobuf is binary.`,
    keyPoints: [
      'Uses Protocol Buffers for compact binary serialization — faster than JSON',
      'Built on HTTP/2 for multiplexed streams and header compression',
      'Supports four communication patterns: unary, server-streaming, client-streaming, and bidirectional',
      'Code generation produces type-safe client and server stubs in many languages',
      'Ideal for low-latency microservice-to-microservice communication',
    ],
    realWorld: [
      'Google uses gRPC internally for communication between its massive fleet of microservices',
      'Netflix adopted gRPC for inter-service communication to reduce latency',
      'Dropbox migrated from REST to gRPC for internal services to improve performance',
    ],
    interviewTips: [
      'Compare gRPC with REST — binary vs. text, HTTP/2 vs. HTTP/1.1, strict contracts vs. flexible',
      'Explain the four streaming modes and when each is appropriate',
      'Mention that gRPC-Web exists for browser clients but has limitations compared to native gRPC',
    ],
    relatedTopics: ['rest-api', 'microservices-vs-monolith', 'http-https-tls'],
  },
  {
    id: 'websockets',
    title: 'WebSockets',
    category: 'networking',
    difficulty: 2,
    summary:
      'WebSockets provide full-duplex, persistent communication channels over a single TCP connection, enabling real-time data exchange between client and server.',
    explanation: `## What are WebSockets?

WebSockets is a protocol that provides full-duplex communication channels over a single TCP connection. Unlike HTTP request-response, once a WebSocket connection is established, both client and server can send messages at any time.

## The Handshake

A WebSocket connection starts as an HTTP request with an \`Upgrade\` header. The server responds with a 101 status code, and the connection switches from HTTP to the WebSocket protocol.

\`\`\`
GET /chat HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
\`\`\`

## Use Cases

- **Chat applications**: Messages are pushed instantly to all connected clients.
- **Live dashboards**: Stock tickers, analytics, and monitoring dashboards receive real-time updates.
- **Collaborative editing**: Multiple users see each other's changes in real time.
- **Gaming**: Multiplayer games need low-latency bidirectional communication.

## Scaling Considerations

WebSocket connections are stateful and persistent, which makes horizontal scaling harder. You need sticky sessions or a pub/sub layer (like Redis) to broadcast messages across multiple server instances.`,
    keyPoints: [
      'Full-duplex communication — both client and server can send messages at any time',
      'Persistent connection avoids the overhead of repeated HTTP handshakes',
      'Starts with an HTTP Upgrade handshake then switches to the WebSocket protocol',
      'Stateful connections make horizontal scaling more complex than stateless HTTP',
      'Well-suited for real-time use cases like chat, gaming, and live dashboards',
    ],
    realWorld: [
      'Slack uses WebSockets to deliver real-time messages to connected clients',
      'Binance streams live cryptocurrency price data over WebSocket connections',
      'Google Docs uses WebSocket-like technology for real-time collaborative editing',
    ],
    interviewTips: [
      'Explain why polling and long-polling are less efficient than WebSockets for real-time data',
      'Discuss scaling challenges — sticky sessions, pub/sub backplane, and connection limits',
      'Mention Server-Sent Events (SSE) as a simpler alternative when only server-to-client streaming is needed',
    ],
    relatedTopics: ['pub-sub', 'load-balancing', 'graphql'],
  },
  {
    id: 'dns',
    title: 'DNS (Domain Name System)',
    category: 'networking',
    difficulty: 1,
    summary:
      'DNS translates human-readable domain names into IP addresses, acting as the internet\'s phone book to route traffic to the correct servers.',
    explanation: `## What is DNS?

The Domain Name System (DNS) is a hierarchical, distributed naming system that maps human-friendly domain names (like example.com) to IP addresses (like 93.184.216.34). Without DNS, users would need to remember numeric IP addresses.

## How DNS Resolution Works

1. **Browser cache**: The browser checks if it already has the IP cached.
2. **OS resolver cache**: The operating system checks its local cache.
3. **Recursive resolver**: The ISP's DNS resolver queries on your behalf.
4. **Root nameserver**: Directs to the appropriate top-level domain (TLD) server.
5. **TLD nameserver**: The .com, .org, etc. server directs to the authoritative nameserver.
6. **Authoritative nameserver**: Returns the final IP address for the domain.

## DNS Record Types

- **A Record**: Maps a domain to an IPv4 address.
- **AAAA Record**: Maps a domain to an IPv6 address.
- **CNAME**: Alias that points one domain to another domain.
- **MX**: Specifies mail servers for a domain.
- **TXT**: Stores arbitrary text, often used for verification and SPF records.

## DNS in System Design

DNS plays a critical role in load balancing (Round Robin DNS), failover (health-checked DNS), and geographic routing (GeoDNS). TTL (Time To Live) values control how long DNS records are cached.`,
    keyPoints: [
      'Translates domain names to IP addresses via a hierarchical lookup process',
      'DNS caching at multiple levels (browser, OS, resolver) reduces lookup latency',
      'TTL (Time To Live) controls how long DNS records are cached before re-querying',
      'Common record types: A, AAAA, CNAME, MX, TXT, NS',
      'DNS can be used for load balancing and geographic routing',
    ],
    realWorld: [
      'Cloudflare DNS (1.1.1.1) provides fast, privacy-focused DNS resolution globally',
      'AWS Route 53 uses health-checked DNS to route traffic away from failed endpoints',
      'Large CDNs use GeoDNS to direct users to the nearest edge server',
    ],
    interviewTips: [
      'Walk through the full DNS resolution process from browser to authoritative nameserver',
      'Discuss TTL trade-offs — low TTL enables fast failover but increases DNS query load',
      'Explain how DNS-based load balancing works and its limitations compared to a dedicated load balancer',
    ],
    relatedTopics: ['cdn', 'load-balancing', 'http-https-tls'],
  },
  {
    id: 'cdn',
    title: 'CDN (Content Delivery Network)',
    category: 'networking',
    difficulty: 1,
    summary:
      'A CDN is a geographically distributed network of servers that caches and delivers content from locations close to users, reducing latency and load on origin servers.',
    explanation: `## What is a CDN?

A Content Delivery Network is a system of distributed servers (edge nodes) deployed across many geographic locations. CDNs cache content closer to end users, reducing the distance data must travel and improving load times.

## How CDNs Work

1. A user requests a resource (image, script, page).
2. DNS routes the request to the nearest CDN edge server.
3. If the edge has the content cached (cache hit), it serves it directly.
4. If not (cache miss), the edge fetches it from the origin server, caches it, and serves it.

## Types of CDN Content

- **Static content**: Images, CSS, JavaScript, fonts, and videos that rarely change.
- **Dynamic content**: API responses and personalized pages can also benefit from edge computing and partial caching.

## CDN Benefits

- **Lower latency**: Content is served from servers geographically close to users.
- **Reduced origin load**: The origin server handles fewer requests since edges absorb most traffic.
- **DDoS protection**: CDNs can absorb volumetric attacks across their distributed infrastructure.
- **High availability**: If one edge node fails, traffic is routed to the next closest node.

## Cache Invalidation

CDNs use TTL headers and purge APIs to manage cached content freshness. Versioned URLs (e.g., \`style.v2.css\`) are a common strategy to force cache busting on deployments.`,
    keyPoints: [
      'Caches content at edge servers close to users to reduce latency',
      'Handles cache hits at the edge and fetches from origin on cache misses',
      'Reduces load on origin servers and provides DDoS protection',
      'Uses TTL and cache invalidation strategies to keep content fresh',
      'Supports both static assets and increasingly dynamic content at the edge',
    ],
    realWorld: [
      'Netflix uses its own CDN (Open Connect) to stream video from servers embedded in ISP networks',
      'Cloudflare CDN serves over 20% of all websites and provides DDoS protection',
      'Amazon CloudFront caches static and dynamic content at 400+ edge locations globally',
    ],
    interviewTips: [
      'Explain the difference between push CDN (origin pushes content) and pull CDN (edge pulls on demand)',
      'Discuss cache invalidation strategies — TTL, purge APIs, and versioned URLs',
      'Mention that CDNs can also run serverless functions at the edge for dynamic content',
    ],
    relatedTopics: ['caching-strategies', 'cdn-caching', 'dns'],
  },
  {
    id: 'http-https-tls',
    title: 'HTTP, HTTPS & TLS',
    category: 'networking',
    difficulty: 1,
    summary:
      'HTTP is the foundation of web communication. HTTPS adds encryption via TLS to protect data in transit, ensuring confidentiality, integrity, and authentication.',
    explanation: `## HTTP Basics

HTTP (HyperText Transfer Protocol) is the application-layer protocol that powers the web. It follows a request-response model where the client sends a request and the server returns a response.

## HTTP Versions

- **HTTP/1.1**: Text-based, one request per connection (without pipelining). Keep-alive reuses connections.
- **HTTP/2**: Binary framing, multiplexed streams, header compression (HPACK), and server push over a single connection.
- **HTTP/3**: Built on QUIC (UDP-based), eliminates head-of-line blocking at the transport layer and reduces connection setup time.

## HTTPS and TLS

HTTPS wraps HTTP inside a TLS (Transport Layer Security) connection. The TLS handshake establishes an encrypted channel:

1. **Client Hello**: Client sends supported cipher suites and a random number.
2. **Server Hello**: Server selects a cipher suite and sends its certificate.
3. **Certificate Verification**: Client verifies the server's certificate against trusted CAs.
4. **Key Exchange**: Both sides derive a shared session key for symmetric encryption.
5. **Encrypted Communication**: All subsequent data is encrypted with the session key.

## Why HTTPS Matters

HTTPS prevents eavesdropping, man-in-the-middle attacks, and data tampering. Modern browsers flag HTTP sites as "Not Secure," and search engines rank HTTPS sites higher.`,
    keyPoints: [
      'HTTP is a stateless request-response protocol that forms the foundation of web communication',
      'HTTP/2 introduces multiplexing and header compression; HTTP/3 uses QUIC over UDP',
      'TLS encrypts data in transit via a handshake that establishes a shared session key',
      'HTTPS prevents eavesdropping, MITM attacks, and data tampering',
      'Certificates from trusted CAs authenticate the server identity to the client',
    ],
    realWorld: [
      "Google Chrome marks all HTTP sites as 'Not Secure' to encourage HTTPS adoption",
      "Let's Encrypt provides free TLS certificates, enabling HTTPS for millions of sites",
      'Cloudflare offers automatic HTTPS and HTTP/3 support for sites on their network',
    ],
    interviewTips: [
      'Walk through the TLS handshake steps and explain symmetric vs. asymmetric encryption roles',
      'Compare HTTP/1.1 vs HTTP/2 vs HTTP/3 and the problems each version solves',
      'Explain what happens when a certificate expires or is revoked — how does the client know?',
    ],
    relatedTopics: ['rest-api', 'encryption', 'api-security'],
  },
];

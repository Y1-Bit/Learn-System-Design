import type { Topic } from '../../types';

export const securityTopics: Topic[] = [
  {
    id: 'authentication-oauth-jwt',
    title: 'Authentication, OAuth & JWT',
    category: 'security',
    difficulty: 2,
    summary:
      'Authentication verifies user identity. OAuth 2.0 delegates authorization via tokens, and JWTs (JSON Web Tokens) provide a stateless, self-contained way to carry identity claims.',
    explanation: `## Authentication vs Authorization

- **Authentication (AuthN)**: "Who are you?" — Verifying identity (username/password, biometrics, certificates).
- **Authorization (AuthZ)**: "What can you do?" — Determining permissions after identity is established.

## OAuth 2.0

OAuth 2.0 is an authorization framework that lets a third-party application access a user's resources without exposing their credentials.

**Flow (Authorization Code Grant)**:
1. User clicks "Login with Google."
2. App redirects to Google's authorization server.
3. User authenticates and grants permission.
4. Google redirects back with an authorization code.
5. App exchanges the code for an access token (server-to-server).
6. App uses the access token to call Google APIs on the user's behalf.

## JWT (JSON Web Tokens)

A JWT is a compact, self-contained token with three parts: Header, Payload, and Signature.

\`\`\`
eyJhbGciOiJIUzI1NiJ9.     // Header (algorithm)
eyJ1c2VyIjoiNDIiLCJyb2xlIjoiYWRtaW4ifQ.  // Payload (claims)
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  // Signature
\`\`\`

JWTs are stateless — the server does not need to store session data. The signature ensures the token has not been tampered with. However, JWTs cannot be revoked individually without additional infrastructure (blocklist).`,
    keyPoints: [
      'Authentication verifies identity; authorization determines permissions',
      'OAuth 2.0 enables delegated authorization without sharing user credentials',
      'JWTs are stateless, self-contained tokens with a header, payload, and signature',
      'JWTs eliminate the need for server-side session storage but cannot be easily revoked',
      'The Authorization Code flow with PKCE is the recommended OAuth grant for web and mobile apps',
      'Refresh tokens allow obtaining new access tokens without re-authentication',
    ],
    realWorld: [
      'Google, GitHub, and Facebook use OAuth 2.0 to let third-party apps access user data securely',
      'Auth0 and Okta provide identity-as-a-service platforms built on OAuth 2.0 and JWT',
      'Microservice architectures use JWTs to propagate authenticated user context between services',
    ],
    interviewTips: [
      'Walk through the OAuth 2.0 Authorization Code flow step by step',
      'Discuss JWT trade-offs — stateless and scalable but hard to revoke before expiration',
      'Explain the difference between access tokens (short-lived) and refresh tokens (long-lived)',
    ],
    relatedTopics: ['authorization-rbac', 'api-security', 'encryption'],
  },
  {
    id: 'authorization-rbac',
    title: 'Authorization & RBAC',
    category: 'security',
    difficulty: 2,
    summary:
      'Authorization controls what authenticated users can do. RBAC (Role-Based Access Control) assigns permissions to roles, and users are assigned roles.',
    explanation: `## What is Authorization?

After a user is authenticated (identity verified), authorization determines what actions they are permitted to perform. Authorization models define how permissions are structured and enforced.

## RBAC (Role-Based Access Control)

RBAC is the most widely used authorization model. Permissions are assigned to roles, and users are assigned one or more roles.

\`\`\`
Roles:
  admin  -> [create, read, update, delete, manage_users]
  editor -> [create, read, update]
  viewer -> [read]

Users:
  Alice -> admin
  Bob   -> editor
  Carol -> viewer
\`\`\`

## Other Authorization Models

- **ABAC (Attribute-Based)**: Decisions based on attributes of the user, resource, action, and environment. More flexible but more complex. Example: "Allow if user.department == resource.department AND time is business hours."
- **ACL (Access Control Lists)**: Each resource has a list of users and their permissions. Simple but hard to manage at scale.
- **ReBAC (Relationship-Based)**: Permissions based on relationships between entities. Used by Google Zanzibar for fine-grained access control.

## Best Practices

- Apply the **principle of least privilege** — grant only the minimum permissions needed.
- Centralize authorization logic instead of scattering permission checks throughout code.
- Audit and review permissions regularly to prevent privilege creep.
- Use deny-by-default — explicitly grant access rather than denying it.`,
    keyPoints: [
      'RBAC assigns permissions to roles, and users are assigned roles',
      'ABAC uses attributes (user, resource, environment) for fine-grained decisions',
      'Principle of least privilege: grant only the minimum permissions needed',
      'Centralize authorization logic to avoid inconsistent permission checks',
      'ReBAC (Google Zanzibar) models permissions based on entity relationships',
    ],
    realWorld: [
      'AWS IAM uses a combination of RBAC and policy-based access control for cloud resources',
      'Google Zanzibar powers authorization for Google Docs, Drive, and YouTube with ReBAC',
      'GitHub uses RBAC with roles like Owner, Maintainer, and Contributor for repository access',
    ],
    interviewTips: [
      'Compare RBAC vs ABAC and explain when each is more appropriate',
      'Discuss the principle of least privilege and why it matters for security',
      'Mention that authorization should be checked on every request, not just at login',
    ],
    relatedTopics: ['authentication-oauth-jwt', 'api-security', 'rate-limiting'],
  },
  {
    id: 'rate-limiting',
    title: 'Rate Limiting',
    category: 'security',
    difficulty: 2,
    summary:
      'Rate limiting controls the number of requests a client can make in a given time window, protecting services from abuse, DDoS attacks, and resource exhaustion.',
    explanation: `## Why Rate Limit?

Without rate limiting, a single client could overwhelm your service by sending too many requests, intentionally (DDoS attack) or accidentally (buggy client, retry storms). Rate limiting protects service availability for all users.

## Common Algorithms

### Token Bucket

A bucket holds tokens that are refilled at a fixed rate. Each request consumes a token. If the bucket is empty, the request is rejected. Allows short bursts up to the bucket capacity.

### Sliding Window

Tracks the number of requests in a rolling time window. Smoother than fixed windows and prevents burst-at-boundary attacks.

### Fixed Window Counter

Counts requests in fixed time intervals (e.g., 100 requests per minute). Simple but allows up to 2x the limit at window boundaries.

### Leaky Bucket

Requests enter a queue (bucket) and are processed at a fixed rate. Smooths out bursts but adds latency for queued requests.

## Implementation Strategies

- **Application level**: Middleware in your API server using an in-memory counter or Redis.
- **API Gateway**: Centralized rate limiting at the gateway layer (e.g., Kong, AWS API Gateway).
- **Distributed**: Use Redis or a similar shared store for rate limiting across multiple server instances.

## Response Handling

Return HTTP 429 (Too Many Requests) with headers indicating the limit, remaining quota, and when the limit resets.`,
    keyPoints: [
      'Protects services from abuse, DDoS attacks, and accidental overload',
      'Token bucket allows bursts; leaky bucket enforces a smooth, constant rate',
      'Sliding window prevents boundary-burst issues that fixed windows have',
      'HTTP 429 status code signals rate limit exceeded with retry-after information',
      'Distributed rate limiting requires a shared store like Redis across server instances',
    ],
    realWorld: [
      'GitHub API limits unauthenticated requests to 60/hour and authenticated to 5,000/hour',
      'Stripe uses rate limiting to protect their payment processing API from abuse',
      'Cloudflare provides rate limiting at the edge to block abusive traffic before it reaches origin servers',
    ],
    interviewTips: [
      'Compare token bucket vs sliding window vs leaky bucket with their trade-offs',
      'Discuss where to implement rate limiting — application, API gateway, or edge',
      'Mention that rate limiting should be per-user or per-API-key, not just per-IP',
    ],
    relatedTopics: ['api-security', 'load-balancing', 'redis-memcached'],
  },
  {
    id: 'encryption',
    title: 'Encryption',
    category: 'security',
    difficulty: 2,
    summary:
      'Encryption transforms data into an unreadable format using cryptographic algorithms, protecting data at rest and in transit from unauthorized access.',
    explanation: `## Why Encryption Matters

Encryption ensures that even if data is intercepted or stolen, it cannot be read without the decryption key. It is a fundamental building block of information security.

## Symmetric Encryption

Uses the same key for encryption and decryption. Fast and efficient for large data volumes.

- **AES-256**: Industry standard for encrypting data at rest. Used by governments and financial institutions.
- **Challenge**: How do you securely share the key between parties?

## Asymmetric Encryption

Uses a key pair — a public key (encrypt) and a private key (decrypt). Solves the key distribution problem but is slower than symmetric encryption.

- **RSA, ECDSA**: Used for key exchange, digital signatures, and TLS handshakes.
- **Pattern**: Use asymmetric encryption to exchange a symmetric key, then use the symmetric key for bulk data encryption (this is how TLS works).

## Encryption at Rest vs In Transit

- **At rest**: Data stored on disk is encrypted (database encryption, disk encryption, encrypted S3 buckets). Protects against physical theft and unauthorized access.
- **In transit**: Data moving over the network is encrypted (TLS/HTTPS). Protects against eavesdropping and man-in-the-middle attacks.

## Hashing

Hashing is a one-way function (not encryption) used for password storage and data integrity. Passwords should be hashed with bcrypt, scrypt, or Argon2 — never stored in plain text or encrypted symmetrically.`,
    keyPoints: [
      'Symmetric encryption (AES) uses one key — fast for bulk data encryption',
      'Asymmetric encryption (RSA) uses key pairs — solves key distribution but is slower',
      'TLS combines both: asymmetric for key exchange, symmetric for data transfer',
      'Encryption at rest protects stored data; encryption in transit protects network data',
      'Passwords must be hashed (bcrypt, Argon2), not encrypted — hashing is one-way',
      'Key management (rotation, storage, access control) is often harder than encryption itself',
    ],
    realWorld: [
      'AWS KMS (Key Management Service) handles encryption key management for S3, EBS, and RDS',
      'Signal uses end-to-end encryption so that only sender and receiver can read messages',
      'HashiCorp Vault manages encryption keys and secrets for applications in production',
    ],
    interviewTips: [
      'Explain the difference between symmetric and asymmetric encryption with use cases for each',
      'Discuss why passwords should be hashed (one-way) rather than encrypted (reversible)',
      'Mention key management as a critical concern — encryption is only as strong as key protection',
    ],
    relatedTopics: ['http-https-tls', 'authentication-oauth-jwt', 'api-security'],
  },
  {
    id: 'api-security',
    title: 'API Security',
    category: 'security',
    difficulty: 2,
    summary:
      'API security encompasses practices to protect APIs from attacks including input validation, authentication, rate limiting, CORS, and protection against common vulnerabilities.',
    explanation: `## Why API Security Matters

APIs are the primary attack surface for modern applications. Every public endpoint is a potential entry point for attackers. Securing APIs requires defense in depth across multiple layers.

## Common API Vulnerabilities

- **Injection attacks**: SQL injection, NoSQL injection, and command injection through unsanitized input.
- **Broken authentication**: Weak tokens, missing expiration, or improper session management.
- **Broken authorization**: Users accessing resources they should not have permission to access (IDOR — Insecure Direct Object Reference).
- **Mass assignment**: APIs accepting and persisting fields the client should not be able to set.
- **Excessive data exposure**: APIs returning more data than the client needs.

## Security Best Practices

### Input Validation

Validate and sanitize all input on the server side. Never trust client input.

\`\`\`
// Bad: directly using user input in a query
db.query("SELECT * FROM users WHERE id = " + req.params.id);

// Good: parameterized query
db.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
\`\`\`

### Transport Security

Always use HTTPS. Set security headers: \`Strict-Transport-Security\`, \`Content-Security-Policy\`, \`X-Content-Type-Options\`.

### CORS (Cross-Origin Resource Sharing)

Configure CORS to allow only trusted origins to call your API. Never use \`Access-Control-Allow-Origin: *\` for authenticated endpoints.

### API Keys and Tokens

Use API keys for identification and OAuth tokens for authorization. Rotate keys regularly and never expose them in client-side code or URLs.`,
    keyPoints: [
      'Always validate and sanitize input server-side — use parameterized queries to prevent injection',
      'Use HTTPS everywhere and set security headers (HSTS, CSP, X-Content-Type-Options)',
      'Configure CORS to allow only trusted origins for authenticated API endpoints',
      'Implement proper authentication and authorization on every endpoint',
      'Follow the OWASP API Security Top 10 for comprehensive threat coverage',
    ],
    realWorld: [
      'The OWASP API Security Top 10 is the industry standard for API security threat assessment',
      'Stripe requires TLS 1.2+, uses idempotency keys, and provides detailed security documentation',
      'GitHub uses HMAC signatures to verify webhook payloads have not been tampered with',
    ],
    interviewTips: [
      'Walk through the OWASP API Security Top 10 vulnerabilities with mitigation strategies',
      'Explain CORS and why misconfiguration is a common security vulnerability',
      'Discuss defense in depth — layering multiple security measures rather than relying on one',
    ],
    relatedTopics: ['authentication-oauth-jwt', 'rate-limiting', 'encryption'],
  },
];

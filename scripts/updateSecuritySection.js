const fs = require("fs");
const path = require("path");

const reportPath = path.join(__dirname, "..", "Ecommerce_Project_Report.md");
const source = fs.readFileSync(reportPath, "utf8");

const startMarker = "## 9. Security";
const endMarker = "## 10. Deployment Flow";

const startIdx = source.indexOf(startMarker);
const endIdx = source.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
  throw new Error("Could not locate security section boundaries");
}

const newSection = `## 9. Security Architecture & Implementation

This section outlines the backend security strategy that protects data integrity, confidentiality, and availability throughout the application. It summarises safeguards that are in place today and highlights priority hardening items.

### 9.1 Authentication & Authorization

| Aspect | Description |
| --- | --- |
| Mechanism | JSON Web Token (JWT) stateless authentication layered on Express middleware. |
| Token Structure | Header, payload, signature (HS256 via \`jsonwebtoken\`). |
| Storage | HTTP-only cookie set on successful login; mobile clients can fall back to secure storage. |
| Expiration | 24 hours (users re-authenticate to refresh). |
| Libraries | \`jsonwebtoken\`, \`bcrypt\`, \`dotenv\`, \`cookie-parser\`. |
| Hashing | Password hashing with \`bcrypt\` (12 salt rounds) — fix pending to assign the hashed value. |

Authentication flow:
1. **User signup:** request validated, password hashed in the Mongoose pre-save hook, user persisted.
2. **Login:** credentials verified (update to use \`bcrypt.compare\` instead of direct string comparison), JWT minted with \`{ data: user._id }\`.
3. **Protected routes:** \`protectRoute\` middleware verifies the token and attaches \`req.userId\`.
4. **Logout:** \`logoutHandler\` clears the auth cookie on the client.

Authorization rules:
- Role-based control via \`isAuthorized(['admin', 'ceo', 'sales'])\`; default roles include \`user\` and \`admin\`.
- Example: \`POST /api/product\` guarded by \`isAuthorized(authorizedProductRoles)\` so only elevated roles can create products.
- \`isAdmin\` middleware restricts \`GET /api/user\` to administrators.
- Denied requests emit 401/403 JSON responses with clear messaging.

### 9.2 Token Validation & Session Management

| Aspect | Details | Status |
| --- | --- | --- |
| Validation | \`protectRoute\` checks signature & expiry via try/catch. | Implemented |
| Refresh | Users re-login once the 24 h window elapses; refresh tokens not yet issued. | Planned |
| Revocation | Rotate \`SECRET_KEY\` and clear cookies to invalidate sessions. | Manual |
| Header | Optional \`Authorization: Bearer <token>\` support can complement cookies. | Planned |
| Error Handling | Invalid/expired tokens trigger 400/401 with descriptive JSON. | Implemented |

### 9.3 Password Security

| Technique | Implementation | Status |
| --- | --- | --- |
| Hashing Algorithm | \`bcrypt\` with 12 salt rounds inside the \`userModel\` pre-save hook. | In Progress (assignment fix pending) |
| Plaintext Storage | Passwords never logged or returned in API responses. | Implemented |
| Password Reset Flow | OTP stored on the user, expires after 5 minutes, emailed via nodemailer/sendgrid helper. | Implemented |
| Brute Force Protection | Global limiter throttles repeated login attempts; consider exponential back-off. | Implemented / Enhancing |

### 9.4 Secure API Access

| Measure | Purpose | Status |
| --- | --- | --- |
| CORS | \`cors({ origin: true, credentials: true })\` allows trusted origins with cookies. | Implemented |
| Helmet | Adds hardened HTTP headers (HSTS, X-Frame-Options, CSP). | Recommended |
| Rate Limiting | 100 requests / 15 min IP limiter blocks brute force & scraping. | Implemented |
| Compression | Add \`compression\` middleware for faster encrypted payload delivery. | Planned |
| HTTPS Enforcement | Terminate TLS 1.2+ at the load balancer / hosting layer. | Deployment Config |

### 9.5 Data Validation & Sanitization

| Tool / Middleware | Function | Status |
| --- | --- | --- |
| \`express-mongo-sanitize\` | Removes \`$\` and \`.\` to prevent NoSQL injection. | Implemented |
| \`checkInput\` middleware | Rejects empty payloads for create/update handlers. | Implemented |
| Mongoose validators | Enforce schema-level rules (length, enums, custom logic). | Implemented |
| \`validator\` / \`express-validator\` | Extend with robust email/URL/phone validation. | Recommended |

Example schema rule (recommended):

\`\`\`javascript
userSchema.path('email').validate((val) => validator.isEmail(val));
\`\`\`

### 9.6 Database Security

| Aspect | Details | Status |
| --- | --- | --- |
| Database | MongoDB via Mongoose (Atlas SRV or self-hosted). | Implemented |
| Connection Security | Use TLS-enabled connection strings; avoid local dev credentials in prod. | Recommended |
| Credential Storage | Secrets retrieved from \`.env\`; never hardcoded. | Implemented |
| Access Control | Provision least-privilege DB users per environment. | Recommended |
| Indexing | Add indexes on frequently queried fields to tighten scans. | Recommended |

Dynamic queries rely on sanitised inputs and Mongoose helpers to mitigate injection attempts.

### 9.7 Logging & Monitoring

| Tool | Purpose | Status |
| --- | --- | --- |
| Console middleware | Request method & path logged for quick tracing. | Implemented |
| \`morgan\` / \`winston\` | Structured HTTP/error logging with rotation. | Recommended |
| \`pm2\` or similar | Process monitoring and alerting. | Recommended |
| Log Levels | Adopt \`info\`, \`warn\`, \`error\`, \`debug\` once logging stack lands. | Planned |

Logs must exclude tokens, passwords, or other PII; capture timestamps and correlation IDs only.

### 9.8 Error Handling & Security Responses

- Centralised Express error middleware returns consistent JSON envelopes.
- Production responses conceal stack traces; internal logs retain detail for triage.
- Authorization failures return payloads such as \`{ "status": 401, "message": "You are not authorized to access this route" }\`.
- Reserve 5xx codes for server faults; 4xx for client-originated issues.

### 9.9 Input & File Upload Security

| Aspect | Implementation | Status |
| --- | --- | --- |
| File Uploads | No direct upload endpoints currently exposed. | N/A |
| File Size Limit | Cap uploads at 5 MB when feature is introduced. | Planned |
| Storage | Prefer cloud object storage (S3, etc.) with signed URLs. | Recommended |
| Executable Block | Reject \`.exe\`, \`.bat\`, \`.sh\`, and similar executable MIME types. | Planned |

Cross-site scripting protection depends on React's default escaping and sanitised inputs.

### 9.10 Cross-Site & Injection Attack Protection

| Attack Type | Prevention Mechanism | Status |
| --- | --- | --- |
| XSS | Input sanitisation plus React output encoding. | Implemented |
| CSRF | Same-site cookies today; introduce CSRF tokens for sensitive form actions. | Planned |
| SQL/NoSQL Injection | Parameterised Mongoose queries + sanitisation. | Implemented |
| Clickjacking | Add \`helmet.frameguard('deny')\` with Helmet package. | Recommended |
| Directory Traversal | No user-controlled filesystem paths exposed. | Implemented |
| DoS / Flooding | Rate limiting + upstream throttling (CDN/WAF). | Implemented / Recommended |

### 9.11 Secure Environment & Config Management

| Aspect | Best Practice |
| --- | --- |
| Environment Variables | Managed via \`.env\` per environment; excluded from version control. |
| Secrets Storage | Move long-lived secrets to CI/CD vaults (GitHub Actions, AWS Secrets Manager). |
| API Keys | Rotate regularly and scope to least privilege. |
| Build Config | Production builds disable verbose logging and detailed stack traces. |

### 9.12 Data Encryption & Privacy

| Data Type | Encryption Level |
| --- | --- |
| Passwords | Salted \`bcrypt\` hashes (no plaintext persistence). |
| Tokens | HS256-signed JWTs with secret kept outside the code base. |
| Transport Layer | Serve public endpoints behind HTTPS (TLS 1.2+). |
| Sensitive Fields | Optionally encrypt PII with AES-256 prior to storage (future enhancement). |

Support GDPR-style workflows by honouring deletion requests and keeping audit trails for privileged access.

### 9.13 API Rate Limiting & Abuse Prevention

| Middleware | Purpose | Status |
| --- | --- | --- |
| \`express-rate-limit\` | Caps IPs at 100 requests per 15 minutes (global). | Implemented |
| Login Attempt Tracking | Combined with auth responses to deter brute force. | Implemented |
| IP Whitelisting | Restrict admin tooling via reverse proxy/firewall rules. | Recommended |
| DDoS Mitigation | Layer CDN/WAF (Cloudflare, etc.) in front of the API. | Recommended |

### 9.14 Role-Based Access Control (RBAC)

Roles:
- **admin** – elevated privileges for user management and product CRUD.
- **user** – self-service actions (browse, bookings, reviews).
- **sales / ceo** – permitted to create or delete products via \`authorizedProductRoles\`.

Implementation helper:

\`\`\`javascript
const { isAuthorized } = require("../controllers/authController");

ProductRouter.post(
  "/",
  checkInput,
  protectRoute,
  isAuthorized(["admin", "ceo", "sales"]),
  createProducthandler
);
\`\`\`

Extend authorisation middleware to guard new routes and expand role definitions as capabilities grow.

### 9.15 Security Testing & Compliance

| Test Type | Purpose | Status |
| --- | --- | --- |
| Static Code Analysis | Detect vulnerable dependencies with \`npm audit\`. | Recommended |
| Penetration Testing | Manual + automated scans before production releases. | Recommended |
| OWASP Top 10 Review | Map endpoints against modern web threats. | In Progress |
| Dependency Checks | Automate \`npm audit\` in CI. | Planned |
| Security Audits | Quarterly review of logs, secrets, and RBAC policies. | Planned |

### Summary of Core Security Layers

| Layer | Mechanism | Outcome | Status |
| --- | --- | --- | --- |
| Authentication | JWT + \`bcrypt\` | Secure user identity verification. | Implemented (hash fix pending) |
| API Protection | CORS + rate limiting + planned Helmet | Mitigates abuse & common attacks. | Implemented / Planned |
| Data Integrity | Mongoose validation + sanitisation | Blocks injection and malformed payloads. | Implemented |
| Privacy | HTTPS + secret management | Protects sensitive data in transit & at rest. | Implemented / Planned |
| Monitoring | Logging + alerting | Detect anomalies quickly. | Planned |
`;

const updated = `${source.slice(0, startIdx)}${newSection}

${source.slice(endIdx)}`;
fs.writeFileSync(reportPath, updated);

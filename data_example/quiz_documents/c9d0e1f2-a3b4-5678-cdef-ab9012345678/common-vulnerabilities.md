# Common Web Vulnerabilities

## SQL Injection

SQL injection occurs when user-supplied input is interpolated directly into a SQL query, allowing an attacker to alter the query's logic.

### Vulnerable code

```python
# DANGEROUS — never do this
query = f"SELECT * FROM users WHERE username = '{username}'"
```

An attacker can supply `' OR '1'='1` to bypass authentication.

### Mitigation

Use **parameterised queries** (prepared statements):

```python
# Safe
cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
```

## Cross-Site Scripting (XSS)

XSS injects malicious scripts into pages viewed by other users.

| Type | How it works |
|------|-------------|
| **Reflected** | Payload in URL/request, reflected in response |
| **Stored** | Payload stored in DB, served to all visitors |
| **DOM-based** | Payload processed by client-side JS |

### Mitigation
- **Escape** user content before inserting into HTML
- Use a **Content Security Policy** (CSP) header
- Prefer frameworks that auto-escape (React, Vue)

## Cross-Site Request Forgery (CSRF)

Tricks an authenticated user's browser into sending unintended requests to a site where they are logged in.

### Mitigation
- **CSRF tokens** — unique, unpredictable token per form/session
- **SameSite cookie attribute** — prevents cross-origin cookie sending
- Check `Origin` / `Referer` headers on state-changing requests

## Insecure Direct Object References (IDOR)

Exposing internal object IDs in URLs allows attackers to access other users' resources by guessing IDs.

```
GET /api/documents/1234   # attacker changes to /api/documents/1235
```

### Mitigation
- Authorise every request server-side
- Use opaque identifiers (UUIDs) instead of sequential integers
- Never rely on client-supplied IDs for access control decisions

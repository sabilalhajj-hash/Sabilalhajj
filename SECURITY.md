# Security overview – Sabil project

## What is SQL injection?

**SQL injection** is when an attacker sends **user input that is pasted directly into a SQL query string**. The app then runs that string as SQL, so the attacker can change the meaning of the query.

**Example of vulnerable code (do NOT do this):**
```js
// BAD: concatenating user input into SQL
const email = request.body.email;  // attacker sends: ' OR '1'='1
const query = `SELECT * FROM users WHERE email = '${email}'`;
// Result: SELECT * FROM users WHERE email = '' OR '1'='1'  → returns everyone!
```

**Why your project is safe from SQL injection (for current code):**

- You use **Drizzle ORM** and pass values as **parameters**, not as raw strings in SQL.
- Example in `src/lib/db/bookings.ts`: `like(users.email, searchPattern)` and `sql\`... ilike ${searchPattern}\`` — Drizzle binds `searchPattern` as a parameter, so it is not executed as SQL.
- All other DB access uses Drizzle’s `eq()`, `where()`, `.values()`, etc., which are parameterized.

**Takeaway:** Avoid building SQL with string concatenation or template literals that include user input. Using an ORM (Drizzle) with parameters is the right approach.

---

## Security findings in this project

### Critical

1. **Password hashing (fixed in code)**
   - **Issue:** Passwords were hashed with **SHA-256 and no salt**. SHA-256 is fast and deterministic, so same password ⇒ same hash. Attackers can use rainbow tables or brute force.
   - **Fix:** Use **bcrypt** (or Argon2) with a salt. The codebase has been updated to use `bcryptjs` for hashing and verification.
   - **Action for you:** `bcryptjs` is already installed. The code still accepts old SHA-256 hashes so existing users can log in. New and reset passwords are stored with bcrypt. Optionally, on successful login with a legacy hash, re-hash the password with bcrypt and update the user in the DB so all passwords eventually use bcrypt.

### High

2. **Promote-admin endpoint**
   - **Issue:** `/api/auth/promote-admin` uses a secret from env (`ADMIN_PROMOTE_SECRET`). If the secret is weak or leaked, anyone who gets it can promote any user to admin. No rate limiting on this endpoint specifically.
   - **Recommendation:** Use a long, random secret (e.g. `openssl rand -base64 32`). Consider rate limiting this route (e.g. by IP) to slow down brute force.

3. **CSRF check in middleware**
   - **Issue:** CSRF is implemented as `origin.includes(host)`. A malicious site could use a hostname that *contains* yours (e.g. `yoursite.com.evil.com`) and pass the check.
   - **Recommendation:** Compare origins properly: parse `origin` and `request.url`, then compare `originHost === requestHost` (exact match).

### Medium

4. **Rate limiting**
   - **Issue:** Rate limiting is in-memory. It resets on server restart and does not work across multiple instances.
   - **Recommendation:** For production with multiple instances, use Redis (or similar) for rate limit state.

5. **File upload**
   - **Issue:** File type is checked only via `file.type` (MIME from client). This can be spoofed. If the server ever executes uploaded files or serves them with wrong headers, risk increases.
   - **Recommendation:** Validate file content (magic bytes) for allowed image types. Restrict file extension to a safe list (e.g. `.jpg`, `.png`, `.webp`, `.gif`) and store under a directory that is never executed.

6. **Guest booking**
   - **Issue:** Guest bookings only require “name/email + phone or email”. There is no email verification, so fake or abusive bookings are easier.
   - **Recommendation:** Optional: add email verification or captcha for guest bookings to reduce abuse.

### Low / informational

7. **JWT in cookie**
   - **Good:** Cookie is `HttpOnly`, `SameSite=Lax`, and `Secure` in production, which reduces XSS and CSRF impact.

8. **Admin checks**
   - **Good:** Admin routes use `requireAdmin`, which verifies JWT and then **re-checks role in the database**, so promoting a user to admin takes effect without re-login.

9. **XSS**
   - **Good:** No `dangerouslySetInnerHTML` or raw `innerHTML` with user content was found; React’s default escaping helps.

10. **Sensitive env vars**
    - **Good:** `JWT_SECRET`, `DATABASE_URL`, `ADMIN_PROMOTE_SECRET`, Google credentials are server-only (not `NEXT_PUBLIC_*`). Keep them out of client bundles and version control.

---

## Quick checklist

- [x] SQL injection: mitigated by Drizzle (parameterized queries).
- [x] Passwords: use bcrypt (implemented); ensure `bcryptjs` is installed and existing users are handled (reset or migration).
- [ ] Promote-admin: strong secret + optional rate limit.
- [ ] CSRF: strict origin check (exact host match).
- [ ] Rate limiting: move to Redis (or similar) for production if you scale.
- [ ] Uploads: validate by magic bytes and restrict extensions.
- [x] Auth: JWT + DB role check; HttpOnly cookie.

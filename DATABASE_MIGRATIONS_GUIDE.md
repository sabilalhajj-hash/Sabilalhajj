# Database Migrations - Best Practices

## ❌ Don't Add to Vercel Build

**You should NOT add `db:generate` or `db:push` to Vercel build commands.**

### Why Not?

1. **`db:generate`** - Generates migration files
   - Should only run **locally** when you change your schema
   - Creates files that should be **committed to git**
   - Not needed during deployment

2. **`db:push`** - Pushes schema directly to database
   - Requires database access during build
   - Can slow down deployments
   - Better to run **manually** when needed
   - You want control over when migrations run

---

## ✅ Correct Approach

### For Initial Setup (First Time)

**Run locally, pointing to your production database:**

1. **Update your local `.env`** with Neon connection string:
   ```env
   DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

2. **Push schema to production database:**
   ```bash
   npm run db:push
   ```

3. **Verify tables exist:**
   - Go to Neon Dashboard → SQL Editor
   - Run: `SELECT * FROM users LIMIT 1;`

### For Schema Changes (Later)

**When you modify your schema:**

1. **Make changes** to `src/lib/db/schema.ts`

2. **Generate migration** (locally):
   ```bash
   npm run db:generate
   ```
   - This creates migration files in `drizzle/` folder
   - **Commit these files to git**

3. **Push to production** (locally, pointing to Neon):
   ```bash
   # Make sure .env has Neon DATABASE_URL
   npm run db:push
   ```

4. **Deploy code** to Vercel (normal deployment)

---

## 📋 Workflow Summary

### Initial Database Setup:
```bash
# 1. Update .env with Neon URL
DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require

# 2. Push schema to production
npm run db:push

# 3. Verify in Neon dashboard
```

### When Schema Changes:
```bash
# 1. Modify schema.ts
# 2. Generate migration
npm run db:generate

# 3. Commit migration files to git
git add drizzle/
git commit -m "Add migration for schema changes"

# 4. Push to production database
npm run db:push  # (with Neon URL in .env)

# 5. Deploy code to Vercel
git push
```

---

## 🎯 What Vercel Should Do

**Vercel build commands should only:**
- Install dependencies: `npm install`
- Build your app: `npm run build`
- Start server: `npm start` (automatic)

**Vercel should NOT:**
- ❌ Run database migrations
- ❌ Generate migration files
- ❌ Push schema to database

---

## 🔧 Alternative: Migration Script (Advanced)

If you really want to automate migrations, you could create a separate script, but it's **not recommended** for production.

**Better approach**: Run migrations manually before/after deployments.

---

## ✅ Recommended Setup

### Your Current Setup (Correct):
- ✅ Vercel builds and deploys your code
- ✅ You run migrations manually from your local machine
- ✅ Database connection string is in Vercel environment variables

### What You Need to Do:

1. **Set up production database** (one time):
   ```bash
   # Update .env with Neon URL
   npm run db:push
   ```

2. **Add environment variables to Vercel:**
   - `DATABASE_URL` = Your Neon connection string
   - `JWT_SECRET` = Your secret
   - `NEXT_PUBLIC_APP_URL` = `https://sabilalhajj.com`
   - `NEXT_PUBLIC_BASE_URL` = `https://sabilalhajj.com`

3. **Deploy to Vercel** (normal deployment)

4. **Create a user** through your website registration

---

## 🚨 Important Notes

1. **Never commit `.env` file** - It's already in `.gitignore` ✅

2. **Keep production DATABASE_URL secure** - Only in Vercel environment variables

3. **Run migrations from local machine** - Point to production database when needed

4. **Test migrations locally first** - Before applying to production

---

## 📝 Quick Reference

| Command | When to Use | Where to Run |
|---------|-------------|--------------|
| `npm run db:generate` | When schema changes | **Local only** |
| `npm run db:push` | To create/update tables | **Local** (pointing to production DB) |
| `npm run db:migrate` | To run migration files | **Local** (pointing to production DB) |
| `npm run db:studio` | To view database | **Local** (pointing to production DB) |

---

## 🎯 Summary

**Answer: NO, don't add to Vercel.**

- Run `db:push` **locally** with your Neon database URL
- Let Vercel just build and deploy your code
- Keep database operations separate from deployments

This gives you:
- ✅ Better control
- ✅ Faster deployments
- ✅ Ability to test migrations before applying
- ✅ Clear separation of concerns

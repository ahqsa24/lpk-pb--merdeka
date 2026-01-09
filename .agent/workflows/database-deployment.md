---
description: Database Deployment to Production (PlanetScale)
---

# Database Deployment Implementation Plan

## Overview
Deploy MySQL database dari localhost ke PlanetScale untuk production deployment di Vercel. Termasuk migration data existing dan setup environment variables.

## Prerequisites
- ✅ Vercel account (sudah ada)
- ✅ GitHub account
- ✅ Node.js 18+
- ✅ Prisma CLI installed
- ✅ Data backup dari database lokal

## Platform Comparison

### Option 1: PlanetScale (Recommended) ⭐⭐⭐⭐⭐

**Pros:**
- ✅ 5GB storage gratis
- ✅ 1 billion row reads/month
- ✅ 10 million row writes/month
- ✅ Serverless, auto-scaling
- ✅ Branching (Git-like untuk database)
- ✅ Automatic backups
- ✅ Global edge network
- ✅ **Tidak perlu kartu kredit**

**Cons:**
- ⚠️ No foreign key constraints (Prisma handles this)
- ⚠️ Perlu `relationMode = "prisma"` di schema

**Best for:** Production apps dengan traffic medium-high

### Option 2: Railway

**Pros:**
- ✅ $5 credit/month gratis
- ✅ Full MySQL support
- ✅ Easy setup
- ✅ Includes Redis, PostgreSQL

**Cons:**
- ⚠️ Credit bisa habis jika traffic tinggi
- ⚠️ 1GB storage limit

**Best for:** Small projects, prototypes

### Option 3: Supabase

**Pros:**
- ✅ 500MB database gratis
- ✅ Includes Auth, Storage, Realtime
- ✅ Generous free tier

**Cons:**
- ❌ PostgreSQL (bukan MySQL)
- ⚠️ Perlu migrate schema

**Best for:** New projects, PostgreSQL users

## Phase 1: Setup PlanetScale

### 1.1 Create Account
```bash
# 1. Buka https://planetscale.com
# 2. Click "Sign up"
# 3. Sign up dengan GitHub
# 4. Verify email
# 5. Complete onboarding
```

### 1.2 Install PlanetScale CLI (Optional)
```bash
# Windows (PowerShell)
scoop install planetscale

# Or download from:
# https://github.com/planetscale/cli/releases

# Verify installation
pscale version
```

### 1.3 Login to PlanetScale
```bash
# Via CLI
pscale auth login

# Or use Web UI
# https://app.planetscale.com
```

## Phase 2: Create Database

### 2.1 Create Database via Web UI

**Steps:**
1. Login ke PlanetScale Dashboard
2. Click "Create a database"
3. Database name: `lpk-merdeka`
4. Region: `AWS ap-southeast-1` (Singapore - closest to Indonesia)
5. Plan: Free (Hobby)
6. Click "Create database"

### 2.2 Create Database via CLI (Alternative)
```bash
# Create database
pscale database create lpk-merdeka --region ap-southeast

# List databases
pscale database list

# Show database info
pscale database show lpk-merdeka
```

### 2.3 Create Branch
```bash
# PlanetScale uses branches like Git
# Default branch: "main"

# Create development branch (optional)
pscale branch create lpk-merdeka development

# List branches
pscale branch list lpk-merdeka
```

## Phase 3: Update Prisma Configuration

### 3.1 Update Prisma Schema
```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma" // IMPORTANT: Required for PlanetScale!
}

// Rest of your models...
```

**Important Changes:**
- Add `relationMode = "prisma"` - PlanetScale doesn't support foreign keys at database level
- Prisma will handle referential integrity in application code

### 3.2 Update Foreign Key Constraints
```prisma
// Before (with onDelete/onUpdate at DB level):
model AttendanceRecord {
  id         String   @id @default(cuid())
  session_id String
  user_id    String
  
  session AttendanceSession @relation(fields: [session_id], references: [id], onDelete: Cascade)
  users   User              @relation(fields: [user_id], references: [id], onDelete: Cascade)
}

// After (for PlanetScale):
model AttendanceRecord {
  id         String   @id @default(cuid())
  session_id String
  user_id    String
  
  session AttendanceSession @relation(fields: [session_id], references: [id])
  users   User              @relation(fields: [user_id], references: [id])
  
  @@index([session_id])
  @@index([user_id])
}
```

**Note:** Remove `onDelete: Cascade` and `onUpdate` - Prisma will handle this.

## Phase 4: Get Connection String

### 4.1 Via Web UI (Recommended)
```
1. Go to PlanetScale Dashboard
2. Select "lpk-merdeka" database
3. Click "Connect"
4. Select "Prisma" from framework dropdown
5. Copy the connection string
6. Format: mysql://username:password@host/lpk-merdeka?sslaccept=strict
```

### 4.2 Via CLI
```bash
# Get connection string
pscale connect lpk-merdeka main --execute "SELECT 1"

# Or create password
pscale password create lpk-merdeka main password-name

# Copy the connection string shown
```

### 4.3 Connection String Format
```env
# PlanetScale connection string format:
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/lpk-merdeka?sslaccept=strict"

# Example:
DATABASE_URL="mysql://abc123:pscale_pw_xyz789@aws.connect.psdb.cloud/lpk-merdeka?sslaccept=strict"
```

## Phase 5: Local Testing

### 5.1 Update Local .env
```env
# .env (local)

# Comment out old local database
# DATABASE_URL="mysql://root:password@localhost:3306/lpk_backpanel"

# Add PlanetScale connection
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/lpk-merdeka?sslaccept=strict"
```

### 5.2 Generate Prisma Client
```bash
# Regenerate Prisma Client with new schema
npx prisma generate
```

### 5.3 Push Schema to PlanetScale
```bash
# Push schema (no migration files needed for PlanetScale)
npx prisma db push

# Confirm when prompted
# This will create all tables in PlanetScale
```

### 5.4 Verify Schema
```bash
# Check if tables created
pscale shell lpk-merdeka main

# In PlanetScale shell:
SHOW TABLES;
DESCRIBE users;
EXIT;
```

## Phase 6: Data Migration

### 6.1 Export Data from Local Database
```bash
# Option 1: Using mysqldump
mysqldump -u root -p lpk_backpanel > backup.sql

# Option 2: Using Prisma Studio
npx prisma studio
# Manually export data as needed
```

### 6.2 Clean SQL for PlanetScale
```bash
# Remove foreign key constraints from backup.sql
# PlanetScale doesn't support them

# Edit backup.sql:
# Remove lines with:
# - CONSTRAINT
# - FOREIGN KEY
# - REFERENCES
# - ON DELETE CASCADE
# - ON UPDATE CASCADE
```

### 6.3 Import Data to PlanetScale

**Option A: Via PlanetScale CLI**
```bash
# Connect to database
pscale shell lpk-merdeka main

# Import SQL file
SOURCE backup.sql;

# Or import directly
pscale shell lpk-merdeka main < backup.sql
```

**Option B: Via Prisma Seed Script**
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create users
  await prisma.user.createMany({
    data: [
      {
        id: "existing-user-id",
        name: "Admin User",
        email: "admin@lpkmerdeka.com",
        password: "hashed-password",
        role: "superAdmin",
      },
      // ... more users
    ],
    skipDuplicates: true,
  })

  // Create other data...
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

```bash
# Run seed
npx prisma db seed
```

### 6.4 Verify Data
```bash
# Check data imported correctly
pscale shell lpk-merdeka main

# Count records
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM cms_articles;
SELECT COUNT(*) FROM attendance_sessions;

EXIT;
```

## Phase 7: Configure Vercel

### 7.1 Add Environment Variable
```bash
# Via Vercel Dashboard:
1. Go to https://vercel.com/dashboard
2. Select your project "lpk-merdeka"
3. Go to Settings > Environment Variables
4. Click "Add New"
5. Key: DATABASE_URL
6. Value: (paste PlanetScale connection string)
7. Environment: Production, Preview, Development (select all)
8. Click "Save"
```

### 7.2 Add Build Command (if needed)
```json
// package.json
{
  "scripts": {
    "build": "npx prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

### 7.3 Update vercel.json (Optional)
```json
{
  "build": {
    "env": {
      "PRISMA_GENERATE_SKIP_AUTOINSTALL": "true"
    }
  }
}
```

## Phase 8: Deploy to Vercel

### 8.1 Commit Changes
```bash
# Add updated files
git add prisma/schema.prisma
git add package.json
git add .env.example  # Don't commit .env!

# Commit
git commit -m "feat: configure PlanetScale database for production"

# Push
git push origin master
```

### 8.2 Trigger Deployment
```bash
# Vercel will auto-deploy on push
# Or manually trigger:
vercel --prod

# Or via Vercel Dashboard:
# Deployments > Redeploy
```

### 8.3 Monitor Deployment
```bash
# Check deployment logs
vercel logs

# Or via Dashboard:
# Deployments > [latest] > View Function Logs
```

## Phase 9: Verification & Testing

### 9.1 Test Database Connection
```bash
# Test API endpoint
curl https://lpk-merdeka.vercel.app/api/user

# Should return data, not error
```

### 9.2 Test CRUD Operations
```
1. Go to https://lpk-merdeka.vercel.app/auth/login
2. Login dengan user yang sudah di-import
3. Test create, read, update, delete
4. Check data di PlanetScale Dashboard
```

### 9.3 Monitor Performance
```
1. PlanetScale Dashboard > Insights
2. Check query performance
3. Monitor slow queries
4. Check connection count
```

## Phase 10: Optimization

### 10.1 Enable Connection Pooling
```env
# Update DATABASE_URL with connection pooling
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/lpk-merdeka?sslaccept=strict&connection_limit=10"
```

### 10.2 Add Prisma Accelerate (Optional, Paid)
```bash
# For better performance
npm install @prisma/extension-accelerate

# Update Prisma Client
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())
```

### 10.3 Add Indexes
```prisma
// Add indexes for frequently queried fields
model User {
  id    String @id @default(cuid())
  email String @unique
  name  String
  
  @@index([email])
  @@index([created_at])
}
```

## Troubleshooting

### Issue 1: "Can't reach database server"
```bash
# Check connection string
echo $DATABASE_URL

# Verify PlanetScale database is running
pscale database show lpk-merdeka

# Test connection
pscale connect lpk-merdeka main --execute "SELECT 1"
```

### Issue 2: "Foreign key constraint failed"
```prisma
// Make sure relationMode is set
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma" // This is required!
}
```

### Issue 3: "SSL connection error"
```env
# Add sslaccept parameter
DATABASE_URL="mysql://...?sslaccept=strict"

# Or use sslmode
DATABASE_URL="mysql://...?sslmode=require"
```

### Issue 4: "Too many connections"
```env
# Reduce connection limit
DATABASE_URL="mysql://...?connection_limit=5"

# Or use connection pooling
DATABASE_URL="mysql://...?pool_timeout=10&connection_limit=10"
```

### Issue 5: "Migration failed on Vercel"
```bash
# Don't use prisma migrate in production
# Use prisma db push instead

# Update build command
"build": "npx prisma db push --accept-data-loss && next build"

# Or push manually before deploy
npx prisma db push
git push
```

## Rollback Plan

### If Something Goes Wrong:

**Option 1: Rollback Vercel Deployment**
```bash
# Via Dashboard:
1. Go to Deployments
2. Find previous working deployment
3. Click "..." > "Promote to Production"

# Via CLI:
vercel rollback
```

**Option 2: Restore Database**
```bash
# PlanetScale has automatic backups
1. Go to PlanetScale Dashboard
2. Select database
3. Go to "Backups"
4. Select backup point
5. Click "Restore"
```

**Option 3: Switch Back to Local**
```env
# Update Vercel environment variable
DATABASE_URL="your-old-connection-string"

# Redeploy
vercel --prod
```

## Monitoring & Maintenance

### Daily Checks
- [ ] Check PlanetScale Dashboard for errors
- [ ] Monitor query performance
- [ ] Check connection count
- [ ] Review slow query log

### Weekly Tasks
- [ ] Review database size (5GB limit)
- [ ] Check backup status
- [ ] Optimize slow queries
- [ ] Update indexes if needed

### Monthly Tasks
- [ ] Review and clean old data
- [ ] Analyze query patterns
- [ ] Plan for scaling if needed
- [ ] Update Prisma dependencies

## Cost Estimation

### Free Tier Limits (PlanetScale Hobby)
- Storage: 5GB
- Row reads: 1 billion/month
- Row writes: 10 million/month
- Branches: 1 production + 1 development

### When to Upgrade?
- Storage > 4GB (80% of limit)
- Reads > 800 million/month
- Writes > 8 million/month
- Need more branches

### Paid Plan (Scaler)
- $29/month
- 10GB storage
- 100 billion row reads
- 50 million row writes
- Unlimited branches

## Timeline

- **Phase 1-2**: 30 menit (Setup account & create database)
- **Phase 3**: 15 menit (Update Prisma schema)
- **Phase 4**: 10 menit (Get connection string)
- **Phase 5**: 20 menit (Local testing)
- **Phase 6**: 30-60 menit (Data migration)
- **Phase 7**: 15 menit (Configure Vercel)
- **Phase 8**: 10 menit (Deploy)
- **Phase 9**: 20 menit (Testing)
- **Phase 10**: 30 menit (Optimization)

**Total**: 3-4 jam

## Resources

- [PlanetScale Documentation](https://planetscale.com/docs)
- [Prisma + PlanetScale Guide](https://www.prisma.io/docs/guides/database/planetscale)
- [PlanetScale CLI Reference](https://planetscale.com/docs/reference/planetscale-cli)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Checklist

### Pre-deployment
- [ ] Backup local database
- [ ] Update Prisma schema with `relationMode = "prisma"`
- [ ] Remove foreign key constraints
- [ ] Test locally with PlanetScale connection
- [ ] Verify all data migrated

### Deployment
- [ ] Create PlanetScale database
- [ ] Get connection string
- [ ] Add to Vercel environment variables
- [ ] Push Prisma schema
- [ ] Import data
- [ ] Deploy to Vercel
- [ ] Test all endpoints

### Post-deployment
- [ ] Verify database connection
- [ ] Test CRUD operations
- [ ] Monitor performance
- [ ] Setup alerts
- [ ] Document connection details (securely)

## Notes

1. **Never commit `.env` file** - Use `.env.example` instead
2. **Use `relationMode = "prisma"`** - Required for PlanetScale
3. **Don't use `prisma migrate`** - Use `prisma db push` for PlanetScale
4. **Backup before migration** - Always have a backup plan
5. **Test thoroughly** - Test all features after deployment
6. **Monitor usage** - Keep eye on free tier limits
7. **Use branches** - Create development branch for testing
8. **Connection pooling** - Important for serverless (Vercel)

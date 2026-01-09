---
description: Better Auth Implementation Plan
---

# Better Auth Implementation Plan

## Better Auth vs JWT: Perbandingan Lengkap

### 📊 Tabel Perbandingan

| Aspek | Better Auth (Session-based) | JWT (Current) | Pemenang |
|-------|----------------------------|---------------|----------|
| **Keamanan** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Better Auth |
| **Kemudahan Implementasi** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | JWT |
| **Fitur Built-in** | ⭐⭐⭐⭐⭐ | ⭐⭐ | Better Auth |
| **Performance** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | JWT |
| **Scalability** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | JWT |
| **Session Control** | ⭐⭐⭐⭐⭐ | ⭐⭐ | Better Auth |
| **Mobile Support** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | JWT |

### 🔐 Keamanan

**Better Auth:**
- ✅ **Session Revocation**: Bisa langsung logout user dari server
- ✅ **CSRF Protection**: Built-in protection
- ✅ **Secure Cookies**: HttpOnly, Secure, SameSite
- ✅ **Token Rotation**: Automatic refresh token rotation
- ✅ **IP Tracking**: Detect suspicious login locations
- ⚠️ **Database Dependency**: Perlu query DB setiap request

**JWT (Current):**
- ✅ **Stateless**: Tidak perlu database query
- ✅ **Simple**: Easy to implement
- ❌ **No Revocation**: Tidak bisa logout paksa user
- ❌ **Token Lifetime**: Jika token dicuri, valid sampai expired
- ❌ **No CSRF Protection**: Perlu implementasi manual
- ❌ **XSS Vulnerable**: Jika disimpan di localStorage

**Verdict**: **Better Auth menang** untuk keamanan. Session-based auth lebih aman karena bisa di-revoke kapan saja.

### ⚡ Performance & Scalability

**Better Auth:**
- ⚠️ **Database Query**: Setiap request perlu cek session di DB
- ✅ **Redis Cache**: Bisa di-cache untuk performance
- ⚠️ **Horizontal Scaling**: Perlu shared session store
- ✅ **Connection Pooling**: Optimasi dengan connection pool

**JWT:**
- ✅ **No Database**: Stateless, tidak perlu DB query
- ✅ **Fast**: Hanya verify signature
- ✅ **Easy Scaling**: Horizontal scaling mudah
- ✅ **CDN Friendly**: Bisa di-cache di edge

**Verdict**: **JWT menang** untuk performance murni, tapi Better Auth bisa di-optimize dengan Redis.

### 🎯 Fitur Built-in

**Better Auth:**
- ✅ Email Verification
- ✅ Password Reset
- ✅ OAuth (Google, GitHub, dll)
- ✅ Two-Factor Authentication
- ✅ Magic Link Login
- ✅ Session Management UI
- ✅ Rate Limiting
- ✅ Account Linking

**JWT (Current):**
- ❌ Perlu implementasi manual semua fitur
- ❌ No email verification
- ❌ No password reset
- ❌ No OAuth
- ❌ No 2FA

**Verdict**: **Better Auth menang telak**. Hemat waktu development 70%.

### 💻 Developer Experience

**Better Auth:**
```typescript
// Login - 1 line
await signIn.email({ email, password })

// Logout - 1 line
await signOut()

// Get user - 1 hook
const { data: session } = useSession()
```

**JWT:**
```typescript
// Login - custom implementation
const res = await fetch('/api/auth/login', { ... })
const { token } = await res.json()
localStorage.setItem('token', token)

// Logout - manual cleanup
localStorage.removeItem('token')
router.push('/login')

// Get user - custom hook + API call
const { user } = useAuth()
```

**Verdict**: **Better Auth menang** untuk DX. Lebih clean dan maintainable.

### 📱 Mobile & Cross-Platform

**Better Auth:**
- ✅ Web (cookies)
- ✅ Mobile (secure storage)
- ⚠️ Perlu handling khusus untuk mobile apps

**JWT:**
- ✅ Web (localStorage/cookies)
- ✅ Mobile (native storage)
- ✅ Universal - works everywhere

**Verdict**: **JWT lebih fleksibel** untuk cross-platform.

### 💰 Cost Consideration

**Better Auth:**
- 💵 Email Service: ~$10-20/bulan (Resend/SendGrid)
- 💵 Database: Existing MySQL (no extra cost)
- 💵 Redis (optional): ~$10/bulan untuk caching

**JWT:**
- ✅ Free - no additional services needed

**Verdict**: **JWT lebih murah**, tapi Better Auth cost-nya reasonable.

### 🎯 Use Case Recommendations

**Gunakan Better Auth jika:**
- ✅ Butuh email verification
- ✅ Butuh password reset
- ✅ Butuh OAuth (Google, etc)
- ✅ Butuh 2FA
- ✅ Keamanan prioritas utama
- ✅ Web application (bukan mobile-first)
- ✅ Mau hemat waktu development

**Gunakan JWT jika:**
- ✅ Butuh performance maksimal
- ✅ Microservices architecture
- ✅ Mobile-first application
- ✅ Stateless requirement
- ✅ Budget sangat terbatas
- ✅ Simple authentication cukup

### 🏆 Kesimpulan: Mana yang Lebih Baik?

**Untuk Proyek LPK Merdeka: Better Auth adalah pilihan yang lebih baik**

**Alasan:**
1. **Keamanan Lebih Baik**: Session revocation, CSRF protection
2. **Fitur Lengkap**: Email verification, password reset, OAuth sudah built-in
3. **Hemat Waktu**: Tidak perlu implement semua fitur dari nol
4. **User Experience**: Fitur modern seperti "Login with Google"
5. **Maintainability**: Code lebih clean dan mudah di-maintain
6. **Future-proof**: Mudah tambah fitur baru (2FA, magic link)

**Trade-offs yang Acceptable:**
- Sedikit lebih lambat (tapi bisa di-cache)
- Perlu email service (cost minimal)
- Database dependency (sudah ada MySQL)

### 📈 Migration Path

Jika khawatir dengan migration, bisa **hybrid approach**:
1. Implement Better Auth untuk user baru
2. Keep JWT untuk user existing
3. Gradual migration dengan feature flag
4. Monitor performance dan user feedback

## Overview
Migrasi dari sistem autentikasi custom JWT ke Better Auth dengan fitur-fitur modern seperti email verification, password reset, OAuth (Google), dan session management yang lebih robust.

## Prerequisites
- Node.js 18+
- Database MySQL (existing)
- Email service provider (Resend/Nodemailer)
- Google OAuth credentials

## Phase 1: Setup & Configuration

### 1.1 Install Dependencies
```bash
npm install better-auth
npm install @better-auth/prisma
npm install resend # untuk email service
```

### 1.2 Environment Variables
Tambahkan ke `.env`:
```env
# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here" # generate dengan: openssl rand -base64 32
BETTER_AUTH_URL="http://localhost:3000"

# Email Service (Resend)
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="noreply@lpkmerdeka.com"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 1.3 Better Auth Configuration
Buat file `src/lib/auth.ts`:
```typescript
import { betterAuth } from "better-auth"
import { prismaAdapter } from "@better-auth/prisma"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql"
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      // Implementasi email sending
    },
  },
})
```

## Phase 2: Database Migration

### 2.1 Update Prisma Schema
Tambahkan tabel yang diperlukan Better Auth:
```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

model PasswordResetToken {
  id      String   @id @default(cuid())
  email   String
  token   String   @unique
  expires DateTime

  @@map("password_reset_tokens")
}

// Update existing User model
model User {
  // ... existing fields
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  
  @@map("users")
}
```

### 2.2 Run Migration
```bash
npx prisma migrate dev --name add_better_auth_tables
npx prisma generate
```

## Phase 3: API Routes Implementation

### 3.1 Better Auth API Handler
Buat `src/pages/api/auth/[...all].ts`:
```typescript
import { auth } from "@/lib/auth"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return auth.handler(req, res)
}
```

### 3.2 Email Service Setup
Buat `src/lib/email.ts`:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.BETTER_AUTH_URL}/auth/verify-email?token=${token}`
  
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: 'Verifikasi Email Anda - LPK Merdeka',
    html: `
      <h1>Verifikasi Email</h1>
      <p>Klik link berikut untuk memverifikasi email Anda:</p>
      <a href="${verificationUrl}">Verifikasi Email</a>
    `
  })
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.BETTER_AUTH_URL}/auth/reset-password?token=${token}`
  
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: 'Reset Password - LPK Merdeka',
    html: `
      <h1>Reset Password</h1>
      <p>Klik link berikut untuk reset password Anda:</p>
      <a href="${resetUrl}">Reset Password</a>
    `
  })
}
```

## Phase 4: Frontend Implementation

### 4.1 Auth Client Setup
Buat `src/lib/auth-client.ts`:
```typescript
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"
})

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  resetPassword,
  verifyEmail,
} = authClient
```

### 4.2 Update AuthContext
Refactor `src/context/AuthContext.tsx` untuk menggunakan Better Auth:
```typescript
import { useSession } from "@/lib/auth-client"

export const AuthProvider = ({ children }) => {
  const { data: session, isPending } = useSession()
  
  // Implementasi provider dengan Better Auth
}
```

### 4.3 Login Page
Update `src/pages/auth/login.tsx`:
- Tambahkan form login dengan email/password
- Tambahkan tombol "Login with Google"
- Tambahkan link "Lupa Password?"
- Handle error messages

### 4.4 Register Page
Update `src/pages/auth/register.tsx`:
- Form registrasi dengan validasi
- Email verification notice
- Link ke login

### 4.5 Forgot Password Page
Buat `src/pages/auth/forgot-password.tsx`:
- Form input email
- Send reset link
- Success message

### 4.6 Reset Password Page
Buat `src/pages/auth/reset-password.tsx`:
- Verify token
- Form new password
- Redirect to login

### 4.7 Verify Email Page
Buat `src/pages/auth/verify-email.tsx`:
- Auto-verify on load
- Success/error message
- Redirect to dashboard

## Phase 5: Migration Strategy

### 5.1 Data Migration
Buat script untuk migrasi user existing:
```typescript
// scripts/migrate-users.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function migrateUsers() {
  const users = await prisma.user.findMany()
  
  for (const user of users) {
    // Create session for existing users
    // Set emailVerified for existing users
    // etc.
  }
}
```

### 5.2 Backward Compatibility
- Maintain existing JWT endpoints selama transisi
- Gradual rollout dengan feature flag
- Monitoring dan logging

## Phase 6: Testing

### 6.1 Test Cases
- [ ] Email/Password registration
- [ ] Email verification flow
- [ ] Login dengan email/password
- [ ] Login dengan Google OAuth
- [ ] Forgot password flow
- [ ] Reset password flow
- [ ] Session management
- [ ] Role-based access (user, admin, superAdmin)
- [ ] Logout functionality

### 6.2 Security Testing
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] SQL injection prevention
- [ ] XSS prevention

## Phase 7: Deployment

### 7.1 Environment Setup
- Setup email service di production
- Configure Google OAuth production credentials
- Set environment variables di Vercel

### 7.2 Database Migration
```bash
npx prisma migrate deploy
```

### 7.3 Monitoring
- Setup error tracking (Sentry)
- Monitor email delivery
- Track authentication metrics

## Additional Features (Optional)

### Two-Factor Authentication (2FA)
```typescript
import { twoFactor } from "better-auth/plugins"

export const auth = betterAuth({
  // ... existing config
  plugins: [
    twoFactor({
      issuer: "LPK Merdeka",
    })
  ]
})
```

### Magic Link Login
```typescript
import { magicLink } from "better-auth/plugins"

export const auth = betterAuth({
  // ... existing config
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        // Send magic link email
      }
    })
  ]
})
```

## Timeline Estimate

- **Phase 1-2**: 1-2 hari (Setup & Database)
- **Phase 3**: 1 hari (API Routes)
- **Phase 4**: 2-3 hari (Frontend)
- **Phase 5**: 1 hari (Migration)
- **Phase 6**: 1-2 hari (Testing)
- **Phase 7**: 1 hari (Deployment)

**Total**: 7-11 hari kerja

## Resources

- [Better Auth Documentation](https://www.better-auth.com)
- [Better Auth Prisma Adapter](https://www.better-auth.com/docs/adapters/prisma)
- [Resend Documentation](https://resend.com/docs)
- [Google OAuth Setup](https://console.cloud.google.com)

## Notes

1. Better Auth menggunakan session-based authentication yang lebih aman dari JWT
2. Email verification wajib untuk keamanan
3. Google OAuth memerlukan domain verification untuk production
4. Backup database sebelum migration
5. Test thoroughly di development sebelum deploy ke production

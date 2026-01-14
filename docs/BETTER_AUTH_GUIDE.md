# Better Auth Implementation Guide

## 📋 Overview
Project ini telah dimigrasi dari sistem autentikasi custom JWT ke **Better Auth** untuk keamanan dan fitur yang lebih baik.

## ✅ Fitur yang Sudah Diimplementasikan

### 1. **Email & Password Authentication**
- ✅ Sign up dengan email dan password
- ✅ Sign in dengan email dan password
- ✅ Remember me functionality
- ✅ Password visibility toggle

### 2. **OAuth Integration**
- ✅ Google OAuth sign in
- ✅ Account linking untuk OAuth providers

### 3. **Password Management**
- ✅ Forgot password flow
- ✅ Reset password dengan token
- ✅ Password validation (minimal 8 karakter)

### 4. **Session Management**
- ✅ Session-based authentication (lebih aman dari JWT)
- ✅ Automatic session refresh
- ✅ Session revocation saat logout

### 5. **Role-Based Access Control**
- ✅ Support untuk role: `user`, `admin`, `superAdmin`
- ✅ Automatic redirect berdasarkan role setelah login
- ✅ Protected routes dengan role checking

## 🗄️ Database Schema

Better Auth menambahkan tabel berikut:

### `accounts`
Menyimpan OAuth provider accounts (Google, dll)
```sql
- id (VARCHAR)
- user_id (BIGINT)
- provider (VARCHAR) - e.g., "google"
- provider_account_id (VARCHAR)
- access_token, refresh_token, etc.
```

### `better_auth_sessions`
Menyimpan active sessions
```sql
- id (VARCHAR)
- session_token (VARCHAR)
- user_id (BIGINT)
- expires (TIMESTAMP)
```

### `verification_tokens`
Untuk email verification (future feature)
```sql
- id (VARCHAR)
- identifier (VARCHAR)
- token (VARCHAR)
- expires (TIMESTAMP)
```

### `password_reset_tokens`
Untuk password reset flow
```sql
- id (VARCHAR)
- email (VARCHAR)
- token (VARCHAR)
- expires (TIMESTAMP)
```

### Updated `users` table
Menambahkan field:
- `image` (VARCHAR) - untuk profile picture dari OAuth

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install better-auth
```

### 2. Environment Variables
Tambahkan ke `.env`:
```env
# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

Generate secret key:
```bash
openssl rand -base64 32
```

### 3. Database Migration
Jalankan migration SQL:
```bash
# Jika menggunakan PlanetScale atau MySQL langsung
mysql -u username -p database_name < prisma/migrations/better-auth-migration.sql
```

Atau generate Prisma migration:
```bash
npx prisma migrate dev --name add_better_auth_tables
npx prisma generate
```

### 4. Google OAuth Setup (Optional)
1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. Buat project baru atau pilih existing
3. Enable Google+ API
4. Buat OAuth 2.0 credentials
5. Tambahkan authorized redirect URI:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
6. Copy Client ID dan Client Secret ke `.env`

## 📁 File Structure

```
src/
├── lib/
│   ├── auth.ts                 # Better Auth server config
│   └── auth-client.ts          # Better Auth client hooks
├── pages/
│   ├── api/
│   │   └── auth/
│   │       └── [...all].ts     # Better Auth API handler
│   └── auth/
│       ├── login.tsx           # Sign in page
│       ├── register.tsx        # Sign up page
│       ├── forgot-password.tsx # Forgot password page
│       └── reset-password.tsx  # Reset password page
└── context/
    └── AuthContext.tsx         # Auth context provider
```

## 🔧 Usage Examples

### Client-Side Authentication

```typescript
import { signIn, signOut, useSession } from "@/lib/auth-client";

// Sign in with email/password
await signIn.email({
  email: "user@example.com",
  password: "password123",
  rememberMe: true
});

// Sign in with Google
await signIn.social({
  provider: "google",
  callbackURL: "/dashboard"
});

// Sign out
await signOut();

// Get current session
const { data: session, isPending } = useSession();
if (session?.user) {
  console.log("User:", session.user.name);
  console.log("Role:", session.user.role);
}
```

### Using Auth Context

```typescript
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const { isAuthenticated, user, logout, isPending } = useAuth();

  if (isPending) return <div>Loading...</div>;
  
  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protected API Routes

```typescript
import { auth } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth.api.getSession({
    headers: req.headers
  });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check role
  if (session.user.role !== "admin" && session.user.role !== "superAdmin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  // Your protected logic here
  res.json({ data: "Protected data" });
}
```

## 🔐 Security Features

### Session-Based Authentication
- ✅ **Session Revocation**: Bisa logout user dari server
- ✅ **CSRF Protection**: Built-in protection
- ✅ **Secure Cookies**: HttpOnly, Secure, SameSite
- ✅ **Token Rotation**: Automatic refresh token rotation

### Password Security
- ✅ Bcrypt hashing (existing)
- ✅ Password strength validation
- ✅ Secure password reset flow

### OAuth Security
- ✅ State parameter untuk CSRF protection
- ✅ Secure token storage
- ✅ Account linking validation

## 🎯 Migration from Old JWT System

### What Changed?
1. **Authentication Method**: JWT → Session-based
2. **Login Flow**: Custom API → Better Auth API
3. **Session Storage**: localStorage → Secure cookies
4. **OAuth**: Manual → Built-in Google OAuth

### Backward Compatibility
- ✅ Existing user data tetap kompatibel
- ✅ Password hash (bcrypt) tetap sama
- ✅ Role system tetap sama
- ✅ Database schema extended (tidak breaking)

### Removed Files
- ❌ `src/pages/api/auth/login.ts` (replaced by Better Auth)
- ❌ `src/pages/api/auth/register.ts` (replaced by Better Auth)

## 🐛 Troubleshooting

### Error: "Session not found"
- Pastikan cookies enabled di browser
- Check BETTER_AUTH_URL di `.env` sesuai dengan domain

### Error: "Google OAuth failed"
- Verify Google Client ID dan Secret
- Check authorized redirect URIs di Google Console
- Pastikan Google+ API enabled

### Error: "Database connection failed"
- Verify DATABASE_URL di `.env`
- Pastikan migration sudah dijalankan
- Check database user permissions

### Session tidak persist setelah refresh
- Check cookie settings (HttpOnly, Secure)
- Verify BETTER_AUTH_SECRET di `.env`
- Clear browser cookies dan coba lagi

## 📚 Resources

- [Better Auth Documentation](https://www.better-auth.com)
- [Better Auth Prisma Adapter](https://www.better-auth.com/docs/adapters/prisma)
- [Google OAuth Setup Guide](https://developers.google.com/identity/protocols/oauth2)

## 🔄 Future Enhancements

### Planned Features
- [ ] Email verification
- [ ] Two-Factor Authentication (2FA)
- [ ] Magic link login
- [ ] Session management UI
- [ ] Rate limiting
- [ ] Account recovery

### Optional Integrations
- [ ] More OAuth providers (GitHub, Facebook)
- [ ] SMS verification
- [ ] Biometric authentication
- [ ] SSO integration

## 📝 Notes

1. Better Auth menggunakan session-based authentication yang lebih aman dari JWT
2. Google OAuth memerlukan domain verification untuk production
3. Backup database sebelum migration
4. Test thoroughly di development sebelum deploy ke production
5. Monitor session table size dan cleanup expired sessions secara berkala

## 🆘 Support

Jika ada pertanyaan atau issue:
1. Check dokumentasi Better Auth
2. Review implementation plan di `.agent/workflows/better-auth-implementation.md`
3. Check migration SQL di `prisma/migrations/better-auth-migration.sql`

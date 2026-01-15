
# Panduan Deploy Database ke Railway

Berikut adalah langkah-langkah untuk men-deploy database MySQL (yang digunakan di proyek ini) ke Railway:

## 1. Persiapan di Railway
1. Buka [Railway Dashboard](https://railway.app/dashboard).
2. Klik tombol **"New Project"** -> Pilih **"Provision MySQL"**.
3. Tunggu hingga database selesai dibuat.

## 2. Dapatkan URL Database
1. Klik pada kartu database MySQL yang baru dibuat.
2. Pergi ke tab **"Variables"** atau **"Connect"**.
3. Cari variable bernama `DATABASE_URL` atau `MYSQL_URL`.
4. Salin URL tersebut. Formatnya biasanya seperti: `mysql://root:password@containers-us-west-133.railway.app:6893/railway`

## 3. Push Schema ke Railway (Dari Terminal VS Code)
Kita akan "mendorong" struktur tabel lokal ke database Railway tanpa harus mengubah kode aplikasi secara permanen.

1. Buka terminal di project Anda.
2. Jalankan perintah berikut (ganti `<PASTE_URL_HERE>` dengan URL yang tadi disalin):
   (Pada Windows Powershell, gunakan tanda kutip)
   ```bash
   $env:DATABASE_URL="mysql://root:..." 
   npx prisma db push
   ```
   *Atau jika ingin test koneksi saja tanpa push, bisa update file .env sementara (tapi hati-hati jangan ter-commit).*

3. Jika berhasil, Prisma akan membuat semua tabel (`User`, `Session`, `Account`, dll) di database Railway.

## 4. Import Data Awal (Opsional)
Jika Anda memiliki data awal (seeding) atau data backup (seperti `lpk_backup.sql` yang ada di root folder):
- Anda bisa menggunakan tool seperti **DBeaver** atau **MySQL Workbench**.
- Koneksikan ke database Railway menggunakan Host, User, Password, Port yang ada di dashboard Railway.
- Import file SQL tersebut.

## 5. Hubungkan Aplikasi ke Database Baru
**Jika mendeploy Aplikasi ke Railway juga:**
1. Buka project aplikasi di Railway.
2. Masuk ke **Settings** -> **Variables**.
3. Tambahkan variable `DATABASE_URL` dengan nilai URL dari database MySQL tadi. (Railway biasanya otomatis menyediakan opsi "Reference Variable" jika dalam satu project).

**Jika menjalankan Aplikasi Lokal tapi pakai DB Railway:**
1. Update file `.env` di komputer Anda:
   ```env
   DATABASE_URL="mysql://root:password@containers....railway.app:port/railway"
   ```
2. Restart `npm run dev`.

## Catatan Penting
- **Better Auth & Prisma**: Karena kita menggunakan Better Auth dengan Prisma Adapter, pastikan schema di database production (Railway) selalu sinkron dengan local dev. Selalu jalankan `npx prisma db push` atau `npx prisma migrate deploy` setiap ada perubahan schema.

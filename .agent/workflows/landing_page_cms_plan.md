---
description: Implementation plan for Landing Page CMS (Content Management System)
---

# Landing Page CMS Implementation Plan

## Objective
Enable the admin to manage content on the public landing pages (Home, About, Program, Gallery, Help) directly from the Admin Dashboard, replacing hardcoded content with dynamic data.

## 1. Database Schema Updates (`schema.prisma`)

We need to add new models to store dynamic content.

### `cms_hero`
- `id` (BigInt)
- `title` (String)
- `subtitle` (String, Text)
- `image_url` (String)
- `cta_text` (String)
- `cta_link` (String)
- `is_active` (Boolean)

### `cms_programs`
- `id` (BigInt)
- `title` (String)
- `description` (Text)
- `image_url` (String)
- `order` (Int)

### `cms_gallery`
- `id` (BigInt)
- `title` (String)
- `image_url` (String)
- `category` (String) - e.g., 'activity', 'facility'

### `cms_faq` (For Help/Bantuan page)
- `id` (BigInt)
- `question` (String)
- `answer` (Text)
- `category` (String)
- `order` (Int)

### `cms_settings`
- `key` (String, ID) - e.g., 'contact_email', 'social_instagram'
- `value` (Text)

## 2. API Routes (Next.js)

Create CRUD endpoints for each module in `src/pages/api/admin/cms/...`.
Also create public GET endpoints in `src/pages/api/cms/...`.

- `GET /api/cms/home` (Public: fetches hero, stats)
- `GET /api/cms/programs` (Public)
- `GET /api/cms/gallery` (Public)
- `GET /api/cms/faq` (Public)
- `GET /api/cms/settings` (Public)

- `GET/POST/PUT/DEL /api/admin/cms/hero`
- `GET/POST/PUT/DEL /api/admin/cms/programs`
- `GET/POST/PUT/DEL /api/admin/cms/gallery`
- `GET/POST/PUT/DEL /api/admin/cms/faq`
- `POST /api/admin/cms/settings`

## 3. Admin Dashboard UI

Add a new "Content Management" section to the Sidebar.

### Pages
- `/admin/cms/home` - Edit Hero section, maybe "About Summary".
- `/admin/cms/programs` - CRUD for Programs cards.
- `/admin/cms/gallery` - Upload/Manage images.
- `/admin/cms/faq` - CRUD for FAQs.
- `/admin/cms/settings` - General settings (Contact info, Social links).

## 4. Frontend Integration (Landing Pages)

Update existing pages to fetch data from APIs using `useEffect` or `getServerSideProps` / `getStaticProps` (Static Generation with Revalidation recommended for performance).

- `src/pages/index.tsx` (Home) -> Fetch Hero, Programs preview.
- `src/pages/program/index.tsx` -> Fetch all Programs.
- `src/pages/galeri/index.tsx` -> Fetch Gallery images.
- `src/pages/bantuan/index.tsx` -> Fetch FAQs.
- Shared Layout (Footer) -> Fetch Settings (Social links, Address).

## 5. Implementation Steps

1.  **Database**: Update `prisma/schema.prisma` and run `npx prisma db push` (or migrate).
2.  **API**: Create Backend logic for one module first (e.g., Hero) to test the flow.
3.  **Admin UI**: Update Sidebar and create the Management Page for that module.
4.  **Frontend**: Connect the public page to the new API.
5.  **Repeat**: Proceed with other modules (Programs, Gallery, FAQ).

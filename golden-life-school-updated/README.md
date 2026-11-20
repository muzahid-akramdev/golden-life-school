# গোল্ডেন লাইফ পাবলিক স্কুল — ওয়েবসাইট

## সেটআপ

### Supabase
1. নতুন প্রজেক্ট তৈরি করুন, Region: Singapore
2. **SQL Editor**-এ `supabase-schema.sql` চালান
3. **Storage** → New Bucket: `school-files`, Public ON
4. **Authentication → Users → Invite User**: `g.l.k.g.a.p.h.s@gmail.com` (admin)

### EmailJS (Contact Form)
Email Services-এ Gmail (`g.l.k.g.a.p.h.s@gmail.com`) connect করে template বানান — Service ID, Template ID, Public Key লাগবে env-তে।

### .env.local
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
NEXT_PUBLIC_ADMIN_EMAIL=g.l.k.g.a.p.h.s@gmail.com
```

## Deploy
Vercel-এ repo import করুন, উপরের env vars যোগ করুন, Deploy।

## লগইন
- Admin: `/admin` — উপরের admin email দিয়ে
- Teacher: `/teacher-portal` — admin যে email/password দিয়েছে
- Student: `/student-portal` — রোল নম্বর + পিতার ফোন নম্বর

## Excel ফরম্যাট
- শিক্ষার্থী: নাম | রোল | শ্রেণি | বিভাগ | সেশন | পিতার নাম | ফোন
- ফলাফল: রোল | নম্বর

## পেজসমূহ
হোম `/` · অ্যাডমিন `/admin` · শিক্ষক `/teacher-portal` · শিক্ষার্থী `/student-portal` · ফলাফল `/result` · ভর্তি `/admission`

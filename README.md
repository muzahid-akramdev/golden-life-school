# গোল্ডেন লাইফ পাবলিক স্কুল — ওয়েবসাইট

## ধাপে ধাপে Deploy গাইড

---

## ধাপ ১ — Supabase সেটআপ

1. **https://supabase.com** এ যান → Sign Up (বিনামূল্যে)
2. **New Project** → নাম দিন: `golden-life-school`
3. একটি শক্তিশালী Database Password দিন (মনে রাখুন)
4. Region: **Singapore** বেছে নিন (বাংলাদেশের কাছে)
5. Project তৈরি হলে (২ মিনিট) → **SQL Editor** এ যান
6. `supabase-schema.sql` ফাইলের সব কপি করে পেস্ট করুন → **Run**
7. **Storage** → **New Bucket** → Name: `school-files` → **Public: ON** → Create

### Supabase Keys নিন:
- Settings → API → `Project URL` কপি করুন
- Settings → API → `anon public` key কপি করুন

### Admin অ্যাকাউন্ট তৈরি:
- Authentication → Users → **Invite User**
- Email: `g.l.k.g.a.p.h.s@gmail.com`
- ইমেইলে লিংক আসবে → পাসওয়ার্ড সেট করুন

---

## ধাপ ২ — EmailJS সেটআপ (Contact Form Email)

1. **https://emailjs.com** → Sign Up (বিনামূল্যে)
2. **Email Services** → Add Service → Gmail বেছে নিন
3. Gmail: `g.l.k.g.a.p.h.s@gmail.com` দিয়ে Connect করুন
4. **Email Templates** → Create Template:
   ```
   Subject: নতুন বার্তা — {{from_name}}
   Body:
   নাম: {{from_name}}
   ফোন: {{from_phone}}
   ইমেইল: {{from_email}}
   বার্তা: {{message}}
   ```
5. Service ID, Template ID, Public Key নোট করুন

---

## ধাপ ৩ — GitHub এ কোড Upload

1. **https://github.com** → Sign Up (বিনামূল্যে)
2. **New Repository** → Name: `golden-life-school` → **Private** → Create
3. আপনার কম্পিউটারে **Git** ইনস্টল করুন: https://git-scm.com/downloads
4. Command Prompt / Terminal খুলুন:

```bash
# প্রজেক্ট ফোল্ডারে যান
cd golden-life-school

# .env.local ফাইল তৈরি করুন (নিচে দেখুন)

# Git শুরু করুন
git init
git add .
git commit -m "Initial commit"

# GitHub এর repository URL দিন (GitHub থেকে কপি করুন)
git remote add origin https://github.com/আপনার-username/golden-life-school.git
git branch -M main
git push -u origin main
```

### .env.local ফাইল তৈরি করুন:
প্রজেক্ট ফোল্ডারে `.env.local` নামে ফাইল তৈরি করুন:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
NEXT_PUBLIC_ADMIN_EMAIL=g.l.k.g.a.p.h.s@gmail.com
```

---

## ধাপ ৪ — Vercel এ Deploy

1. **https://vercel.com** → Sign Up with GitHub
2. **New Project** → GitHub থেকে `golden-life-school` বেছে নিন
3. **Environment Variables** এ সব `.env.local` এর values যোগ করুন
4. **Deploy** চাপুন → ২ মিনিটে সাইট লাইভ!
5. আপনার সাইটের URL পাবেন: `golden-life-school.vercel.app`

---

## ধাপ ৫ — প্রথমবার ব্যবহার

### Admin লগইন:
- `আপনার-সাইট.vercel.app/admin`
- Email: `g.l.k.g.a.p.h.s@gmail.com`
- Password: Supabase এ যেটা সেট করেছেন

### Admin Panel থেকে যা করবেন:
1. **শিক্ষার্থী** → শিক্ষার্থীদের তথ্য যোগ করুন (বা Excel আপলোড)
2. **শিক্ষক** → শিক্ষকদের অ্যাকাউন্ট তৈরি করুন
3. **নোটিশ** → প্রথম নোটিশ যোগ করুন
4. **গ্যালারি** → স্কুলের ছবি যোগ করুন

### Teacher লগইন:
- `আপনার-সাইট.vercel.app/teacher-portal`
- Admin যে email/password দিয়েছে সেটা দিয়ে

### Student লগইন:
- `আপনার-সাইট.vercel.app/student-portal`
- রোল নম্বর + পিতার ফোন নম্বর দিয়ে

---

## Excel Demo ফাইল ফরম্যাট

### শিক্ষার্থী (demo-students.xlsx):
| নাম | রোল | শ্রেণি | বিভাগ | সেশন | পিতার নাম | ফোন |
|-----|-----|--------|-------|------|-----------|-----|
| রহিম | 1 | দশম শ্রেণি | বিজ্ঞান | ২০২৫ | আব্দুর রহিম | 01700000000 |

### ফলাফল (demo-results.xlsx):
| রোল | নম্বর |
|-----|-------|
| 1 | 78 |
| 2 | 85 |

---

## কোনো সমস্যা হলে

📧 Technical help: Supabase Docs → https://supabase.com/docs  
📧 Deployment help: Vercel Docs → https://vercel.com/docs  

---

## URL সমূহ (deploy এর পর)

| পেজ | URL |
|-----|-----|
| হোম | `/` |
| অ্যাডমিন | `/admin` |
| শিক্ষক | `/teacher-portal` |
| শিক্ষার্থী | `/student-portal` |
| ফলাফল | `/result` |
| ভর্তি | `/admission` |

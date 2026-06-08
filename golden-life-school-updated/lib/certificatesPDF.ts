// ─── Certificate PDF Generator ───────────────────────────────────────────────
// Generates printable HTML for প্রত্যয়নপত্র, প্রশংসাপত্র, ট্রান্সফার সার্টিফিকেট
// Opens in new tab → browser print → A4 PDF

const SCHOOL_HEADER = `
  <div class="school-header">
    <div class="school-name">গোল্ডেন লাইফ পাবলিক স্কুল</div>
    <div class="school-sub">পাইকরতলী, কাজিপুর, সিরাজগঞ্জ</div>
    <div class="school-sub">স্থাপিতঃ ২০১৫ ইং &nbsp;|&nbsp; বিদ্যালয় কোডঃ ৪৫০৭৯৫</div>
    <div class="school-sub">পরিচালকঃ ডাঃ মোঃ আমিনুল ইসলাম এন.বি.এস (ব্যবস্থাপনা) ডিআইইএনএস, ঢাকা</div>
    <div class="school-sub">মোবাইল নং- ০১৭৩৩-৬৯৬৪৭৭</div>
  </div>
`

const BASE_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Hind Siliguri', sans-serif;
    font-size: 14px;
    color: #000;
    background: #fff;
    padding: 0;
  }
  .page {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    padding: 18mm 20mm 18mm 22mm;
    position: relative;
  }
  /* ── Outer double border ── */
  .border-outer {
    border: 3px double #1a3a6b;
    padding: 10px;
  }
  .border-inner {
    border: 1px solid #1a3a6b;
    padding: 18px 22px 22px;
  }

  /* ── Header ── */
  .school-header { text-align: center; border-bottom: 2px solid #1a3a6b; padding-bottom: 12px; margin-bottom: 14px; }
  .school-name { font-size: 26px; font-weight: 800; color: #0d2e5e; letter-spacing: 0.5px; line-height: 1.3; }
  .school-sub { font-size: 12px; color: #333; margin-top: 3px; }
  .cert-title-wrap { text-align: center; margin: 14px 0 18px; }
  .cert-title {
    font-size: 22px;
    font-weight: 700;
    display: inline-block;
    border-bottom: 3px solid #1a3a6b;
    padding-bottom: 4px;
    color: #0d2e5e;
    letter-spacing: 1px;
  }
  .serial-date { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 16px; }

  /* ── Body text ── */
  .cert-body { line-height: 2.2; font-size: 14.5px; text-align: justify; }
  .cert-body .highlight { font-weight: 700; border-bottom: 1px dotted #333; padding-bottom: 1px; }
  .cert-body p { margin-bottom: 10px; }

  /* ── Signature ── */
  .sig-section { margin-top: 40px; display: flex; justify-content: flex-end; }
  .sig-box { text-align: center; }
  .sig-line { width: 180px; border-top: 1px solid #000; margin-bottom: 5px; }
  .sig-name { font-weight: 700; font-size: 14px; }
  .sig-qual { font-size: 12px; color: #333; line-height: 1.5; }

  /* ── Print button ── */
  .print-btn {
    display: block;
    margin: 20px auto 0;
    background: #1a3a6b;
    color: white;
    border: none;
    padding: 10px 28px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Hind Siliguri', sans-serif;
  }

  @media print {
    .print-btn { display: none !important; }
    body { padding: 0; }
    .page { width: 100%; padding: 12mm 15mm; }
  }
`

function openCertWindow(htmlContent: string, title: string) {
  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(`
<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>${BASE_CSS}</style>
</head>
<body>
${htmlContent}
<button class="print-btn" onclick="window.print()">🖨️ প্রিন্ট / PDF সেভ করুন</button>
</body>
</html>
  `)
  win.document.close()
}

// ─────────────────────────────────────────────────────────────
// ১. প্রত্যয়নপত্র (Certificate of Attendance / Character)
// ─────────────────────────────────────────────────────────────
export function generatePratyayanPatra(data: {
  serial?: string
  student_name: string
  father_name: string
  mother_name: string
  village: string
  post_office: string
  upazila?: string
  district?: string
  dob?: string
  class: string
  issue_date?: string
  purpose?: string
}) {
  const today = data.issue_date || new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const serial = data.serial || ''
  const upazila = data.upazila || 'কাজিপুর'
  const district = data.district || 'সিরাজগঞ্জ'
  const dob = data.dob ? `, জন্ম তারিখঃ <span class="highlight">${data.dob}</span> ইং` : ''
  const purpose = data.purpose || 'যে কোনো প্রয়োজনে'

  const html = `
<div class="page">
  <div class="border-outer">
    <div class="border-inner">
      ${SCHOOL_HEADER}
      <div class="serial-date">
        <span>স্মারক নং- জ-${serial}</span>
        <span>তারিখঃ ${today} ইং</span>
      </div>
      <div class="cert-title-wrap">
        <span class="cert-title">প্রত্যয়ন পত্র</span>
      </div>

      <div class="cert-body">
        <p>
          এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,
          <span class="highlight"> মোঃ ${data.student_name} </span>,
          পিতাঃ মোঃ <span class="highlight">${data.father_name}</span> ,
          মাতাঃ মোছাঃ <span class="highlight">${data.mother_name}</span>,
          গ্রামঃ <span class="highlight">${data.village}</span>,
          ডাকঘরঃ <span class="highlight">${data.post_office}</span>,
          উপজেলাঃ <span class="highlight">${upazila}</span>,
          জেলাঃ <span class="highlight">${district}</span>
          (তাঁর বিষয়ে) বর্ণনায় তাহার
          জন্ম তারিখঃ${dob}।
          সে অত্র বিদ্যালয়ের <span class="highlight">${data.class}</span> শ্রেণিতে অধ্যয়ন করিতেছে।
        </p>
        <p>
          আমি তার সার্বিক সাফল্য কামনা করি।
        </p>
        <p style="margin-top:16px; font-size:13px; color:#555;">
          (প্রত্যয়নপত্রটি <span style="font-weight:700; color:#000;">${purpose}</span> উদ্দেশ্যে প্রদান করা হলো।)
        </p>
      </div>

      <div class="sig-section">
        <div class="sig-box">
          <div style="height:50px;"></div>
          <div class="sig-line"></div>
          <div class="sig-name">ডাঃ মোঃ আমিনুল ইসলাম</div>
          <div class="sig-qual">
            এম.বি.এস (ব্যবস্থাপনা) ডিআইইএনএস, ঢাকা।<br>
            অধক্ষ্য<br>
            (গোল্ডেন লাইফ পাবলিক স্কুল)<br>
            পাইকরতলী, কাজিপুর, সিরাজগঞ্জ।
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `
  openCertWindow(html, 'প্রত্যয়নপত্র')
}

// ─────────────────────────────────────────────────────────────
// ২. প্রশংসাপত্র (Certificate of Merit / Appreciation)
// ─────────────────────────────────────────────────────────────
export function generatePrashangsaPatra(data: {
  serial?: string
  student_name: string
  father_name: string
  mother_name: string
  village: string
  post_office: string
  upazila?: string
  district?: string
  dob?: string
  class: string
  exam_name?: string
  exam_year?: string
  result?: string
  conduct?: string
  issue_date?: string
}) {
  const today = data.issue_date || new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const serial = data.serial || ''
  const upazila = data.upazila || 'কাজিপুর'
  const district = data.district || 'সিরাজগঞ্জ'
  const examName = data.exam_name || 'বার্ষিক পরীক্ষা'
  const examYear = data.exam_year || new Date().getFullYear().toString()
  const result = data.result || 'কৃতিত্বের সহিত উত্তীর্ণ'
  const conduct = data.conduct || 'চরিত্র মেধাবী ও আচরণে বিনয়ী'

  const html = `
<div class="page">
  <div class="border-outer">
    <div class="border-inner">
      ${SCHOOL_HEADER}
      <div class="serial-date">
        <span>স্মারক নং- জ-${serial}</span>
        <span>তারিখঃ ${today} ইং</span>
      </div>
      <div class="cert-title-wrap">
        <span class="cert-title">প্রশংসা পত্র</span>
      </div>

      <div class="cert-body">
        <p>
          এই মর্মে প্রশংসাপূর্বক সনদ প্রদান করা যাচ্ছে যে,
          <span class="highlight"> মোঃ ${data.student_name} </span>,
          পিতাঃ মোঃ <span class="highlight">${data.father_name}</span>,
          মাতাঃ মোছাঃ <span class="highlight">${data.mother_name}</span>,
          গ্রামঃ <span class="highlight">${data.village}</span>,
          ডাকঘরঃ <span class="highlight">${data.post_office}</span>,
          উপজেলাঃ <span class="highlight">${upazila}</span>,
          জেলাঃ <span class="highlight">${district}</span>।
          ${data.dob ? `জন্ম তারিখঃ <span class="highlight">${data.dob}</span> ইং।` : ''}
        </p>
        <p>
          সে অত্র বিদ্যালয়ে <span class="highlight">${data.class}</span> শ্রেণিতে অধ্যয়নরত অবস্থায়
          <span class="highlight">${examYear}</span> ইং সালের <span class="highlight">${examName}</span>-এ
          <span class="highlight">${result}</span> হয়েছে।
        </p>
        <p>
          তার <span class="highlight">${conduct}</span>। বিদ্যালয়ে তার উপস্থিতি নিয়মিত এবং
          সহপাঠ্যক্রমিক কার্যাবলীতে সক্রিয় অংশগ্রহণ ছিল।
        </p>
        <p>
          আমরা তার উজ্জ্বল ভবিষ্যৎ কামনা করি এবং যে কোনো সৎ উদ্যোগে
          সার্বিক সহযোগিতার আশ্বাস প্রদান করছি।
        </p>
      </div>

      <div class="sig-section">
        <div class="sig-box">
          <div style="height:50px;"></div>
          <div class="sig-line"></div>
          <div class="sig-name">ডাঃ মোঃ আমিনুল ইসলাম</div>
          <div class="sig-qual">
            এম.বি.এস (ব্যবস্থাপনা) ডিআইইএনএস, ঢাকা।<br>
            অধক্ষ্য<br>
            (গোল্ডেন লাইফ পাবলিক স্কুল)<br>
            পাইকরতলী, কাজিপুর, সিরাজগঞ্জ।
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `
  openCertWindow(html, 'প্রশংসাপত্র')
}

// ─────────────────────────────────────────────────────────────
// ৩. ট্রান্সফার সার্টিফিকেট (TC)
// ─────────────────────────────────────────────────────────────
export function generateTransferCertificate(data: {
  serial?: string
  tc_number?: string
  student_name: string
  father_name: string
  mother_name: string
  village: string
  post_office: string
  upazila?: string
  district?: string
  dob?: string
  class: string
  last_exam?: string
  last_exam_year?: string
  last_result?: string
  admission_date?: string
  leaving_date?: string
  conduct?: string
  reason?: string
  dues_cleared?: boolean
  issue_date?: string
}) {
  const today = data.issue_date || new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const serial = data.serial || ''
  const tcNo = data.tc_number || ''
  const upazila = data.upazila || 'কাজিপুর'
  const district = data.district || 'সিরাজগঞ্জ'
  const leavingDate = data.leaving_date || today
  const conduct = data.conduct || 'সৎ ও চরিত্রবান'
  const reason = data.reason || 'অন্যত্র ভর্তির জন্য'
  const lastExam = data.last_exam || 'বার্ষিক পরীক্ষা'
  const lastExamYear = data.last_exam_year || new Date().getFullYear().toString()
  const lastResult = data.last_result || 'উত্তীর্ণ'
  const duesCleared = data.dues_cleared !== false

  const html = `
<div class="page">
  <div class="border-outer">
    <div class="border-inner">
      ${SCHOOL_HEADER}
      <div class="serial-date">
        <span>স্মারক নং- জ-${serial}</span>
        <span>তারিখঃ ${today} ইং</span>
      </div>
      ${tcNo ? `<div style="text-align:center; font-size:13px; margin-bottom:8px;">টি.সি. নম্বরঃ <strong>${tcNo}</strong></div>` : ''}
      <div class="cert-title-wrap">
        <span class="cert-title">ছাড়পত্র (Transfer Certificate)</span>
      </div>

      <div class="cert-body">
        <p>
          এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,
          <span class="highlight"> মোঃ ${data.student_name} </span>,
          পিতাঃ মোঃ <span class="highlight">${data.father_name}</span>,
          মাতাঃ মোছাঃ <span class="highlight">${data.mother_name}</span>,
          গ্রামঃ <span class="highlight">${data.village}</span>,
          ডাকঘরঃ <span class="highlight">${data.post_office}</span>,
          উপজেলাঃ <span class="highlight">${upazila}</span>,
          জেলাঃ <span class="highlight">${district}</span>।
          ${data.dob ? `জন্ম তারিখঃ <span class="highlight">${data.dob}</span> ইং।` : ''}
        </p>
        ${data.admission_date ? `<p>সে অত্র বিদ্যালয়ে <span class="highlight">${data.admission_date}</span> তারিখে ভর্তি হয়।</p>` : ''}
        <p>
          সে অত্র বিদ্যালয়ের <span class="highlight">${data.class}</span> শ্রেণিতে
          <span class="highlight">${lastExamYear}</span> সালের <span class="highlight">${lastExam}</span>-এ
          <span class="highlight">${lastResult}</span> হয়েছে এবং
          <span class="highlight">${leavingDate}</span> তারিখে বিদ্যালয় ত্যাগ করেছে।
        </p>
        <p>
          তার চরিত্র <span class="highlight">${conduct}</span>। বিদ্যালয়ে অবস্থানকালীন সময়ে তার আচরণ সন্তোষজনক ছিল।
        </p>
        <p>
          বিদ্যালয় ত্যাগের কারণঃ <span class="highlight">${reason}</span>।
        </p>
        <p>
          পাওনাদিঃ <span class="highlight">${duesCleared ? 'সম্পূর্ণ পরিশোধিত।' : 'অপরিশোধিত রয়েছে।'}</span>
        </p>
        <p style="margin-top:14px;">
          তাকে অন্য বিদ্যালয়ে ভর্তির জন্য এই ছাড়পত্র প্রদান করা হলো। আমরা তার উজ্জ্বল ভবিষ্যৎ কামনা করি।
        </p>
      </div>

      <div class="sig-section">
        <div class="sig-box">
          <div style="height:50px;"></div>
          <div class="sig-line"></div>
          <div class="sig-name">ডাঃ মোঃ আমিনুল ইসলাম</div>
          <div class="sig-qual">
            এম.বি.এস (ব্যবস্থাপনা) ডিআইইএনএস, ঢাকা।<br>
            অধক্ষ্য<br>
            (গোল্ডেন লাইফ পাবলিক স্কুল)<br>
            পাইকরতলী, কাজিপুর, সিরাজগঞ্জ।
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `
  openCertWindow(html, 'ট্রান্সফার সার্টিফিকেট')
}

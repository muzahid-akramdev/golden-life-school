// Generates printable admission form HTML → triggers browser print as PDF

export function generateAdmissionPDF(data: {
  student_name_bn: string
  student_name_en: string
  father_name_bn: string
  father_name_en: string
  father_id?: string
  mother_name_bn: string
  mother_name_en: string
  mother_id?: string
  class_applying: string
  dob?: string
  religion?: string
  nationality?: string
  address_permanent?: string
  address_current?: string
  phone_father?: string
  phone_mother?: string
  father_occupation?: string
  transport?: string
  previous_school?: string
}) {
  const win = window.open('', '_blank')
  if (!win) return

  win.document.write(`
<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<title>ভর্তি আবেদন ফর্ম</title>
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Hind Siliguri', sans-serif; font-size: 13px; color: #000; padding: 24px; }
  .header { text-align: center; margin-bottom: 16px; }
  .school-name { font-size: 18px; font-weight: 700; }
  .sub-info { font-size: 12px; color: #333; margin-top: 4px; }
  .form-title { font-size: 16px; font-weight: 700; text-align: center; border: 2px solid #000; padding: 6px 20px; display: inline-block; margin: 12px 0; }
  .photo-box { float: right; width: 90px; height: 110px; border: 1px solid #000; text-align: center; line-height: 110px; font-size: 11px; }
  .field { margin: 6px 0; display: flex; align-items: flex-end; gap: 4px; }
  .field label { white-space: nowrap; font-size: 12px; min-width: 120px; }
  .field .line { flex: 1; border-bottom: 1px solid #000; min-width: 80px; padding-bottom: 1px; font-size: 13px; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 6px 0; }
  .section-title { font-weight: 700; margin: 12px 0 6px; border-bottom: 1px solid #333; padding-bottom: 3px; }
  .rules { margin-top: 14px; border: 1px solid #333; padding: 8px 12px; font-size: 11px; }
  .rules h4 { font-weight: 700; margin-bottom: 4px; }
  .rules ol { padding-left: 18px; }
  .rules li { margin-bottom: 2px; }
  .sig-area { display: flex; justify-content: space-between; margin-top: 20px; }
  .sig-line { width: 140px; border-bottom: 1px solid #000; text-align: center; padding-top: 4px; font-size: 11px; }
  .clearfix::after { content: ''; display: block; clear: both; }
  @media print { body { padding: 12px; } button { display: none !important; } }
</style>
</head>
<body>
<div class="clearfix">
  <div class="photo-box">ছবি</div>
  <div class="header">
    <div class="school-name">গোল্ডেন লাইফ পাবলিক স্কুল</div>
    <div class="sub-info">পাইকরতলী, কাজিপুর, সিরাজগঞ্জ | স্থাপিতঃ ২০১৫ ইং</div>
    <div class="sub-info">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত | বিদ্যালয় কোডঃ ৪৫০৭৯৫</div>
    <div class="sub-info">পরিচালকঃ ডাঃ মোঃ আমিনুল ইসলাম এম.বি.এস (ব্যবস্থাপনা)</div>
    <div style="margin-top:8px"><div class="form-title">ভর্তি আবেদন ফর্ম</div></div>
  </div>
</div>

<div class="field"><label>১। ছাত্র/ছাত্রীর নামঃ (বাংলায়)</label><div class="line">${data.student_name_bn}</div></div>
<div class="field"><label>&nbsp;&nbsp;&nbsp;ইংরেজিতেঃ</label><div class="line">${data.student_name_en}</div><label style="margin-left:8px">নিবন্ধন নম্বরঃ</label><div class="line" style="min-width:80px"></div></div>

<div class="field"><label>২। পিতা/অভিভাবকের নামঃ (বাংলায়)</label><div class="line">${data.father_name_bn}</div><label style="margin-left:8px">আইডি নম্বরঃ</label><div class="line" style="min-width:80px">${data.father_id||''}</div></div>
<div class="field"><label>&nbsp;&nbsp;&nbsp;ইংরেজিতেঃ</label><div class="line">${data.father_name_en}</div></div>

<div class="field"><label>৩। মাতার নামঃ (বাংলায়)</label><div class="line">${data.mother_name_bn}</div><label style="margin-left:8px">আইডি নম্বরঃ</label><div class="line" style="min-width:80px">${data.mother_id||''}</div></div>
<div class="field"><label>&nbsp;&nbsp;&nbsp;ইংরেজিতেঃ</label><div class="line">${data.mother_name_en}</div></div>

<div class="field"><label>৪। স্থায়ী ঠিকানাঃ</label><div class="line">${data.address_permanent||''}</div></div>
<div class="field"><label>৫। বর্তমান ঠিকানাঃ</label><div class="line">${data.address_current||''}</div></div>

<div class="grid2">
  <div class="field"><label>৬। জন্ম তারিখঃ</label><div class="line">${data.dob||''}</div></div>
  <div class="field"><label>ধর্মঃ</label><div class="line">${data.religion||''}</div></div>
</div>
<div class="grid2">
  <div class="field"><label>৭। পিতার পেশাঃ</label><div class="line">${data.father_occupation||''}</div></div>
  <div class="field"><label>জাতীয়তাঃ</label><div class="line">${data.nationality||'বাংলাদেশী'}</div></div>
</div>
<div class="field"><label>৮। যে শ্রেণিতে ভর্তিচ্ছুঃ</label><div class="line">${data.class_applying}</div></div>
<div class="field"><label>৯। যাতায়াতের মাধ্যমঃ</label><div class="line">${data.transport||'হেঁটে'}</div></div>
<div class="field"><label>১০। পূর্বে অধ্যয়নরত শিক্ষাপ্রতিষ্ঠানের নামঃ</label><div class="line">${data.previous_school||''}</div></div>
<div class="grid2">
  <div class="field"><label>১১। পিতার মোবাইল নম্বরঃ</label><div class="line">${data.phone_father||''}</div></div>
  <div class="field"><label>মাতার মোবাইল নম্বরঃ</label><div class="line">${data.phone_mother||''}</div></div>
</div>

<div class="rules">
  <h4>শিক্ষার্থীর লক্ষ্মীয়ঃ</h4>
  <p style="margin-bottom:6px">আমি অঙ্গীকার করছি যে, এই প্রতিষ্ঠানের নিয়ম-কানুন জেনে এবং তা পালন করার প্রতিশ্রুতি দিয়ে এই প্রতিষ্ঠানে ভর্তির আবেদন করছি।</p>
  <h4>অঙ্গীকারঃ</h4>
  <ol>
    <li>প্রতাহ সমাবেশের পূর্বে বিদ্যালয়ে আগমন করা।</li>
    <li>বিদ্যালয়ের নির্দিষ্ট পোষাক পরিধান করা।</li>
    <li>প্রতিটি মাসের সকল পাওনাদি নির্দিষ্ট সময়ের মধ্যে পরিশোধ করা।</li>
    <li>সহপাঠক্রমিক কার্যাবলী ও জাতীয় দিবসের কর্মসূচিতে অংশগ্রহণ করা।</li>
    <li>বিনা অনুমতিতে বিদ্যালয় থেকে বিরত না থাকা।</li>
    <li>বিনা কারণে অনুপস্থিত না থাকা এবং সার্বিক শৃঙ্খলা বজায় রাখা।</li>
  </ol>
</div>

<div class="sig-area">
  <div class="sig-line">ছাত্র/ছাত্রীর স্বাক্ষর<br>তারিখঃ __________</div>
  <div style="text-align:right">
    <div style="font-weight:700">ডাঃ মোঃ আমিনুল ইসলাম</div>
    <div style="font-size:11px">এম.বি.এস (ব্যবস্থাপনা)</div>
    <div style="font-size:11px">অধক্ষ্য</div>
    <div style="font-size:11px">গোল্ডেন লাইফ কিডার গার্ডেন এ্যান্ড পাবলিক হাইস্কুল</div>
    <div style="font-size:11px">পাইকরতলী, কাজিপুর, সিরাজগঞ্জ</div>
  </div>
</div>

<div style="margin-top:16px;border:1px solid #333;padding:8px 12px;font-size:11px">
  <h4 style="font-weight:700;margin-bottom:4px">সংযুক্তিঃ</h4>
  <ol style="padding-left:18px">
    <li>পাসপোর্ট সাইজ রঙিন ছবি ৩ কপি।</li>
    <li>জন্ম নিবন্ধন সনদপত্র ১ কপি।</li>
    <li>প্রশংসা পত্র / প্রত্যয়ন পত্র ১ কপি।</li>
    <li>পিতা-মাতার আইডি কার্ডের ফটোকপি ১ কপি।</li>
  </ol>
</div>

<button onclick="window.print()" style="margin-top:16px;background:#1D5FA8;color:white;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;font-size:14px;font-family:'Hind Siliguri',sans-serif">
  🖨️ প্রিন্ট / PDF ডাউনলোড
</button>

</body>
</html>
  `)
  win.document.close()
}

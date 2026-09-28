(function(){
/* ---------------- DATA: timetables transcribed from the attached sheets ---------------- */
const r = s => s.trim().split(/\s+/).map(x => x === '.' ? '' : x);
const PT = ['9:00','9:50','10:50','11:40','12:30','1:20','2:10','3:10','4:00'];
const SECTIONS = {
 'III-ECE-A': { label:'III Year ECE-A', sem:'V Semester', venue:'IST 518/FN',
  subj:{
   A:['Discrete Mathematics','21MAB302T','New Faculty 3'],
   B:['Microprocessor, Microcontroller & Interfacing Techniques','21ECC301P','Dr. M. Manikandan'],
   C:['VLSI Design and Technology','21ECC303T','Dr. M. Jothi'],
   D:['System and Network on Chip','21ECE468T','Dr. V. Manikandan'],
   E:['Machine Learning for All','21CSO355T','Dr. J. Jencia'],
   F:['Community Connect','21GNP301L','Dr. V. Rajesh / Dr. V. Bharathi'],
   G:['Analytical and Logical Thinking Skills','21PDM301L','CDC / 625'],
   H:['Indian Art Form','21LEM301T','Dr. K. Vigneshwaran'],
   L:['VLSI Design / Microprocessor Laboratory','21ECC311L','Dr. M. Jothi, Dr. P. Murugapandiyan, Dr. V. Manikandan']},
  tt:{Mon:r('E B B A . G G . .'),Tue:r('H D B B . . G . .'),Wed:r('C A D F . . . L L'),Thu:r('A E C F . . . . .'),Fri:r('D A E C . L L . .')}},
 'III-ECE-B': { label:'III Year ECE-B', sem:'V Semester', venue:'IST 518/AN',
  subj:{
   A:['Discrete Mathematics','21MAB302T','Dr. M. Thanga Rejini'],
   B:['Microprocessor, Microcontroller & Interfacing Techniques','21ECC301P','Mrs. B. Abirami'],
   C:['VLSI Design and Technology','21ECC303T','Dr. R. Vinoth Raj'],
   D:['System and Network on Chip','21ECE468T','Dr. V. Manikandan'],
   E:['Machine Learning for All','21CSO355T','Dr. J. Jencia'],
   F:['Community Connect','21GNP301L','Dr. H. Sudharsan / Ms. T. Swetha'],
   G:['Analytical and Logical Thinking Skills','21PDM301L','CDC / 625'],
   H:['Indian Art Form','21LEM301T','Dr. A. Anand'],
   L:['VLSI Design / Microprocessor Laboratory','21ECC311L','Dr. Sreenivasa Ijada Rao, Dr. B. DeviSri, Dr. Prassanna Venkatesh']},
  tt:{Mon:r('L L . . . E B A D'),Tue:r('G G . . . F B D C'),Wed:r('G . . . . B B A H'),Thu:r('L L . . . A C E F'),Fri:r('. . . . . C A E D')}},
 'III-ECE-DS': { label:'III Year ECE-DS', sem:'V Semester', venue:'IST 519/FN',
  subj:{
   A:['Discrete Mathematics','21MAB302T','New Faculty 2'],
   B:['Microprocessor, Microcontroller & Interfacing Techniques','21ECC301P','Mrs. B. Abirami'],
   C:['VLSI Design and Technology','21ECC303T','Dr. R. Vinoth Raj'],
   D:['Machine Learning for All','21CSO355T','Dr. Chitra Devi'],
   E:['Database Design and Management','21ECE371T','Dr. S. Saraswathi'],
   F:['Community Connect','21GNP301L','Dr. S. Jeevanantham / Dr. V. Manikandan'],
   G:['Analytical and Logical Thinking Skills','21PDM301L','CDC / 625'],
   H:['Indian Art Form','21LEM301T','Dr. Prabin Kumar Bera'],
   L:['VLSI Design / Microprocessor Laboratory','21ECC311L','Dr. R. Vinothraj / Dr. H. Sri Bhuvaneshwari']},
  tt:{Mon:r('E B C A . . . . .'),Tue:r('C B D F . L L . .'),Wed:r('H B A C . . . G G'),Thu:r('A D E F . . . . .'),Fri:r('D A E B . G . L L')}},
 'III-BME': { label:'III Year BME', sem:'V Semester', venue:'IST 211/AN',
  subj:{
   A:['Probability and Statistics','21MAB301T','Dr. K. M. Karuppusamy'],
   B:['Microcontrollers and Its Application in Medicine','21BMC302J','Dr. K. Vigneshwaran'],
   C:['Biomedical Signal Processing','21BMC301J','Dr. V. N. Senthilkumaran'],
   D:['Biometrics','21BME266T','Dr. G. Gifta'],
   E:['Modern Wireless Communication System','21ECO103T','Dr. Vaishnavi'],
   F:['Principles of Medical Imaging','21BMC303T','Dr. N. Prasanna Venkatesh'],
   G:['Analytical and Logical Thinking Skills','21PDM301L','CDC / 625'],
   H:['Indian Art Form','21LEM301T','Dr. G. Gifta'],
   I:['Community Connect','21GNP301L','Dr. J. Jencia / Dr. N. Prasanna Venkatesh'],
   M:['MPMC Lab (Microcontrollers)','21BMC302J','Lab slot, LAB-107'],
   P:['Bio DSP Lab (Signal Processing)','21BMC301J','Lab slot, LAB-108']},
  tt:{Mon:r('G G M M . E B F H'),Tue:r('P P G . . C D A B'),Wed:r('. . . . . C A F D'),Thu:r('. . . I . A C E B'),Fri:r('I . . . . F A D E')}},
 'IV-ECE-A': { label:'IV Year ECE-A', sem:'VII Semester', venue:'IST 225',
  subj:{
   A:['Behavioural Psychology','21GNH401T','Dr. A. Anand'],
   B:['Wireless Communication and Antenna Systems','21ECC401T','Dr. K. Vigneshwaran'],
   C:['Computer Communication and Network Security','21ECC402P','Dr. S. Jeevanantham'],
   D:['Semiconductor Memory Design','21ECE461T','Dr. H. Sri Bhuvaneshwari'],
   E:['Scripting Language for Electronic Design Automation','21ECE463T','Dr. Sreenivasa Rao Ijada'],
   F:['Machine Learning for All','21CSO355T','Dr. N. Prasanna Venkatesh'],
   L:['Computer Communication and Network Security Lab','21ECC402P','Mrs. T. Swetha']},
  tt:{Mon:r('C . A D . . . . .'),Tue:r('C D B F . . . . .'),Wed:r('B L E F . . . . .'),Thu:r('F A E B . . . . .'),Fri:r('C A D E . . . . .')}},
 'IV-ECE-B': { label:'IV Year ECE-B', sem:'VII Semester', venue:'IST 227',
  subj:{
   A:['Behavioural Psychology','21GNH401T','Dr. A. Annand'],
   B:['Wireless Communication and Antenna Systems','21ECC401T','Dr. K. Vigneshwaran'],
   C:['Computer Communication and Network Security','21ECC402P','Dr. R. Rajasekar'],
   D:['Semiconductor Memory Design','21ECE461T','Dr. H. Sri Bhuvaneshwari'],
   E:['Scripting Language for Electronic Design Automation','21ECE463T','Dr. Sreenivasa Rao Ijada'],
   F:['Machine Learning for All','21CSO355T','Dr. N. Prasanna Venkatesh'],
   L:['Computer Communication and Network Security Lab','21ECC402P','Ms. T. Swetha']},
  tt:{Mon:r('C A E F . . . . .'),Tue:r('C E F B . . . . .'),Wed:r('C D A B . . . . .'),Thu:r('D B L A . . . . .'),Fri:r('E D F . . . . . .')}},
 'II-ECE-DS-B': { label:'II Year ECE-DS B', sem:'III Semester', venue:'IST 411/AN',
  subj:{
   A:['Transforms and Boundary Value Problems','21MAB201T','New Faculty 3'],
   B:['Solid State Devices','21ECC201T','Dr. S. Jeevanantham'],
   C:['Computer Organization and Architecture','21CSS201T','Dr. P. Murugapandiyan'],
   D:['Digital Logic Design','21ECC203T','Dr. S. Krishnakumar'],
   E:['Electromagnetic Theory and Interference','21ECC205T','Dr. V. Bharathi'],
   F:['Professional Ethics','21LEM201T','Dr. K. Vigneshwaran'],
   G:['Universal Human Values-II','21LEM202T','Mrs. D. Lavanya'],
   H:['Verbal Reasoning','21PDM201L','CDC / TB-106'],
   I:['Social Engineering','21PDH209T','Mrs. D. Lavanya'],
   L:['Devices and Digital IC Laboratory','21ECC211L','Dr. S. Krishnakumar']},
  tt:{Mon:r('. . L L . D B C I'),Tue:r('L L . . . C D E A'),Wed:r('G . . . . I E A D'),Thu:r('G G H H . A C B E'),Fri:r('H . . . . F A B C')}}
};
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const PAL = ['#2b7fe0','#0fa3b8','#6a6fe8','#1a8fd0','#8a63e0','#17a08b','#3a70cc','#3aa0e8','#7a80c8','#1fb0cc','#5a80b0'];

/* ---------------- helpers ---------------- */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad = n => String(n).padStart(2,'0');
const ymd = d => d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const pd = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y,m-1,d); };
const addD = (d,n) => { const x = new Date(d.getFullYear(),d.getMonth(),d.getDate()); x.setDate(x.getDate()+n); return x; };
const fmt = d => d.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
const fmtS = d => d.toLocaleDateString('en-IN',{day:'numeric',month:'short'});
const f1 = n => (Math.round(n*10)/10).toFixed(1);
const realToday = () => { const n = new Date(); return new Date(n.getFullYear(),n.getMonth(),n.getDate()); };

let st = {
  section:'III-ECE-A', today:ymd(realToday()), plan:ymd(addD(realToday(),7)), thr:75, tgt:90,
  start:'2026-07-20', end:'2026-10-31', holidays:'2026-10-02, 2026-10-19, 2026-10-20',
  pct:{}, od:{from:'',to:'',mode:'present',rest:'all'}
};
try { const saved = JSON.parse(localStorage.getItem('attCompass') || 'null'); if (saved && SECTIONS[saved.section]) { st = Object.assign(st, saved); st.today = ymd(realToday()); if (pd(st.plan) < realToday()) st.plan = ymd(addD(realToday(),7)); } } catch(e){}
const save = () => { try { localStorage.setItem('attCompass', JSON.stringify(st)); } catch(e){} };

const holSet = () => new Set(st.holidays.split(/[\s,;]+/).filter(x => /^\d{4}-\d{2}-\d{2}$/.test(x)));
function countRange(sec, from, to){
  const out = {}; if (!from || !to || from > to) return out; const H = holSet();
  for (let d = new Date(from); d <= to; d = addD(d,1)){
    const w = d.getDay(); if (w < 1 || w > 5 || H.has(ymd(d))) continue;
    for (const k of sec.tt[DAYS[w]]) if (k) out[k] = (out[k]||0) + 1;
  }
  return out;
}
const getPct = k => { const v = st.pct[st.section] && st.pct[st.section][k]; return (v === undefined || v === '' || isNaN(v)) ? 80 : Number(v); };
const needFor = (th,a,c,r) => Math.max(0, Math.ceil(th/100*(c+r) - a - 1e-9));

/* ---------------- core analysis ---------------- */
function analyze(){
  const sec = SECTIONS[st.section], today = pd(st.today), start = pd(st.start), end = pd(st.end), plan = pd(st.plan);
  const cr = (f,t) => countRange(sec, new Date(Math.max(f,start)), new Date(Math.min(t,end)));
  const C = cr(start, addD(today,-1)), R = cr(today, end), P = cr(today, plan);
  const keys = Object.keys(sec.subj);
  const thr = st.thr, tgt = st.tgt;
  const rows = keys.map(k => {
    const c = C[k]||0, r = R[k]||0, p = P[k]||0;
    const pct = c ? getPct(k) : 100;
    const a = c ? Math.min(c, Math.round(pct*c/100)) : 0;
    return mk(k, sec.subj[k], a, c, r, p, pct, thr, tgt);
  });
  const sum = f => rows.reduce((s,x)=>s+f(x),0);
  const a = sum(x=>x.a), c = sum(x=>x.c), r = sum(x=>x.r), p = sum(x=>x.p);
  const overall = mk('ALL',['Overall','',''], a, c, r, p, c? a/c*100 : 100, thr, tgt);
  return {sec, rows, overall, cr, today, start, end, plan, keys, C, R, P};
}
function mk(k, meta, a, c, r, p, pct, thr, tgt){
  const need = needFor(thr,a,c,r), imp = need > r;
  const need90 = needFor(tgt,a,c,r), imp90 = need90 > r;
  const maxFinal = (c+r) ? (a+r)/(c+r)*100 : 100;
  const consec = pct >= tgt ? 0 : Math.ceil((tgt/100*c - a)/(1 - tgt/100) - 1e-9);
  let status = 'ok';
  if (imp && c) status = 'dead'; else if (pct < thr) status = 'bad'; else if (pct < thr + 5) status = 'mid'; else if (pct >= tgt) status = 'great';
  return {k, name:meta[0], code:meta[1], fac:meta[2], a, c, r, p, pct, need, imp, canMiss: imp?0:r-need,
    need90, imp90, canMiss90: imp90?0:r-need90, maxFinal, consec, status,
    attAll: (c+p)? (a+p)/(c+p)*100 : 100, skipAll: (c+p)? a/(c+p)*100 : 100, weekly: 0};
}
const STAT = {dead:['IRREVERSIBLE','t-dead'],bad:['DANGER','t-bad'],mid:['BORDERLINE','t-mid'],ok:['SAFE','t-ok'],great:['EXCELLENT','t-great']};
const tag = s => `<span class="tag ${STAT[s][1]}">${STAT[s][0]}</span>`;

/* ---------------- UI: inputs ---------------- */
function buildSectionSelect(){
  $('#section').innerHTML = Object.entries(SECTIONS).map(([k,v]) => `<option value="${k}">${esc(v.label)} (${esc(v.sem)})</option>`).join('');
  $('#section').value = st.section;
}
function buildSubjects(){
  const sec = SECTIONS[st.section];
  st.pct[st.section] = st.pct[st.section] || {};
  $('#subs').innerHTML = Object.entries(sec.subj).map(([k,m]) => {
    const v = getPct(k);
    return `<div class="sub"><span class="k px">${k}</span><h4>${esc(m[0])}</h4><small>${esc(m[1])} · ${esc(m[2])}</small>
      <div class="row"><input type="range" min="0" max="100" step="0.5" value="${v}" data-k="${k}" data-t="r" aria-label="${esc(m[0])} attendance slider">
      <input type="number" min="0" max="100" step="0.5" value="${v}" data-k="${k}" data-t="n" aria-label="${esc(m[0])} attendance percent"><b>%</b></div>
      <div class="calc" id="calc-${k}"></div></div>`;
  }).join('');
}
function bindInputs(){
  $('#subs').addEventListener('input', e => {
    const t = e.target; if (!t.dataset.k) return;
    let v = parseFloat(t.value); if (isNaN(v)) v = 0; v = Math.max(0, Math.min(100, v));
    st.pct[st.section][t.dataset.k] = v;
    const twin = document.querySelector(`#subs input[data-k="${t.dataset.k}"][data-t="${t.dataset.t==='r'?'n':'r'}"]`);
    if (twin) twin.value = v;
    update();
  });
  $('#section').onchange = e => { st.section = e.target.value; buildSubjects(); update(); };
  $('#today').onchange = e => { if (e.target.value) { st.today = e.target.value; if (pd(st.plan) < pd(st.today)) st.plan = st.today; sync(); update(); } };
  $('#plan').onchange = e => { if (e.target.value) { st.plan = e.target.value; update(); } };
  $('#thr').oninput = e => { st.thr = Math.max(1, Math.min(100, +e.target.value || 75)); update(); };
  $('#tgt').oninput = e => { st.tgt = Math.max(1, Math.min(100, +e.target.value || 90)); update(); };
  $('#start').onchange = e => { if (e.target.value) { st.start = e.target.value; update(); } };
  $('#end').onchange = e => { if (e.target.value) { st.end = e.target.value; update(); } };
  $('#hol').oninput = e => { st.holidays = e.target.value; update(); };
  $('#fillb').onclick = () => {
    const v = parseFloat($('#fillv').value); if (isNaN(v)) return;
    const c = Math.max(0, Math.min(100, v));
    Object.keys(SECTIONS[st.section].subj).forEach(k => st.pct[st.section][k] = c);
    buildSubjects(); update();
  };
  ['odFrom','odTo','odMode','odRest'].forEach(id => $('#'+id).addEventListener('input', () => {
    st.od = {from:$('#odFrom').value, to:$('#odTo').value, mode:$('#odMode').value, rest:$('#odRest').value}; renderOD(analyze());
  }));
}
function sync(){
  $('#today').value = st.today; $('#plan').value = st.plan; $('#plan').min = st.today;
  $('#thr').value = st.thr; $('#tgt').value = st.tgt; $('#start').value = st.start; $('#end').value = st.end; $('#hol').value = st.holidays;
  $('#odFrom').value = st.od.from; $('#odTo').value = st.od.to; $('#odMode').value = st.od.mode; $('#odRest').value = st.od.rest;
  $('#todayLabel').textContent = fmt(pd(st.today));
}

/* ---------------- UI: results ---------------- */
function update(){
  const A = analyze(); window.__A = A; save();
  const o = A.overall, thr = st.thr, tgt = st.tgt;
  $('#semLabel').textContent = `${A.sec.label} · ${A.sec.sem} · ${A.sec.venue}`;
  A.rows.forEach(x => {
    const el = $('#calc-'+x.k); if (!el) return;
    el.innerHTML = x.c ? `${x.c} held so far, about ${x.a} attended · ${x.r} left · ${tag(x.status)}` : `No classes held yet · ${x.r} left`;
  });
  $('#kpis').innerHTML = [
    [o.r, 'classes left in the semester (all subjects)', ''],
    [o.p, `classes between today and ${fmtS(A.plan)}`, ''],
    [f1(o.pct)+'%', 'overall attendance right now', o.pct < thr ? 'bad' : 'good'],
    [o.imp ? 'Locked' : o.need, o.imp ? `overall ${thr}% cannot be reached any more` : `of ${o.r} remaining classes you must attend to stay at ${thr}% overall`, o.imp?'bad':''],
    [o.imp ? 0 : o.canMiss, `classes you can still miss overall and end at ${thr}%`, ''],
    [f1(o.maxFinal)+'%', 'best final overall % if you attend everything left', '']
  ].map(([n,l,c]) => `<div class="kpi"><div class="n px ${c}">${n}</div><div class="l">${l}</div></div>`).join('');

  /* warning system */
  const dead = A.rows.filter(x => x.status === 'dead'), risky = A.rows.filter(x => x.status === 'bad' || x.status === 'mid');
  let al = '';
  if (dead.length || (o.imp && o.c)) {
    al += `<div class="alert-dead" role="alert"><h3 class="px">IRREVERSIBLE DETENTION</h3>
      <div>Even if you attend every single class until ${fmt(A.end)}, you cannot get back to ${thr}% in:</div><ul>` +
      (o.imp && o.c ? `<li><b>Overall attendance</b> (best possible ${f1(o.maxFinal)}%)</li>` : '') +
      dead.map(x => `<li><b>${esc(x.name)}</b> (${x.k}): now ${f1(x.pct)}%, best possible ${f1(x.maxFinal)}%</li>`).join('') +
      `</ul><div style="margin-top:8px">Talk to your class advisor about condonation or medical documents today.</div></div>`;
  }
  const bad = A.rows.filter(x => x.status === 'bad');
  if (bad.length) al += `<div class="alert-risk"><b>In the danger zone but still recoverable:</b> ` + bad.map(x => `${esc(x.name)} (need ${x.need} of ${x.r})`).join(', ') + '.</div>';
  else if (!dead.length) al += `<div class="alert-ok"><b>No subject is below ${thr}% right now.</b> Check the "can miss" column before planning any leave.</div>`;
  $('#alerts').innerHTML = al;

  /* table */
  const g90 = x => {
    if (x.pct >= tgt) return x.imp90 ? `Slipping: attend ${x.need90} of ${x.r}` : `Can miss up to <b>${x.canMiss90}</b> and stay at ${tgt}%`;
    if (x.consec <= x.r && !x.imp90) return `Attend the next <b>${x.consec}</b> classes in a row to reach ${tgt}%`;
    return `<span class="bad">Out of reach</span> (max ${f1(x.maxFinal)}%)`;
  };
  const head = `<thead><tr><th>Subject</th><th class="num">Now</th><th class="num">Held</th><th class="num">Left</th><th class="num">Must attend for ${thr}%</th><th class="num">Can miss</th><th>Goal ${tgt}%</th><th class="num">On ${fmtS(A.plan)}<br><small>attend all / skip all</small></th><th>Status</th></tr></thead>`;
  const body = [...A.rows, A.overall].map(x => `<tr${x.k==='ALL'?' style="font-weight:700;background:var(--paper2)"':''}>
    <td>${x.k==='ALL'?'Overall':`<b>${x.k}</b> ${esc(x.name)}<br><small style="color:var(--muted)">${esc(x.fac)}</small>`}</td>
    <td class="num">${f1(x.pct)}%</td><td class="num">${x.c}</td><td class="num">${x.r}</td>
    <td class="num">${x.imp ? '<span class="bad">Impossible</span>' : `${x.need} of ${x.r}`}</td>
    <td class="num">${x.imp?'–':x.canMiss}</td><td>${g90(x)}</td>
    <td class="num">${f1(x.attAll)}% / ${f1(x.skipAll)}%</td><td>${tag(x.status)}</td></tr>`).join('');
  $('#tbl').innerHTML = head + '<tbody>' + body + '</tbody>';
  const nCls = Object.values(A.C).reduce((s,v)=>s+v,0);
  $('#foot1').innerHTML = `Semester window: <b>${fmtS(A.start)}</b> to <b>${fmtS(A.end)}</b> · ${holSet().size} holiday(s) skipped · ${nCls} class periods held before today. Classes today count as "left".`;

  charts(A); renderOD(A); renderTT(A);
}

/* ---------------- charts (inline SVG) ---------------- */
function zoneColor(p){ return p < st.thr ? 'var(--red)' : p < st.thr + 5 ? 'var(--orange)' : 'var(--green)'; }
function charts(A){
  const o = A.overall, p = Math.max(0, Math.min(100, o.pct)), C = 2*Math.PI*54;
  $('#cDonut').innerHTML = `<svg viewBox="0 0 320 190" role="img" aria-label="Overall attendance ${f1(o.pct)} percent">
    <g transform="translate(95,95)"><circle r="54" fill="none" stroke="var(--line)" stroke-width="18"/>
    <circle r="54" fill="none" stroke="${zoneColor(o.pct)}" stroke-width="18" stroke-dasharray="${C*p/100} ${C}" transform="rotate(-90)"/>
    <text text-anchor="middle" y="6" class="px" style="font-size:26px;fill:var(--ink)">${f1(o.pct)}%</text></g>
    <g style="font-size:13px;fill:var(--ink)"><text x="180" y="52" class="px" style="font-size:17px">${STAT[o.status][0]}</text>
    <text x="180" y="78">Held: ${o.c} · Attended: ~${o.a}</text><text x="180" y="98">Left: ${o.r} classes</text>
    <text x="180" y="118">Best final: ${f1(o.maxFinal)}%</text><text x="180" y="138">Minimum: ${st.thr}%</text></g></svg>`;

  const rows = A.rows, W = 640, H = 270, L = 34, B = 40, T = 14, bw = Math.min(46, (W-L-10)/rows.length - 10), gap = (W-L-10)/rows.length;
  const y = v => T + (H-T-B) * (1 - v/100);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Attendance per subject">`;
  [0,25,50,75,100].forEach(v => s += `<line x1="${L}" x2="${W-6}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${L-6}" y="${y(v)+4}" text-anchor="end" style="font-size:11px;fill:var(--muted)">${v}</text>`);
  rows.forEach((x,i) => {
    const cx = L + gap*i + gap/2;
    s += `<rect x="${cx-bw/2}" y="${y(x.attAll)}" width="${bw}" height="${y(0)-y(x.attAll)}" fill="none" stroke="var(--green)" stroke-width="2" stroke-dasharray="4 3"><title>${esc(x.name)}: ${f1(x.attAll)}% if you attend everything until ${fmtS(A.plan)}</title></rect>`;
    s += `<rect x="${cx-bw/2}" y="${y(x.pct)}" width="${bw}" height="${y(0)-y(x.pct)}" fill="${zoneColor(x.pct)}" opacity=".9"><title>${esc(x.name)}: ${f1(x.pct)}% now</title></rect>`;
    s += `<text x="${cx}" y="${y(x.pct)-4}" text-anchor="middle" style="font-size:11px;fill:var(--ink)">${Math.round(x.pct)}</text>`;
    s += `<text x="${cx}" y="${H-B+18}" text-anchor="middle" class="px" style="font-size:14px;fill:var(--ink)">${x.k}</text>`;
  });
  s += `<line x1="${L}" x2="${W-6}" y1="${y(st.thr)}" y2="${y(st.thr)}" stroke="var(--red)" stroke-width="2" stroke-dasharray="6 4"/><text x="${W-8}" y="${y(st.thr)-4}" text-anchor="end" style="font-size:11px;fill:var(--red)">${st.thr}% minimum</text></svg>`;
  $('#cBars').innerHTML = s;

  /* timeline */
  const days = []; const H2 = holSet(); let ca = 0, ct = 0, cs = 0, cp = 0;
  const cumAll = [], cumSkip = [], cumPlan = [];
  const sec = A.sec;
  for (let d = new Date(A.today); d <= A.end; d = addD(d,1)){
    const w = d.getDay(); let n = 0;
    if (w >= 1 && w <= 5 && !H2.has(ymd(d))) n = sec.tt[DAYS[w]].filter(Boolean).length;
    ct += n; const sk = d <= A.plan ? 0 : n; ca += n; cp += (d <= A.plan ? 0 : n);
    days.push(d);
    cumAll.push((o.a + ca)/(o.c + ct)*100 || 100);
    cumSkip.push(o.a/(o.c + ct)*100 || 100);
    cumPlan.push((o.a + cp)/(o.c + ct)*100 || 100);
  }
  if (days.length < 2){ $('#cLine').innerHTML = '<p style="margin:8px">The semester window has ended, so there is nothing left to chart.</p>'; return; }
  const all = [...cumAll, ...cumSkip, ...cumPlan, st.thr, o.pct]; const lo = Math.max(0, Math.floor(Math.min(...all)/5)*5 - 5), hi = 100;
  const W2 = 900, H2h = 260, L2 = 40, T2 = 12, B2 = 34, n = days.length;
  const X = i => L2 + (W2-L2-10) * i/(n-1), Y = v => T2 + (H2h-T2-B2) * (1 - (v-lo)/(hi-lo));
  const path = a => a.map((v,i)=> (i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(1)).join(' ');
  let t = `<svg viewBox="0 0 ${W2} ${H2h}" role="img" aria-label="Projected overall attendance until semester end">`;
  for (let v = lo; v <= hi; v += 5) t += `<line x1="${L2}" x2="${W2-10}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${L2-6}" y="${Y(v)+4}" text-anchor="end" style="font-size:11px;fill:var(--muted)">${v}</text>`;
  const step = Math.max(1, Math.round(n/8));
  days.forEach((d,i) => { if (i % step === 0 || i === n-1) t += `<text x="${X(i)}" y="${H2h-10}" text-anchor="middle" style="font-size:11px;fill:var(--muted)">${fmtS(d)}</text>`; });
  const pi = days.findIndex(d => d >= A.plan); 
  if (pi > 0) t += `<line x1="${X(pi)}" x2="${X(pi)}" y1="${T2}" y2="${H2h-B2}" stroke="var(--muted)" stroke-dasharray="3 3"/><text x="${X(pi)+4}" y="${T2+10}" style="font-size:11px;fill:var(--muted)">planning date</text>`;
  t += `<line x1="${L2}" x2="${W2-10}" y1="${Y(st.thr)}" y2="${Y(st.thr)}" stroke="var(--red)" stroke-width="2" stroke-dasharray="6 4"/>`;
  t += `<path d="${path(cumSkip)}" fill="none" stroke="var(--red)" stroke-width="3"/><path d="${path(cumPlan)}" fill="none" stroke="var(--gold)" stroke-width="3"/><path d="${path(cumAll)}" fill="none" stroke="var(--green)" stroke-width="3"/></svg>`;
  $('#cLine').innerHTML = t;
}

/* ---------------- OD simulator ---------------- */
function simulate(A, from, to, mode, rest){
  const out = [];
  const sec = A.sec, start = A.start, end = A.end, today = A.today;
  const cl = (f,t) => A.cr(f,t);
  const pastLeave = cl(from, addD(today,-1)), futLeave = cl(new Date(Math.max(from,today)), to);
  [...A.rows, A.overall].forEach(x => {
    let inPast, inFut, rem = x.r;
    if (x.k === 'ALL'){ inPast = Object.values(pastLeave).reduce((s,v)=>s+v,0); inFut = Object.values(futLeave).reduce((s,v)=>s+v,0); }
    else { inPast = pastLeave[x.k]||0; inFut = futLeave[x.k]||0; }
    const others = rem - inFut, total = x.c + x.r;
    let att = x.a;
    if (mode === 'present'){ att += Math.min(inPast, x.c - x.a) + inFut; }
    if (rest === 'all') att += others;
    att = Math.min(att, total);
    const base = total ? (x.a + x.r)/total*100 : 100;
    out.push({x, inPast, inFut, final: total ? att/total*100 : 100, base});
  });
  return out;
}
function renderOD(A){
  const box = $('#odOut'); const f = st.od.from, t = st.od.to;
  if (!f || !t){ box.innerHTML = '<p class="note">Pick a start and end date to see the new final percentage. Try a few days from tomorrow.</p>'; return; }
  const from = pd(f), to = pd(t);
  if (to < from){ box.innerHTML = '<p class="note warn">The leave end date is before the start date.</p>'; return; }
  const res = simulate(A, from, to, st.od.mode, st.od.rest);
  const all = res[res.length-1];
  const missed = all.inPast + all.inFut;
  const rows = res.slice(0,-1).map(s => {
    const d = s.final - s.x.pct, below = s.final < st.thr;
    return `<tr><td><b>${s.x.k}</b> ${esc(s.x.name)}</td><td class="num">${s.inPast + s.inFut}</td><td class="num">${f1(s.x.pct)}%</td><td class="num"><b class="${below?'bad':'good'}">${f1(s.final)}%</b></td><td class="num">${d>=0?'+':''}${f1(d)}</td><td>${below?'<span class="tag t-bad">BELOW '+st.thr+'%</span>':'<span class="tag t-ok">OK</span>'}</td></tr>`;
  }).join('');
  box.innerHTML = `<div class="kpis" style="margin-bottom:12px">
    <div class="kpi"><div class="n px">${missed}</div><div class="l">class periods fall inside ${fmtS(from)} to ${fmtS(to)}</div></div>
    <div class="kpi"><div class="n px ${all.final<st.thr?'bad':'good'}">${f1(all.final)}%</div><div class="l">final overall % at semester end (was ${f1(A.overall.pct)}% today)</div></div>
    <div class="kpi"><div class="n px">${f1(all.base)}%</div><div class="l">final overall % with no leave at all, attending everything</div></div></div>
    <div class="tw"><table style="min-width:620px"><thead><tr><th>Subject</th><th class="num">Classes in leave</th><th class="num">Now</th><th class="num">Final %</th><th class="num">Change</th><th>Verdict</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

/* ---------------- timetable ---------------- */
function renderTT(A){
  const keys = A.keys, col = k => PAL[keys.indexOf(k) % PAL.length];
  let h = '<thead><tr><th>Day</th>' + PT.map((t,i) => `<th>P${i+1}<br><small>${t}</small></th>`).join('') + '</tr></thead><tbody>';
  ['Mon','Tue','Wed','Thu','Fri'].forEach(d => {
    h += `<tr><th>${d}</th>` + A.sec.tt[d].map((k,i) => i===4 ? '<td class="lunch">LUNCH</td>' : k ? `<td><div class="cell px" style="background:${col(k)}" title="${esc(A.sec.subj[k][0])}">${k}</div></td>` : '<td style="color:var(--line)">·</td>').join('') + '</tr>';
  });
  $('#ttbl').innerHTML = h + '</tbody>';
  $('#ttleg').innerHTML = keys.map(k => `<span><i style="background:${col(k)}"></i><b>${k}</b> ${esc(A.sec.subj[k][0])}</span>`).join('');
}

/* ---------------- Attendance Advisor chatbot (reads the dashboard state, runs the math) ---------------- */
const STOP = new Set(['and','its','for','all','application','systems','design','technology','techniques','laboratory','theory','skills','value','values','problems','logical','thinking','form','community','connect','microcontroller','microcontrollers','interfacing','language','electronic','automation','boundary','organization','architecture','communication','principles']);
const ALIAS = {discrete:['maths','math','dm'],microprocessor:['mpmc','microprocessor'],vlsi:['vlsi'],machine:['ml','machine learning'],'system and network':['soc','noc'],analytical:['alts','aptitude'],'indian art':['art'],'community connect':['cc','community'],'digital logic':['dld'],database:['dbms','database'],'computer organization':['coa'],electromagnetic:['emti','em'],'universal human':['uhv'],probability:['probability','stats','statistics'],behavioural:['psychology','behavioural','behavioral'],wireless:['antenna','wireless'],'network security':['cn','ccns','cyber','network security'],scripting:['eda','scripting'],semiconductor:['memory','semiconductor'],biometrics:['biometrics'],'medical imaging':['imaging'],'signal processing':['dsp','signal'],'solid state':['ssd','solid state'],transforms:['transforms','bvp'],ethics:['ethics'],verbal:['verbal'],social:['social engineering'],'microcontrollers and':['mcu']};
function subjectMatches(q, sec){
  const hit = [];
  const slot = q.match(/\bslot\s+([a-i])\b/); 
  for (const [k,m] of Object.entries(sec.subj)){
    const nm = m[0].toLowerCase(); let ok = false;
    if (slot && slot[1].toUpperCase() === k) ok = true;
    nm.split(/[^a-z]+/).filter(w => w.length >= 4 && !STOP.has(w)).forEach(w => { if (new RegExp('\\b'+w).test(q)) ok = true; });
    for (const [key,al] of Object.entries(ALIAS)) if (nm.includes(key)) al.forEach(a => { if (new RegExp('\\b'+a.replace(/ /g,'\\s+')+'\\b').test(q)) ok = true; });
    if (/\blab\b/.test(q) && /lab/.test(nm)) ok = true;
    if (ok) hit.push(k);
  }
  return hit;
}
const NUMW = {one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,a:1};
function parseDate(q, today){
  const M = {jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,sept:8,oct:9,nov:10,dec:11};
  if (/day after tomorrow/.test(q)) return addD(today,2);
  if (/tomorrow/.test(q)) return addD(today,1);
  if (/\btoday\b|\bnow\b/.test(q)) return today;
  if (/next week/.test(q)) return addD(today, 8 - (today.getDay()||7));
  const wd = q.match(/\b(mon|tues?|wed(?:nes)?|thu(?:rs)?|fri|sat(?:ur)?|sun)(?:day)?\b/);
  let m = q.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s*(?:of\s+)?(jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec)[a-z]*\b/);
  if (m) return new Date(today.getFullYear(), M[m[2]], +m[1]);
  m = q.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec)[a-z]*\s+(\d{1,2})(?:st|nd|rd|th)?\b/);
  if (m) return new Date(today.getFullYear(), M[m[1]], +m[2]);
  m = q.match(/\b(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?\b/);
  if (m) return new Date(m[3] ? (+m[3] < 100 ? 2000 + +m[3] : +m[3]) : today.getFullYear(), +m[2]-1, +m[1]);
  if (wd){ const map = {sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6}; const t = map[wd[1].slice(0,3)]; let diff = (t - today.getDay() + 7) % 7; if (diff === 0) diff = 7; return addD(today, diff); }
  return null;
}
function parseDays(q){
  let m = q.match(/(\d+|one|two|three|four|five|six|seven|eight|nine|ten|a)[\s-]*(?:day|days)\b/);
  if (m) return NUMW[m[1]] || +m[1];
  m = q.match(/(\d+|one|two|three|four|a)[\s-]*(?:week|weeks)\b/);
  if (m) return 7 * (NUMW[m[1]] || +m[1]);
  if (/\bweek\b/.test(q)) return 7;
  return 0;
}
const B = t => `<b>${t}</b>`;
function botReply(raw){
  const A = analyze(); window.__A = A;
  const q = raw.toLowerCase(), sec = A.sec, thr = (q.match(/(\d{2,3})\s*%/) || q.match(/below\s+(\d{2,3})\b/) || [])[1] ? +((q.match(/(\d{2,3})\s*%/) || q.match(/below\s+(\d{2,3})\b/))[1]) : st.thr;
  let keys = subjectMatches(q, sec);
  const cand = (q.match(/([a-z]+)\s+attendance\b/) || q.match(/\bin\s+([a-z]+)\s+(?:class|classes|subject)\b/) || [])[1];
  const generic = new Set(['my','the','overall','total','current','this','our','your','final','all','each','every','any','these','those','next','that','those','remaining','upcoming','future','over','whole','minimum','required','projected','average','percentage','present','good','low','high','and','of','is','what','whats','will','does','did','do','are']);
  if (!keys.length && cand && !generic.has(cand))
    return `I could not find a subject called "${esc(cand)}" in ${esc(sec.label)}. Your subjects are:<ul>${Object.entries(sec.subj).map(([k,m])=>`<li>${k}: ${esc(m[0])}</li>`).join('')}</ul>Ask again with one of those names.`;
  const scope = keys.length ? keys : A.keys;
  const rowOf = k => A.rows.find(x => x.k === k);
  const today = A.today;

  const nDays = parseDays(q), d0 = parseDate(q, today);
  const leaveWord = /leave|sick|absent|ill|fever|holiday|vacation|trip|od\b|on.duty|medical|away|skip|miss|bunk|cut|off\b/.test(q);
  const classN = q.match(/(\d+)\s*(?:class|classes|period|periods|hours?)/);

  /* leave scenario */
  if ((nDays || d0) && leaveWord && !/how many/.test(q)){
    const from = d0 || addD(today,1), days = nDays || 1, to = addD(from, days-1);
    const od = /\bod\b|on.duty|approved/.test(q);
    const lines = []; let anyBelow = false;
    scope.forEach(k => {
      const x = rowOf(k); if (!x || !x.c) return;
      const inL = (A.cr(from, to)[k]) || 0; if (!inL) { if (keys.length) lines.push(`${B(esc(x.name))}: no ${esc(x.name)} classes fall between ${fmtS(from)} and ${fmtS(to)}, so nothing changes.`); return; }
      const pre = (A.cr(today, addD(from,-1))[k]) || 0;
      const cond = x.c + pre + inL, right = x.a + pre, rightP = x.a + pre + inL;
      const futIn = (A.cr(new Date(Math.max(from,today)), to)[k]) || 0, total = x.c + x.r;
      const finAbs = (x.a + x.r - futIn)/total*100, finPres = (x.a + x.r)/total*100;
      const p1 = right/cond*100, below = p1 < thr, belowF = finAbs < thr;
      if (below || belowF) anyBelow = true;
      lines.push(`${B(esc(x.name))} (${k}): now ${f1(x.pct)}%. You would miss ${inL} class${inL>1?'es':''}. ` +
        (od ? `As approved OD/medical leave: stays ${f1(rightP/cond*100)}% right after, ${f1(finPres)}% at semester end.` :
        `Right after the leave: <span class="${below?'bad':'good'}">${f1(p1)}%</span> ${below?'(below '+thr+'%)':'(still above '+thr+'%)'}. At semester end if you attend everything else: <span class="${belowF?'bad':'good'}">${f1(finAbs)}%</span>. If it is approved as medical/OD: ${f1(finPres)}%.`));
    });
    if (!lines.length) return `No classes are scheduled between ${fmtS(from)} and ${fmtS(to)} (weekends and holidays have none), so your attendance will not change.`;
    return `Leave from ${B(fmt(from))} for ${days} day${days>1?'s':''} (to ${fmtS(to)}), ${thr}% as the limit:<ul>${lines.map(l=>`<li>${l}</li>`).join('')}</ul>` +
      `<span class="v ${anyBelow?'bad':'good'}">${anyBelow ? 'Yes, at least one subject drops below '+thr+'%. Get the leave approved as OD/medical or attend more later.' : 'No, you stay above '+thr+'% in the checked subjects.'}</span>`;
  }

  /* miss N classes of a subject */
  if (classN && leaveWord && keys.length){
    const n = +classN[1];
    return keys.map(k => { const x = rowOf(k); if (!x.c) return ''; const tot = x.c + x.r;
      const nowAfter = x.a/(x.c+n)*100, fin = (x.a + x.r - Math.min(n,x.r))/tot*100;
      return `${B(esc(x.name))}: missing the next ${n} class${n>1?'es':''} takes you to <span class="${nowAfter<thr?'bad':'good'}">${f1(nowAfter)}%</span> straight away and ${f1(fin)}% by the end if you attend the rest.`; }).join('<br>');
  }

  /* how many can I miss / need to attend */
  if (/how many|can i|could i|maximum|max\b|safe to|bunk|skip|miss/.test(q) && !/\battend\b/.test(q.replace(/can i (?:skip|miss)/,''))){
    const out = scope.map(k => { const x = k==='ALL'?A.overall:rowOf(k); const n = needFor(thr,x.a,x.c,x.r);
      return n > x.r ? `${B(esc(x.name))}: ${f1(x.pct)}% now. <span class="bad">Even attending all ${x.r} remaining classes gives ${f1(x.maxFinal)}%, below ${thr}%.</span>`
        : `${B(esc(x.name))}: ${f1(x.pct)}% now. You can miss up to ${B(x.r - n)} of the ${x.r} remaining classes and still finish at ${thr}%.`; });
    return `To end the semester at ${thr}% or better:<ul>${out.map(l=>`<li>${l}</li>`).join('')}</ul>`;
  }
  if (/need|must|have to|should|\battend\b|reach|90|target|goal|recover/.test(q) && !/leave/.test(q)){
    const tg = (q.match(/(\d{2,3})\s*%/)||[])[1] ? +q.match(/(\d{2,3})\s*%/)[1] : (/90|target|goal|reach/.test(q) ? st.tgt : thr);
    const out = scope.map(k => { const x = k==='ALL'?A.overall:rowOf(k); const n = needFor(tg,x.a,x.c,x.r);
      if (n > x.r) return `${B(esc(x.name))}: ${f1(x.pct)}% now. ${tg}% is out of reach (best possible ${f1(x.maxFinal)}%).`;
      const cons = x.pct >= tg ? 0 : Math.ceil((tg/100*x.c - x.a)/(1 - tg/100) - 1e-9);
      return `${B(esc(x.name))}: ${f1(x.pct)}% now. Attend at least ${B(n)} of the ${x.r} remaining classes to end at ${tg}%` + (cons ? `, or ${cons} in a row to reach ${tg}% straight away.` : '. You are already above it.'); });
    return `For ${tg}%:<ul>${out.map(l=>`<li>${l}</li>`).join('')}</ul>`;
  }
  if (/left|remaining|how many classes|working days/.test(q)){
    if (keys.length) return keys.map(k => `${B(esc(rowOf(k).name))}: ${rowOf(k).r} classes left until ${fmtS(A.end)}.`).join('<br>');
    return `${B(A.overall.r)} classes are left between today and ${fmt(A.end)}, ${A.overall.p} of them before ${fmtS(A.plan)}.`;
  }
  /* summary */
  const dead = A.rows.filter(x => x.status==='dead'), low = A.rows.filter(x => x.status==='bad');
  const pick = keys.length ? keys.map(rowOf) : [A.overall];
  let s = pick.map(x => `${B(esc(x.name))}: ${f1(x.pct)}% (${STAT[x.status][0].toLowerCase()}). Need ${x.imp?'more than exist':x.need} of ${x.r} remaining for ${thr}%.`).join('<br>');
  if (!keys.length){
    if (dead.length) s += `<span class="v bad">Irreversible detention risk: ${dead.map(x=>esc(x.name)).join(', ')}.</span>`;
    else if (low.length) s += `<span class="v bad">Below ${thr}%: ${low.map(x=>esc(x.name)).join(', ')}.</span>`;
    else s += `<span class="v good">All subjects are at or above ${thr}%.</span>`;
  }
  return s;
}
function addMsg(html, who){
  const d = document.createElement('div'); d.className = 'cm ' + who; d.innerHTML = html;
  $('#msgs').appendChild(d); $('#msgs').scrollTop = $('#msgs').scrollHeight;
}
function chips(){
  const sec = SECTIONS[st.section], first = Object.values(sec.subj)[0][0];
  const list = [`If I take a 3-day sick leave starting tomorrow, will my ${first} attendance drop below ${st.thr}%?`, 'How many classes can I miss?', `What do I need to reach ${st.tgt}%?`, 'Which subjects are at risk?'];
  $('#achips').innerHTML = list.map(t => `<button type="button">${esc(t)}</button>`).join('');
}
function ask(t){ if (!t.trim()) return; addMsg(esc(t),'me'); setTimeout(() => { try { addMsg(botReply(t),'bot'); } catch(e){ addMsg('Something went wrong reading that. Try asking about a subject, a leave length, or "how many classes can I miss?"','bot'); } }, 250); }
function initChat(){
  addMsg('Hi, I am the Attendance Advisor. I read the numbers on your dashboard and do the maths. Try a question like <i>"If I take a 3-day sick leave starting tomorrow, will my Discrete Mathematics attendance drop below 75%?"</i>','bot');
  chips();
  $('#afab').onclick = () => { const o = $('#chat').classList.toggle('open'); $('#afab').setAttribute('aria-expanded', o); if (o) $('#cin').focus(); };
  $('#chatX').onclick = () => { $('#chat').classList.remove('open'); $('#afab').setAttribute('aria-expanded', false); };
  $('#cform').onsubmit = e => { e.preventDefault(); const v = $('#cin').value; $('#cin').value = ''; ask(v); };
  $('#achips').onclick = e => { if (e.target.tagName === 'BUTTON') ask(e.target.textContent); };
  $('#section').addEventListener('change', chips);
}

/* ---------------- boot ---------------- */
buildSectionSelect(); buildSubjects(); sync(); bindInputs(); initChat(); update();

})();

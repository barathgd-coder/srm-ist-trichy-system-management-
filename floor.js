(function(){
let PZ=false;

const $=s=>document.querySelector(s),DAYN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],OPEN=480,CLOSE=1080;
const f12=m=>{const h=Math.floor(m/60);return(h%12||12)+':'+String(m%60).padStart(2,'0')+' '+(h<12?'AM':'PM')};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let sim=null;const secs=()=>sim?sim.b+(Date.now()-sim.t)/1000:(n=>n.getHours()*3600+n.getMinutes()*60+n.getSeconds())(new Date()),MIN=()=>Math.floor(secs()/60),DAY=()=>sim?sim.d:new Date().getDay();
// ===== DATA (SAMPLE: room registry + schedule are demo config; replace with your imported timetable) =====
const TY=['class','class','class','lab','seminar','class','faculty','class','restroom','stairs'],TN={class:'Classroom',lab:'Programming Laboratory',seminar:'Seminar Hall',faculty:'Faculty Room',restroom:'Restrooms',stairs:'Stairs & Elevator'},CAP={class:60,lab:60,seminar:120,faculty:8};
const FAC=['Dr. Kumar','Prof. Rao','Dr. Iyer'],SUBJ=['Data Structures','Computer Architecture','Mathematics','Operating Systems','Database Systems','Computer Networks','Machine Learning','Software Engineering'];
const STU=[[540,'Data Structures','204'],[600,'Computer Architecture','302'],[660,'Mathematics','108'],[780,'Operating Systems','205']];
const ROOMS=[],SESS={};let kk=0;
for(let f=0;f<6;f++)for(let i=0;i<10;i++){const ty=TY[i],id=(f||'G')+String(i+1).padStart(2,'0'),side=i<5?-1:1,r={id,f,i,ty,name:TN[ty],cap:CAP[ty]??null,x:-7.2+(i%5)*3.6,z:side*3.4,side,book:['class','lab','seminar'].includes(ty),maint:f==4&&i==2};ROOMS.push(r);
 if(r.book){const a=SESS[id]=[],stu=STU.filter(s=>s[2]==id);if(stu.length){for(let d=1;d<6;d++)stu.forEach(s=>a.push({d,s:s[0],e:s[0]+60,name:s[1],fac:FAC[kk%3]}))}else for(let d=1;d<6;d++){if((kk+d)%5==0)continue;const s1=540+((kk+d)%3)*60,s2=780+((kk*2+d)%3)*60,L=ty=='lab'?120:60;a.push({d,s:s1,e:s1+L,name:SUBJ[(kk+d)%8],fac:FAC[kk%3]},{d,s:s2,e:s2+60,name:SUBJ[(kk+d+3)%8],fac:FAC[(kk+1)%3]})}kk++}}
const byId=id=>ROOMS.find(r=>r.id==id),LB={av:'AVAILABLE',occ:'OCCUPIED',soon:'LIMITED',maint:'MAINTENANCE',closed:'CLOSED',na:'NO TIMETABLE'},SH={av:'AVL',occ:'OCC',soon:'SOON',maint:'MNT',closed:'CLS',na:''},CL={av:0x34d399,occ:0xd9534f,soon:0xf5b942,maint:0x7b8794,closed:0x4b5a6d,na:0x3a6a94};
// ===== AVAILABILITY ENGINE (deterministic; AI never decides availability) =====
function st(r,m=MIN(),d=DAY()){if(r.maint)return{k:'maint'};if(!r.book)return{k:'na'};if(d==0||m<OPEN||m>=CLOSE)return{k:'closed'};
 const l=SESS[r.id].filter(x=>x.d==d).sort((a,b)=>a.s-b.s),cur=l.find(x=>x.s<=m&&m<x.e);
 if(cur)return{k:'occ',cur,next:l.find(x=>x.s>=cur.e),until:cur.e};const nx=l.find(x=>x.s>m),u=nx?nx.s:CLOSE;return{k:u-m<=20?'soon':'av',next:nx,until:u}}
const UP={x:7.6,z:0},UF=1,pts=r=>[[UP.x,0],[r.x,0],[r.x,r.side*1.1],[r.x,r.side*2.6]];
const plen=p=>p.reduce((a,q,i)=>i?a+Math.hypot(q[0]-p[i-1][0],q[1]-p[i-1][1]):0,0),dist=r=>Math.round(plen(pts(r))*1.2+Math.abs(r.f-UF)*8);
function ai(q){q=q.toLowerCase();let o={cap:null,f:null,dur:30},m=q.match(/(\d+)\s*(students|people|persons|seats)/);if(m)o.cap=+m[1];if(/ground/.test(q))o.f=0;else if(m=q.match(/floor\s*(\d)|(\d)(?:st|nd|rd|th)\s*floor/))o.f=+(m[1]||m[2]);
 if(m=q.match(/(\d+)\s*(?:hours?|hrs?|h)\b/))o.dur=+m[1]*60;else if(m=q.match(/(\d+)\s*min/))o.dur=+m[1];const M0=MIN();
 return ROOMS.filter(r=>r.book&&r.ty!='faculty'&&(o.cap==null||r.cap>=o.cap)&&(o.f==null||r.f==o.f)).map(r=>{const s=st(r,M0);let ok=false,wait=0;if(s.k=='av'||s.k=='soon')ok=s.until-M0>=o.dur;else if(s.k=='occ'&&s.until-M0<=15){ok=true;wait=s.until-M0}return{r,s,wait,ok,d:dist(r)}}).filter(x=>x.ok).sort((a,b)=>a.wait-b.wait||a.d-b.d).slice(0,3)}
const nextCls=()=>{const d=DAY(),m=MIN();if(d<1||d>5)return null;const s=STU.find(x=>x[0]>m);return s&&{s:s[0],name:s[1],room:s[2]}};
// ===== STATE / 3D =====
let T,ren,sc,cam,G=[],RD=[],cur=1,sel=null,hov=null,mode='hero',flat=false,rt=null,squad=false,SQ=[],usr=[];
const cs={az:-.6,el:.6,d:46,tx:0,tz:0},cg={az:-.6,el:.6,d:46,tx:0,tz:0},RED=matchMedia('(prefers-reduced-motion:reduce)').matches,H=1.5;
function spr(lines,w,h,sz){const c=document.createElement('canvas');c.width=256;c.height=96;const t=new T.CanvasTexture(c),s=new T.Sprite(new T.SpriteMaterial({map:t,depthTest:false,transparent:true}));s.scale.set(w,h,1);s.userData={c,t};drw(s,lines);return s}
function drw(s,l){const c=s.userData.c,x=c.getContext('2d');x.clearRect(0,0,256,96);x.textAlign='center';x.fillStyle='#EAF1FA';x.font='600 40px JetBrains Mono,monospace';x.fillText(l[0],128,44);x.fillStyle='#8FA3BD';x.font='500 24px JetBrains Mono,monospace';x.fillText(l[1]||'',128,80);s.userData.t.needsUpdate=true}
function mkFloor(f){const g=new T.Group();g.userData={o:1,oT:1,y:0,yT:0};const M=(c,o)=>new T.MeshStandardMaterial({color:c,roughness:.8,transparent:true,opacity:o??1});
 const slab=new T.Mesh(new T.BoxGeometry(22,.3,12.6),M(0x0b1626));slab.position.y=-.15;g.add(slab);const ed=new T.LineSegments(new T.EdgesGeometry(slab.geometry),new T.LineBasicMaterial({color:0x2a7fbf,transparent:true,opacity:.6}));ed.position.y=-.15;g.add(ed);
 const cr=new T.Mesh(new T.BoxGeometry(21,.03,2.4),M(0x13233a));cr.position.y=.02;g.add(cr);const dk=[];
 ROOMS.filter(r=>r.f==f).forEach(r=>{const geo=new T.BoxGeometry(3.3,H,4.1),mat=new T.MeshStandardMaterial({color:0x1b2d47,emissive:CL.na,emissiveIntensity:.15,transparent:true,opacity:.4,roughness:.4}),mesh=new T.Mesh(geo,mat);mesh.userData.r=r;g.add(mesh);
  const edge=new T.LineSegments(new T.EdgesGeometry(geo),new T.LineBasicMaterial({color:0x4FD8FF,transparent:true,opacity:.35}));mesh.add(edge);const sp=spr([r.id,''],1.7,.64);sp.position.set(r.x,2.1,r.z);g.add(sp);
  if(r.book&&r.ty!='faculty')for(let a=0;a<3;a++)for(let b=0;b<4;b++)dk.push([r.x-1.05+b*.7,r.z-.9+a*.8]);
  if(r.ty=='stairs'){for(let s=0;s<5;s++){const b=new T.Mesh(new T.BoxGeometry(.6,.2*(s+1),2.6),M(0x6fa3d6));b.position.set(r.x-1.2+s*.5,.1*(s+1),r.z);g.add(b)}const lf=new T.Mesh(new T.BoxGeometry(.7,1.2,.9),M(0x9db4cc));lf.position.set(r.x+1.2,.6,r.z-1);g.add(lf)}
  RD.push({r,mesh,mat,edge,sp,sy:0,lift:0})});
 const im=new T.InstancedMesh(new T.BoxGeometry(.5,.08,.3),M(0x5a86b3),dk.length),o=new T.Object3D();dk.forEach((p,i)=>{o.position.set(p[0],.08,p[1]);o.updateMatrix();im.setMatrixAt(i,o.matrix)});g.add(im);
 const ex=new T.Mesh(new T.BoxGeometry(.5,.5,.1),new T.MeshBasicMaterial({color:0x34d399}));ex.position.set(-10.8,.8,0);g.add(ex);const es=spr([f?'EXIT':'ENTRANCE','emergency'],1.8,.68);es.position.set(-10.8,1.7,0);g.add(es);
 if(f==UF){const u=new T.Mesh(new T.SphereGeometry(.22,16,16),new T.MeshBasicMaterial({color:0x4FD8FF}));u.position.set(UP.x,.3,UP.z);g.add(u);const ring=new T.Mesh(new T.RingGeometry(.4,.5,32),new T.MeshBasicMaterial({color:0x4FD8FF,side:2,transparent:true,opacity:.6}));ring.rotation.x=-Math.PI/2;ring.position.set(UP.x,.05,UP.z);g.add(ring);usr=[ring]}
 return g}
const SQD=[{n:'BARATH',f:1,x:2,z:.4},{n:'ASHIKA',f:2,x:-.5,z:-.2},{n:'NIRANJANA',f:1,x:-6,z:.3}]; // demo positions
function setO(g,o){g.traverse(c=>{if(c.material){const m=c.material,b=m.userData.b??(m.userData.b=m.opacity);m.transparent=true;m.opacity=b*o}});g.visible=o>.02}
function layout(){G.forEach((g,f)=>{const u=g.userData;if(mode=='app'){u.yT=(f-cur)*7;u.oT=f==cur?1:0}else{u.yT=f*2.8-7;u.oT=mode=='hero'?.6:.75}})}
function setView(v){flat=v=='2d';cg.el=v=='3d'?.78:1.5;cg.d=v=='3d'?24:20;document.querySelectorAll('[data-v]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v==v))}
function boot(){T=THREE;const c=$('#c');ren=new T.WebGLRenderer({antialias:true});ren.setPixelRatio(Math.min(devicePixelRatio,2));c.appendChild(ren.domElement);sc=new T.Scene();sc.background=new T.Color(0x060b14);sc.fog=new T.Fog(0x060b14,45,110);cam=new T.PerspectiveCamera(40,1,.1,200);
 sc.add(new T.HemisphereLight(0x9cc8ff,0x0a1220,.95));const dl=new T.DirectionalLight(0xffffff,.7);dl.position.set(8,18,10);sc.add(dl);const gr=new T.GridHelper(90,90,0x12324f,0x0c1c2f);gr.position.y=-9;sc.add(gr);
 for(let f=0;f<6;f++){const g=mkFloor(f);G.push(g);sc.add(g)}
 SQD.forEach(p=>{const m=new T.Mesh(new T.SphereGeometry(.28,16,16),new T.MeshBasicMaterial({color:0xffffff}));m.position.set(p.x,.5,p.z);const s=spr([p.n,''],1.9,.7);s.position.set(p.x,1.4,p.z);m.visible=s.visible=false;G[p.f].add(m,s);SQ.push(m,s)});
 layout();G.forEach(g=>{g.position.y=g.userData.yT;g.userData.y=g.userData.yT;setO(g,g.userData.oT);g.userData.o=g.userData.oT});
 const cv=ren.domElement;let dr=null,mv=0;cv.style.touchAction='none';cv.oncontextmenu=e=>e.preventDefault();
 cv.onpointerdown=e=>{dr={x:e.clientX,y:e.clientY,pan:e.button==2||e.shiftKey};mv=0;cv.setPointerCapture(e.pointerId)};
 cv.onpointermove=e=>{if(dr&&mode!='hero'){const dx=e.clientX-dr.x,dy=e.clientY-dr.y;mv+=Math.abs(dx)+Math.abs(dy);if(dr.pan){const s=cg.d*.002;cg.tx=Math.max(-12,Math.min(12,cg.tx-dx*s*Math.cos(cs.az)-dy*s*Math.sin(cs.az)));cg.tz=Math.max(-8,Math.min(8,cg.tz+dx*s*Math.sin(cs.az)-dy*s*Math.cos(cs.az)))}else{cg.az-=dx*.007;cg.el=Math.max(.3,Math.min(1.55,cg.el+dy*.005))}dr={...dr,x:e.clientX,y:e.clientY}}else if(!dr)hover(e)};
 cv.onpointerup=e=>{const was=mv<6;dr=null;if(was&&mode!='hero'){const p=pick(e);if(p)selectRoom(p.r)}};
 cv.onwheel=e=>{e.preventDefault();cg.d=Math.max(6,Math.min(42,cg.d*(e.deltaY>0?1.08:.92)))};
 addEventListener('resize',rz);rz();let last=performance.now();
 (function fr(now){requestAnimationFrame(fr);const dt=Math.min(.05,(now-last)/1000);last=now;const k=RED?1:1-Math.exp(-dt*7);
  if(mode!='app'&&!RED)cg.az+=dt*.1;for(const p of['az','el','d','tx','tz'])cs[p]+=(cg[p]-cs[p])*k;if(mode!='app')cs.az=cg.az;
  cam.position.set(cs.tx+cs.d*Math.cos(cs.el)*Math.sin(cs.az),cs.d*Math.sin(cs.el),cs.tz+cs.d*Math.cos(cs.el)*Math.cos(cs.az));cam.lookAt(cs.tx,0,cs.tz);
  G.forEach(g=>{const u=g.userData;u.y+=(u.yT-u.y)*k;g.position.y=u.y;if(Math.abs(u.o-u.oT)>.004){u.o+=(u.oT-u.o)*k;setO(g,u.o)}});
  RD.forEach(d=>{const on=d==hov,se=sel==d.r;d.sy+=((flat?.14:1)-d.sy)*k;d.lift+=((on?.35:0)-d.lift)*k;d.mesh.scale.y=d.sy;d.mesh.position.set(d.r.x,H*d.sy/2+d.lift,d.r.z);d.sp.position.y=H*d.sy+.6+d.lift;d.mat.emissiveIntensity=se?.9:on?.6:.15;d.edge.material.color.setHex(se?0x4FD8FF:0x3a6f9a);d.edge.material.opacity=se?1:.35});
  usr.forEach(r=>{const s=1+.3*Math.sin(now/300);r.scale.set(s,s,1)});
  if(rt){rt.p=Math.min(1,rt.p+dt*.7);const n=Math.floor(rt.p*rt.seg)*rt.rad*6;rt.mesh.geometry.setDrawRange(0,n);const q=rt.path.getPointAt(rt.p);rt.dot.position.copy(q);rt.dot.position.y=.3}
  if(!PZ)ren.render(sc,cam)})(last)}
const rz=()=>{ren.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};
function pick(e){const r=ren.domElement.getBoundingClientRect(),rc=new T.Raycaster();rc.setFromCamera(new T.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),cam);const h=rc.intersectObjects(RD.filter(d=>d.r.f==cur||mode!='app').map(d=>d.mesh),false)[0];return h&&RD.find(d=>d.mesh==h.object)}
function hover(e){if(mode=='hero')return;const p=pick(e),t=$('#tip');hov=p||null;if(!p){t.style.display='none';return}const r=p.r,s=st(r);t.style.display='block';t.style.left=Math.min(innerWidth-250,e.clientX+16)+'px';t.style.top=(e.clientY+16)+'px';
 t.innerHTML=`<b class="m">ROOM ${r.id}</b> · ${esc(r.name)}<br><span class="st" style="color:#${CL[s.k].toString(16).padStart(6,'0')}">● ${LB[s.k]}</span><br><span class="t2">Now: ${s.cur?esc(s.cur.name):'—'}<br>Next: ${s.next?esc(s.next.name)+' '+f12(s.next.s):'—'}</span>`}
// ===== ACTIONS =====
function toast(t){const e=$('#toast');e.textContent=t;e.style.display='block';clearTimeout(toast.i);toast.i=setTimeout(()=>e.style.display='none',2600)}
function setFloor(f){cur=f;mode='app';layout();clearRoute();sel=sel&&sel.f==f?sel:null;if(!sel)$('#rp').hidden=true;cg.tx=cg.tz=0;fsr();chips()}
function selectRoom(r,nav){if(mode!='app'||cur!=r.f){cur=r.f;mode='app';layout();fsr();chips()}sel=r;cg.tx=r.x;cg.tz=r.z*.6;cg.d=Math.min(cg.d,14);if(view()=='top')setView('3d');panel();if(nav)startNav(r);else if(rt&&rt.r!=r)clearRoute()}
const view=()=>flat?'2d':cg.el>1.2?'top':'3d';
function panel(){const p=$('#rp');if(!sel){p.hidden=true;return}const r=sel,s=st(r),ok=s.k=='av'||s.k=='soon';p.hidden=false;
 p.innerHTML=`<div style="display:flex;justify-content:space-between"><div><b class="m" style="font-size:22px">ROOM ${r.id}</b><div class="t2">${esc(r.name)}</div></div><button class="b" data-a="x" aria-label="Close">✕</button></div>
 <p class="st" style="margin:12px 0;color:#${CL[s.k].toString(16).padStart(6,'0')}">● ${LB[s.k]}</p>
 <div class="m" style="font-size:12px;line-height:1.9">Capacity: ${r.cap??'Not specified'}<br>Current class: ${s.cur?esc(s.cur.name)+' · '+esc(s.cur.fac):'None'}<br>Next class: ${s.next?esc(s.next.name)+' — '+f12(s.next.s):'None'}<br>${s.until!=null?(s.k=='occ'?'Available from: ':'Available until: ')+f12(s.until)+`<br><b id="rcd">--:--:--</b> <span class="t2" data-u="${s.until*60}">${s.k=='occ'?'until free':'remaining'}</span>`:''}</div>
 <div style="display:flex;gap:6px;margin-top:14px;flex-wrap:wrap"><button class="b p" data-a="nav">NAVIGATE</button><button class="b" data-a="book">BOOK</button><button class="b" data-a="det">DETAILS</button></div><div id="det" class="m t2" style="font-size:12px;margin-top:10px"></div>`;tick()}
function clearRoute(){if(rt){rt.mesh.parent.remove(rt.mesh,rt.dot);rt=null}$('#nv').hidden=true}
function startNav(r){clearRoute();const P=pts(r),path=new T.CurvePath();for(let i=1;i<P.length;i++)path.add(new T.LineCurve3(new T.Vector3(P[i-1][0],.08,P[i-1][1]),new T.Vector3(P[i][0],.08,P[i][1])));
 const seg=80,rad=6,mesh=new T.Mesh(new T.TubeGeometry(path,seg,.07,rad),new T.MeshBasicMaterial({color:0x4FD8FF})),dot=new T.Mesh(new T.SphereGeometry(.18,12,12),new T.MeshBasicMaterial({color:0xffffff}));G[r.f].add(mesh,dot);rt={mesh,dot,path,seg,rad,p:RED?1:0,r};
 const m=dist(r),n=$('#nv');n.hidden=false;n.innerHTML=`<p class="cap">Navigation</p><div class="m">YOU ARE HERE<br>↓<br><b>ROOM ${r.id}</b></div><div class="m t2" style="margin:8px 0">${Math.max(1,Math.ceil(m/78))} min walk · ${m} m${r.f!=UF?`<br>Take stairs to floor ${r.f||'G'}`:''}</div><button class="b" data-a="cn">END ROUTE</button>`}
const fsr=()=>{$('#fs').innerHTML=['ROOF',5,4,3,2,1,'G'].map(f=>{const n=f=='G'?0:f,on=f=='ROOF'?mode=='stack':mode=='app'&&cur==n;return`<button class="${on?'on':''}" data-f="${f}" aria-pressed="${on}" aria-label="${f=='ROOF'?'Roof overview':'Floor '+f}">${f}</button>`}).join('')};
const chips=()=>{$('#chips').innerHTML=ROOMS.filter(r=>r.f==cur).map(r=>`<button class="chip" data-r="${r.id}" aria-label="Room ${r.id} ${LB[st(r).k]}">${r.id} ${SH[st(r).k]}</button>`).join('')};
function today(){const d=DAY();$('#dn').textContent=DAYN[d];$('#tdy').innerHTML=d>0&&d<6?STU.map(s=>`<button class="chip" style="display:block;width:100%;text-align:left;border-radius:10px;margin-bottom:4px" data-r="${s[2]}" data-n="1">${f12(s[0])} — ${s[1]} — ${s[2]}</button>`).join(''):'<span class="t2">No classes today.</span>'}
function aiRun(q){const L=ai(q),e=$('#air');e.innerHTML=(L.length?`<p class="m" style="font-size:12px">${L.length} suitable room${L.length>1?'s':''} found.</p>`+(/block/i.test(q)?'<p class="t2" style="font-size:11px">Only one building is modelled.</p>':''):'<p class="m" style="font-size:12px">No room matches all requirements. Try fewer students or another floor.</p>')+L.map(x=>`<div class="res m" style="font-size:12px"><b>ROOM ${x.r.id}</b><br>Capacity ${x.r.cap}<br>${x.wait?'Available in '+x.wait+' min':'Available now'}<br>${x.d} m away<br><button class="b" style="margin-top:6px;min-height:34px" data-r="${x.r.id}">VIEW ON MAP</button></div>`).join('')}
function sugg(q){q=q.trim().toLowerCase();const o=[];if(!q)return o;if(/next class/.test(q)){const n=nextCls();if(n)o.push({t:`Next class: ${n.name}`,s:`Room ${n.room} · ${f12(n.s)}`,r:byId(n.room)});return o}
 if(/available|free|empty|students|people|near/.test(q))ai(q).forEach(x=>o.push({t:`ROOM ${x.r.id} — ${x.r.name}`,s:(x.wait?'Available in '+x.wait+' min':'Available now')+' · '+x.d+' m',r:x.r}));
 const qq=q.replace(/^(room|lab)\s*/,'');ROOMS.forEach(r=>{if(o.length<6&&!o.some(z=>z.r==r)&&qq&&(r.id.toLowerCase().includes(qq)||r.name.toLowerCase().includes(q)))o.push({t:`ROOM ${r.id} — ${r.name}`,s:`Floor ${r.f||'G'} · ${LB[st(r).k]}`,r})});return o.slice(0,6)}
let SG=[];function sgr(){const q=$('#q').value;SG=sugg(q);const b=$('#sg');b.style.display=SG.length?'block':'none';b.innerHTML=SG.map((s,i)=>`<button role="option" data-i="${i}"><b class="m">${esc(s.t)}</b><br><span class="t2">${esc(s.s)}</span></button>`).join('')}
const wa=t=>window.open('https://wa.me/?text='+encodeURIComponent(t),'_blank','noopener');
function squadUI(){SQ.forEach(o=>o.visible=squad);const e=$('#sqp');if(!squad){e.innerHTML='';return}e.innerHTML=SQD.map(p=>`<div class="m" style="margin:8px 0;font-size:12px">${p.n}<br><span class="t2">● ${Math.round(Math.hypot(p.x-UP.x,p.z-UP.z)*1.2+Math.abs(p.f-UF)*8)} m away · floor ${p.f}</span></div>`).join('')+'<p class="t2" style="font-size:11px">Demo positions — live location needs a backend.</p><div style="display:flex;gap:6px;flex-wrap:wrap"><button class="b" data-a="meet">MEET HERE</button><button class="b" data-a="share">SHARE LOCATION</button><button class="b" data-a="inv">INVITE</button></div>'}
function tick(){const s=secs();document.querySelectorAll('[data-u]').forEach(e=>{const r=Math.max(0,Math.floor(+e.dataset.u-s)),t=[Math.floor(r/3600),Math.floor(r%3600/60),r%60].map(v=>String(v).padStart(2,'0')).join(':');const c=e.previousElementSibling;if(c&&c.id=='rcd')c.textContent=t});
 const n=nextCls();$('#ncn').textContent=n?n.name:'No more classes today';$('#ncr').textContent=n?'Room '+n.room:'';$('#ncg').style.display=n?'':'none';if(n){const r=Math.max(0,Math.floor(n.s*60-s));$('#cdn').textContent=[Math.floor(r/3600),Math.floor(r%3600/60),r%60].map(v=>String(v).padStart(2,'0')).join(':')}else $('#cdn').textContent='--:--:--'}
let lm=-1;function refresh(){RD.forEach(d=>{const s=st(d.r);d.mat.emissive.setHex(CL[s.k]);drw(d.sp,[d.r.id,SH[s.k]])});chips();today();if(sel)panel()}
setInterval(()=>{const m=MIN();if(m!=lm&&RD.length){lm=m;refresh()}tick()},1000);
// ===== EVENTS =====
$('#ex').onclick=()=>{mode='app';layout();setView('3d');cg.az=-.6;$('#hero').style.opacity=0;$('#hero').style.pointerEvents='none';const u=$('#ui');u.style.opacity=1;u.style.pointerEvents='auto';fsr();refresh()};
$('#fr').onclick=()=>{$('#ex').click();setTimeout(()=>$('#q').focus(),300)};
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b){$('#sg').style.display='none';return}const a=b.dataset.a;
 if(b.dataset.f){b.dataset.f=='ROOF'?(mode='stack',sel=null,$('#rp').hidden=true,clearRoute(),layout(),cg.d=34,cg.el=.5,fsr()):(cg.d=Math.max(cg.d,24),setFloor(b.dataset.f=='G'?0:+b.dataset.f))}
 else if(b.dataset.v){if(mode!='app'){mode='app';layout();fsr()}setView(b.dataset.v)}else if(b.dataset.z)cg.d=Math.max(6,Math.min(42,cg.d*(b.dataset.z>0?1.25:.8)));
 else if(b.id=='rs'){cg.az=-.6;cg.tx=cg.tz=0;setView('3d')}else if(b.dataset.r){const r=byId(b.dataset.r);selectRoom(r,!!b.dataset.n)}
 else if(b.dataset.i!=null){const s=SG[+b.dataset.i];$('#sg').style.display='none';$('#q').value='';selectRoom(s.r,true)}
 else if(a=='x'){sel=null;$('#rp').hidden=true}else if(a=='nav')startNav(sel);else if(a=='cn')clearRoute();
 else if(a=='book')toast('Booking backend not connected — use CALL THE SQUAD to meet there.');
 else if(a=='det'){const l=(SESS[sel.id]||[]).filter(x=>x.d==DAY()).sort((x,y)=>x.s-y.s);$('#det').innerHTML=l.length?l.map(x=>`${f12(x.s)} ${esc(x.name)}`).join('<br>'):'No classes scheduled today.'}
 else if(b.id=='sq'){squad=!squad;squadUI()}else if(a=='meet')sel?(toast('Meeting point set: ROOM '+sel.id),wa(`📍 Meet at Room ${sel.id} (floor ${sel.f||'G'}).`)):toast('Select a room first.');
 else if(a=='share')wa(sel?`📍 I'm heading to Room ${sel.id}, floor ${sel.f||'G'}.`:'📍 Sharing my spot on campus.');else if(a=='inv')wa('Join me on Smart Campus Management — find a free room fast! 🚀');
 else if(b.id=='ncg'){const n=nextCls();if(n)selectRoom(byId(n.room),true)}else if(b.id=='live'){sim=null;$('#sim').value='';refresh()}
 else if(b.id=='fab')$('#lp').classList.toggle('open');else if(b.dataset.t)toast({n:'Next: '+($('#ncn').textContent),p:'Signed in as Student (demo)',s:'Settings coming soon'}[b.dataset.t])});
$('#q').oninput=sgr;$('#q').onkeydown=e=>{if(e.key=='Enter'&&SG[0]){$('#sg').style.display='none';selectRoom(SG[0].r,true);$('#q').blur()}};
$('#ai').onkeydown=e=>{if(e.key=='Enter')aiRun(e.target.value)};
$('#sim').onchange=e=>{if(e.target.value){const[h,m]=e.target.value.split(':');sim={b:h*3600+m*60,t:Date.now(),d:DAY()||1};lm=-1;refresh()}};
addEventListener('keydown',e=>{if(e.key=='/'&&document.activeElement.tagName!='INPUT'){e.preventDefault();$('#q').focus()}if(e.key=='Escape'){sel=null;$('#rp').hidden=true;clearRoute();$('#sg').style.display='none'}});
const sc0=document.createElement('script');sc0.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
sc0.onload=()=>{boot();fsr();chips();today();tick();$('#ld').style.opacity=0;setTimeout(()=>$('#ld').remove(),500)};sc0.onerror=()=>{$('#ld').remove();toast('3D map unavailable (check connection). Attendance still works.')};document.head.appendChild(sc0);

window.SCMFloor={pause:v=>{PZ=v;$('#tip').style.display='none'}};
})();

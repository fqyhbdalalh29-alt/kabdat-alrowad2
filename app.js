const T={
ar:{telLbl:"اتصل أو اطلب عبر واتساب",wa:"واتساب",call:"اتصال",share:"مشاركة",link:"تم نسخ الرابط",copy:"نسخ الرقم",map:"موقعنا",ph:"ابحث في المنيو…",note:"صناعة سعودية بكل فخر 🇸🇦",top:"الأكثر طلباً",done:"تم نسخ الرقم",none:"ما لقينا صنف بهذا الاسم.",title:"كبدة الرواد 2",cur:"ريال",branch:"كبدة الرواد 2"},
en:{telLbl:"Call or order on WhatsApp",wa:"WhatsApp",call:"Call",share:"Share",link:"Link copied",copy:"Copy",map:"Location",ph:"Search the menu…",note:"Proudly Saudi Made 🇸🇦",top:"Most Ordered",done:"Number copied",none:"No items match your search.",title:"Al Rowad 2 Liver",cur:"SAR",branch:"Al Rowad 2 Liver"}
};

const POP=CONFIG.popular;
const ALL=D.flatMap(d=>d[2]);
const $=id=>document.getElementById(id);
const FL='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4-4 6-4 11a4 4 0 0 0 8 0c0-2-1-3-1-5 3 2 5 5 5 8a8 8 0 0 1-16 0c0-6 5-8 8-14z"/></svg>';
let lang="ar";
try{const s=localStorage.getItem("lang");if(s==="en"||s==="ar")lang=s;}catch(e){}
let io;
function observe(){
  io&&io.disconnect();
  io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){
    const i=e.target.dataset.i;
    [...$("chips").children].forEach(c=>c.classList.toggle("on",c.dataset.i===i));
    const a=$("chips").querySelector(`[data-i="${i}"]`);
    if(a)$("chips").scrollTo({left:a.offsetLeft-$("chips").clientWidth/2+a.clientWidth/2,behavior:"smooth"});
  }}),{rootMargin:"-30% 0px -60% 0px"});
  document.querySelectorAll("section").forEach(s=>io.observe(s));
}
const H=t=>`<h2>${t}<em><i></i><i></i><i></i></em></h2>`;
function render(){
  const t=T[lang],f=$("q").value.trim().toLowerCase(),ar=lang==="ar";
  const m=([a,e])=>a.includes(f)||e.toLowerCase().includes(f);
  let html="";
  const pop=POP.map(n=>ALL.find(x=>x[0]===n)).filter(Boolean).filter(m);
  if(pop.length&&!f)html+=`<p class="note">${t.note}</p><section id="s-1" data-i="-1" style="padding-top:18px">${H(t.top)}<div class="feat">${pop.map(([a,e,p])=>`<div class="fc">${FL}<div><b>${ar?a:e}</b><span>${ar?e:a}</span></div><div class="fb"><strong>${p}<small>${t.cur}</small></strong><div class="q" data-k="${K(a)}"></div></div></div>`).join("")}</div></section>`;
  D.forEach(([ca,ce,items],i)=>{
    const L=items.filter(m);if(!L.length)return;
    html+=`<section id="s${i}" data-i="${i}">${H(ar?ca:ce)}${L.map(([a,e,p])=>`<div class="row"><div><b>${ar?a:e}</b><small>${ar?e:a}</small></div><i></i><strong>${p}<small>${t.cur}</small></strong><div class="q" data-k="${K(a)}"></div></div>`).join("")}</section>`;
  });
  $("menu").innerHTML=html||`<p class="empty">${t.none}</p>`;paint();
  observe();
}
function applyLang(){
  const t=T[lang];
  document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  $("telLbl").textContent=t.telLbl;$("h1").textContent=t.title;$("branch").textContent=t.branch;
  document.querySelectorAll("[data-t]").forEach(n=>n.textContent=t[n.dataset.t]);
  $("q").placeholder=t.ph;document.title=t.title;
  $("bAr").classList.toggle("on",lang==="ar");$("bEn").classList.toggle("on",lang==="en");
  $("chips").innerHTML=`<a class="chip" href="#s-1" data-i="-1">${t.top}</a>`+D.map(([a,e],i)=>`<a class="chip" href="#s${i}" data-i="${i}">${lang==="ar"?a:e}</a>`).join("");
  $("chips").scrollLeft=0;
  render();
  $("chips").firstElementChild.classList.add("on");
}
function setLang(l){lang=l;try{localStorage.setItem("lang",l)}catch(e){};applyLang()}
$("bAr").onclick=()=>setLang("ar");$("bEn").onclick=()=>setLang("en");
$("q").addEventListener("input",render);
const toast=$("toast");
function say(m){toast.textContent=m;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1800)}
async function copy(){
  try{await navigator.clipboard.writeText(CONFIG.phone);say(T[lang].done)}
  catch(e){try{const x=document.createElement("textarea");x.value=CONFIG.phone;document.body.appendChild(x);x.select();document.execCommand("copy");x.remove();say(T[lang].done)}catch(z){say(CONFIG.phone)}}
}
$("copyA").onclick=copy;
const cart=new Map();
const C={ar:{send:"أرسل الطلب",clr:"مسح",items:"أصناف",total:"المجموع",hi:"السلام عليكم، أبي أطلب:"},en:{send:"Send order",clr:"Clear",items:"items",total:"Total",hi:"Hello, I would like to order:"}};
function K(a){return ALL.findIndex(z=>z[0]===a)}
function qh(k){const n=cart.get(k)||0;return n?`<div class="st"><button type="button" data-a="-" aria-label="-">−</button><b>${n}</b><button type="button" data-a="+" aria-label="+">+</button></div>`:`<button class="add" type="button" data-a="+" aria-label="+">+</button>`}
function paint(){document.querySelectorAll(".q").forEach(q=>q.innerHTML=qh(+q.dataset.k));bar();saveCart()}
function bar(){
  const ar=lang==="ar",c=C[lang],cur=T[lang].cur;let cnt=0,tot=0,lines=[];
  cart.forEach((n,k)=>{const it=ALL[k];cnt+=n;tot+=n*it[2];lines.push(`${n}× ${ar?it[0]:it[1]} (${n*it[2]} ${cur})`)});
  $("cart").hidden=!cnt;if(!cnt)return;
  $("cTot").textContent=`${tot} ${cur}`;$("cCnt").textContent=`${cnt} ${c.items}`;
  $("cClr").textContent=c.clr;$("cSend").textContent=c.send;
  $("cSend").href="https://wa.me/"+CONFIG.intl+"?text="+encodeURIComponent(c.hi+"\n"+lines.join("\n")+"\n"+c.total+": "+tot+" "+cur);
}
$("menu").addEventListener("click",e=>{
  const b=e.target.closest("button[data-a]");if(!b)return;
  const k=+b.closest(".q").dataset.k,n=(cart.get(k)||0)+(b.dataset.a==="+"?1:-1);
  n>0?cart.set(k,n):cart.delete(k);paint();
  if(b.dataset.a==="+"){const row=b.closest(".row,.fc");if(row){row.classList.remove("just-added");requestAnimationFrame(()=>row.classList.add("just-added"));}say(lang==="ar"?"انضاف لطلبك":"Added to your order")}
});
$("cClr").onclick=()=>{cart.clear();paint()};
function saveCart(){try{localStorage.setItem("cart",JSON.stringify([...cart].map(([k,n])=>[ALL[k][0],n])))}catch(e){}}
function loadCart(){try{JSON.parse(localStorage.getItem("cart")||"[]").forEach(([a,n])=>{const k=K(a);if(k>=0&&n>0)cart.set(k,n)})}catch(e){}}
function applyConfig(){
  document.querySelectorAll("[data-wa]").forEach(x=>x.href="https://wa.me/"+CONFIG.intl);
  document.querySelectorAll("[data-tel]").forEach(x=>x.href="tel:+"+CONFIG.intl);
  document.querySelectorAll("[data-map]").forEach(x=>x.href=CONFIG.maps);
  document.querySelectorAll("[data-phone]").forEach(x=>x.textContent=CONFIG.phone);
}
async function share(){
  const d={title:T[lang].title,url:location.href};
  try{if(navigator.share){await navigator.share(d);return}}catch(e){if(e&&e.name==="AbortError")return}
  try{await navigator.clipboard.writeText(location.href);say(T[lang].link)}catch(e){say(location.href)}
}
$("shr").onclick=share;
loadCart();applyConfig();
applyLang();
if("serviceWorker" in navigator&&location.protocol.indexOf("http")===0)navigator.serviceWorker.register("sw.js").catch(()=>{});

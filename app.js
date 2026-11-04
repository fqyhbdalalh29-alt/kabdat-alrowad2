
// تحسينات السلة: ملاحظة الطلب، كميات كل سطر، واختيار «كل شي» الذكي
let orderNoteText=localStorage.getItem("orderNote")||"";
const baseOpenSheet=openSheet;
function enhancedWhatsappUrl(){const lines=cart.map(x=>{const it=ALL[x.k],name=lang==="ar"?it[0]:it[1],extra=x.extras.length?` [${x.extras.join("، ")}]`:" [بدون إضافات]";return `${x.qty}× ${name}${extra} (${x.qty*it[2]} ${T[lang].cur})`});const total=cart.reduce((n,x)=>n+x.qty*ALL[x.k][2],0);const note=orderNoteText.trim()?`\nملاحظة: ${orderNoteText.trim()}`:"";return `https://wa.me/${CONFIG.intl}?text=${encodeURIComponent(T[lang].hi+"\n"+lines.join("\n")+note+"\n"+T[lang].total+": "+total+" "+T[lang].cur)}`}
whatsappUrl=enhancedWhatsappUrl;
function enhancedOpenSheet(){baseOpenSheet();$("orderNote").value=orderNoteText;document.querySelectorAll("#orderLines .order-line").forEach((line,i)=>{const actions=document.createElement("span");actions.className="line-actions";actions.innerHTML=`<button type="button" data-line-dec="${i}">−</button><b>${cart[i].qty}</b><button type="button" data-line-inc="${i}">+</button>`;const holder=line.querySelector("span");holder.appendChild(actions)})}
$("cSend").onclick=enhancedOpenSheet;
$("orderNote").addEventListener("input",e=>{orderNoteText=e.target.value;localStorage.setItem("orderNote",orderNoteText);$("sheetSend").href=whatsappUrl()});
$("orderSheet").addEventListener("click",e=>{const inc=e.target.closest("[data-line-inc]"),dec=e.target.closest("[data-line-dec]");if(inc){cart[+inc.dataset.lineInc].qty++;paint();enhancedOpenSheet()}if(dec){const line=cart[+dec.dataset.lineDec];line.qty--;if(line.qty<=0)cart.splice(+dec.dataset.lineDec,1);paint();enhancedOpenSheet()}});
document.addEventListener("change",e=>{if(e.target.id==="extra-7"){document.querySelectorAll("#extrasOptions input").forEach((input,i)=>{if(i<7)input.checked=e.target.checked})}});

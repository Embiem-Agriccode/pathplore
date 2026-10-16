const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$('.burger').onclick=e=>e.target.setAttribute('aria-expanded',$('#m').classList.toggle('open'));
document.addEventListener('click',e=>{const b=e.target.closest('.spec>button');if(!b)return;const s=b.parentElement,o=s.classList.toggle('open');b.setAttribute('aria-expanded',o);b.querySelector('.toggle').textContent=(o?'Close':'Open')+' spec'});
if(location.hash&&$(location.hash)?.classList.contains('spec'))$(location.hash).classList.add('open');
// reveal on scroll
const io=new IntersectionObserver(a=>a.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
$$('.rv').forEach(e=>io.observe(e));
// carousel
const sl=$$('.slide');if(sl.length){let i=0;const go=n=>{i=(n+sl.length)%sl.length;sl.forEach((s,k)=>s.classList.toggle('on',k==i));$('#cnt').textContent=`0${i+1} / 0${sl.length}`};
$('#prev').onclick=()=>go(i-1);$('#next').onclick=()=>go(i+1);setInterval(()=>go(i+1),8000)}
// enrollment form: one question at a time, saved to Google Sheet
const WA='2347026248749',SHEET_URL='https://script.google.com/macros/s/AKfycbxh_2PayVW5gx-gq73iGySCf8abnO5Smi9ApOy0b0-Rpe8dDtBZnooyRnqkjfNGDAuM/exec';// paste your Apps Script web app URL between the quotes
const F=$('#form');if(F){const S=$$('#form [data-s]'),bar=$('#form .bar i'),cnt=$('#form .cnt'),err=$('#form .err'),nx=$('#form .next'),bk=$('#form .back');let k=0;
const show=(n,focus)=>{k=n;S.forEach((s,i)=>s.hidden=i!=n);bar.style.width=(n+1)/S.length*100+'%';cnt.textContent=`Question ${n+1} of ${S.length}`;bk.hidden=!n;nx.textContent=n==S.length-1?'Send inquiry':'Next';err.textContent='';if(focus)S[n].querySelector('input,select,textarea').focus()};
const ok=()=>{const f=S[k].querySelector('input,select,textarea');if(f.checkValidity())return true;err.textContent=f.type=='email'?'Enter a valid email address, like name@example.com.':'Fill this in to continue.';f.focus();return false};
const send=async()=>{const d=Object.fromEntries(new FormData(F));if(d.website)return;nx.disabled=true;nx.textContent='Sending...';
const link=`https://wa.me/${WA}?text=`+encodeURIComponent(`Hello Pathplore, I'd like to enroll.\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}\nProgram: ${d.program}\nMessage: ${d.message||'-'}`);
let saved=false;if(SHEET_URL){try{await fetch(SHEET_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify(d)});saved=true}catch(_){}}
S.forEach(s=>s.hidden=true);['.nav2','.err','.cnt','.bar'].forEach(q=>$('#form '+q).hidden=true);
const dn=$('#form .done');dn.hidden=false;dn.querySelector('.msg').textContent=saved?`Thank you, ${d.name}. An admissions officer will contact you on ${d.phone}.`:'Tap below to send your details to our admissions team on WhatsApp.';dn.querySelector('a').href=link};
nx.onclick=()=>{if(ok())k<S.length-1?show(k+1,1):send()};bk.onclick=()=>show(k-1,1);
F.onkeydown=e=>{if(e.key=='Enter'&&e.target.tagName!='TEXTAREA'){e.preventDefault();nx.click()}};show(0)}
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
// form -> WhatsApp
const F=$('#form');if(F)F.onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(F));
open(`https://wa.me/${WA}?text=`+encodeURIComponent(`Hello Pathplore, I'd like to enroll.\nName: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nProgram: ${f.program}\nMessage: ${f.message||'-'}`),'_blank')};
 
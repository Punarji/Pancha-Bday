const gifts=document.querySelectorAll('.gift-card');
const candleScreen=document.getElementById('candleScreen');
const candleButton=document.getElementById('candleButton');
const blast=document.getElementById('blast');
const site=document.getElementById('site');
const photoButton=document.getElementById('photoButton');
const photoModal=document.getElementById('photoModal');
const closePhoto=document.getElementById('closePhoto');
const modal=document.getElementById('modal');
const modalContent=document.getElementById('modalContent');
const closeModal=document.getElementById('closeModal');
const openedCount=document.getElementById('openedCount');
const progressBar=document.getElementById('progressBar');
const finalScreen=document.getElementById('finalScreen');
const replay=document.getElementById('replay');

// Pig Intro Elements
const pigScreen = document.getElementById('pigScreen');
const pigContainer = document.getElementById('pigContainer');
const pigThought = document.getElementById('pigThought');

const opened=new Set();
let backgroundAudio=new Audio('assets/perfect-instrumental.mp3');
backgroundAudio.loop=true;backgroundAudio.volume=.42;let bgStarted=false;
function startBackground(){backgroundAudio.play().then(()=>bgStarted=true).catch(()=>{});}
function stopBackground(){backgroundAudio.pause();backgroundAudio.currentTime=0;}
function confetti(n=70){const s=['💗','✨','🌸','♡','🎀','🎂'];for(let i=0;i<n;i++){let e=document.createElement('div');e.className='confetti';e.textContent=s[Math.floor(Math.random()*s.length)];e.style.left=Math.random()*100+'vw';e.style.fontSize=(10+Math.random()*20)+'px';e.style.animationDelay=Math.random()*0.6+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),3500)}}
function hearts(){const b=document.getElementById('heartsBg');if(!b)return;let e=document.createElement('div');e.className='float-heart';e.textContent=['♡','💗','✦','🌸'][Math.floor(Math.random()*4)];e.style.left=Math.random()*100+'%';e.style.bottom='-20px';e.style.fontSize=14+Math.random()*22+'px';e.style.animationDuration=7+Math.random()*7+'s';b.appendChild(e);setTimeout(()=>e.remove(),15000)}
setInterval(hearts,900);

// Pig Walking & Interaction Logic
setTimeout(() => {
  pigThought.textContent = "Click me! ✨";
}, 2500);

pigContainer.addEventListener('click', () => {
  let secretCode = prompt("Enter the secret code to open the gift:");
  if (secretCode === "0906") {
    pigScreen.classList.add('hide');
    candleScreen.classList.remove('hide-init');
  } else if (secretCode !== null) {
    alert("Incorrect secret code! Try again 🐷");
  }
});

candleButton.addEventListener('click',()=>{candleButton.classList.add('off');blast.classList.add('show');confetti(140);setTimeout(()=>{candleScreen.classList.add('hide');site.classList.add('show');startBackground()},1300)});
photoButton.addEventListener('click',()=>photoModal.classList.add('show'));closePhoto.addEventListener('click',()=>photoModal.classList.remove('show'));photoModal.addEventListener('click',e=>{if(e.target===photoModal)photoModal.classList.remove('show')});
function markOpened(t){if(!opened.has(t)){opened.add(t);document.querySelector(`[data-gift="${t}"]`).classList.add('opened');openedCount.textContent=opened.size;progressBar.style.width=(opened.size/3*100)+'%'}}
function openGift(t){let id={message:'messageTemplate',memories:'memoriesTemplate',song:'songTemplate'}[t];modalContent.innerHTML=document.getElementById(id).innerHTML;modal.classList.add('show');markOpened(t);if(t==='song')setupSong();confetti(35)}
gifts.forEach(g=>g.addEventListener('click',()=>openGift(g.dataset.gift)));
function closeGift(){let a=document.getElementById('songPlayer');if(a)a.pause();modal.classList.remove('show');if(bgStarted)startBackground();if(opened.size===3)setTimeout(()=>{finalScreen.classList.add('show');confetti(110)},400)}
closeModal.addEventListener('click',closeGift);modal.addEventListener('click',e=>{if(e.target===modal)closeGift()});
function setupSong(){stopBackground();let a=document.getElementById('songPlayer'),r=document.querySelector('.record');a.addEventListener('play',()=>r.classList.add('playing'));a.addEventListener('pause',()=>r.classList.remove('playing'));a.addEventListener('ended',()=>r.classList.remove('playing'));a.addEventListener('error',()=>{document.querySelector('.song-note').textContent='Add your legally obtained audio as assets/thinking-out-loud.mp3 to enable this gift.'});a.play().catch(()=>{})}
replay.addEventListener('click',()=>{finalScreen.classList.remove('show');opened.clear();gifts.forEach(g=>g.classList.remove('opened'));openedCount.textContent='0';progressBar.style.width='0%';startBackground()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){photoModal.classList.remove('show');if(modal.classList.contains('show'))closeGift()}});

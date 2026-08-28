const gifts=document.querySelectorAll('.gift-card');
const candleScreen=document.getElementById('candleScreen');
const candleButton=document.getElementById('candleButton');
const smokeOverlay=document.getElementById('smokeOverlay');
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

const pigScreen = document.getElementById('pigScreen');
const cloudsIntroWrapper = document.getElementById('cloudsIntroWrapper');
const pigIntroStage = document.getElementById('pigIntroStage');
const pigThought = document.getElementById('pigThought');
const dateButton = document.getElementById('dateButton');
const calendarModal = document.getElementById('calendarModal');
const closeCalendar = document.getElementById('closeCalendar');

const opened=new Set();
let backgroundAudio=new Audio('assets/perfect-instrumental.mp3');
backgroundAudio.loop=true;backgroundAudio.volume=.42;let bgStarted=false;
function startBackground(){backgroundAudio.play().then(()=>bgStarted=true).catch(()=>{});}
function stopBackground(){backgroundAudio.pause();backgroundAudio.currentTime=0;}
function confetti(n=70){const s=['💗','✨','🌸','♡','🎀','🎂'];for(let i=0;i<n;i++){let e=document.createElement('div');e.className='confetti';e.textContent=s[Math.floor(Math.random()*s.length)];e.style.left=Math.random()*100+'vw';e.style.fontSize=(10+Math.random()*20)+'px';e.style.animationDelay=Math.random()*0.6+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),3500)}}
function hearts(){const b=document.getElementById('heartsBg');if(!b)return;let e=document.createElement('div');e.className='float-heart';e.textContent=['♡','💗','✦','🌸'][Math.floor(Math.random()*4)];e.style.left=Math.random()*100+'%';e.style.bottom='-20px';e.style.fontSize=14+Math.random()*22+'px';e.style.animationDuration=7+Math.random()*7+'s';b.appendChild(e);setTimeout(()=>e.remove(),15000)}
setInterval(hearts,900);

// Sequence timeline when user clicks anywhere on opening screen
let sequenceStarted = false;
cloudsIntroWrapper.addEventListener('click', () => {
  if (sequenceStarted) return;
  sequenceStarted = true;

  // 1. Open the two big overlapping clouds
  cloudsIntroWrapper.classList.add('opened');

  // 2. Pig thinks out loud step-by-step
  setTimeout(() => {
    pigThought.textContent = "Hmmmm what a speacial day is today...";
  }, 500);

  setTimeout(() => {
    pigThought.textContent = "Oh wait today is my pancha's birthdayy!";
  }, 2800);

  setTimeout(() => {
    pigThought.textContent = "lets go to celebrate it come follow me";
  }, 5200);

  // 3. Pig goes backward slowly and changes thought
  setTimeout(() => {
    pigIntroStage.classList.add('gone-back');
    pigThought.textContent = "click me";
    pigThought.style.transform = "translateX(-50%) scale(1.1)";
  }, 7600);

  // 4. Transition to candle screen step by step
  setTimeout(() => {
    pigScreen.classList.add('hide');
    candleScreen.classList.remove('hide-init');

    // Fade candle in step-by-step
    setTimeout(() => {
      candleButton.classList.add('faded-visible');
    }, 400);

    // Suddenly glow the candle
    setTimeout(() => {
      candleButton.classList.add('glowing');
    }, 2000);

  }, 9000);
});

// Candle tap interaction triggering smoke on whole screen and surprise
candleButton.addEventListener('click', () => {
  candleButton.classList.add('off');
  smokeOverlay.classList.add('show');
  blast.classList.add('show');
  confetti(140);

  setTimeout(() => {
    candleScreen.classList.add('hide');
    site.classList.add('show');
    startBackground();

    // Fade out smoke smoothly
    setTimeout(() => {
      smokeOverlay.classList.remove('show');
    }, 600);
  }, 1400);
});

// Date Button Calendar Modal Logic
dateButton.addEventListener('click', () => {
  calendarModal.classList.add('show');
  confetti(25);
});
closeCalendar.addEventListener('click', () => calendarModal.classList.remove('show'));
calendarModal.addEventListener('click', (e) => {
  if (e.target === calendarModal) calendarModal.classList.remove('show');
});

photoButton.addEventListener('click',()=>photoModal.classList.add('show'));closePhoto.addEventListener('click',()=>photoModal.classList.remove('show'));photoModal.addEventListener('click',e=>{if(e.target===photoModal)photoModal.classList.remove('show')});
function markOpened(t){if(!opened.has(t)){opened.add(t);document.querySelector(`[data-gift="${t}"]`).classList.add('opened');openedCount.textContent=opened.size;progressBar.style.width=(opened.size/3*100)+'%'}}

function openGift(t){
  let id={message:'messageTemplate',memories:'memoriesTemplate',song:'songTemplate'}[t];
  modalContent.innerHTML=document.getElementById(id).innerHTML;
  modal.classList.add('show');
  markOpened(t);

  // If vintage message card, attach envelope opening interaction
  if(t==='message') {
    const pullBtn = document.getElementById('pullLetterBtn');
    const envFlap = document.getElementById('openEnvFlap');
    const letterCard = document.getElementById('vintageLetterCard');
    
    if(pullBtn) {
      pullBtn.addEventListener('click', () => {
        envFlap.classList.add('opened');
        setTimeout(() => {
          letterCard.classList.add('pulled-out');
          pullBtn.style.display = 'none';
        }, 300);
        confetti(25);
      });
    }
  }

  if(t==='song')setupSong();
  confetti(35);
}

gifts.forEach(g=>g.addEventListener('click',()=>openGift(g.dataset.gift)));

function closeGift(){let a=document.getElementById('songPlayer');if(a)a.pause();modal.classList.remove('show');if(bgStarted)startBackground();if(opened.size===3)setTimeout(()=>{finalScreen.classList.add('show');confetti(110)},400)}
closeModal.addEventListener('click',closeGift);modal.addEventListener('click',e=>{if(e.target===modal)closeGift()});
function setupSong(){stopBackground();let a=document.getElementById('songPlayer'),r=document.querySelector('.record');a.addEventListener('play',()=>r.classList.add('playing'));a.addEventListener('pause',()=>r.classList.remove('playing'));a.addEventListener('ended',()=>r.classList.remove('playing'));a.addEventListener('error',()=>{document.querySelector('.song-note').textContent='Add your legally obtained audio as assets/thinking-out-loud.mp3 to enable this gift.'});a.play().catch(()=>{})}
replay.addEventListener('click',()=>{finalScreen.classList.remove('show');opened.clear();gifts.forEach(g=>g.classList.remove('opened'));openedCount.textContent='0';progressBar.style.width='0%';startBackground()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){photoModal.classList.remove('show');calendarModal.classList.remove('show');if(modal.classList.contains('show'))closeGift()}});

// DRAG PIG MINI GAME LOGIC (MOUSE & TOUCH DRAGGING)
const draggablePig = document.getElementById('draggablePig');
const dragPlayArea = document.getElementById('dragPlayArea');
const girlTarget = document.getElementById('girlTarget');
const gameStatus = document.getElementById('gameStatus');

let isDragging = false;
let gameCompleted = false;

function initDragGame() {
  isDragging = false;
  gameCompleted = false;
  draggablePig.style.left = '35px';
  gameStatus.textContent = "Drag the pig across the field to give a big hug!";
  draggablePig.style.cursor = 'grab';
}

function startDrag(e) {
  if (gameCompleted) return;
  isDragging = true;
  draggablePig.style.cursor = 'grabbing';
  e.preventDefault();
}

function onDrag(clientX) {
  if (!isDragging || gameCompleted) return;
  const rect = dragPlayArea.getBoundingClientRect();
  let offsetX = clientX - rect.left - 25; // center offset
  
  // Constrain inside bounds
  const minX = 10;
  const maxX = dragPlayArea.clientWidth - 70;
  
  if (offsetX < minX) offsetX = minX;
  if (offsetX > maxX) offsetX = maxX;
  
  draggablePig.style.left = offsetX + 'px';

  // Check if pig is close enough to girl target
  const pigRect = draggablePig.getBoundingClientRect();
  const girlRect = girlTarget.getBoundingClientRect();
  
  if (pigRect.right >= girlRect.left - 15) {
    // Success!
    isDragging = false;
    gameCompleted = true;
    draggablePig.style.left = (dragPlayArea.clientWidth - 75) + 'px';
    draggablePig.style.cursor = 'default';
    gameStatus.textContent = "Yay! Big hug for my Pancha! 💕🎉";
    confetti(40);
  }
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  draggablePig.style.cursor = 'grab';
  
  // If not reached, snap back gently if user didn't reach target
  if (!gameCompleted) {
    draggablePig.style.transition = 'left 0.3s ease';
    draggablePig.style.left = '35px';
    setTimeout(() => {
      draggablePig.style.transition = 'none';
    }, 300);
  }
}

// Mouse events
draggablePig.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', (e) => {
  if (isDragging) onDrag(e.clientX);
});
window.addEventListener('mouseup', endDrag);

// Touch events for mobile phones
draggablePig.addEventListener('touchstart', (e) => {
  startDrag(e.touches[0]);
});
window.addEventListener('touchmove', (e) => {
  if (isDragging && e.touches.length > 0) {
    onDrag(e.touches[0].clientX);
  }
});
window.addEventListener('touchend', endDrag);

initDragGame();

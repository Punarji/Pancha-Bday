document.addEventListener('DOMContentLoaded', () => {
  // Passcode intro elements
  const cloudIntroTitle = document.getElementById('cloudIntroTitle');
  const passcodeContainer = document.getElementById('passcodeContainer');
  const passcodeInput = document.getElementById('passcodeInput');
  const submitPasscode = document.getElementById('submitPasscode');
  const passcodeError = document.getElementById('passcodeError');
  const cryingPigOverlay = document.getElementById('cryingPigOverlay');
  const closeCryingPig = document.getElementById('closeCryingPig');
  const cloudsIntroWrapper = document.getElementById('cloudsIntroWrapper');
  const pigIntroStage = document.getElementById('pigIntroStage');
  const pigScreen = document.getElementById('pigScreen');

  // Candle screen elements
  const candleScreen = document.getElementById('candleScreen');
  const candleButton = document.getElementById('candleButton');
  const smokeOverlay = document.getElementById('smokeOverlay');
  const blast = document.getElementById('blast');
  const site = document.getElementById('site');

  // Interactive elements
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  const modalContent = document.getElementById('modalContent');
  const finalScreen = document.getElementById('finalScreen');
  const replay = document.getElementById('replay');
  const progressBar = document.getElementById('progressBar');
  const openedCountEl = document.getElementById('openedCount');
  const heartsBg = document.getElementById('heartsBg');
  
  // Photo modal & calendar modal
  const photoButton = document.getElementById('photoButton');
  const photoModal = document.getElementById('photoModal');
  const closePhoto = document.getElementById('closePhoto');
  const dateButton = document.getElementById('dateButton');
  const calendarModal = document.getElementById('calendarModal');
  const closeCalendar = document.getElementById('closeCalendar');

  // Mini-game elements
  const draggablePig = document.getElementById('draggablePig');
  const emptyTargetBox = document.getElementById('emptyTargetBox');
  const dragPlayArea = document.getElementById('dragPlayArea');
  const gameStatus = document.getElementById('gameStatus');

  let openedGifts = new Set();
  const correctPasscode = "0906";

  // Step 1: Click on "HI" to show passcode input on the small creative cloud
  cloudIntroTitle.addEventListener('click', () => {
    cloudIntroTitle.style.display = 'none';
    pigIntroStage.style.display = 'none';
    passcodeContainer.classList.remove('hide-init');
    passcodeInput.focus();
  });

  // Handle Passcode Submission
  function verifyPasscode() {
    const enteredCode = passcodeInput.value.trim();
    if (enteredCode === correctPasscode) {
      passcodeError.textContent = "";
      passcodeContainer.classList.add('hide-init');
      
      // Open clouds and continue journey
      cloudsIntroWrapper.classList.add('opened');
      setTimeout(() => {
        pigScreen.classList.add('hide');
        // Fade in candle button
        setTimeout(() => {
          candleButton.classList.add('faded-visible');
        }, 500);
      }, 1000);
    } else {
      // Wrong passcode -> Show crying pig overlay
      cryingPigOverlay.classList.remove('hide-init');
      passcodeError.textContent = "Wrong passcode!";
    }
  }

  submitPasscode.addEventListener('click', verifyPasscode);
  passcodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      verifyPasscode();
    }
  });

  // Close Crying Pig and let user try again
  closeCryingPig.addEventListener('click', () => {
    cryingPigOverlay.classList.add('hide-init');
    passcodeInput.value = "";
    passcodeInput.focus();
  });

  // Step 2: Candle Screen interaction
  candleButton.addEventListener('click', () => {
    if (!candleButton.classList.contains('off') && !candleButton.classList.contains('glowing')) {
      candleButton.classList.add('glowing');
      return;
    }
    
    if (candleButton.classList.contains('glowing')) {
      candleButton.classList.remove('glowing');
      candleButton.classList.add('off');
      
      smokeOverlay.classList.add('show');
      blast.classList.add('show');
      
      setTimeout(() => {
        candleScreen.classList.add('hide');
        site.classList.add('show');
        smokeOverlay.classList.remove('show');
      }, 1200);
    }
  });

  // Floating background hearts
  setInterval(() => {
    if (!heartsBg) return;
    const heart = document.createElement('div');
    heart.className = 'float-heart';
    heart.textContent = ['💗', '🌸', '☁️', '🐷', '✨'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-30px';
    const duration = Math.random() * 3 + 4;
    heart.style.animationDuration = duration + 's';
    heartsBg.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }, 450);

  // Gift Card Click Handlers
  document.querySelectorAll('.gift-card').forEach(card => {
    card.addEventListener('click', () => {
      const giftType = card.dataset.gift;
      openedGifts.add(giftType);
      card.classList.add('opened');
      card.querySelector('.lock').textContent = '✓';
      
      updateProgress();
      showModalContent(giftType);
    });
  });

  function updateProgress() {
    const count = openedGifts.size;
    openedCountEl.textContent = count;
    progressBar.style.width = (count / 3) * 100 + '%';

    if (count === 3) {
      setTimeout(() => {
        document.getElementById('finalHint').scrollIntoView({ behavior: 'smooth' });
      }, 600);
      setTimeout(() => {
        finalScreen.classList.add('show');
        launchConfetti();
      }, 1400);
    }
  }

  function showModalContent(type) {
    modalContent.innerHTML = '';
    const templateId = type + 'Template';
    const template = document.getElementById(templateId);
    if (template) {
      modalContent.appendChild(template.content.cloneNode(true));
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');

      if (type === 'song') {
        const audio = modalContent.querySelector('#songPlayer');
        const record = modalContent.querySelector('.record');
        if (audio) {
          audio.onplay = () => record.classList.add('playing');
          audio.onpause = () => record.classList.remove('playing');
        }
      }
    }
  }

  closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    const audio = modalContent.querySelector('#songPlayer');
    if (audio) audio.pause();
  });

  // Photo modal
  if (photoButton) {
    photoButton.addEventListener('click', () => {
      photoModal.classList.add('show');
      photoModal.setAttribute('aria-hidden', 'false');
    });
  }
  if (closePhoto) {
    closePhoto.addEventListener('click', () => {
      photoModal.classList.remove('show');
      photoModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Calendar modal
  if (dateButton) {
    dateButton.addEventListener('click', () => {
      calendarModal.classList.add('show');
      calendarModal.setAttribute('aria-hidden', 'false');
    });
  }
  if (closeCalendar) {
    closeCalendar.addEventListener('click', () => {
      calendarModal.classList.remove('show');
      calendarModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Mini-Game Logic (Drag Pig & Wrong Empty Box Click Handling)
  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  function handleDragStart(e) {
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    gameStatus.textContent = "Guide the cute pig across! 🐷";
  }

  function handleDragMove(e) {
    if (!isDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;
    const maxDrag = dragPlayArea.clientWidth - 80;
    currentX = Math.max(10, Math.min(deltaX + 20, maxDrag));
    draggablePig.style.transform = `translateX(${currentX}px)`;
  }

  function handleDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    const maxDrag = dragPlayArea.clientWidth - 80;
    
    // Check if dragged far enough to reach the target box area
    if (currentX > maxDrag - 100) {
      gameStatus.textContent = "Yay! Piggy reached home safely! 🎉🐷💗";
      draggablePig.style.transform = `translateX(${maxDrag - 20}px)`;
      draggablePig.style.cursor = "default";
      draggablePig.removeEventListener('mousedown', handleDragStart);
      draggablePig.removeEventListener('touchstart', handleDragStart);
    } else {
      draggablePig.style.transform = `translateX(0px)`;
      currentX = 0;
      gameStatus.textContent = "Try again! Drag all the way to the right target! 🌸";
    }
  }

  draggablePig.addEventListener('mousedown', handleDragStart);
  window.addEventListener('mousemove', handleDragMove);
  window.addEventListener('mouseup', handleDragEnd);

  draggablePig.addEventListener('touchstart', handleDragStart);
  window.addEventListener('touchmove', handleDragMove);
  window.addEventListener('touchend', handleDragEnd);

  // If clicking on the wrong empty box area, display the crying pig overlay
  emptyTargetBox.addEventListener('click', () => {
    cryingPigOverlay.classList.remove('hide-init');
  });

  replay.addEventListener('click', () => {
    window.location.reload();
  });

  function launchConfetti() {
    for (let i = 0; i < 70; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = ['#ff74ab', '#fff', '#ffb6d5', '#ff429d'][Math.floor(Math.random() * 4)];
      confetti.style.animationDelay = Math.random() * 1.5 + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3500);
    }
  }
});

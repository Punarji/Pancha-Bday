document.addEventListener("DOMContentLoaded", () => {
  // --- 1. CLOUDS OPENING INTRO ANIMATION ---
  const pigScreen = document.getElementById("pigScreen");
  const cloudsIntroWrapper = document.getElementById("cloudsIntroWrapper");
  const pigIntroStage = document.getElementById("pigIntroStage");
  const candleScreen = document.getElementById("candleScreen");

  if (cloudsIntroWrapper && pigScreen) {
    cloudsIntroWrapper.addEventListener("click", () => {
      cloudsIntroWrapper.classList.add("opened");
      if (pigIntroStage) {
        pigIntroStage.classList.add("gone-back");
      }
      setTimeout(() => {
        pigScreen.classList.add("hide");
        if (candleScreen) {
          candleScreen.classList.remove("hide-init");
          // Slight delay to trigger CSS fade-in
          setTimeout(() => {
            const candleButton = document.getElementById("candleButton");
            if (candleButton) {
              candleButton.classList.add("faded-visible");
            }
          }, 100);
        }
      }, 1000);
    });
  }

  // --- 2. CANDLE BLOWING & BIRTHDAY BLAST ---
  const candleButton = document.getElementById("candleButton");
  const smokeOverlay = document.getElementById("smokeOverlay");
  const blast = document.getElementById("blast");
  const site = document.getElementById("site");

  let isCandleLit = false;

  if (candleButton) {
    candleButton.addEventListener("click", () => {
      if (!isCandleLit) {
        // Light up the candle
        candleButton.classList.add("glowing");
        isCandleLit = true;
      } else {
        // Blow out the candle
        candleButton.classList.remove("glowing");
        candleButton.classList.add("off");

        // Smoke & Blast Transition
        if (smokeOverlay) smokeOverlay.classList.add("show");
        if (blast) blast.classList.add("show");

        setTimeout(() => {
          if (candleScreen) candleScreen.classList.add("hide");
          if (smokeOverlay) smokeOverlay.classList.remove("show");
          if (site) site.classList.add("show");
          startFloatingHearts();
        }, 1500);
      }
    });
  }

  // --- 3. GIFT MODALS & INTERACTIONS ---
  const gifts = document.querySelectorAll(".gift-card");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  const closeModal = document.getElementById("closeModal");
  const openedCountEl = document.getElementById("openedCount");
  const progressBar = document.getElementById("progressBar");
  const finalScreen = document.getElementById("finalScreen");
  const replayBtn = document.getElementById("replay");

  let openedGiftsCount = 0;
  const openedGiftsSet = new Set();

  gifts.forEach((card) => {
    card.addEventListener("click", () => {
      const giftType = card.getAttribute("data-gift");
      openGiftModal(giftType);

      if (!openedGiftsSet.has(giftType)) {
        openedGiftsSet.add(giftType);
        openedGiftsCount++;
        if (openedCountEl) openedCountEl.textContent = openedGiftsCount;
        if (progressBar) progressBar.style.width = `${(openedGiftsCount / 3) * 100}%`;
        card.classList.add("opened");

        if (openedGiftsCount === 3) {
          setTimeout(() => {
            if (finalScreen) finalScreen.classList.add("show");
            launchConfetti();
          }, 900);
        }
      }
    });
  });

  function openGiftModal(type) {
    if (!modal || !modalContent) return;
    modalContent.innerHTML = "";

    if (type === "message") {
      const template = document.getElementById("messageTemplate");
      if (template) {
        modalContent.appendChild(template.content.cloneNode(true));
        setupEnvelopeInteraction();
      }
    } else if (type === "memories") {
      const template = document.getElementById("memoriesTemplate");
      if (template) {
        modalContent.appendChild(template.content.cloneNode(true));
      }
    } else if (type === "song") {
      const template = document.getElementById("songTemplate");
      if (template) {
        modalContent.appendChild(template.content.cloneNode(true));
        setupSongPlayer();
      }
    }

    modal.classList.add("show");
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("show");
    });
  }

  // --- 4. VINTAGE ENVELOPE INTERACTION ---
  function setupEnvelopeInteraction() {
    const flap = document.getElementById("openEnvFlap");
    const letterCard = document.getElementById("vintageLetterCard");
    const pullBtn = document.getElementById("pullLetterBtn");

    if (pullBtn && flap && letterCard) {
      let isOpen = false;
      pullBtn.addEventListener("click", () => {
        if (!isOpen) {
          flap.classList.add("opened");
          setTimeout(() => {
            letterCard.classList.add("pulled-out");
          }, 400);
          pullBtn.textContent = "Close letter ♡";
          isOpen = true;
        } else {
          letterCard.classList.remove("pulled-out");
          setTimeout(() => {
            flap.classList.remove("opened");
          }, 500);
          pullBtn.textContent = "Pull letter out of envelope ✨";
          isOpen = false;
        }
      });
    }
  }

  // --- 5. SONG PLAYER INTERACTION ---
  function setupSongPlayer() {
    const player = document.getElementById("songPlayer");
    const record = document.querySelector(".record");
    if (player && record) {
      player.addEventListener("play", () => record.classList.add("playing"));
      player.addEventListener("pause", () => record.classList.remove("playing"));
      player.addEventListener("ended", () => record.classList.remove("playing"));
    }
  }

  // --- 6. TOP BUTTONS (PHOTO & CALENDAR MODALS) ---
  const photoButton = document.getElementById("photoButton");
  const photoModal = document.getElementById("photoModal");
  const closePhoto = document.getElementById("closePhoto");

  if (photoButton && photoModal) {
    photoButton.addEventListener("click", () => photoModal.classList.add("show"));
  }
  if (closePhoto && photoModal) {
    closePhoto.addEventListener("click", () => photoModal.classList.remove("show"));
  }

  const dateButton = document.getElementById("dateButton");
  const calendarModal = document.getElementById("calendarModal");
  const closeCalendar = document.getElementById("closeCalendar");

  if (dateButton && calendarModal) {
    dateButton.addEventListener("click", () => calendarModal.classList.add("show"));
  }
  if (closeCalendar && calendarModal) {
    closeCalendar.addEventListener("click", () => calendarModal.classList.remove("show"));
  }

  // --- 7. MINI GAME: FIND THE PIG ---
  const gameGrid = document.getElementById("gameGrid");
  const gameStatus = document.getElementById("gameStatus");
  const totalTiles = 8;
  const winningIndex = Math.floor(Math.random() * totalTiles);

  if (gameGrid) {
    for (let i = 0; i < totalTiles; i++) {
      const tile = document.createElement("button");
      tile.className = "game-tile";
      tile.textContent = "❓";
      tile.setAttribute("aria-label", `Card ${i + 1}`);

      tile.addEventListener("click", () => {
        if (tile.classList.contains("revealed")) return;

        tile.classList.add("revealed");
        if (i === winningIndex) {
          tile.textContent = "🐷";
          if (gameStatus) gameStatus.textContent = "Yay! You found the cute pig! 🎉💕";
          revealAllTiles();
        } else {
          tile.textContent = "🌸";
          if (gameStatus) gameStatus.textContent = "Not here! Try another card 💗";
        }
      });
      gameGrid.appendChild(tile);
    }
  }

  function revealAllTiles() {
    const tiles = document.querySelectorAll(".game-tile");
    tiles.forEach((t, idx) => {
      t.classList.add("revealed");
      if (idx === winningIndex) {
        t.textContent = "🐷";
      } else if (t.textContent === "❓") {
        t.textContent = "💨";
      }
    });
  }

  // --- 8. FLOATING HEARTS & REPLAY ---
  function startFloatingHearts() {
    const heartsBg = document.getElementById("heartsBg");
    if (!heartsBg) return;
    setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "float-heart";
      heart.textContent = Math.random() > 0.5 ? "💗" : "🌸";
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.bottom = `-20px";
      heart.style.fontSize = `${Math.random() * 20 + 14}px`;
      heart.style.animationDuration = `${Math.random() * 3 + 3}s`;
      heartsBg.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }, 450);
  }

  function launchConfetti() {
    for (let i = 0; i < 45; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.background = ['#ff6fae', '#ffb8d4', '#ffffff', '#ff4f9c'][Math.floor(Math.random() * 4)];
      confetti.style.animationDelay = `${Math.random() * 1.5}s`;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  }

  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      window.location.reload();
    });
  }
});

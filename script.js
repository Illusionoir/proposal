const wrapper = document.querySelector(".wrapper");
const proposal = document.querySelector(".proposal-content");
const thankYou = document.querySelector(".thank-you");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const response = document.querySelector(".response");

function moveNoButton(event) {
  const buttonRect = noBtn.getBoundingClientRect();
  const margin = 12;
  const maxX = Math.max(margin, window.innerWidth - buttonRect.width - margin);
  const maxY = Math.max(margin, window.innerHeight - buttonRect.height - margin);
  const pointerX = event.clientX ?? window.innerWidth / 2;
  const pointerY = event.clientY ?? window.innerHeight / 2;
  let x;
  let y;

  // Choose a position away from the touch or pointer when possible.
  for (let attempt = 0; attempt < 12; attempt += 1) {
    x = margin + Math.random() * Math.max(0, maxX - margin);
    y = margin + Math.random() * Math.max(0, maxY - margin);
    const centerX = x + buttonRect.width / 2;
    const centerY = y + buttonRect.height / 2;
    if (Math.hypot(centerX - pointerX, centerY - pointerY) > 140) break;
  }

  noBtn.classList.add("is-running");
  noBtn.style.left = `${Math.round(x)}px`;
  noBtn.style.top = `${Math.round(y)}px`;
}

yesBtn.addEventListener("click", () => {
  // Hide the entire proposal section so neither answer button can remain on the note.
  proposal.hidden = true;
  thankYou.hidden = false;
  wrapper.classList.add("celebrate");
  document.body.classList.add("celebrating");
  document.title = "A Happy Little Yes 💖";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Move before the browser synthesizes a click, so touch users can still tap Yes.
noBtn.addEventListener("pointerdown", moveNoButton);
noBtn.addEventListener("pointerenter", (event) => {
  // pointerenter is useful for mouse/pen hover; touch movement is handled on pointerdown.
  if (event.pointerType !== "touch") moveNoButton(event);
});
noBtn.addEventListener("click", () => {
  response.textContent = "Aww, no worries—I'll keep sending you love anyway! 💗";
});

window.addEventListener("resize", () => {
  if (!noBtn.classList.contains("is-running")) return;
  const margin = 12;
  const rect = noBtn.getBoundingClientRect();
  const x = Math.min(parseFloat(noBtn.style.left) || margin, window.innerWidth - rect.width - margin);
  const y = Math.min(parseFloat(noBtn.style.top) || margin, window.innerHeight - rect.height - margin);
  noBtn.style.left = `${Math.max(margin, x)}px`;
  noBtn.style.top = `${Math.max(margin, y)}px`;
});
